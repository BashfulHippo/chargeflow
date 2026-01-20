"use client";

import { Slider } from "@/components/ui/slider";

interface AdoptionSliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function AdoptionSlider({
  value,
  onChange,
  min = 100,
  max = 50000,
}: AdoptionSliderProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(num >= 10000 ? 0 : 1)}k`;
    }
    return num.toString();
  };

  return (
    <div className="card-hero p-6 md:p-8">
      <div className="space-y-6">
        <div className="text-center">
          <p className="text-small text-muted-foreground mb-2">
            What if this many Lisbon drivers used ChargeFlow?
          </p>
          <p className="text-5xl md:text-6xl font-bold text-primary tabular-nums">
            {value.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground mt-1">EV drivers</p>
        </div>

        <Slider
          id="adoption"
          min={min}
          max={max}
          step={100}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          showValue={false}
        />

        <div className="flex justify-between text-small text-muted-foreground">
          <span>{formatNumber(min)}</span>
          <span>{formatNumber(max)}</span>
        </div>
      </div>
    </div>
  );
}
