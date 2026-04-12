/**
 * Enriched Facility Dataset — Governance, Safeguards, Cyber-Nuclear, Post-Fukushima
 *
 * This module maps over ALL commercial plants and adds governance-grade analytical fields.
 * Country-level data from countryGovernance.js. Facility-specific overrides below.
 *
 * Sources: IAEA PRIS, NTI Nuclear Security Index, ENSREG, ACLED, USGS, UNODA
 * Data policy: Public information only. Null where data is unavailable.
 */

import { commercialPlants } from './commercialPlants';
import countryGovernance from './countryGovernance';

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

// ── Seismic zone overrides by facility ──────────────────────────────────────
const seismicOverrides = {
  // Japan — all High
  'jp-takahama': 'High', 'jp-ohi': 'High', 'jp-mihama': 'High',
  'jp-genkai': 'High', 'jp-sendai': 'High', 'jp-ikata': 'High',
  'jp-kashiwazaki-kariwa': 'High', 'jp-onagawa': 'High', 'jp-shimane': 'High',
  'jp-hamaoka': 'High', 'jp-tsuruga': 'High', 'jp-tomari': 'High',
  'jp-tokai': 'High', 'jp-monju': 'High',
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
  'in-kudankulam': 'Moderate', 'in-tarapur': 'Moderate', 'in-kakrapar': 'Moderate',
  // Pakistan
  'pk-karachi': 'Moderate',
  // Taiwan (if applicable)
  // Slovenia
  'si-krsko': 'Moderate',
  // South Korea
  'kr-shin-kori': 'Moderate', 'kr-shin-wolsong': 'Moderate',
  'kr-hanbit': 'Moderate', 'kr-hanul': 'Moderate',
};

// ── Conflict proximity overrides ────────────────────────────────────────────
// True for facilities within 200km of active armed conflict (2024)
const conflictProximityFacilities = new Set([
  // Ukraine — all facilities due to ongoing conflict
  'ua-zaporizhzhia', 'ua-south-ukraine', 'ua-rivne', 'ua-khmelnytskyi',
  // Zaporizhzhia from the detailed facilities dataset
  'zaporizhzhia',
  // Armenia — Nagorno-Karabakh proximity
  'am-metsamor',
  // Russia — near Ukraine border
  'ru-kursk', 'ru-novovoronezh',
  // Pakistan — various internal conflicts
  'pk-karachi',
]);

// ── Digital I&C assessment ──────────────────────────────────────────────────
// Newer designs and major upgrades have digital I&C
const digitalICFacilities = new Set([
  // AP1000 (digital by design)
  'us-vogtle', 'cn-sanmen', 'cn-haiyang',
  // EPR (digital by design)
  'fr-flamanville', 'fi-olkiluoto', 'cn-taishan', 'uk-hinkley-point-c',
  // APR1400 (digital by design)
  'kr-shin-kori', 'ae-barakah',
  // VVER-1200 (digital by design)
  'ru-leningrad-ii', 'ru-novovoronezh-ii', 'by-ostrovets',
  'bd-rooppur', 'tr-akkuyu', 'eg-el-dabaa', 'hu-paks-ii',
  // Chinese Hualong One
  'cn-fuqing', 'cn-karachi-coastal',
  // HTR-PM
  'cn-shidaowan',
  // Recent builds with digital systems
  'kr-shin-wolsong',
  // Major digital upgrades
  'us-palo-verde', 'us-south-texas',
]);

// ── Reported cyber incidents ────────────────────────────────────────────────
// Only documented public incidents
const cyberIncidentFacilities = new Set([
  // 2003 — Davis-Besse Slammer worm (US) — no specific ID in our data but illustrative
  // 2010 — Stuxnet affected Iran's enrichment, not Bushehr reactor directly
  // 2016 — Gundremmingen malware found (Germany) — plant shut down 2021
  // South Korea — 2014 Korea Hydro & Nuclear Power hack
  'kr-shin-kori', 'kr-hanbit', 'kr-hanul', 'kr-shin-wolsong',
]);

// ── Critical infrastructure overlap with Cyber Atlas ────────────────────────
const criticalInfraOverlapCountries = new Set([
  'United States', 'United Kingdom', 'France', 'Germany', 'Ukraine',
  'Japan', 'South Korea', 'Russia', 'China', 'India',
]);

