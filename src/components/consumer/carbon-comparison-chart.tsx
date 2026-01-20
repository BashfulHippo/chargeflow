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

interface CarbonComparisonChartProps {
  optimizedCarbon: number;
  baselineCarbon: number;
}

export function CarbonComparisonChart({
  optimizedCarbon,
  baselineCarbon,
}: CarbonComparisonChartProps) {
  const data = [
    { name: "Immediate", carbon: baselineCarbon / 1000, label: "Charge Now" },
    { name: "ChargeFlow", carbon: optimizedCarbon / 1000, label: "Optimized" },
  ];

  const savings = (baselineCarbon - optimizedCarbon) / 1000;
  const savingsPercent = baselineCarbon > 0 ? ((savings / (baselineCarbon / 1000)) * 100).toFixed(0) : "0";

  return (
    <div className="space-y-3">
      <div className="h-28 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 0, right: 16, left: 0, bottom: 0 }}
          >
            <XAxis
              type="number"
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              tickFormatter={(v) => `${v.toFixed(1)} kg`}
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
                backgroundColor: "var(--card)",
                border: "1px solid var(--card-border)",
                borderRadius: "8px",
                boxShadow: "var(--card-shadow)",
              }}
              formatter={(value) => [`${Number(value).toFixed(2)} kg CO2`, "Emissions"]}
              cursor={{ fill: "var(--accent)" }}
            />
            <Bar dataKey="carbon" radius={[0, 4, 4, 0]}>
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
        <span className="text-primary font-semibold">Save {savings.toFixed(2)} kg CO2</span>
        <span className="text-muted-foreground"> ({savingsPercent}% cleaner)</span>
      </p>
    </div>
  );
}
