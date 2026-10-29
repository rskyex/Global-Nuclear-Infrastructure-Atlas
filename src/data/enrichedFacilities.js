/**
 * Enriched Facility Dataset — Governance, Safeguards, Cyber-Nuclear, Post-Fukushima
 *
 * This module maps over ALL commercial plants and adds governance-grade analytical fields.
 * Country-level data from countryGovernance.js. Facility-specific overrides below.
 *
 * Sources: IAEA PRIS, NTI Nuclear Security Index, ENSREG, USGS, UNODA (country level;
 * see FIELD_PROVENANCE for which fields have no per-field source)
 * Data policy: Public information only. Null where data is unavailable.
 */

import { commercialPlants } from './commercialPlants';
import countryGovernance, { COUNTRY_DATA_AS_OF } from './countryGovernance';
import { cyberTargetCountries } from './generated/cyberTargetCountries';

// ── Status mapping ──────────────────────────────────────────────────────────
function mapOperationalStatus(status) {
  const map = {
    operating: 'operational',
    under_construction: 'under_construction',
    shutdown: 'decommissioning',
    suspended: 'suspended',
    planned: 'planned',
    decommissioned: 'decommissioning',
    damaged: 'suspended',
  };
  return map[status] || 'operational';
}

// Every id in the lookup tables below must be a commercialPlants id
// (checked by `npm run check:data`, which runs before each build).

// ── Seismic zone overrides by facility ──────────────────────────────────────
const seismicOverrides = {
  // Japan — all High
  // Ohi, Mihama, Ikata, Kashiwazaki-Kariwa, Onagawa, Shimane, Hamaoka, Tsuruga,
  // Tomari, Tokai and Monju are not in the plant dataset.
  'jp-takahama': 'High', 'jp-genkai': 'High', 'jp-sendai': 'High',
  // US West Coast / seismic
  'us-diablo-canyon': 'High', 'us-columbia': 'Moderate',
  // Turkey
  'tr-akkuyu': 'High',
  // Armenia
  'am-metsamor': 'High',
  // Iran
  'ir-bushehr': 'High',
  // Romania
  'ro-cernavoda': 'Moderate',
  // Mexico
  'mx-laguna-verde': 'High',
  // India
  // Kakrapar is not in the plant dataset.
  'in-kudankulam': 'Moderate', 'in-tarapur': 'Moderate',
  // Pakistan
  'pk-kanupp': 'Moderate',
  // Taiwan (if applicable)
  // Slovenia
  'si-krsko': 'Moderate',
  // South Korea (Shin-Wolsong is not in the plant dataset)
  'kr-kori': 'Moderate',
  'kr-hanbit': 'Moderate', 'kr-hanul': 'Moderate',
};

// ── Analyst-flagged conflict exposure (as of 2024) ──────────────────────────
// An analyst judgement, not a distance test: no geometric check against event
// data has been run, and no conflict-event dataset is in this repository.
const conflictProximityFacilities = new Set([
  // Ukraine — all facilities due to ongoing conflict (Khmelnytskyi is not in the plant dataset)
  'ua-zaporizhzhia', 'ua-south-ukraine', 'ua-rivne',
  // Armenia — Nagorno-Karabakh proximity
  'am-metsamor',
  // Russia — near Ukraine border: Kursk and Novovoronezh are not in the plant dataset
  // Pakistan — various internal conflicts
  'pk-kanupp',
]);

// ── Digital I&C assessment ──────────────────────────────────────────────────
// Newer designs and major upgrades have digital I&C
const digitalICFacilities = new Set([
  // AP1000 (digital by design); Sanmen and Haiyang are not in the plant dataset
  'us-vogtle',
  // EPR (digital by design)
  'fr-flamanville', 'fi-olkiluoto', 'cn-taishan', 'gb-hinkley-c',
  // APR1400 (digital by design) — Shin-Kori units are part of the Kori record
  'kr-kori', 'ae-barakah',
  // VVER-1200 (digital by design) — Leningrad II units are part of the Leningrad record;
  // Novovoronezh II and Paks II are not in the plant dataset
  'ru-leningrad', 'by-ostrovets',
  'bd-rooppur', 'tr-akkuyu', 'eg-el-dabaa',
  // Chinese Hualong One — KANUPP-2/3 (Karachi Coastal); Fuqing is not in the plant dataset
  'pk-kanupp',
  // HTR-PM: Shidaowan is not in the plant dataset
  // Recent builds with digital systems: Shin-Wolsong is not in the plant dataset
  // Major digital upgrades
  'us-palo-verde', 'us-south-texas',
]);

