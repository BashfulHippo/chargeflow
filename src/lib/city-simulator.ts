import { CityImpact, ChargingPreference } from "./types";
import { getScenarioById, getDefaultScenario } from "./scenarios";

// Lisbon city parameters
const LISBON_EV_AVERAGE_DAILY_KWH = 10; // Average daily charging need per EV
const PEAK_REDUCTION_FACTOR = 0.6; // 60% of charging can be shifted off-peak
const AVERAGE_CARBON_REDUCTION = 0.15; // 15% carbon reduction through smart charging
const TREES_PER_TONNE_CO2 = 45; // Trees needed to absorb 1 tonne CO2/year

// Calculate city-wide impact for a given number of ChargeFlow adopters
export function calculateCityImpact(
  driversCount: number,
  scenarioId: string = "weekday-peak",
  preference: ChargingPreference = "balanced"
): CityImpact {
  const scenario = getScenarioById(scenarioId) || getDefaultScenario();

  // Calculate peak vs off-peak price differential
  const hourlyData = scenario.hourlyData;
  const peakHours = hourlyData.filter((h) => h.gridLoad > 75);
  const offPeakHours = hourlyData.filter((h) => h.gridLoad <= 50);

  const avgPeakPrice =
    peakHours.reduce((sum, h) => sum + h.price, 0) / peakHours.length || 0.18;
  const avgOffPeakPrice =
    offPeakHours.reduce((sum, h) => sum + h.price, 0) / offPeakHours.length || 0.07;
  const priceDiff = avgPeakPrice - avgOffPeakPrice;

  // Calculate carbon differential
  const avgPeakCarbon =
    peakHours.reduce((sum, h) => sum + h.carbonIntensity, 0) / peakHours.length || 280;
  const avgOffPeakCarbon =
    offPeakHours.reduce((sum, h) => sum + h.carbonIntensity, 0) / offPeakHours.length || 170;
  const carbonReductionPercent = (avgPeakCarbon - avgOffPeakCarbon) / avgPeakCarbon;

  // Adjust factors based on preference
  let shiftFactor = PEAK_REDUCTION_FACTOR;
  let carbonFactor = AVERAGE_CARBON_REDUCTION;

  switch (preference) {
    case "cheapest":
      shiftFactor = 0.7; // More aggressive shifting for cost
      carbonFactor = 0.1;
      break;
    case "greenest":
      shiftFactor = 0.5;
      carbonFactor = carbonReductionPercent * 0.8; // Maximize carbon reduction
      break;
    case "balanced":
      shiftFactor = 0.6;
      carbonFactor = carbonReductionPercent * 0.6;
      break;
  }

  // Daily kWh shifted off-peak per driver
  const dailyKwhShifted = LISBON_EV_AVERAGE_DAILY_KWH * shiftFactor;

  // Peak reduction in MW (assuming all drivers charge during peak without optimization)
  // Peak hour window is roughly 3-4 hours, so distributed charging power
  const peakReductionMW = (driversCount * dailyKwhShifted) / 4 / 1000; // Convert kWh/4h to MW

  // Annual CO2 avoided (tonnes)
  const dailyCO2AvoidedKg =
    driversCount * LISBON_EV_AVERAGE_DAILY_KWH * carbonFactor * (avgPeakCarbon / 1000);
  const co2AvoidedTonnes = (dailyCO2AvoidedKg * 365) / 1000;

  // Grid cost savings (€/year)
  // This includes both direct price savings and avoided grid infrastructure costs
  const dailySavings = driversCount * dailyKwhShifted * priceDiff;
  const gridSavingsEuros = dailySavings * 365;

  // Equivalent trees planted
  const equivalentTrees = Math.round(co2AvoidedTonnes * TREES_PER_TONNE_CO2);

  return {
    driversCount,
    peakReductionMW: Math.round(peakReductionMW * 10) / 10,
    co2AvoidedTonnes: Math.round(co2AvoidedTonnes),
    gridSavingsEuros: Math.round(gridSavingsEuros),
    equivalentTrees,
  };
}

// Get impact at different adoption levels for comparison
export function getAdoptionComparison(
  scenarioId: string = "weekday-peak"
): { level: string; drivers: number; impact: CityImpact }[] {
  const levels = [
    { level: "Early Adopters", drivers: 1000 },
    { level: "Growing", drivers: 5000 },
    { level: "Mainstream", drivers: 20000 },
    { level: "City-wide", drivers: 50000 },
  ];

  return levels.map(({ level, drivers }) => ({
    level,
    drivers,
    impact: calculateCityImpact(drivers, scenarioId),
  }));
}
