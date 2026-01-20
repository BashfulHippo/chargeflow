const stats = [
  { value: "50k", label: "EVs in Lisbon", sub: "Growing 30% yearly" },
  { value: "€2.1B", label: "Grid Upgrade Cost", sub: "That smart charging helps defer" },
];

export function Stats() {
  return (
    <section className="section-gap">
      <div className="container-narrow">
        <div className="card-elevated rounded-xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-heading mb-3">The Opportunity</h2>
              <p className="text-muted-foreground">
                Smart EV charging isn&apos;t just good for your wallet—it&apos;s essential for
                Lisbon&apos;s sustainable future.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</p>
                  <p className="font-medium text-sm mb-0.5">{stat.label}</p>
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
