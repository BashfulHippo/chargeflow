// Core types for ChargeFlow

export interface HourlyData {
  hour: number; // 0-23
  price: number; // €/kWh
  carbonIntensity: number; // gCO2/kWh
  gridLoad: number; // 0-100% of capacity
}

export interface Scenario {
  id: string;
  name: string;
  description: string;
  hourlyData: HourlyData[];
}

export type ChargingPreference = "cheapest" | "greenest" | "balanced";

export interface ChargingInput {
  batteryCapacity: number; // kWh
  currentCharge: number; // percentage 0-100
  targetCharge: number; // percentage 0-100
  deadlineHour: number; // hour of day (0-23)
  preference: ChargingPreference;
  scenarioId: string;
}

export interface ScheduleHour {
  hour: number;
  kWh: number;
  price: number;
  carbonIntensity: number;
  gridLoad: number;
  cost: number; // €
  carbon: number; // gCO2
}

export interface ScheduleResult {
  schedule: ScheduleHour[];
  totalKwh: number;
  totalCost: number;
  totalCarbon: number;
  baseline: {
    cost: number;
    carbon: number;
  };
  savings: {
    cost: number;
    costPercent: number;
    carbon: number;
    carbonPercent: number;
  };
  startHour: number;
  endHour: number;
}

export interface CityImpact {
  driversCount: number;
  peakReductionMW: number;
  co2AvoidedTonnes: number;
  gridSavingsEuros: number;
  equivalentTrees: number;
}

// Vehicle presets for demo
export interface VehiclePreset {
  name: string;
  batteryCapacity: number;
}

export const VEHICLE_PRESETS: VehiclePreset[] = [
  { name: "Tesla Model 3", batteryCapacity: 60 },
  { name: "Tesla Model Y", batteryCapacity: 75 },
  { name: "VW ID.4", batteryCapacity: 77 },
  { name: "Renault Zoe", batteryCapacity: 52 },
  { name: "Nissan Leaf", batteryCapacity: 40 },
  { name: "BMW iX3", batteryCapacity: 80 },
];

// Demo defaults
export const DEMO_DEFAULTS: ChargingInput = {
  batteryCapacity: 60, // Tesla Model 3
  currentCharge: 20,
  targetCharge: 80,
  deadlineHour: 8, // 8 AM next day
  preference: "balanced",
  scenarioId: "weekday-peak",
};
