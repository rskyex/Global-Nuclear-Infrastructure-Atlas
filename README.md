# Global Nuclear Infrastructure Atlas

A governance-grade infrastructure mapping platform for civilian nuclear facilities worldwide. Part of the **Faultline** strategic infrastructure suite.

**Live:** [globalnuclearinfrastructureatlas.vercel.app](https://globalnuclearinfrastructureatlas.vercel.app)

## Analytical Framework

The Atlas enriches each facility with governance, safeguards, post-Fukushima policy, and cyber-nuclear intersection data, enabling multi-layer risk analysis.

### Core Analytical Layers

1. **Safeguards Coverage** — IAEA agreement type per facility (CSA, Additional Protocol, VOA)
2. **Decommissioning Risk** — Facilities in decommissioning/suspended with governance risk score
3. **Conflict Proximity** — 200km radius around facilities near active armed conflict
4. **Treaty Adherence** — Country-level NPT/TPNW/Additional Protocol status
5. **Post-Fukushima Policy** — Country-level policy trajectory since March 2011
6. **Cyber-Nuclear Intersection** — Digital I&C, reported incidents, infrastructure overlap
7. **Post-Soviet Sub-Atlas** — Dedicated view for former Soviet state facilities

### Governance Risk Score (1–5)

Composite score derived from: regulatory opacity, safeguards gaps, conflict proximity, decommissioning status, policy instability, and seismic risk.

## Data Sources

- [IAEA PRIS](https://pris.iaea.org/) — Power reactor information
- [IAEA CNPP](https://cnpp.iaea.org/) — Country nuclear power profiles
- [SIPRI](https://www.sipri.org/) — Arsenal estimates
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
| Faultline Landing | faultline-nqmm.vercel.app |
| Nuclear Infrastructure Atlas | globalnuclearinfrastructureatlas.vercel.app |
| Orbital Risk Tracker | faultline-nqmm.vercel.app/orbital |
| Cyber Escalation Atlas | faultline-nqmm.vercel.app/cyber |

Cross-module links surface Cyber Atlas entries for facilities with critical infrastructure overlap.

## Pages

1. **Home** — Overview map with layer toggles
2. **Infrastructure** — Full governance map with 7 overlay layers, timeline, risk bar, filters
3. **Policy Intelligence** — Sortable/filterable country policy table with CSV export
4. **Nuclear Basics** — Educational content
5. **Accidents & History** — Major civilian accidents and historical events
6. **Arsenals** — Country-level warhead estimates
7. **Radiation & Health** — Dose units, health effects
8. **Methodology** — Data sources and editorial principles

## Tech Stack

- React 19 + Vite 7
- Tailwind CSS 3
- React Leaflet (CartoDB Dark Matter tiles)
- Recharts
- Framer Motion
- Lucide Icons

## Running Locally

```bash
npm install
npm run dev
```

## Data Policy

All data from officially published public sources. No classified, speculative, or security-sensitive information. See Methodology page for full details.

## License

All rights reserved. Risa Koyanagi.
