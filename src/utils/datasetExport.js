// Versioned, client-side dataset exports for verifiers.
// Files are generated in the browser from the same data modules the site uses.
import { commercialPlants } from '../data/commercialPlants';

// Bump DATASET_VERSION and DATASET_LAST_UPDATED whenever plant records change.
// DATASET_LAST_UPDATED is the date of the last change to src/data/commercialPlants.js.
export const DATASET_VERSION = '1.0.0';
export const DATASET_LAST_UPDATED = '2026-03-07';
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
    lastUpdated: DATASET_LAST_UPDATED,
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
);

export function plantsCsv() {
  return csvWithMeta(plantsMeta, PLANT_COLUMNS, commercialPlants.map(plantRow));
}

export function plantsJson() {
  return JSON.stringify({ meta: plantsMeta, records: commercialPlants }, null, 2);
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
