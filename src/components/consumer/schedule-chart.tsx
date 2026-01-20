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
    <div className="h-56 w-full outline-none" tabIndex={-1}>
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
              backgroundColor: "#141414",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: "8px",
              boxShadow: "0 6px 18px rgba(0, 0, 0, 0.55)",
            }}
            labelStyle={{ color: "#888888" }}
            itemStyle={{ color: "#22c55e" }}
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
