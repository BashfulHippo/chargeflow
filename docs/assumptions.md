# ChargeFlow - Technical Assumptions

## Data Assumptions

### Electricity Prices
- Based on Portuguese OMIE day-ahead market patterns
- Range: €0.02 - €0.32 per kWh
- Peak hours: 18:00-22:00 (highest prices)
- Off-peak hours: 02:00-06:00 (lowest prices)
- Source pattern: Real OMIE historical averages, simplified for demo

### Carbon Intensity
- Based on Portuguese grid generation mix
- Range: 35 - 400 gCO2/kWh
- Lowest: Midday on sunny days (high solar)
- Highest: Evening peak (gas peaker plants)
- Portugal's high renewable penetration (60%+) creates significant daily variation

### Grid Load
- Based on typical Portuguese demand curves from REN
- Range: 22% - 100% of capacity
- Peak: 18:00-21:00 (evening return home)
- Valley: 03:00-05:00 (overnight minimum)
- Weekend loads are ~15-20% lower than weekday

---

## Scenario Assumptions

### Weekday Peak
- Typical working day demand pattern
- Morning ramp (07:00-10:00)
- Midday plateau (10:00-17:00)
- Evening peak (18:00-21:00)
- Overnight valley (00:00-06:00)

### Sunny Weekend
- Reduced overall demand (no commercial load)
- Strong solar production midday
- Negative pricing possible at solar peak
- Lowest carbon intensity of all scenarios

### Winter Evening
- Higher baseline demand (heating)
- Sharper evening peak
- Less solar contribution
- Higher prices and carbon across the board

---

## Algorithm Assumptions

### Charging Rate
- Default: 7.4 kW (standard Level 2 home charger)
- This represents typical European home charging (32A single-phase)
- Tesla Wall Connector, Wallbox Pulsar, etc.

### Scheduling Window
- Assumes user plugs in around 20:00 (evening arrival home)
- Default deadline: 08:00 next morning (12-hour window)
- Algorithm has flexibility to choose best hours within window

### Weight Configuration
| Preference | Price | Carbon | Grid |
|------------|-------|--------|------|
| Cheapest | 70% | 20% | 10% |
| Greenest | 10% | 70% | 20% |
| Balanced | 40% | 40% | 20% |

### Baseline Comparison
- "Immediate charging" baseline assumes user starts charging at plug-in time
- Charges continuously at 7.4 kW until target reached
- This represents typical unoptimized behavior

---

## City Impact Assumptions

### EV Population
- Greater Lisbon: ~50,000 registered EVs (2024 estimate)
- Growing ~30% YoY
- Average daily charging need: 10 kWh per vehicle

### Peak Reduction Calculation
- Assumes 60% of charging load can be shifted off-peak
- Peak window: 4 hours (18:00-22:00)
- Formula: (drivers × daily_kwh × shift_factor) / 4h / 1000 = MW

### CO2 Calculation
- Average carbon reduction: 15% through smart timing
- Annual calculation: daily savings × 365 days
- Trees equivalent: 45 trees per tonne CO2/year

### Grid Savings
- Price differential: ~€0.12/kWh average peak vs off-peak
- Formula: drivers × shifted_kwh × price_diff × 365

---

## Limitations & Caveats

### What This Demo Does NOT Model
1. Real-time price volatility (uses day-ahead patterns)
2. Weather forecast integration
3. User behavior variations
4. Charger hardware constraints
5. Utility demand response events
6. Vehicle-to-grid (V2G) scenarios

### Simplifications Made
1. All scenarios are 24-hour cycles (no multi-day modeling)
2. Charging rate is constant (no battery curve modeling)
3. All users have home charging (no public charger modeling)
4. Grid capacity is percentage-based (no absolute MW values)

### Production Requirements
For a real deployment, ChargeFlow would need:
1. Real-time OMIE API integration
2. REN grid data feeds
3. Weather forecast API (for solar prediction)
4. Smart charger API integrations (OCPP, proprietary)
5. User authentication and data persistence
6. Utility partnership for demand response signals
