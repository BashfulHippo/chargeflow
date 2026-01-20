"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { HourlyData } from "@/lib/types";
import { formatHour } from "@/lib/scheduler";

interface GridLoadChartProps {
  hourlyData: HourlyData[];
  adoptionCount: number;
}

export function GridLoadChart({ hourlyData, adoptionCount }: GridLoadChartProps) {
  const peakReductionFactor = Math.min(adoptionCount / 50000, 1) * 0.15;

  const chartData = hourlyData.map((data) => {
    let smartLoad = data.gridLoad;
    if (data.gridLoad > 70) {
      smartLoad = data.gridLoad * (1 - peakReductionFactor);
    } else if (data.gridLoad < 40) {
      smartLoad = data.gridLoad * (1 + peakReductionFactor * 0.3);
    }

    return {
      hour: formatHour(data.hour),
      baseline: data.gridLoad,
      smart: Math.round(smartLoad),
    };
  });

  return (
    <div className="h-72 w-full chart-container">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorBaseline" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--muted-foreground)" stopOpacity={0.2} />
              <stop offset="95%" stopColor="var(--muted-foreground)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorSmart" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="hour"
            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
            axisLine={{ stroke: "var(--border)" }}
            tickLine={false}
            interval={2}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
            axisLine={false}
            tickLine={false}
            domain={[0, 100]}
            tickFormatter={(v) => `${v}%`}
            width={40}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--card-border)",
              borderRadius: "8px",
              boxShadow: "var(--card-shadow)",
            }}
            formatter={(value, name) => [
              `${value}%`,
              name === "baseline" ? "Without ChargeFlow" : "With ChargeFlow",
            ]}
            cursor={{ stroke: "var(--border)" }}
          />
          <Legend
            formatter={(value) =>
              value === "baseline" ? "Without ChargeFlow" : "With ChargeFlow"
            }
            wrapperStyle={{ fontSize: 12 }}
          />
          <Area
            type="monotone"
            dataKey="baseline"
            stroke="var(--muted-foreground)"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorBaseline)"
          />
          <Area
            type="monotone"
            dataKey="smart"
            stroke="var(--primary)"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorSmart)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
