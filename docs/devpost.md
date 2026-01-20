# ChargeFlow - DevPost Submission

## Project Name
ChargeFlow

## Tagline
Charge smarter: cheapest, cleanest, grid-friendly EV charging—built for Lisbon.

## Inspiration
Every evening at 7 PM, tens of thousands of Lisbon residents plug in their EVs after work—all at the same time. This synchronized charging creates massive demand spikes that strain the grid, spike electricity prices, and ironically happen when the energy mix is dirtiest (evening gas peaker plants).

We asked: what if EVs could charge smarter? What if your car knew to wait for cheaper, cleaner electricity—without you having to think about it?

## What it does
ChargeFlow is a smart EV charging optimizer for Lisbon. Users enter:
- Their vehicle and battery capacity
- Current and target charge levels
- When they need their car ready

ChargeFlow then generates an optimal charging schedule that:
- **Minimizes cost** by charging during off-peak hours
- **Reduces carbon footprint** by targeting periods of high renewable energy
- **Supports grid stability** by avoiding peak demand periods

The app also includes a City Dashboard that visualizes the collective impact of smart charging adoption across Lisbon—showing peak load reduction, CO2 savings, and equivalent environmental benefits.

## How we built it
- **Frontend**: Next.js 14 with App Router, TypeScript, and Tailwind CSS
- **Visualization**: Recharts for interactive charts
- **Scheduling Algorithm**: Custom weighted scoring system that evaluates each hour based on price, carbon intensity, and grid load
- **Data**: Deterministic simulation based on real Portuguese OMIE market patterns and typical Lisbon grid demand curves

The architecture is fully client-side with no database—all calculations happen instantly in the browser for a responsive demo experience.

## Challenges we ran into
1. **Balancing realism with simplicity**: We wanted authentic Lisbon energy data but needed to keep the demo self-contained
2. **Algorithm tuning**: Finding the right weights for cost vs. carbon vs. grid impact required iteration
3. **UI/UX clarity**: Making complex energy concepts accessible without dumbing them down

## Accomplishments that we're proud of
- **Three-way value proposition**: Users save money AND reduce emissions AND help the grid
- **City-scale visualization**: The adoption slider creates a powerful "what if" moment
- **Lisbon-specific design**: Not a generic tool—built for Portuguese energy market realities
- **Clean, professional UI**: Avoided the "AI-generated" look with careful design system work

## What we learned
- Portugal has surprisingly high renewable penetration, but timing matters enormously
- The collective impact of individual EV charging decisions is massive at city scale
- Simple heuristic algorithms can be surprisingly effective vs. complex ML approaches

## What's next for ChargeFlow
1. **Real-time data integration**: Connect to actual OMIE prices and REN grid data
2. **Smart charger integration**: Partner with Wallbox, EVBox, or ChargePoint for automated scheduling
3. **Utility partnerships**: Work with EDP or E-REDES on demand response programs
4. **Expansion**: Adapt the model for Porto, then other European cities

## Built With
- Next.js
- TypeScript
- Tailwind CSS
- Recharts
- Vercel

## Try it out
[Live Demo URL]

## Team
[Team member names]

---

## Categories to Apply For
- **Ecological Transformation Award**: Core mission is reducing EV charging carbon footprint
- **Best Pitch**: Strong narrative with clear problem/solution/impact
- **Overall Winner**: Complete, polished solution with real-world applicability
