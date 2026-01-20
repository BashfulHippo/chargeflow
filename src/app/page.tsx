import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Stats } from "@/components/landing/stats";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <Hero />
        <Features />
        <Stats />

        {/* CTA Section */}
        <section className="section-gap bg-card border-y border-card-border">
          <div className="container-narrow text-center">
            <h2 className="text-heading mb-3">
              Ready to charge smarter?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Join Lisbon EV drivers saving money and reducing emissions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/consumer">
                <Button size="lg" variant="primary">
                  Start Saving Now
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline">
                  Explore Impact
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-card-border">
          <div className="container-narrow">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-primary-foreground"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                    />
                  </svg>
                </div>
                <span className="font-medium text-sm">ChargeFlow</span>
              </div>
              <p className="text-small text-muted-foreground">
                TecStorm&apos;26 Hackathon — Lisbon
              </p>
              <div className="flex items-center gap-6 text-small text-muted-foreground">
                <Link href="/consumer" className="hover:text-foreground transition-colors">
                  Plan Charge
                </Link>
                <Link href="/dashboard" className="hover:text-foreground transition-colors">
                  Dashboard
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
