# Global Nuclear Infrastructure Atlas

An interactive, educational, and policy-oriented world map visualizing **civilian nuclear infrastructure**, **accident sites**, **fuel cycle facilities**, and **historical nuclear events** using officially published public information only.

## Purpose

This platform is designed for:
- Education
- Policy analysis
- Journalism
- Public understanding of civilian nuclear infrastructure

**This is not a surveillance tool.** All data is based on officially published public information only.

## Data Policy

- Only officially published public information is included
- No classified, speculative, leaked, or security-sensitive information
- No military facility profiles or vulnerability assessments
- "Latest status" means latest public reporting, not real-time surveillance
- Live feeds are embedded only from official or publicly authorized sources

## Pages

1. **Global Map Dashboard** – Interactive world map with filtering, search, and layer controls
2. **Nuclear Fuel Cycle Basics** – Educational overview of the civilian nuclear fuel cycle
3. **Accidents & Events** – Major civilian accidents and historical nuclear events
4. **Methodology** – Data sources, limitations, and platform principles

## Tech Stack

- React 18 + Vite
- Tailwind CSS
- React Leaflet (OpenStreetMap / CartoDB Dark Matter)
- Recharts
- Framer Motion
- Lucide Icons

## Running Locally

```bash
npm install
npm run dev
```

## Building for Production

```bash
npm run build
npm run preview
```

## Deploying

### Vercel (recommended)
Connect the repository to Vercel. Build command: `npm run build`. Output: `dist/`.

### GitHub Pages
1. Set `base` in `vite.config.js` to your repo name: `base: '/your-repo-name/'`
2. Run `npm run build`
3. Deploy `dist/` to your `gh-pages` branch

## Data Sources

- [IAEA PRIS](https://pris.iaea.org/) – Power reactor information
- [IAEA RRDB](https://nucleus.iaea.org/RRDB/) – Research reactors
- [NRC](https://www.nrc.gov/) – US regulatory information
- National regulators (ONR, ASN, STUK, etc.)
- Official operator websites
- [UNSCEAR](https://www.unscear.org/) – Radiation health data
- [IAEA INES](https://www.iaea.org/topics/ines) – Event scale reference

## Future API Integration

Code is structured for future live API integration. Comments in `src/data/` indicate where static JSON files can be replaced with live API calls when official public endpoints become available (e.g., IAEA PRIS public API).

## License

Educational and public interest use. Data sourced from officially published public records. See Methodology page for full attribution and limitations.
