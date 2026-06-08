/**
 * Layer 1 — Oversight Gradient (safeguards) (seed/derived)
 *
 * Classifies each civilian facility onto an ordinal ramp describing the *type*
 * of IAEA safeguards authority that reaches it. There is no public,
 * per-facility "safeguards status" feed, so this classification is DERIVED from
 * the host state's safeguards agreement (carried in countryGovernance.js) plus
 * a small set of state-category rules. It is therefore flagged
 * `provisional: true` and shown with a "sample data" indicator.
 *
 * INTENDED REAL SOURCE (swap-in target):
 *   - IAEA Safeguards Agreements & Additional Protocol status, and the IAEA
 *     Annual Safeguards Implementation Report.
 *     https://www.iaea.org/topics/safeguards-agreements
 *
 * The ramp is ordinal from most → least intrusive verification authority:
 *   comprehensive  (INFCIRC/153 CSA)        — all declared material verifiable
 *   voluntary_offer (VOA, weapon states)    — only offered facilities inspected
 *   item_specific  (INFCIRC/66-type)        — only specific items/facilities
 *   none                                    — no agreement in force
 *   unknown
 */

import { enrichedFacilities } from '../enrichedFacilities';
import { prov, SOURCES } from '../provenance';

/** NPT nuclear-weapon states — hold voluntary-offer agreements. */
const WEAPON_STATES = new Set(['United States', 'Russia', 'United Kingdom', 'France', 'China']);
/** Outside the NPT — covered (if at all) by item-specific INFCIRC/66-type safeguards. */
const NON_NPT_STATES = new Set(['India', 'Pakistan', 'Israel', 'North Korea']);

/**
 * Ordinal ramp metadata. `rank` drives the colour ramp and legend order; the
 * `permits` / `excludes` text powers the tooltip explaining what each status
 * does and does not let inspectors see.
 */
export const SAFEGUARDS_RAMP = {
  comprehensive: {
    rank: 0,
    label: 'Comprehensive safeguards (CSA, INFCIRC/153)',
    short: 'Comprehensive (CSA)',
    color: '#10b981',
    permits: 'IAEA may verify all declared nuclear material in the state. With an Additional Protocol in force, inspectors can also pursue indications of undeclared material and activities.',
    excludes: 'Without an Additional Protocol, detection of undeclared activities is limited to declared sites.',
  },
  voluntary_offer: {
    rank: 1,
    label: 'Voluntary-offer agreement (weapon state)',
    short: 'Voluntary-offer',
    color: '#3b82f6',
    permits: 'IAEA may inspect only the civilian facilities the state has voluntarily offered from an eligible list.',
    excludes: 'Military and weapons-related facilities are outside safeguards entirely; the IAEA cannot compel access.',
  },
  item_specific: {
    rank: 2,
    label: 'Item-specific safeguards (INFCIRC/66-type)',
    short: 'Item-specific',
    color: '#f59e0b',
    permits: 'IAEA verifies only the specific facilities, equipment, or material named in the agreement (typically supplied under a civil cooperation deal).',
    excludes: 'The state\'s wider nuclear programme — including unsafeguarded facilities — is not covered.',
  },
  none: {
    rank: 3,
    label: 'No safeguards agreement in force',
    short: 'None',
    color: '#ef4444',
    permits: 'Nothing — the IAEA has no verification authority over these activities.',
    excludes: 'All activities at the facility.',
  },
  unknown: {
    rank: 4,
    label: 'Status unknown',
    short: 'Unknown',
    color: '#6b7280',
    permits: 'Not determined from public sources.',
    excludes: 'Not determined.',
  },
};

/**
 * Derive the ordinal safeguards class for one facility.
 * @returns {keyof typeof SAFEGUARDS_RAMP}
 */
function classify(facility) {
  const country = facility.country;
  const s = facility.safeguards_status || '';

  if (WEAPON_STATES.has(country)) return 'voluntary_offer';
  if (NON_NPT_STATES.has(country)) return 'item_specific';

  const gov = facility.country_governance || {};
  if (gov.npt_status === 'party') {
    if (/CSA|153|Additional Protocol|EURATOM/i.test(s) || s) return 'comprehensive';
    return 'comprehensive';
  }
  if (gov.npt_status === 'withdrew' || gov.npt_status === 'non_party') return 'none';
  return 'unknown';
}

/**
 * @typedef {Object} OversightRecord
 * @property {string} facilityId
 * @property {string} name
 * @property {string} country
 * @property {number} lat
 * @property {number} lng
 * @property {keyof typeof SAFEGUARDS_RAMP} safeguardsStatus
 * @property {boolean} additionalProtocol
 * @property {import('../provenance').Provenance[]} provenance
 * @property {boolean} provisional
 */

let cache = null;

/** @returns {OversightRecord[]} */
export function getOversightData() {
  if (cache) return cache;
  cache = enrichedFacilities
    .filter((f) => Number.isFinite(f.lat) && Number.isFinite(f.lng))
    .map((f) => ({
      facilityId: f.id,
      name: f.name,
      country: f.country,
      lat: f.lat,
      lng: f.lng,
      status: f.status,
      safeguardsStatus: classify(f),
      additionalProtocol: Boolean(f.country_governance?.additional_protocol),
      countrySafeguardsText: f.safeguards_status || null,
      provenance: [
        prov('IAEA Safeguards Agreements', { sourceUrl: SOURCES.IAEA_NPT_SG, confidence: 'estimated' }),
        prov('UNODA Treaty Database', { sourceUrl: SOURCES.UNODA, confidence: 'declared' }),
      ],
      provisional: true,
    }));
  return cache;
}

/** Legend rows in ramp order. */
export const OVERSIGHT_LEGEND = Object.entries(SAFEGUARDS_RAMP)
  .sort((a, b) => a[1].rank - b[1].rank)
  .map(([key, v]) => ({ key, color: v.color, label: v.short }));
