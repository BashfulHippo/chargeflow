"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MetricCard } from "@/components/ui/metric-card";
import { ScheduleResult } from "@/lib/types";
import { formatHour } from "@/lib/scheduler";
import { ScheduleChart } from "./schedule-chart";
import { CostComparisonChart } from "./cost-comparison-chart";
import { CarbonComparisonChart } from "./carbon-comparison-chart";

interface ScheduleResultsProps {
  result: ScheduleResult;
}

export function ScheduleResults({ result }: ScheduleResultsProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="space-y-6">
      {/* Summary Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Energy"
          value={result.totalKwh.toFixed(1)}
          unit="kWh"
        />
        <MetricCard
          title="Total Cost"
          value={`€${result.totalCost.toFixed(2)}`}
          description={`Save €${result.savings.cost.toFixed(2)}`}
        />
        <MetricCard
          title="CO2 Emissions"
          value={(result.totalCarbon / 1000).toFixed(2)}
          unit="kg"
          description={`Save ${(result.savings.carbon / 1000).toFixed(2)} kg`}
        />
        <MetricCard
          title="Charging Hours"
          value={result.schedule.length}
          unit="hours"
        />
      </div>

      {/* Schedule Chart */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Charging Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="chart-container">
            <ScheduleChart schedule={result.schedule} startHour={result.startHour} />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {result.schedule.map((hour) => (
              <span
                key={hour.hour}
                className="inline-flex items-center bg-accent text-accent-foreground rounded-md px-2.5 py-1 text-small font-medium"
              >
                {formatHour(hour.hour)} — {hour.kWh.toFixed(1)} kWh
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Comparison Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Cost Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <CostComparisonChart
              optimizedCost={result.totalCost}
              baselineCost={result.baseline.cost}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Carbon Reduction</CardTitle>
          </CardHeader>
          <CardContent>
            <CarbonComparisonChart
              optimizedCarbon={result.totalCarbon}
              baselineCarbon={result.baseline.carbon}
            />
          </CardContent>
        </Card>
      </div>

      {/* Collapsible Detailed Table */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Schedule Details</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
              className="text-small"
            >
              {showDetails ? "Hide" : "Show"}
            </Button>
          </div>
        </CardHeader>
        {showDetails && (
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-card-border">
                    <th className="text-left py-2.5 px-3 font-medium text-muted-foreground">Time</th>
                    <th className="text-right py-2.5 px-3 font-medium text-muted-foreground">Energy</th>
                    <th className="text-right py-2.5 px-3 font-medium text-muted-foreground">Price</th>
                    <th className="text-right py-2.5 px-3 font-medium text-muted-foreground">Cost</th>
                    <th className="text-right py-2.5 px-3 font-medium text-muted-foreground">CO2</th>
                    <th className="text-right py-2.5 px-3 font-medium text-muted-foreground">Grid</th>
                  </tr>
                </thead>
                <tbody>
                  {result.schedule.map((hour) => (
                    <tr key={hour.hour} className="border-b border-card-border/50 last:border-0">
                      <td className="py-2.5 px-3 font-medium">{formatHour(hour.hour)}</td>
                      <td className="text-right py-2.5 px-3 tabular-nums">{hour.kWh.toFixed(1)} kWh</td>
                      <td className="text-right py-2.5 px-3 tabular-nums">€{hour.price.toFixed(3)}</td>
                      <td className="text-right py-2.5 px-3 tabular-nums">€{hour.cost.toFixed(2)}</td>
                      <td className="text-right py-2.5 px-3 tabular-nums">{hour.carbon} g</td>
                      <td className="text-right py-2.5 px-3">
                        <span
                          className={`tabular-nums ${
                            hour.gridLoad > 75
                              ? "text-red-400"
                              : hour.gridLoad > 50
                              ? "text-yellow-400"
                              : "text-primary"
                          }`}
                        >
                          {hour.gridLoad}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-secondary/50 font-medium">
                    <td className="py-2.5 px-3">Total</td>
                    <td className="text-right py-2.5 px-3 tabular-nums">{result.totalKwh.toFixed(1)} kWh</td>
                    <td className="text-right py-2.5 px-3">—</td>
                    <td className="text-right py-2.5 px-3 tabular-nums">€{result.totalCost.toFixed(2)}</td>
                    <td className="text-right py-2.5 px-3 tabular-nums">{(result.totalCarbon / 1000).toFixed(2)} kg</td>
                    <td className="text-right py-2.5 px-3">—</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
