"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/header";
import { ChargingInput, ScheduleResult, DEMO_DEFAULTS } from "@/lib/types";
import { generateSchedule } from "@/lib/scheduler";
import { FormSkeleton, ChartSkeleton, MetricsSkeleton } from "@/components/ui/skeleton";

// Dynamic imports for chart-heavy components
const ChargingForm = dynamic(
  () => import("@/components/consumer/charging-form").then((mod) => mod.ChargingForm),
  { loading: () => <FormSkeleton />, ssr: false }
);

const ScheduleResults = dynamic(
  () => import("@/components/consumer/schedule-results").then((mod) => mod.ScheduleResults),
  {
    loading: () => (
      <div className="space-y-6">
        <MetricsSkeleton />
        <ChartSkeleton />
      </div>
    ),
    ssr: false
  }
);

export default function ConsumerPage() {
  const [demoMode, setDemoMode] = useState(true);
  const [result, setResult] = useState<ScheduleResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleDemo = () => {
    setDemoMode(!demoMode);
    setResult(null);
  };

  const handleSubmit = async (input: ChargingInput) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 200));
    const scheduleResult = generateSchedule(input);
    setResult(scheduleResult);
    setIsLoading(false);
  };

  useEffect(() => {
    if (demoMode && !result) {
      const demoResult = generateSchedule(DEMO_DEFAULTS);
      setResult(demoResult);
    }
  }, [demoMode, result]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-8">
        <div className="container-narrow">
          <div className="mb-8">
            <h1 className="text-heading mb-2">Smart EV Charging</h1>
            <p className="text-muted-foreground">
              Find the optimal time to charge—save money and reduce emissions.
            </p>
          </div>

          <div className="grid lg:grid-cols-[340px_1fr] gap-8">
            <div>
              <ChargingForm
                onSubmit={handleSubmit}
                isLoading={isLoading}
                demoMode={demoMode}
                onToggleDemo={handleToggleDemo}
              />
            </div>

            <div>
              {result ? (
                <ScheduleResults result={result} />
              ) : (
                <div className="flex items-center justify-center h-64 bg-card rounded-lg border border-card-border">
                  <p className="text-muted-foreground">
                    Configure your charge to see the optimized schedule
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
