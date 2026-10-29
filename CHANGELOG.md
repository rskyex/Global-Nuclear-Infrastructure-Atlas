# Changelog

## Dataset 1.2.0 — 2026-10-29

- Safeguards gap has one definition, shown on screen and used by the counter, the plant flag, the
  map markers and the legend: facility-specific safeguards only, or a comprehensive safeguards
  agreement without an Additional Protocol in force. The counter now includes Brazil, Egypt and
  Iran (7 plants, was 4); Iran's marker, previously green because its status text mentions a signed
  Additional Protocol, is amber. VOA (NPT weapon states) and EURATOM coverage are not gaps.
- "Digital I&C (no audit)" renamed "Digital I&C, no reported incident".
- Conflict proximity is now "analyst-flagged conflict exposure (as of 2024)". The 200 km circles
  and wording are removed: no distance test was ever run. The ACLED citation is removed from the
  schema, sources list and README; no ACLED data is in the repository.
- Methodology page: a labelled section gives the governance risk score rule table exactly as coded
  (under review), and lists which enriched fields have no per-field source.
- Sources: every plant links to its IAEA PRIS country page. The old
  pris.iaea.org/PRIS/CountryStatistics/CountryDetails.aspx?current=<ISO2> pattern now redirects to
  the PRIS Analytics home page, so links use pris-stats.iaea.org/country-statistics/<ISO2> (checked
  for several countries). The old cnpp.iaea.org/countryprofiles/ links return 404; CNPP links now
  use cnpp.iaea.org/public/countries/<ISO2>/profile/highlights (all 32 countries listed by CNPP).
- Dates: policy and safeguards values are labelled "as of 2024-01-01" (Policy page column, plant
  detail, exports). Export metadata separates codeLastChanged from recordsLastReviewed and adds
  countryDataAsOf.
- Exports include the enriched fields, governance_risk_score, governance_flags, safeguards gap,
  as-of date, and PRIS and CNPP links.
- Accessibility: map markers are keyboard-focusable with accessible names; a skip link and a
  "Plant list" button open a plant table that opens each plant's details; low-contrast grey text
  raised to at least 7:1.
- check:data also verifies that every plant has a PRIS country link and that the safeguards-gap
  counter matches the per-plant flag.

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
