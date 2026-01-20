# ChargeFlow

**Charge smarter: cheapest, cleanest, grid-friendly EV charging—built for Lisbon.**

ChargeFlow is a smart EV charging optimizer that helps drivers save money, reduce their carbon footprint, and support grid stability. Built for the TecStorm'26 Hackathon.

## Features

- **Smart Scheduling**: Optimizes charging times based on electricity prices, carbon intensity, and grid load
- **Three Optimization Modes**: Cheapest, Greenest, or Balanced
- **Lisbon-Specific**: Built for Portuguese energy market with realistic OMIE price patterns
- **City Impact Dashboard**: Visualize the collective impact of smart charging adoption
- **Demo Mode**: Pre-configured scenarios for easy demonstration

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Recharts

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/chargeflow.git
cd chargeflow

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
chargeflow/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── page.tsx         # Landing page
│   │   ├── consumer/        # Consumer charging page
│   │   ├── dashboard/       # City impact dashboard
│   │   └── api/             # API routes
│   ├── components/          # React components
│   │   ├── ui/              # Design system components
│   │   ├── layout/          # Layout components
│   │   ├── consumer/        # Consumer page components
│   │   ├── dashboard/       # Dashboard components
│   │   └── landing/         # Landing page components
│   └── lib/                 # Core logic
│       ├── types.ts         # TypeScript interfaces
│       ├── scenarios.ts     # Lisbon energy scenarios
│       ├── scheduler.ts     # Scheduling algorithm
│       └── city-simulator.ts # City impact calculations
└── docs/                    # Documentation
    ├── pitch.md             # 90-second pitch script
    ├── demo.md              # Demo walkthrough
    ├── devpost.md           # Submission copy
    ├── judge-notes.md       # Why this wins
    └── assumptions.md       # Technical assumptions
```

## How It Works

### Scheduling Algorithm

ChargeFlow uses a weighted scoring algorithm to rank each hour:

```
score = (priceWeight × normalizedPrice) +
        (carbonWeight × normalizedCarbon) +
        (gridWeight × normalizedGridLoad)
```

Lower scores indicate better charging hours. The algorithm:
1. Calculates total kWh needed
2. Scores each available hour
3. Allocates charging to the lowest-scored hours first
4. Respects the user's deadline constraint

### Weights by Preference

| Preference | Price | Carbon | Grid |
|------------|-------|--------|------|
| Cheapest   | 70%   | 20%    | 10%  |
| Greenest   | 10%   | 70%    | 20%  |
| Balanced   | 40%   | 40%    | 20%  |

## Demo Mode

Demo mode pre-fills realistic values:
- Vehicle: Tesla Model 3 (60 kWh battery)
- Current charge: 20%
- Target charge: 80%
- Deadline: 8:00 AM
- Scenario: Weekday Peak

## License

MIT

## Team

Built for TecStorm'26 Hackathon — Lisbon, Portugal