// Sites where only some units have digital I&C, so the site flag is not overstated
const digitalICNotes = {
  'us-vogtle': 'Digital I&C at some units (AP1000 Units 3–4)',
  'fr-flamanville': 'Digital I&C at some units (EPR Unit 3)',
  'fi-olkiluoto': 'Digital I&C at some units (EPR Unit 3)',
  'kr-kori': 'Digital I&C at some units (Shin-Kori APR-1400 units)',
  'ru-leningrad': 'Digital I&C at some units (VVER-1200 Units 3–4, Leningrad II)',
  'pk-kanupp': 'Digital I&C at some units (Hualong One KANUPP-2/3)',
};

// ── Reported cyber incidents ────────────────────────────────────────────────
// Only documented public incidents that name the site, with the source attached
const cyberIncidentFacilities = {
  // 2003 — Davis-Besse Slammer worm (US) — no specific ID in our data but illustrative
  // 2010 — Stuxnet affected Iran's enrichment, not Bushehr reactor directly
  // 2016 — Gundremmingen malware found (Germany) — plant shut down 2021
  // South Korea — 2014 KHNP breach named Gori-2 (Kori) and Wolsong-1; Wolsong is not in
  // the plant dataset. Hanbit and Hanul are not named in any source found.
  'kr-kori': {
    year: 2014,
    label: 'Documents leaked from operator network; no control-system compromise reported',
    detail: 'In December 2014 design documents and manuals for Kori-2 ("Gori-2") were leaked from Korea Hydro & Nuclear Power\'s corporate network. No control-system compromise was reported.',
    source: { name: 'Nextgov – Hacker Leaks S. Korea Nuke Plant Blueprints (23 Dec 2014)', url: 'https://nextgov.com/cybersecurity/2014/12/breach/143556', type: 'news' },
    // Cross-dataset reference for the Faultline layer. The Cyber Escalation
    // Atlas has no case for the 2014 KHNP breach, so cyberCase stays null.
    reportedCyberIncidentRef: { cyberCase: null, sourceUrl: 'https://nextgov.com/cybersecurity/2014/12/breach/143556' },
  },
};

// ── Critical infrastructure overlap with Cyber Atlas ────────────────────────
// Host state is named as a target in at least one Cyber Escalation Atlas case
// (regenerate with `npm run gen:cyber-targets`).
const criticalInfraOverlapCountries = new Set(Object.keys(cyberTargetCountries));

