import { ReactNode } from "react";

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  description?: string;
  icon?: ReactNode;
  className?: string;
}

export function MetricCard({
  title,
  value,
  unit,
  description,
  icon,
  className = "",
}: MetricCardProps) {
  return (
    <div
      className={`bg-card border border-card-border rounded-lg p-5 shadow-card ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs text-muted-foreground mb-1 leading-tight">{title}</p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold tracking-tight">{value}</span>
            {unit && <span className="text-small text-muted-foreground">{unit}</span>}
          </div>
          {description && (
            <p className="text-small text-primary mt-1">{description}</p>
          )}
        </div>
        {icon && (
          <div className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground flex-shrink-0 opacity-60">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
