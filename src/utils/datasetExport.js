// Versioned, client-side dataset exports for verifiers.
// Files are generated in the browser from the same data modules the site uses.
import { commercialPlants } from '../data/commercialPlants';
import { enrichedFacilities, SAFEGUARDS_GAP_DEFINITION, CONFLICT_RULE_TEXT, conflictRule } from '../data/enrichedFacilities';
import { COUNTRY_DATA_AS_OF } from '../data/countryGovernance';

// Bump DATASET_VERSION and DATASET_LAST_UPDATED whenever plant records change.
// DATASET_LAST_UPDATED is the date of the last change to the data or code (codeLastChanged in the
// export metadata). When each record was last reviewed is a separate date (recordsLastReviewed).
export const DATASET_VERSION = '1.3.0';
export const DATASET_LAST_UPDATED = '2026-10-29';
export const SITE_URL = 'https://globalnuclearinfrastructureatlas.vercel.app';

export const PLANT_COLUMNS = [
  { key: 'id', description: 'Stable record identifier.' },
  { key: 'name', description: 'Plant (site) name.' },
  { key: 'country', description: 'Country.' },
  { key: 'region', description: 'World region used for filtering.' },
  { key: 'lat', description: 'Latitude of the site (decimal degrees).' },
  { key: 'lng', description: 'Longitude of the site (decimal degrees).' },
  { key: 'status', description: 'operating, under_construction, shutdown, suspended or planned.' },
  { key: 'reactorType', description: 'Reactor technology at the site.' },
  { key: 'units', description: 'Number of reactor units at the site.' },
  { key: 'netCapacityMW', description: 'Net electrical capacity of the site in MW.' },
  { key: 'operator', description: 'Operating company or authority.' },
  { key: 'firstPower', description: 'Year of first grid connection.' },
  { key: 'record_last_updated', description: 'Date the record was last reviewed.' },
  { key: 'source_count', description: 'Number of sources cited for the record.' },
  { key: 'source_names', description: 'Source names, separated by " | ".' },
  { key: 'source_urls', description: 'Source URLs in the same order, separated by " | ".' },
  { key: 'source_types', description: 'Source types in the same order, separated by " | ".' },
  { key: 'overview', description: 'Short descriptive note.' },
  { key: 'governance_risk_score', description: 'Rule-based score 1-5; rules on the Methodology page.' },
  { key: 'governance_score_rules', description: 'Score rules that applied to this plant, with points, separated by " | ".' },
  { key: 'governance_flags', description: 'Descriptive flags (not all are scored), separated by " | ".' },
  { key: 'safeguards_status', description: 'Host-state safeguards agreement (country level, as of country_data_as_of).' },
  { key: 'safeguards_gap', description: 'true when facility-specific safeguards only, or a CSA without an Additional Protocol in force.' },
  { key: 'safeguards_gap_reason', description: 'Which of the two conditions applies.' },
  { key: 'safeguards_note', description: 'Dated note on the host-state safeguards situation, with its source named.' },
  { key: 'proximity_conflict', description: 'UCDP conflict exposure: at least 5 events or 25 deaths within 100 km in the extract window.' },
  { key: 'conflict_events_100km', description: 'UCDP events within 100 km in the extract window.' },
  { key: 'conflict_fatalities_100km', description: 'UCDP best-estimate deaths within 100 km in the extract window.' },
  { key: 'conflict_state_based', description: 'Of those events, state-based violence.' },
  { key: 'conflict_non_state', description: 'Of those events, non-state violence.' },
  { key: 'conflict_one_sided', description: 'Of those events, one-sided violence.' },
  { key: 'conflict_window', description: 'Extract window (start/end dates).' },
  { key: 'conflict_extract_date', description: 'Date the UCDP extract was made.' },
  { key: 'seismic_zone', description: 'Seismic zone (facility override or country default; uncited).' },
  { key: 'digital_i_and_c', description: 'Digital instrumentation and control (inferred from design).' },
  { key: 'reported_cyber_incident', description: 'A documented cyber incident names this site.' },
  { key: 'critical_infrastructure_overlap', description: 'Host state is a target in the Cyber Escalation Atlas.' },
  { key: 'post_fukushima_policy_change', description: 'Host-state policy change since 2011 (country level).' },
  { key: 'evacuation_plan_status', description: 'Host-state evacuation planning (country level).' },
  { key: 'country_data_as_of', description: 'Date of the country-level policy and safeguards fields (the entry\'s own review date where it has one).' },
  { key: 'pris_country_url', description: 'IAEA PRIS country statistics page.' },
  { key: 'cnpp_profile_url', description: 'IAEA Country Nuclear Power Profile.' },
];