// ── Soviet-era reactor identification ───────────────────────────────────────
const sovietEraDesigns = {
  'ua-zaporizhzhia': { soviet_era_design: true, soviet_reactor_type: 'VVER-1000', decommissioning_liability_status: 'unresolved', bilateral_agreement_with_russia: 'lapsed' },
  'ua-south-ukraine': { soviet_era_design: true, soviet_reactor_type: 'VVER-1000', decommissioning_liability_status: 'unresolved', bilateral_agreement_with_russia: 'lapsed' },
  'ua-rivne': { soviet_era_design: true, soviet_reactor_type: 'VVER-440/VVER-1000', decommissioning_liability_status: 'unresolved', bilateral_agreement_with_russia: 'lapsed' },
  // Khmelnytskyi is not in the plant dataset
  'am-metsamor': { soviet_era_design: true, soviet_reactor_type: 'VVER-440', decommissioning_liability_status: 'underfunded', bilateral_agreement_with_russia: 'current' },
  'by-ostrovets': { soviet_era_design: false, soviet_reactor_type: null, decommissioning_liability_status: 'unknown', bilateral_agreement_with_russia: 'current' },
  // Kursk is not in the plant dataset
  'ru-leningrad': { soviet_era_design: true, soviet_reactor_type: 'RBMK-1000', decommissioning_liability_status: 'funded', bilateral_agreement_with_russia: null },
  'ru-smolensk': { soviet_era_design: true, soviet_reactor_type: 'RBMK-1000', decommissioning_liability_status: 'funded', bilateral_agreement_with_russia: null },
  // Novovoronezh (I and II) is not in the plant dataset
  'ru-kalinin': { soviet_era_design: true, soviet_reactor_type: 'VVER-1000', decommissioning_liability_status: 'funded', bilateral_agreement_with_russia: null },
  'ru-balakovo': { soviet_era_design: true, soviet_reactor_type: 'VVER-1000', decommissioning_liability_status: 'funded', bilateral_agreement_with_russia: null },
  // Rostov is not in the plant dataset
  'ru-beloyarsk': { soviet_era_design: true, soviet_reactor_type: 'BN-800', decommissioning_liability_status: 'funded', bilateral_agreement_with_russia: null },
  // Kola is not in the plant dataset
  // Leningrad II units are part of the ru-leningrad record above
  // Czech and Hungarian VVER reactors (Soviet-origin design, but not post-Soviet states)
  'cz-dukovany': { soviet_era_design: true, soviet_reactor_type: 'VVER-440', decommissioning_liability_status: 'funded', bilateral_agreement_with_russia: 'none' },
  'cz-temelin': { soviet_era_design: true, soviet_reactor_type: 'VVER-1000', decommissioning_liability_status: 'funded', bilateral_agreement_with_russia: 'none' },
  'hu-paks': { soviet_era_design: true, soviet_reactor_type: 'VVER-440', decommissioning_liability_status: 'funded', bilateral_agreement_with_russia: 'current' },
  'fi-loviisa': { soviet_era_design: true, soviet_reactor_type: 'VVER-440', decommissioning_liability_status: 'funded', bilateral_agreement_with_russia: 'none' },
  // Kozloduy, Mochovce and Bohunice are not in the plant dataset
};

// Post-Soviet state country list
const postSovietStates = new Set([
  'Russia', 'Ukraine', 'Belarus', 'Armenia', 'Kazakhstan', 'Georgia',
  'Azerbaijan', 'Uzbekistan', 'Lithuania', 'Latvia', 'Estonia',
  'Tajikistan', 'Turkmenistan', 'Kyrgyzstan', 'Moldova',
]);

// Exported for scripts/check-data.mjs
export const facilityLookups = {
  seismicOverrides, conflictProximityFacilities, digitalICFacilities,
  digitalICNotes, cyberIncidentFacilities, sovietEraDesigns,
};

// ── Safeguards gap (one definition for counters, flags, markers, legend) ────
// A host state has a safeguards gap when its safeguards are facility-specific
// (India, Pakistan) or it has a comprehensive safeguards agreement without an
// Additional Protocol in force (Brazil, Egypt, Iran). NPT weapon states'
// Voluntary Offer Agreements and EURATOM coverage are not counted as gaps.
export const SAFEGUARDS_GAP_DEFINITION =
  'Safeguards gap: facility-specific safeguards only, or a comprehensive safeguards agreement without an Additional Protocol in force. Voluntary Offer Agreements (NPT weapon states) and EURATOM coverage are not counted.';

export function safeguardsGapReason(cData) {
  const s = cData?.safeguards_status;
  if (!s) return null;
  if (s.includes('Facility-specific')) return 'facility-specific safeguards only';
  if (s.includes('CSA') && !cData.additional_protocol) return 'comprehensive safeguards agreement without an Additional Protocol in force';
  return null;
}

export const CONFLICT_FLAG_LABEL = 'Analyst-flagged conflict exposure (as of 2024)';

