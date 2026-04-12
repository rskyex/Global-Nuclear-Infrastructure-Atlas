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
| ACLED | https://acleddata.com/ | Conflict zone boundaries (for proximity calc) | 2024-01-01 |
| WNA Country Profiles | https://world-nuclear.org/information-library | Country nuclear policy data | 2024-01-01 |

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
