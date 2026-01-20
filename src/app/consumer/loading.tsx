import { Header } from "@/components/layout/header";
import { FormSkeleton, ChartSkeleton, MetricsSkeleton } from "@/components/ui/skeleton";

export default function ConsumerLoading() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="container-narrow">
          <div className="mb-8">
            <div className="h-8 w-64 bg-muted rounded animate-pulse mb-2" />
            <div className="h-4 w-96 bg-muted rounded animate-pulse" />
          </div>

          <div className="grid lg:grid-cols-[400px,1fr] gap-8">
            <FormSkeleton />
            <div className="space-y-6">
              <MetricsSkeleton />
              <ChartSkeleton />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