// Where each enriched field comes from. Shown on the Methodology page and in
// the export codebook. "none" means there is no per-field source.
export const FIELD_PROVENANCE = [
  { field: 'regulatory_body', level: 'country', source: 'none per field (country table cites IAEA, UNODA, national regulators, NTI as a group)' },
  { field: 'safeguards_status', level: 'country', source: 'none per field (country table, as of 2024-01-01)' },
  { field: 'treaty_obligations', level: 'country', source: 'none per field (country table, as of 2024-01-01)' },
  { field: 'seismic_zone', level: 'plant / country', source: 'none (facility overrides and country defaults are uncited)' },
  { field: 'proximity_conflict', level: 'plant', source: 'none (analyst judgement, as of 2024; no distance test)' },
  { field: 'digital_i_and_c, digital_i_and_c_note', level: 'plant', source: 'none per field (inferred from reactor design)' },
  { field: 'post_fukushima_policy_change, post_fukushima_trajectory', level: 'country', source: 'none per field (country table, as of 2024-01-01)' },
  { field: 'stress_test_conducted', level: 'country', source: 'none per field (country table, as of 2024-01-01)' },
  { field: 'evacuation_plan_status', level: 'country', source: 'none per field (country table, as of 2024-01-01)' },
  { field: 'community_consent_mechanism', level: 'country', source: 'none per field (country table, as of 2024-01-01)' },
  { field: 'soviet_era_design, soviet_reactor_type, decommissioning_liability_status, bilateral_agreement_with_russia', level: 'plant', source: 'none per field' },
  { field: 'governance_risk_score, governance_flags', level: 'plant', source: 'computed from the fields above (rule table on the Methodology page)' },
  { field: 'cyber_incident, reported_cyber_incident', level: 'plant', source: 'per record (source attached to each incident)' },
  { field: 'critical_infrastructure_overlap', level: 'country', source: 'generated from the Cyber Escalation Atlas case data' },
];

// ── Governance risk score computation ───────────────────────────────────────
function computeGovernanceRisk(plant, cData) {
  let score = 1;

  // Regulatory opacity: countries without Additional Protocol or with opacity concerns
  if (!cData) { score += 2; }
  else {
    if (!cData.additional_protocol) score += 1;
    if (cData.community_consent_mechanism === 'absent') score += 1;
    if (cData.safeguards_status && cData.safeguards_status.includes('Voluntary Offer')) {
      // Weapon states have VOA - not a governance gap per se, but less coverage
    }
    if (cData.safeguards_status && cData.safeguards_status.includes('Facility-specific')) {
      score += 1; // Non-NPT states with partial safeguards
    }
  }

  // Conflict proximity
  if (conflictProximityFacilities.has(plant.id)) score += 1;

  // Decommissioning status
  if (plant.status === 'shutdown' || plant.status === 'decommissioned') score += 1;
  if (plant.status === 'suspended') score += 1;

  // Policy instability
  if (cData && cData.post_fukushima_trajectory === 'accelerated_phase_out') score += 1;

  // Seismic risk + older design
  const seismic = seismicOverrides[plant.id] || (cData && cData.seismic_zone_default) || 'Moderate';
  if (seismic === 'High' && plant.firstPower && plant.firstPower < 1990) score += 1;

  return Math.min(Math.max(score, 1), 5);
}

