# Changelog

## Dataset 1.3.0 — 2026-10-29

- Conflict exposure is computed from UCDP event data instead of an analyst list. A plant is exposed
  when UCDP records at least 5 events or 25 best-estimate deaths within 100 km, Oct 2024–Sep 2026
  (GED 26.1 to Dec 2025, Candidate Events Jan–Sep 2026; CC BY 4.0). All three UCDP violence types
  count. Events located only to a country or to international waters are excluded. 8 plants are
  exposed: Zaporizhzhia, South Ukraine, KANUPP, Bushehr, Koeberg, Angra, Laguna Verde and Rooppur.
  Rivne and Metsamor, previously analyst-flagged, are below the rule. Each plant carries its event
  and death counts, the split by violence type and the extract date. The dated extract is in
  data/ucdp/ (scripts/extract-ucdp.py, `npm run gen:conflict`); check:data fails when it is more
  than 12 months old.
- Governance risk score: one "safeguards gap +1" term replaces "no Additional Protocol +1" and
  "facility-specific +1", so Pakistan is no longer counted twice. Shutdown/decommissioned status and
  host-country phase-out no longer add points; they remain as flags. Each plant stores the rules
  that applied (governance_score_rules), shown in the plant panel, plant table and exports, and the
  Methodology table is generated from the same rule list. check:data verifies each score against
  its recorded rules. Distribution: 54 plants at 1, 27 at 2, 3 at 3, 2 at 4 (KANUPP, Bushehr).
- Country entries, each with its own review date and source: Iran gets a safeguards note (July 2025
  law suspending cooperation; IAEA says the CSA remains in force, 8 Sep 2025); Belgium records the
  15 May 2025 repeal of the 2003 phase-out law (102–8–31); Germany's trajectory is the new value
  `phase_out_completed` (last reactors shut 15 April 2023). country_data_as_of uses an entry's own
  date where it has one.
- Re-verification of the other country entries against sources dated 2025-2026 (each change has
  its source in policy_sources or a comment, and the entry's review date):
  - Additional Protocol: Argentina and Belarus have none in force (IAEA status list, 30 Jun 2026);
    both now count as safeguards gaps (counter 9, was 7).
  - TPNW: Bangladesh, Mexico and South Africa ratified; Brazil signed, not ratified (UN Treaty
    Collection).
  - Regulators: France ASN became ASNR on 1 Jan 2025; Turkey's regulator is NDK.
  - Recent policy shift updated for 22 countries; Hungary and Switzerland marked as policy flux.
  - China, Russia, UAE, Pakistan, Ukraine, Egypt, Turkey and Mexico confirmed, with sources.
  - Not changed (judgement or unresolved): Japan posture, Switzerland trajectory pending its
    referendum, trajectory codes for Canada, the US and Hungary.
- The PRIS note in the plant panel now says the link opens the country page.

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
