import { Header } from "@/components/layout/header";
import { ChartSkeleton, MetricsSkeleton, CardSkeleton, Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="container-narrow">
          <div className="mb-8">
            <div className="h-8 w-64 bg-muted rounded animate-pulse mb-2" />
            <div className="h-4 w-80 bg-muted rounded animate-pulse" />
          </div>

          <div className="space-y-8">
            {/* Adoption Slider Skeleton */}
            <div className="card-hero p-6 md:p-8">
              <div className="space-y-6">
                <div className="text-center">
                  <Skeleton className="h-4 w-64 mx-auto mb-4" />
                  <Skeleton className="h-16 w-40 mx-auto mb-2" />
                  <Skeleton className="h-4 w-20 mx-auto" />
                </div>
                <Skeleton className="h-2 w-full rounded-full" />
                <div className="flex justify-between">
                  <Skeleton className="h-3 w-8" />
                  <Skeleton className="h-3 w-10" />
                </div>
              </div>
            </div>

            <MetricsSkeleton />
            <ChartSkeleton />

            {/* Scenario Selector Skeleton */}
            <div className="bg-card border border-card-border rounded-lg p-6 shadow-card">
              <Skeleton className="h-5 w-32 mb-2" />
              <Skeleton className="h-4 w-48 mb-6" />
              <div className="grid md:grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            </div>

            {/* Info Cards Skeleton */}
            <div className="grid md:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
