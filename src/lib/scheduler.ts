import {
  ChargingInput,
  ChargingPreference,
  ScheduleResult,
  ScheduleHour,
  HourlyData,
} from "./types";
import { getScenarioById, getDefaultScenario } from "./scenarios";

// Weights for different preferences
const PREFERENCE_WEIGHTS: Record<
  ChargingPreference,
  { price: number; carbon: number; grid: number }
> = {
  cheapest: { price: 0.7, carbon: 0.2, grid: 0.1 },
  greenest: { price: 0.1, carbon: 0.7, grid: 0.2 },
  balanced: { price: 0.4, carbon: 0.4, grid: 0.2 },
};

// Typical home charging rate (kW)
const CHARGING_RATE_KW = 7.4; // Level 2 home charger

// Normalize values to 0-1 range
function normalize(values: number[]): number[] {
  const min = Math.min(...values);
  const max = Math.max(...values);
  if (max === min) return values.map(() => 0.5);
  return values.map((v) => (v - min) / (max - min));
}

// Calculate weighted score for each hour (lower is better)
function calculateHourScores(
  hourlyData: HourlyData[],
  preference: ChargingPreference
): { hour: number; score: number; data: HourlyData }[] {
  const weights = PREFERENCE_WEIGHTS[preference];

  const prices = hourlyData.map((h) => h.price);
  const carbons = hourlyData.map((h) => h.carbonIntensity);
  const grids = hourlyData.map((h) => h.gridLoad);

  const normPrices = normalize(prices);
  const normCarbons = normalize(carbons);
  const normGrids = normalize(grids);

  return hourlyData.map((data, i) => ({
    hour: data.hour,
    score:
      weights.price * normPrices[i] +
      weights.carbon * normCarbons[i] +
      weights.grid * normGrids[i],
    data,
  }));
}

// Get available hours for charging (from current hour to deadline)
function getAvailableHours(
  currentHour: number,
  deadlineHour: number
): number[] {
  const hours: number[] = [];
  let hour = currentHour;

  // Handle overnight scheduling
  while (true) {
    hours.push(hour % 24);
    if (hour % 24 === deadlineHour) break;
    hour++;
    if (hours.length > 24) break; // Safety limit
  }

  return hours;
}

// Calculate baseline cost (immediate charging at current time)
function calculateBaseline(
  kwhNeeded: number,
  hourlyData: HourlyData[],
  startHour: number
): { cost: number; carbon: number } {
  const hoursNeeded = Math.ceil(kwhNeeded / CHARGING_RATE_KW);
  let cost = 0;
  let carbon = 0;

  for (let i = 0; i < hoursNeeded; i++) {
    const hour = (startHour + i) % 24;
    const data = hourlyData[hour];
    const kwhThisHour = Math.min(CHARGING_RATE_KW, kwhNeeded - i * CHARGING_RATE_KW);
    cost += kwhThisHour * data.price;
    carbon += kwhThisHour * data.carbonIntensity;
  }

  return { cost, carbon };
}

export function generateSchedule(input: ChargingInput): ScheduleResult {
  const scenario = getScenarioById(input.scenarioId) || getDefaultScenario();
  const hourlyData = scenario.hourlyData;

  // Calculate kWh needed
  const chargeNeeded = input.targetCharge - input.currentCharge;
  const kwhNeeded = (chargeNeeded / 100) * input.batteryCapacity;

  // Get current hour (simulate as evening for demo)
  const currentHour = 20; // 8 PM - typical evening arrival home

  // Get available hours and calculate scores
  const availableHours = getAvailableHours(currentHour, input.deadlineHour);
  const hourScores = calculateHourScores(hourlyData, input.preference);

  // Filter to available hours and sort by score (best first)
  const scoredAvailable = availableHours
    .map((hour) => hourScores.find((s) => s.hour === hour)!)
    .filter(Boolean)
    .sort((a, b) => a.score - b.score);

  // Allocate charging to best hours
  let remainingKwh = kwhNeeded;
  const schedule: ScheduleHour[] = [];

  for (const hourData of scoredAvailable) {
    if (remainingKwh <= 0) break;

    const kwhThisHour = Math.min(CHARGING_RATE_KW, remainingKwh);
    const cost = kwhThisHour * hourData.data.price;
    const carbon = kwhThisHour * hourData.data.carbonIntensity;

    schedule.push({
      hour: hourData.hour,
      kWh: Math.round(kwhThisHour * 100) / 100,
      price: hourData.data.price,
      carbonIntensity: hourData.data.carbonIntensity,
      gridLoad: hourData.data.gridLoad,
      cost: Math.round(cost * 100) / 100,
      carbon: Math.round(carbon),
    });

    remainingKwh -= kwhThisHour;
  }

  // Sort schedule by hour for display
  schedule.sort((a, b) => {
    // Handle overnight (hours after midnight come after evening hours)
    const aAdjusted = a.hour < currentHour ? a.hour + 24 : a.hour;
    const bAdjusted = b.hour < currentHour ? b.hour + 24 : b.hour;
    return aAdjusted - bAdjusted;
  });

  // Calculate totals
  const totalCost = schedule.reduce((sum, h) => sum + h.cost, 0);
  const totalCarbon = schedule.reduce((sum, h) => sum + h.carbon, 0);

  // Calculate baseline (immediate charging)
  const baseline = calculateBaseline(kwhNeeded, hourlyData, currentHour);

  // Calculate savings with edge case guards
  const costSavings = baseline.cost - totalCost;
  const carbonSavings = baseline.carbon - totalCarbon;
  const costPercent = baseline.cost > 0 ? Math.round((costSavings / baseline.cost) * 100) : 0;
  const carbonPercent = baseline.carbon > 0 ? Math.round((carbonSavings / baseline.carbon) * 100) : 0;

  return {
    schedule,
    totalKwh: Math.round(kwhNeeded * 100) / 100,
    totalCost: Math.round(totalCost * 100) / 100,
    totalCarbon: Math.round(totalCarbon),
    baseline: {
      cost: Math.round(baseline.cost * 100) / 100,
      carbon: Math.round(baseline.carbon),
    },
    savings: {
      cost: Math.round(costSavings * 100) / 100,
      costPercent: isFinite(costPercent) ? costPercent : 0,
      carbon: Math.round(carbonSavings),
      carbonPercent: isFinite(carbonPercent) ? carbonPercent : 0,
    },
    startHour: currentHour,
    endHour: input.deadlineHour,
  };
}

// Format hour for display (e.g., "14:00" or "2:00 PM")
export function formatHour(hour: number, use24h: boolean = true): string {
  if (use24h) {
    return `${hour.toString().padStart(2, "0")}:00`;
  }
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:00 ${period}`;
}
