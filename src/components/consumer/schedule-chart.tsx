"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { ScheduleHour } from "@/lib/types";
import { formatHour } from "@/lib/scheduler";

interface ScheduleChartProps {
  schedule: ScheduleHour[];
  startHour: number;
}

export function ScheduleChart({ schedule, startHour }: ScheduleChartProps) {
  const chartData = Array.from({ length: 24 }, (_, i) => {
    const hour = (startHour + i) % 24;
    const scheduleHour = schedule.find((s) => s.hour === hour);
    return {
      hour: formatHour(hour),
      rawHour: hour,
      kWh: scheduleHour?.kWh || 0,
      isCharging: !!scheduleHour,
    };
  }).slice(0, 12);

  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <XAxis
            dataKey="hour"
            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
            axisLine={{ stroke: "var(--border)" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
            axisLine={false}
            tickLine={false}
            width={40}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--card-border)",
              borderRadius: "8px",
              boxShadow: "var(--card-shadow)",
            }}
            formatter={(value) => [`${Number(value).toFixed(1)} kWh`, "Charging"]}
            labelFormatter={(label) => `Time: ${label}`}
            cursor={{ fill: "var(--accent)" }}
          />
          <Bar dataKey="kWh" radius={[4, 4, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.isCharging ? "var(--primary)" : "var(--muted)"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
