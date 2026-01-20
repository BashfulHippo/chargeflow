"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { calculateCityImpact } from "@/lib/city-simulator";
import { SCENARIOS, getScenarioById } from "@/lib/scenarios";
import { Skeleton, MetricsSkeleton, CardSkeleton } from "@/components/ui/skeleton";

// Dynamic imports for chart-heavy components
const AdoptionSlider = dynamic(
  () => import("@/components/dashboard/adoption-slider").then((mod) => mod.AdoptionSlider),
  {
    loading: () => (
      <div className="card-hero p-6 md:p-8">
        <div className="space-y-6">
          <div className="text-center">
            <Skeleton className="h-4 w-64 mx-auto mb-4" />
            <Skeleton className="h-16 w-40 mx-auto mb-2" />
            <Skeleton className="h-4 w-20 mx-auto" />
          </div>
          <Skeleton className="h-2 w-full rounded-full" />
        </div>
      </div>
    ),
    ssr: false
  }
);

const ImpactMetrics = dynamic(
  () => import("@/components/dashboard/impact-metrics").then((mod) => mod.ImpactMetrics),
  { loading: () => <MetricsSkeleton />, ssr: false }
);

const GridLoadChart = dynamic(
  () => import("@/components/dashboard/grid-load-chart").then((mod) => mod.GridLoadChart),
  { loading: () => <Skeleton className="h-72 w-full" />, ssr: false }
);

const ScenarioSelector = dynamic(
  () => import("@/components/dashboard/scenario-selector").then((mod) => mod.ScenarioSelector),
  {
    loading: () => (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    ),
    ssr: false
  }
);

export default function DashboardPage() {
  const [adoptionCount, setAdoptionCount] = useState(5000);
  const [scenarioId, setScenarioId] = useState("weekday-peak");

  const impact = useMemo(
    () => calculateCityImpact(adoptionCount, scenarioId),
    [adoptionCount, scenarioId]
  );

  const scenario = getScenarioById(scenarioId) || SCENARIOS[0];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-8">
        <div className="container-narrow">
          <div className="mb-8">
            <h1 className="text-heading mb-2">City Impact Dashboard</h1>
            <p className="text-muted-foreground">
              See how smart charging at scale transforms Lisbon&apos;s grid.
            </p>
          </div>

          <div className="space-y-8">
            <AdoptionSlider value={adoptionCount} onChange={setAdoptionCount} />

            <ImpactMetrics impact={impact} />

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Grid Load Profile</CardTitle>
                <CardDescription>
                  How ChargeFlow smooths demand peaks across a typical Lisbon day
                </CardDescription>
              </CardHeader>
              <CardContent>
                <GridLoadChart
                  hourlyData={scenario.hourlyData}
                  adoptionCount={adoptionCount}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Grid Scenario</CardTitle>
                <CardDescription>
                  Explore different energy scenarios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScenarioSelector
                  scenarios={SCENARIOS}
                  selectedId={scenarioId}
                  onSelect={setScenarioId}
                />
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "For EDP & E-REDES",
                  text: `Reduce peak demand by ${impact.peakReductionMW.toFixed(1)} MW, deferring grid upgrades. EVs become flexible assets.`,
                },
                {
                  title: "For Lisbon Municipality",
                  text: `${impact.co2AvoidedTonnes.toLocaleString()} tonnes CO2 avoided annually—like ${impact.equivalentTrees.toLocaleString()} trees in Monsanto Park.`,
                },
                {
                  title: "For EV Drivers",
                  text: "Save up to 40% on charging. No hardware needed—just plug in and ChargeFlow optimizes.",
                },
              ].map((item) => (
                <Card key={item.title} className="p-5">
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-small text-muted-foreground leading-relaxed">
                    {item.text}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
