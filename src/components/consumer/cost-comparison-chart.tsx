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

interface CostComparisonChartProps {
  optimizedCost: number;
  baselineCost: number;
}

export function CostComparisonChart({
  optimizedCost,
  baselineCost,
}: CostComparisonChartProps) {
  const data = [
    { name: "Immediate", cost: baselineCost, label: "Charge Now" },
    { name: "ChargeFlow", cost: optimizedCost, label: "Optimized" },
  ];

  const savings = baselineCost - optimizedCost;
  const savingsPercent = baselineCost > 0 ? ((savings / baselineCost) * 100).toFixed(0) : "0";

  return (
    <div className="space-y-3">
      <div className="h-28 w-full outline-none" tabIndex={-1}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 0, right: 16, left: 0, bottom: 0 }}
          >
            <XAxis
              type="number"
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              tickFormatter={(v) => `€${v.toFixed(2)}`}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="label"
              tick={{ fontSize: 12, fill: "var(--foreground)" }}
              width={80}
              axisLine={false}
              tickLine={false}
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
              formatter={(value) => [`€${Number(value).toFixed(2)}`, "Cost"]}
              cursor={{ fill: "var(--accent)" }}
            />
            <Bar dataKey="cost" radius={[0, 4, 4, 0]}>
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === 1 ? "var(--primary)" : "var(--muted-foreground)"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-center text-sm">
        <span className="text-primary font-semibold">Save €{savings.toFixed(2)}</span>
        <span className="text-muted-foreground"> ({savingsPercent}% less)</span>
      </p>
    </div>
  );
}
