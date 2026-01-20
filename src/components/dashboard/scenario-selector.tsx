"use client";

import { Scenario } from "@/lib/types";

interface ScenarioSelectorProps {
  scenarios: Scenario[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function ScenarioSelector({
  scenarios,
  selectedId,
  onSelect,
}: ScenarioSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {scenarios.map((scenario) => {
        const isSelected = selectedId === scenario.id;
        return (
          <button
            key={scenario.id}
            onClick={() => onSelect(scenario.id)}
            className={`text-left p-4 rounded-lg border transition-all focus:outline-none ${
              isSelected
                ? "border-primary bg-primary/10"
                : "border-card-border bg-card hover:border-primary/30 hover:bg-secondary/50"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className={`w-2.5 h-2.5 rounded-full ${
                  isSelected ? "bg-primary" : "bg-muted-foreground"
                }`}
              />
              <h3 className="font-medium">{scenario.name}</h3>
            </div>
            <p className="text-small text-muted-foreground leading-relaxed">
              {scenario.description}
            </p>
          </button>
        );
      })}
    </div>
  );
}
