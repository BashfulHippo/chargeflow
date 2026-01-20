import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="pt-12 pb-16 md:pt-16 md:pb-24">
      <div className="container-narrow">
        {/* Two-column layout on desktop */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div>
            <div className="inline-flex items-center gap-2 bg-accent rounded-full px-3 py-1.5 text-small font-medium text-accent-foreground mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Built for Lisbon
            </div>

            <h1 className="text-display mb-4">
              Smart EV charging that{" "}
              <span className="text-primary">saves money</span> and the planet
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Find the optimal time to charge—cheaper, cleaner, grid-friendly. Automatically.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Link href="/consumer">
                <Button size="lg">
                  Plan My Charge
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" size="lg">
                  View City Impact
                </Button>
              </Link>
            </div>

            <p className="text-small text-muted-foreground">
              No hardware needed. Works with any EV.
            </p>
          </div>

          {/* Right: KPI Card */}
          <div className="card-hero p-8">
            <p className="text-small text-muted-foreground uppercase tracking-wider mb-6">
              Average Savings with ChargeFlow
            </p>
            <div className="grid grid-cols-3 gap-6">
              {[
                { value: "40%", label: "Cost Savings", sub: "per charge" },
                { value: "15%", label: "Less CO2", sub: "emissions" },
                { value: "12MW", label: "Peak Reduced", sub: "city-wide" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-primary mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm font-medium mb-0.5">{stat.label}</p>
                  <p className="text-small text-muted-foreground">{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
