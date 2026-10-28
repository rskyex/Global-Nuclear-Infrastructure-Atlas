# Changelog

## Dataset 1.1.0 — 2026-10-28

Data corrections:

- Lookup tables in `src/data/enrichedFacilities.js` referenced 33 plant ids that are not in
  `commercialPlants.js`. Five were remapped to the same site where its units cover the units meant
  (`uk-hinkley-point-c` → `gb-hinkley-c`, `kr-shin-kori` → `kr-kori`, `pk-karachi` and
  `cn-karachi-coastal` → `pk-kanupp`, `ru-leningrad-ii` → `ru-leningrad`); the rest were removed.
  `hu-paks-ii` was not remapped (`hu-paks` covers the four VVER-440 units only).
- Sites with both analogue and digital units (Vogtle, Flamanville, Olkiluoto, Kori, Leningrad,
  KANUPP) carry the note "Digital I&C at some units".
- Cyber incident flag: only Kori, for the December 2014 KHNP breach (documents leaked from the
  operator's network; no control-system compromise reported; source: Nextgov, 23 Dec 2014).
  Hanbit and Hanul removed.
- Cyber Escalation Atlas overlap is now generated from that atlas's case data
  (`npm run gen:cyber-targets`, source commit 368438d): added Bangladesh, Belgium, Brazil, Canada,
  Egypt, Iran, Netherlands, Pakistan, Sweden, Switzerland; removed China, Russia.
- Home page overlays: Conflict Proximity 4 → 5, Digital I&C 11 → 15.
- `npm run check:data` (run before each build) fails on lookup ids that are not plant ids.

The plant records in the downloads are unchanged; they are re-issued as 1.1.0.
