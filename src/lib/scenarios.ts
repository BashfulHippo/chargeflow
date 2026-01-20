import { Scenario, HourlyData } from "./types";

// Generate realistic Lisbon energy data
// Prices based on Portuguese OMIE day-ahead market patterns
// Carbon intensity based on Portuguese grid mix (high renewable penetration)
// Grid load based on typical Portuguese demand curves

function generateHourlyData(
  pricePattern: number[],
  carbonPattern: number[],
  gridPattern: number[]
): HourlyData[] {
  return pricePattern.map((_, hour) => ({
    hour,
    price: pricePattern[hour],
    carbonIntensity: carbonPattern[hour],
    gridLoad: gridPattern[hour],
  }));
}

// Scenario 1: Weekday Peak - typical working day with morning/evening peaks
const weekdayPrices = [
  0.08, 0.07, 0.06, 0.06, 0.06, 0.07, // 00-05: overnight low
  0.09, 0.12, 0.15, 0.14, 0.13, 0.12, // 06-11: morning ramp
  0.11, 0.10, 0.11, 0.13, 0.15, 0.18, // 12-17: afternoon
  0.20, 0.22, 0.19, 0.15, 0.12, 0.10, // 18-23: evening peak then decline
];

const weekdayCarbon = [
  180, 170, 160, 155, 150, 155, // 00-05: low demand, moderate carbon
  180, 220, 250, 240, 220, 200, // 06-11: morning ramp, gas plants online
  190, 180, 170, 180, 200, 240, // 12-17: midday solar helps
  280, 300, 260, 220, 200, 190, // 18-23: evening peak, highest carbon
];

const weekdayGrid = [
  35, 30, 28, 27, 28, 32, // 00-05: overnight low
  45, 60, 75, 78, 76, 72, // 06-11: morning ramp
  68, 65, 67, 72, 78, 85, // 12-17: afternoon build
  92, 95, 88, 75, 60, 48, // 18-23: evening peak
];

// Scenario 2: Weekend Sun - sunny weekend with high solar production
const weekendSunPrices = [
  0.07, 0.06, 0.05, 0.05, 0.05, 0.06, // 00-05: overnight low
  0.07, 0.08, 0.06, 0.04, 0.03, 0.02, // 06-11: solar kicks in
  0.02, 0.03, 0.04, 0.05, 0.07, 0.10, // 12-17: midday solar abundance
  0.14, 0.16, 0.13, 0.10, 0.08, 0.07, // 18-23: evening moderate
];

const weekendSunCarbon = [
  170, 160, 150, 145, 140, 145, // 00-05: low demand
  150, 140, 100, 70, 50, 40, // 06-11: solar reduces carbon
  35, 40, 50, 70, 100, 150, // 12-17: solar peak
  200, 220, 190, 160, 150, 160, // 18-23: solar gone, higher carbon
];

const weekendSunGrid = [
  30, 25, 23, 22, 23, 27, // 00-05: overnight low
  35, 42, 48, 50, 52, 55, // 06-11: morning ramp
  58, 55, 52, 55, 60, 68, // 12-17: afternoon
  75, 78, 70, 58, 45, 35, // 18-23: evening moderate
];

// Scenario 3: Winter Evening - cold winter day with high evening demand
const winterPrices = [
  0.10, 0.09, 0.08, 0.08, 0.08, 0.09, // 00-05: overnight moderate
  0.12, 0.16, 0.19, 0.17, 0.15, 0.14, // 06-11: morning peak (heating)
  0.13, 0.12, 0.13, 0.16, 0.20, 0.25, // 12-17: afternoon build
  0.30, 0.32, 0.28, 0.22, 0.16, 0.12, // 18-23: evening super peak
];

const winterCarbon = [
  200, 190, 180, 175, 175, 185, // 00-05: moderate
  220, 260, 290, 280, 260, 240, // 06-11: morning ramp
  230, 220, 230, 260, 300, 350, // 12-17: less solar
  380, 400, 360, 300, 260, 220, // 18-23: highest carbon
];

const winterGrid = [
  45, 40, 38, 37, 38, 45, // 00-05: overnight
  58, 75, 88, 85, 80, 75, // 06-11: morning peak
  72, 70, 73, 80, 88, 95, // 12-17: afternoon
  100, 98, 92, 82, 68, 55, // 18-23: evening super peak
];

export const SCENARIOS: Scenario[] = [
  {
    id: "weekday-peak",
    name: "Weekday Peak",
    description: "Typical working day in Lisbon with morning and evening demand peaks",
    hourlyData: generateHourlyData(weekdayPrices, weekdayCarbon, weekdayGrid),
  },
  {
    id: "weekend-sun",
    name: "Sunny Weekend",
    description: "Weekend with high solar production - best for green charging",
    hourlyData: generateHourlyData(weekendSunPrices, weekendSunCarbon, weekendSunGrid),
  },
  {
    id: "winter-evening",
    name: "Winter Evening",
    description: "Cold winter day with high heating demand and evening peak",
    hourlyData: generateHourlyData(winterPrices, winterCarbon, winterGrid),
  },
];

export function getScenarioById(id: string): Scenario | undefined {
  return SCENARIOS.find((s) => s.id === id);
}

export function getDefaultScenario(): Scenario {
  return SCENARIOS[0];
}
