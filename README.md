# Global Nuclear Infrastructure Atlas

A governance-grade infrastructure mapping platform for 440+ civilian nuclear facilities worldwide. Part of the **Faultline** strategic infrastructure suite.

**Live:** [globalnuclearinfrastructureatlas.vercel.app](https://globalnuclearinfrastructureatlas.vercel.app)

## Analytical Framework

The Atlas enriches each facility with governance, safeguards, post-Fukushima policy, and cyber-nuclear intersection data, enabling multi-layer risk analysis across an interactive timeline (1970–2024).

### Core Analytical Layers

1. **Safeguards Coverage** — IAEA agreement type per facility (CSA, Additional Protocol, VOA) with color-coded markers
2. **Decommissioning Risk** — Facilities in decommissioning/suspended with governance risk score rings
3. **Conflict Proximity** — 200km radius circles around facilities near active armed conflict
4. **Treaty Adherence** — Country-level NPT/TPNW/Additional Protocol status
5. **Post-Fukushima Policy** — Country-level policy trajectory since March 2011
6. **Cyber-Nuclear Intersection** — Digital I&C systems, reported cyber incidents, critical infrastructure overlap
7. **Post-Soviet Sub-Atlas** — Dedicated view for former Soviet state facilities

### Governance Risk Score (1–5)

Composite score derived from: regulatory opacity, safeguards gaps, conflict proximity, decommissioning status, policy instability, and seismic risk.

### Key Features

- **Interactive Timeline** — Year slider (1970–2024) with play/pause, speed controls, and event markers categorized by treaty, accident, policy, and proliferation
- **Analytics Dashboard** — Status distribution, top-15 country charts, total capacity (GW), and reactor type breakdowns (Recharts)
- **Quick Filters** — All, High Risk (4+), Policy Flux, Cyber Intersection
- **Advanced Filters** — Search, status, country, reactor type
- **CSV Export** — Available on Infrastructure and Policy pages
- **Global Risk Bar** — Summary of high-risk facility counts and policy flux indicators

## Data Sources

- [IAEA PRIS](https://pris.iaea.org/) — Power reactor information
- [IAEA CNPP](https://cnpp.iaea.org/) — Country nuclear power profiles
- [SIPRI](https://www.sipri.org/) — Arsenal estimates
- [FAS](https://fas.org/) — Nuclear notebook warhead data
- [NTI Nuclear Security Index](https://www.ntiindex.org/) — Security governance
- [ENSREG](https://www.ensreg.eu/) — EU stress test results
- [USGS](https://www.usgs.gov/) — Seismic hazard maps
- [ACLED](https://acleddata.com/) — Conflict data for proximity analysis
- [UNODA](https://treaties.unoda.org/) — Treaty databases
- National regulatory bodies (NRC, ASN, ONR, NRA, etc.)

See [data/sources.md](data/sources.md) for full source documentation.
See [data/schema.md](data/schema.md) for data schema.

## Faultline Suite Integration

| Module | URL |
|--------|-----|
| Faultline Landing | [faultline-nqmm.vercel.app](https://faultline-nqmm.vercel.app) |
| Nuclear Infrastructure Atlas | [globalnuclearinfrastructureatlas.vercel.app](https://globalnuclearinfrastructureatlas.vercel.app) |
| Orbital Risk Tracker | [orbitalrisktracker.vercel.app](https://orbitalrisktracker.vercel.app) |
| Cyber Escalation Atlas | [cyber-escalation-atlas.vercel.app](https://cyber-escalation-atlas.vercel.app) |
| Lunar Mandate Atlas | [lunar-mandate-atlas.vercel.app](https://lunar-mandate-atlas.vercel.app) |

Cross-module links surface Cyber Atlas entries for facilities flagged with critical infrastructure overlap.

## Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Overview map with layer toggles and section cards |
| `/infrastructure` | Infrastructure | Full governance map with 7 overlay layers, timeline, analytics charts, risk bar, and filters |
| `/policy` | Policy Intelligence | Sortable/filterable country policy table (60+ countries) with CSV export |
| `/basics` | Nuclear Basics | Educational content with Fission/Fusion tabs, reactor components, safety systems, and fusion projects |
| `/accidents` | Accidents & History | INES-rated accident cards with expandable details and historical events timeline |
| `/arsenals` | Arsenals | Country-level warhead estimates with deployed/reserve/retired breakdowns |
| `/radiation` | Radiation & Health | Dose units, dose comparisons, health effect thresholds, and exposure pathways |
| `/methodology` | Methodology | Data sources, inclusion/exclusion criteria, and editorial principles |

## Tech Stack

| Package | Version |
|---------|---------|
| React | 19.2 |
| Vite | 7.3 |
| Tailwind CSS | 3.4 |
| React Router | 7.13 |
| React Leaflet | 5.0 (CartoDB Dark Matter tiles) |
| Recharts | 3.8 |
| Framer Motion | 12.35 |
| Lucide React | 0.577 |

## Running Locally

```bash
npm install
npm run dev
```

## Data Policy

All data from officially published public sources. No classified, speculative, or security-sensitive information. See Methodology page for full details.

## License

All rights reserved. Risa Koyanagi.
