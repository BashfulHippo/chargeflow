"use client";

import { InputHTMLAttributes, forwardRef } from "react";

interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  showValue?: boolean;
  unit?: string;
}

const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ className = "", label, showValue = true, unit = "", id, value, ...props }, ref) => {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          {label && (
            <label htmlFor={id} className="text-sm font-medium">
              {label}
            </label>
          )}
          {showValue && (
            <span className="text-sm font-semibold text-primary tabular-nums">
              {value}
              {unit}
            </span>
          )}
        </div>
        <input
          ref={ref}
          id={id}
          type="range"
          value={value}
          className={`slider-input w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer ${className}`}
          {...props}
        />
      </div>
    );
  }
);

Slider.displayName = "Slider";

export { Slider };
