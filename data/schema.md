# Data Schema Documentation

## Enriched Facility Object

| Field | Type | Values | Source |
|-------|------|--------|--------|
| id | string | Unique facility ID | Internal |
| name | string | Facility name | IAEA PRIS |
| country | string | Country name | IAEA PRIS |
| lat, lng | number | Coordinates | IAEA PRIS |
| status | string | operating / under_construction / shutdown / suspended / planned | IAEA PRIS |
| reactorType | string | Reactor design type | IAEA PRIS |
| units | number | Number of reactor units | IAEA PRIS |
| netCapacityMW | number | Net electrical capacity in MW | IAEA PRIS |
| facility_type | string | reactor / enrichment / reprocessing / waste_storage / research / dismantled / planned | Derived |
| regulatory_body | string | National regulatory authority name | IAEA CNPP |
| safeguards_status | string | IAEA safeguards agreement type | IAEA / UNODA |
| last_inspection_year | number/null | Most recent IAEA inspection year | null (not public) |
| operational_status | string | operational / suspended / decommissioning / planned / under_construction | Derived |
| grid_connectivity | boolean | Connected to electrical grid | Derived |
| seismic_zone | string | High / Moderate / Low | USGS |
| proximity_conflict | boolean | Within 200km of active conflict | ACLED |
| treaty_obligations | string[] | Applicable treaties | UNODA |
| governance_risk_score | number 1-5 | Composite governance risk | Computed |
| governance_flags | string[] | Active governance flags | Computed |
| post_fukushima_policy_change | boolean | Host country enacted post-2011 policy change | WNA/IAEA |
| stress_test_conducted | boolean/null | ENSREG-standard stress test completed | ENSREG |
| evacuation_plan_status | string | current / outdated / none / unknown | National sources |
| community_consent_mechanism | string | exists / absent / disputed / unknown | National sources |
| digital_i_and_c | boolean | Digital instrumentation and control (at one or more units) | Operator data |
| digital_i_and_c_note | string/null | Set when only some units have digital I&C, e.g. "Digital I&C at some units (EPR Unit 3)" | Operator data |
| reported_cyber_incident | boolean/null | Publicly reported cyber incident | Public record |
| critical_infrastructure_overlap | boolean | Shares infrastructure with Cyber Atlas assets | Derived |
| soviet_era_design | boolean/null | Soviet-origin reactor design | IAEA PRIS |
| soviet_reactor_type | string/null | Specific Soviet-era type | IAEA PRIS |
| decommissioning_liability_status | string/null | funded / underfunded / unresolved / unknown | NTI/national |
| bilateral_agreement_with_russia | string/null | current / lapsed / none | Public record |

## Country Policy Object

| Field | Type | Values |
|-------|------|--------|
| country | string | Country name |
| iso_code | string | ISO 3166-1 alpha-2 |
| policy_posture | string | expanding / maintaining / phasing_out / moratorium / no_programme |
| current_policy_driver | string | energy_security / climate_commitments / economic / political / post_accident_response |
| smr_programme | boolean | Active SMR programme |
| enrichment_capability | string | none / declared / suspected / confirmed |
| reprocessing_capability | string | none / declared / suspected / confirmed |
| export_policy | string | supplier / recipient / both / neither |
| nuclear_sharing_arrangements | string[] | NATO DCA or equivalent |
| recent_policy_shift | string | Max 200 chars |
| post_fukushima_trajectory | string | accelerated_phase_out / partial_moratorium / policy_reversal / no_change / new_build_programme |
| policy_flux | boolean | Policy posture changed direction in last 5 years |
| npt_status | string | party / non_party / withdrew |
| tpnw_status | string | signed / ratified / non_signatory |
| additional_protocol | boolean | IAEA Additional Protocol in force |