// ── Soviet-era reactor identification ───────────────────────────────────────
const sovietEraDesigns = {
  'ua-zaporizhzhia': { soviet_era_design: true, soviet_reactor_type: 'VVER-1000', decommissioning_liability_status: 'unresolved', bilateral_agreement_with_russia: 'lapsed' },
  'ua-south-ukraine': { soviet_era_design: true, soviet_reactor_type: 'VVER-1000', decommissioning_liability_status: 'unresolved', bilateral_agreement_with_russia: 'lapsed' },
  'ua-rivne': { soviet_era_design: true, soviet_reactor_type: 'VVER-440/VVER-1000', decommissioning_liability_status: 'unresolved', bilateral_agreement_with_russia: 'lapsed' },
  'ua-khmelnytskyi': { soviet_era_design: true, soviet_reactor_type: 'VVER-1000', decommissioning_liability_status: 'unresolved', bilateral_agreement_with_russia: 'lapsed' },
  'am-metsamor': { soviet_era_design: true, soviet_reactor_type: 'VVER-440', decommissioning_liability_status: 'underfunded', bilateral_agreement_with_russia: 'current' },
  'by-ostrovets': { soviet_era_design: false, soviet_reactor_type: null, decommissioning_liability_status: 'unknown', bilateral_agreement_with_russia: 'current' },
  'ru-kursk': { soviet_era_design: true, soviet_reactor_type: 'RBMK-1000', decommissioning_liability_status: 'funded', bilateral_agreement_with_russia: null },
  'ru-leningrad': { soviet_era_design: true, soviet_reactor_type: 'RBMK-1000', decommissioning_liability_status: 'funded', bilateral_agreement_with_russia: null },
  'ru-smolensk': { soviet_era_design: true, soviet_reactor_type: 'RBMK-1000', decommissioning_liability_status: 'funded', bilateral_agreement_with_russia: null },
  'ru-novovoronezh': { soviet_era_design: true, soviet_reactor_type: 'VVER-440/VVER-1000', decommissioning_liability_status: 'funded', bilateral_agreement_with_russia: null },
  'ru-kalinin': { soviet_era_design: true, soviet_reactor_type: 'VVER-1000', decommissioning_liability_status: 'funded', bilateral_agreement_with_russia: null },
  'ru-balakovo': { soviet_era_design: true, soviet_reactor_type: 'VVER-1000', decommissioning_liability_status: 'funded', bilateral_agreement_with_russia: null },
  'ru-rostov': { soviet_era_design: true, soviet_reactor_type: 'VVER-1000', decommissioning_liability_status: 'funded', bilateral_agreement_with_russia: null },
  'ru-beloyarsk': { soviet_era_design: true, soviet_reactor_type: 'BN-800', decommissioning_liability_status: 'funded', bilateral_agreement_with_russia: null },
  'ru-kola': { soviet_era_design: true, soviet_reactor_type: 'VVER-440', decommissioning_liability_status: 'funded', bilateral_agreement_with_russia: null },
  'ru-leningrad-ii': { soviet_era_design: false, soviet_reactor_type: null, decommissioning_liability_status: 'funded', bilateral_agreement_with_russia: null },
  'ru-novovoronezh-ii': { soviet_era_design: false, soviet_reactor_type: null, decommissioning_liability_status: 'funded', bilateral_agreement_with_russia: null },
  // Czech and Hungarian VVER reactors (Soviet-origin design, but not post-Soviet states)
  'cz-dukovany': { soviet_era_design: true, soviet_reactor_type: 'VVER-440', decommissioning_liability_status: 'funded', bilateral_agreement_with_russia: 'none' },
  'cz-temelin': { soviet_era_design: true, soviet_reactor_type: 'VVER-1000', decommissioning_liability_status: 'funded', bilateral_agreement_with_russia: 'none' },
  'hu-paks': { soviet_era_design: true, soviet_reactor_type: 'VVER-440', decommissioning_liability_status: 'funded', bilateral_agreement_with_russia: 'current' },
  'fi-loviisa': { soviet_era_design: true, soviet_reactor_type: 'VVER-440', decommissioning_liability_status: 'funded', bilateral_agreement_with_russia: 'none' },
  'bg-kozloduy': { soviet_era_design: true, soviet_reactor_type: 'VVER-1000', decommissioning_liability_status: 'funded', bilateral_agreement_with_russia: 'none' },
  'sk-mochovce': { soviet_era_design: true, soviet_reactor_type: 'VVER-440', decommissioning_liability_status: 'funded', bilateral_agreement_with_russia: 'none' },
  'sk-bohunice': { soviet_era_design: true, soviet_reactor_type: 'VVER-440', decommissioning_liability_status: 'funded', bilateral_agreement_with_russia: 'none' },
};

// Post-Soviet state country list
const postSovietStates = new Set([
  'Russia', 'Ukraine', 'Belarus', 'Armenia', 'Kazakhstan', 'Georgia',
  'Azerbaijan', 'Uzbekistan', 'Lithuania', 'Latvia', 'Estonia',
  'Tajikistan', 'Turkmenistan', 'Kyrgyzstan', 'Moldova',
]);

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
  const hasCyberIncident = cyberIncidentFacilities.has(plant.id);
  const hasInfraOverlap = criticalInfraOverlapCountries.has(plant.country);
  const isConflictProximity = conflictProximityFacilities.has(plant.id);
  const isPostSoviet = postSovietStates.has(plant.country);

  const riskScore = computeGovernanceRisk(plant, cData);

  // Build governance flags
  const governanceFlags = [];
  if (!cData.safeguards_status || cData.safeguards_status.includes('Facility-specific')) {
    governanceFlags.push('Partial or no comprehensive safeguards agreement');
  }
  if (isConflictProximity) governanceFlags.push('Within 200km of active conflict zone');
  if (plant.status === 'suspended') governanceFlags.push('Facility currently suspended');
  if (plant.status === 'shutdown' || plant.status === 'decommissioned') {
    governanceFlags.push('In decommissioning');
  }
  if (isDigital && !hasCyberIncident) {
    // No flag — having digital I&C without an incident is expected
  }
  if (isDigital && hasCyberIncident) {
    governanceFlags.push('Digital I&C with reported cyber incident');
  }
  if (cData.post_fukushima_trajectory === 'accelerated_phase_out') {
    governanceFlags.push('Host country in accelerated nuclear phase-out');
  }

  return {
    ...plant,
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
    // Post-Fukushima
    post_fukushima_policy_change: cData.post_fukushima_policy_change || false,
    stress_test_conducted: cData.stress_test_conducted ?? null,
    evacuation_plan_status: cData.evacuation_plan_status || 'unknown',
    community_consent_mechanism: cData.community_consent_mechanism || 'unknown',
    // Cyber-nuclear
    digital_i_and_c: isDigital,
    reported_cyber_incident: hasCyberIncident || null,
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
  safeguardsGaps: enrichedFacilities.filter(f =>
    f.safeguards_status && (f.safeguards_status.includes('Facility-specific') || !f.safeguards_status)
  ).length,
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