// ── Build the enriched dataset ──────────────────────────────────────────────
export const enrichedFacilities = commercialPlants.map(plant => {
  const cData = countryGovernance[plant.country] || {};
  const sovietData = sovietEraDesigns[plant.id] || null;
  const seismicZone = seismicOverrides[plant.id] || cData.seismic_zone_default || 'Moderate';
  const isDigital = digitalICFacilities.has(plant.id);
  const cyberIncident = cyberIncidentFacilities[plant.id] || null;
  const hasCyberIncident = Boolean(cyberIncident);
  const hasInfraOverlap = criticalInfraOverlapCountries.has(plant.country);
  const isConflictProximity = conflictProximityFacilities.has(plant.id);
  const isPostSoviet = postSovietStates.has(plant.country);

  const riskScore = computeGovernanceRisk(plant, cData);

  // Build governance flags
  const governanceFlags = [];
  const gapReason = safeguardsGapReason(cData);
  if (gapReason) governanceFlags.push(`Safeguards gap: ${gapReason}`);
  if (isConflictProximity) governanceFlags.push(CONFLICT_FLAG_LABEL);
  if (plant.status === 'suspended') governanceFlags.push('Facility currently suspended');
  if (plant.status === 'shutdown' || plant.status === 'decommissioned') {
    governanceFlags.push('In decommissioning');
  }
  // No flag for digital I&C alone — having digital I&C without an incident is expected
  if (hasCyberIncident) {
    governanceFlags.push(`${cyberIncident.label} (${cyberIncident.year})`);
  }
  if (cData.post_fukushima_trajectory === 'accelerated_phase_out') {
    governanceFlags.push('Host country in accelerated nuclear phase-out');
  }

  return {
    ...plant,
    sources: cyberIncident ? [...(plant.sources || []), cyberIncident.source] : plant.sources,
    // Facility type
    facility_type: plant.status === 'shutdown' || plant.status === 'decommissioned' ? 'dismantled' : 'reactor',
    // Governance
    regulatory_body: cData.regulatory_body || null,
    safeguards_status: cData.safeguards_status || null,
    last_inspection_year: null, // Specific IAEA inspection years not publicly available per-facility
    operational_status: mapOperationalStatus(plant.status),
    grid_connectivity: plant.status === 'operating' || plant.status === 'suspended',
    seismic_zone: seismicZone,
    proximity_conflict: isConflictProximity,
    treaty_obligations: cData.treaty_obligations || [],
    governance_risk_score: riskScore,
    governance_flags: governanceFlags,
    safeguards_gap: Boolean(gapReason),
    safeguards_gap_reason: gapReason,
    // Every policy and safeguards field comes from the country tables, as of this date
    country_data_as_of: COUNTRY_DATA_AS_OF,
    pris_country_url: cData.iso_code ? `https://pris-stats.iaea.org/country-statistics/${cData.iso_code}` : null,
    cnpp_profile_url: cData.iaea_profile || null,
    // Post-Fukushima
    post_fukushima_policy_change: cData.post_fukushima_policy_change || false,
    stress_test_conducted: cData.stress_test_conducted ?? null,
    evacuation_plan_status: cData.evacuation_plan_status || 'unknown',
    community_consent_mechanism: cData.community_consent_mechanism || 'unknown',
    // Cyber-nuclear
    digital_i_and_c: isDigital,
    digital_i_and_c_note: digitalICNotes[plant.id] || null,
    reported_cyber_incident: hasCyberIncident || null,
    cyber_incident: cyberIncident,
    critical_infrastructure_overlap: hasInfraOverlap,
    // Soviet-era (only populated where applicable)
    soviet_era_design: sovietData ? sovietData.soviet_era_design : (isPostSoviet ? false : null),
    soviet_reactor_type: sovietData ? sovietData.soviet_reactor_type : null,
    decommissioning_liability_status: sovietData ? sovietData.decommissioning_liability_status : null,
    bilateral_agreement_with_russia: sovietData ? sovietData.bilateral_agreement_with_russia : null,
    is_post_soviet: isPostSoviet,
    // Country governance reference
    country_governance: cData,
  };
});

// ── Computed summary statistics ─────────────────────────────────────────────
export const facilitySummary = {
  total: enrichedFacilities.length,
  safeguardsGaps: enrichedFacilities.filter(f => f.safeguards_gap).length,
  conflictProximity: enrichedFacilities.filter(f => f.proximity_conflict).length,
  decommissioning: enrichedFacilities.filter(f =>
    f.operational_status === 'decommissioning'
  ).length,
  digitalIandC: enrichedFacilities.filter(f => f.digital_i_and_c).length,
  digitalNoCyberAudit: enrichedFacilities.filter(f =>
    f.digital_i_and_c && !f.reported_cyber_incident
  ).length,
  highRisk: enrichedFacilities.filter(f => f.governance_risk_score >= 4).length,
  postSoviet: enrichedFacilities.filter(f => f.is_post_soviet).length,
};

export default enrichedFacilities;
