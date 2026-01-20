"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select } from "@/components/ui/select";
import {
  ChargingInput,
  ChargingPreference,
  VEHICLE_PRESETS,
  DEMO_DEFAULTS,
} from "@/lib/types";
import { SCENARIOS } from "@/lib/scenarios";

interface ChargingFormProps {
  onSubmit: (input: ChargingInput) => void;
  isLoading?: boolean;
  demoMode?: boolean;
  onToggleDemo?: () => void;
}

export function ChargingForm({ onSubmit, isLoading = false, demoMode = false, onToggleDemo }: ChargingFormProps) {
  const [batteryCapacity, setBatteryCapacity] = useState(
    demoMode ? DEMO_DEFAULTS.batteryCapacity : 60
  );
  const [currentCharge, setCurrentCharge] = useState(
    demoMode ? DEMO_DEFAULTS.currentCharge : 30
  );
  const [targetCharge, setTargetCharge] = useState(
    demoMode ? DEMO_DEFAULTS.targetCharge : 80
  );
  const [deadlineHour, setDeadlineHour] = useState(
    demoMode ? DEMO_DEFAULTS.deadlineHour : 8
  );
  const [preference, setPreference] = useState<ChargingPreference>(
    demoMode ? DEMO_DEFAULTS.preference : "balanced"
  );
  const [scenarioId, setScenarioId] = useState(
    demoMode ? DEMO_DEFAULTS.scenarioId : "weekday-peak"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      batteryCapacity,
      currentCharge,
      targetCharge,
      deadlineHour,
      preference,
      scenarioId,
    });
  };

  const handleVehicleSelect = (capacity: string) => {
    setBatteryCapacity(Number(capacity));
  };

  const resetToDemo = () => {
    setBatteryCapacity(DEMO_DEFAULTS.batteryCapacity);
    setCurrentCharge(DEMO_DEFAULTS.currentCharge);
    setTargetCharge(DEMO_DEFAULTS.targetCharge);
    setDeadlineHour(DEMO_DEFAULTS.deadlineHour);
    setPreference(DEMO_DEFAULTS.preference);
    setScenarioId(DEMO_DEFAULTS.scenarioId);
  };

  const kwhNeeded = ((targetCharge - currentCharge) / 100) * batteryCapacity;

  const vehicleOptions = VEHICLE_PRESETS.map((v) => ({
    value: String(v.batteryCapacity),
    label: `${v.name} (${v.batteryCapacity} kWh)`,
  }));

  const scenarioOptions = SCENARIOS.map((s) => ({
    value: s.id,
    label: s.name,
  }));

  const deadlineOptions = Array.from({ length: 24 }, (_, i) => ({
    value: String(i),
    label: `${i.toString().padStart(2, "0")}:00`,
  }));

  const preferenceOptions = [
    { value: "cheapest", label: "Cheapest" },
    { value: "greenest", label: "Greenest" },
    { value: "balanced", label: "Balanced" },
  ];

  return (
    <Card className="sticky top-20">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>Plan Your Charge</CardTitle>
            <CardDescription>
              {demoMode
                ? "Pre-filled with a realistic Lisbon scenario. You can edit any value."
                : "Enter your charging preferences below."
              }
            </CardDescription>
          </div>
          {demoMode && (
            <Button variant="ghost" size="sm" onClick={resetToDemo} className="text-xs text-muted-foreground">
              Reset
            </Button>
          )}
        </div>
        {onToggleDemo && (
          <button
            onClick={onToggleDemo}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors mt-2 underline underline-offset-2"
          >
            {demoMode ? "Use my own data" : "Use sample data"}
          </button>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <Select
            id="vehicle"
            label="Vehicle"
            options={vehicleOptions}
            value={String(batteryCapacity)}
            onChange={(e) => handleVehicleSelect(e.target.value)}
          />

          <Slider
            id="currentCharge"
            label="Current Level"
            min={0}
            max={100}
            value={currentCharge}
            onChange={(e) => setCurrentCharge(Number(e.target.value))}
            unit="%"
          />

          <Slider
            id="targetCharge"
            label="Target Level"
            min={0}
            max={100}
            value={targetCharge}
            onChange={(e) => setTargetCharge(Number(e.target.value))}
            unit="%"
          />

          <div className="bg-secondary rounded-lg p-3 text-sm flex justify-between items-center">
            <span className="text-muted-foreground">Energy needed</span>
            <span className="font-semibold">{kwhNeeded.toFixed(1)} kWh</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Select
              id="deadline"
              label="Ready By"
              options={deadlineOptions}
              value={String(deadlineHour)}
              onChange={(e) => setDeadlineHour(Number(e.target.value))}
            />
            <Select
              id="preference"
              label="Priority"
              options={preferenceOptions}
              value={preference}
              onChange={(e) => setPreference(e.target.value as ChargingPreference)}
            />
          </div>

          <Select
            id="scenario"
            label="Scenario"
            options={scenarioOptions}
            value={scenarioId}
            onChange={(e) => setScenarioId(e.target.value)}
          />

          <Button type="submit" size="lg" className="w-full" disabled={isLoading || currentCharge >= targetCharge}>
            {isLoading ? "Optimizing..." : "Generate Schedule"}
          </Button>

          {currentCharge >= targetCharge && (
            <p className="text-small text-destructive text-center">
              Target must be higher than current
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
