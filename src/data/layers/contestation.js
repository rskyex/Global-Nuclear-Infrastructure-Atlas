/**
 * Layer 2 — Categorical Contestation (dual-use) (seed)
 *
 * PROVISIONAL DATA. Surfaces facilities that different authorities classify
 * differently — typically a self-declared "peaceful / research" character versus
 * an externally assessed potential military relevance. A facility is `contested`
 * when its classifications disagree. Each classification carries its own
 * provenance so the popup can show who asserts what.
 *
 * INTENDED REAL SOURCES (swap-in targets):
 *   - IAEA Board of Governors reports & safeguards statements .. https://www.iaea.org
 *   - State declarations to the IAEA (self-classification)
 *   - UNODA / open-source proliferation assessments
 *
 * Coordinates are approximate public locations, included only to place a marker;
 * every record is flagged `provisional: true` and shown with a "sample data"
 * indicator. This layer is interpretive: it maps a documented *disagreement*,
 * not an adjudication of who is correct.
 *
 * @typedef {Object} Classification
 * @property {string} authority   Who asserts this category.
 * @property {string} category    The asserted classification.
 * @property {import('../provenance').Provenance} provenance
 *
 * @typedef {Object} ContestationRecord
 * @property {string} facilityId
 * @property {string} name
 * @property {string} country
 * @property {number} lat
 * @property {number} lng
 * @property {Classification[]} classifications
 * @property {boolean} contested
 * @property {string} [note]
 * @property {boolean} provisional
 */

import { prov, SOURCES } from '../provenance';

const SELF = (authority) => prov(`${authority} (self-declared)`, { confidence: 'declared' });
const IAEA = prov('IAEA Board of Governors', { sourceUrl: SOURCES.IAEA, confidence: 'disputed' });
const ASSESS = prov('Open-source assessment', { confidence: 'disputed' });

/** @type {ContestationRecord[]} */
const RECORDS = [
  {
    facilityId: 'ir-natanz',
    name: 'Natanz Enrichment Complex',
    country: 'Iran',
    lat: 33.7225, lng: 51.7269,
    classifications: [
      { authority: 'Iran', category: 'Peaceful civil enrichment (declared under CSA)', provenance: SELF('Iran') },
      { authority: 'IAEA / Board', category: 'Subject to verification concerns; enrichment to 60% noted', provenance: IAEA },
    ],
    note: 'Declared, safeguarded facility; classification of intent is disputed, not the activity itself.',
    provisional: true,
  },
  {
    facilityId: 'ir-fordow',
    name: 'Fordow Fuel Enrichment Plant',
    country: 'Iran',
    lat: 34.8847, lng: 50.9939,
    classifications: [
      { authority: 'Iran', category: 'Civil enrichment facility', provenance: SELF('Iran') },
      { authority: 'External assessments', category: 'Hardened site of proliferation concern', provenance: ASSESS },
    ],
    provisional: true,
  },
  {
    facilityId: 'il-dimona',
    name: 'Negev Nuclear Research Center (Dimona)',
    country: 'Israel',
    lat: 31.0008, lng: 35.1447,
    classifications: [
      { authority: 'Israel', category: 'Nuclear research center', provenance: SELF('Israel') },
      { authority: 'External assessments', category: 'Plutonium production associated with weapons programme', provenance: ASSESS },
    ],
    note: 'Israel maintains nuclear opacity; not an NPT party. Classification is externally inferred.',
    provisional: true,
  },
  {
    facilityId: 'kp-yongbyon',
    name: 'Yongbyon Nuclear Scientific Research Center',
    country: 'North Korea',
    lat: 39.7975, lng: 125.7553,
    classifications: [
      { authority: 'DPRK', category: 'Scientific research center', provenance: SELF('DPRK') },
      { authority: 'IAEA / external', category: 'Plutonium & enrichment for weapons programme', provenance: IAEA },
    ],
    note: 'North Korea withdrew from the NPT; IAEA inspectors were expelled.',
    provisional: true,
  },
  {
    facilityId: 'pk-kahuta',
    name: 'Kahuta (Khan Research Laboratories)',
    country: 'Pakistan',
    lat: 33.6167, lng: 73.4000,
    classifications: [
      { authority: 'Pakistan', category: 'Research laboratories', provenance: SELF('Pakistan') },
      { authority: 'External assessments', category: 'Uranium enrichment for weapons programme', provenance: ASSESS },
    ],
    note: 'Pakistan is outside the NPT; the facility is unsafeguarded.',
    provisional: true,
  },
];

/** Mark contested = classifications carry more than one distinct category. */
function isContested(rec) {
  return new Set(rec.classifications.map((c) => c.category)).size > 1;
}

let cache = null;

/** @returns {ContestationRecord[]} */
export function getContestationData() {
  if (cache) return cache;
  cache = RECORDS.map((r) => ({ ...r, contested: isContested(r) }));
  return cache;
}
