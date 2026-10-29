# Data Sources

## Primary Sources

| Source | URL | Coverage | Retrieved |
|--------|-----|----------|-----------|
| IAEA PRIS | https://pris.iaea.org/ | All commercial nuclear power reactors worldwide | 2024-01-01 |
| IAEA CNPP | https://cnpp.iaea.org/ | Country nuclear power profiles | 2024-01-01 |
| SIPRI Yearbook | https://www.sipri.org/yearbook | Nuclear arsenal estimates | 2024-01-01 |
| FAS Nuclear Notebook | https://fas.org/issues/nuclear-weapons/ | Nuclear forces status | 2024-01-01 |
| NTI Nuclear Security Index | https://www.ntiindex.org/ | Nuclear security governance scoring | 2024-01-01 |
| ENSREG | https://www.ensreg.eu/ | EU stress test results | 2024-01-01 |
| UNODA Treaty Database | https://treaties.unoda.org/ | Treaty status by country | 2024-01-01 |
| USGS Seismic Hazard Maps | https://www.usgs.gov/programs/earthquake-hazards | Seismic zone classification | 2024-01-01 |
| WNA Country Profiles | https://world-nuclear.org/information-library | Country nuclear policy data | 2024-01-01 |
| UCDP Georeferenced Event Dataset 26.1 | https://ucdp.uu.se/downloads/ | Conflict events to 2025-12-31 (CC BY 4.0) | 2026-10-29 |
| UCDP Candidate Events Dataset 26.0.1-9 | https://ucdp.uu.se/downloads/ | Conflict events Jan–Sep 2026 (CC BY 4.0) | 2026-10-29 |

## Secondary Sources

| Source | URL | Used For |
|--------|-----|----------|
| NRC (US) | https://www.nrc.gov/ | US facility regulatory data |
| ASN (France) | https://www.asn.fr/ | French facility data |
| ONR (UK) | https://www.onr.org.uk/ | UK facility data |
| NRA (Japan) | https://www.nra.go.jp/english/ | Japan restart status |
| NSSC (South Korea) | https://www.nssc.go.kr/ | South Korea facility data |

## Known Data Gaps

- `last_inspection_year`: Per-facility IAEA inspection dates are not publicly available. Field set to null.
- `reported_cyber_incident`: Very few facility-specific confirmed cyber incidents in public record. Most set to null/false.
- `evacuation_plan_status`: Detailed per-facility evacuation plan currency not publicly tracked for all countries.
- `digital_i_and_c`: Confirmed for newer designs (AP1000, EPR, APR1400, VVER-1200). Older plants assessed based on known upgrade programmes. Some uncertainty remains.
- Soviet-era decommissioning liability: Detailed financial assessments not publicly available for all facilities.

## Country entries reviewed 2026-10-29

| Country | Change | Source |
|---|---|---|
| Iran | Safeguards note: July 2025 law suspending cooperation; IAEA says the CSA (INFCIRC/214) remains in force | IAEA Director General, statement to the Board of Governors, 8 Sep 2025, https://www.iaea.org/newscenter/statements/iaea-director-generals-introductory-statement-to-the-board-of-governors-8-september-2025 |
| Belgium | Chamber repealed the 2003 phase-out law on 15 May 2025 (102–8–31) | World Nuclear News, 16 May 2025, https://www.world-nuclear-news.org/articles/belgium-reverses-phase-out-policy-as-denmark-reconsiders-nuclear ; VRT NWS, 16 May 2025, https://www.vrt.be/vrtnws/en/2025/05/16/federal-parliament-repeals-law-scrapping-nuclear-energy-producti/ |
| Germany | Trajectory `phase_out_completed`: last three reactors shut down 15 April 2023 | bpb, 14 Apr 2023, https://www.bpb.de/kurz-knapp/hintergrund-aktuell/520059/atomausstieg-deutschland-verabschiedet-sich-endgueltig-von-der-kernkraft/ |

UCDP citation: Sundberg, Ralph and Erik Melander (2013) Introducing the UCDP Georeferenced Event
Dataset. Journal of Peace Research 50(4). Data: Uppsala Conflict Data Program, https://ucdp.uu.se