function plantRow(p) {
  const sources = p.sources || [];
  return {
    id: p.id,
    name: p.name,
    country: p.country,
    region: p.region,
    lat: p.lat,
    lng: p.lng,
    status: p.status,
    reactorType: p.reactorType,
    units: p.units,
    netCapacityMW: p.netCapacityMW,
    operator: p.operator,
    firstPower: p.firstPower,
    record_last_updated: p.lastUpdated,
    source_count: sources.length,
    source_names: sources.map((s) => s.name).join(' | '),
    source_urls: sources.map((s) => s.url || '').join(' | '),
    source_types: sources.map((s) => s.type || '').join(' | '),
    overview: p.overview,
    governance_risk_score: p.governance_risk_score,
    governance_score_rules: (p.governance_score_rules || []).join(' | '),
    governance_flags: (p.governance_flags || []).join(' | '),
    safeguards_status: p.safeguards_status,
    safeguards_gap: p.safeguards_gap,
    safeguards_gap_reason: p.safeguards_gap_reason,
    safeguards_note: p.safeguards_note,
    proximity_conflict: p.proximity_conflict,
    conflict_events_100km: p.conflict_events_100km,
    conflict_fatalities_100km: p.conflict_fatalities_100km,
    conflict_state_based: p.conflict_violence_types.stateBased,
    conflict_non_state: p.conflict_violence_types.nonState,
    conflict_one_sided: p.conflict_violence_types.oneSided,
    conflict_window: p.conflict_window,
    conflict_extract_date: p.conflict_extract_date,
    seismic_zone: p.seismic_zone,
    digital_i_and_c: p.digital_i_and_c,
    reported_cyber_incident: Boolean(p.reported_cyber_incident),
    critical_infrastructure_overlap: p.critical_infrastructure_overlap,
    post_fukushima_policy_change: p.post_fukushima_policy_change,
    evacuation_plan_status: p.evacuation_plan_status,
    country_data_as_of: p.country_data_as_of,
    pris_country_url: p.pris_country_url,
    cnpp_profile_url: p.cnpp_profile_url,
  };
}

function csvCell(v) {
  if (v === null || v === undefined) return '';
  const s = String(v);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export function buildMeta(dataset, recordCount, extra = {}) {
  return {
    dataset,
    version: DATASET_VERSION,
    codeLastChanged: DATASET_LAST_UPDATED,
    recordCount,
    source: `${SITE_URL}/data`,
    ...extra,
  };
}

function csvWithMeta(meta, columns, rows) {
  const head = Object.entries(meta).map(([k, v]) => `# ${k}: ${v}`);
  const header = columns.map((c) => c.key).join(',');
  const body = rows.map((r) => columns.map((c) => csvCell(r[c.key])).join(','));
  return [...head, header, ...body].join('\n');
}

export const plantsMeta = buildMeta(
  'Global Nuclear Infrastructure Atlas: commercial nuclear power plants',
  commercialPlants.length,
  {
    recordsLastReviewed: commercialPlants.map((p) => p.lastUpdated).filter(Boolean).sort().at(-1),
    countryDataAsOf: `${COUNTRY_DATA_AS_OF} (entries reviewed later carry their own date in country_data_as_of)`,
    safeguardsGapDefinition: SAFEGUARDS_GAP_DEFINITION,
    conflictExposureRule: CONFLICT_RULE_TEXT,
    conflictData: `UCDP GED 26.1 and Candidate Events (CC BY 4.0), extract ${conflictRule.extractDate}`,
  },
);

export function plantsCsv() {
  return csvWithMeta(plantsMeta, PLANT_COLUMNS, enrichedFacilities.map(plantRow));
}

export function plantsJson() {
  // Full enriched records, without the nested copy of the country table.
  const records = enrichedFacilities.map(({ country_governance, ...rest }) => rest); // eslint-disable-line no-unused-vars
  return JSON.stringify({ meta: plantsMeta, records }, null, 2);
}

export function downloadText(filename, content, mime) {
  const blob = new Blob([content], { type: `${mime};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Source coverage summary shown on the Data page. */
export function sourceCoverage() {
  const withSource = commercialPlants.filter((p) => (p.sources || []).length > 0);
  const genericOnly = commercialPlants.filter(
    (p) => (p.sources || []).length > 0 && p.sources.every((s) => /pris/i.test(s.name)),
  );
  return {
    total: commercialPlants.length,
    withSource: withSource.length,
    withoutSource: commercialPlants.length - withSource.length,
    genericOnly: genericOnly.length,
  };
}
