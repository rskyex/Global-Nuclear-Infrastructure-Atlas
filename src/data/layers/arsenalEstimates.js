/**
 * Layer 3 — Estimate Range & Provenance (arsenals)
 *
 * REAL, SOURCED DATA (not provisional). Total-inventory warhead estimates for
 * the nine nuclear-armed states, as published by the two leading civil-society
 * sources for January 2025. Warhead totals are estimates — no state with the
 * exception of a few declarations confirms them officially — so each figure
 * carries `confidence: 'estimated'` and the layer renders a band, never a single
 * authoritative point.
 *
 * SOURCES (retrieved 2026-06-08):
 *   - FAS, "Status of World Nuclear Forces" / Nuclear Notebook 2025
 *     https://fas.org/initiative/status-world-nuclear-forces/  (figures as of Jan 2025)
 *   - SIPRI Yearbook 2025, ch. on World Nuclear Forces
 *     https://www.sipri.org/yearbook/2025/06  (figures as of Jan 2025)
 *
 * NOTE ON RANGES: FAS and SIPRI publish near-identical totals for 2025 (the same
 * researchers author both), so for most states the two sources converge to a
 * point — which is itself an honest finding. Genuine spread remains where the
 * underlying intelligence is weakest (notably North Korea); those wider ranges
 * are shown as a third, explicitly `disputed` estimate rather than collapsed.
 *
 * @typedef {Object} Estimate
 * @property {string} source
 * @property {string} sourceId
 * @property {string} [sourceUrl]
 * @property {number} low
 * @property {number} high
 * @property {string} asOf
 * @property {'declared'|'estimated'|'disputed'} confidence
 */

import arsenalData from '../arsenalData';
import { SOURCES } from '../provenance';

const FAS_URL = SOURCES.FAS;
const SIPRI_URL = 'https://www.sipri.org/yearbook/2025/06';

const fas = (n, extra = {}) => ({ source: 'FAS Nuclear Notebook 2025', sourceId: 'fas', sourceUrl: FAS_URL, low: n, high: n, asOf: '2025-01', confidence: 'estimated', ...extra });
const sipri = (n, extra = {}) => ({ source: 'SIPRI Yearbook 2025', sourceId: 'sipri', sourceUrl: SIPRI_URL, low: n, high: n, asOf: '2025-01', confidence: 'estimated', ...extra });

/** Source descriptors for the layer's "which sources" toggle (id-keyed for URL state). */
export const ESTIMATE_SOURCES = [
  { id: 'fas', label: 'FAS Nuclear Notebook 2025' },
  { id: 'sipri', label: 'SIPRI Yearbook 2025' },
  { id: 'other', label: 'Other assessments' },
];

/** Per-source total-inventory estimates (Jan 2025), keyed by arsenalData id. */
const ESTIMATES = {
  usa: [fas(5177), sipri(5177)],
  russia: [fas(5459), sipri(5459)],
  uk: [fas(225), sipri(225)],
  france: [fas(290), sipri(290)],
  china: [
    fas(600),
    sipri(600),
    { source: 'US DoD (projection)', sourceId: 'other', low: 600, high: 1000, asOf: '2024', confidence: 'disputed' },
  ],
  india: [fas(180), sipri(180)],
  pakistan: [fas(170), sipri(170)],
  israel: [fas(90), sipri(90)],
  north_korea: [
    fas(50),
    sipri(50),
    { source: 'Fissile-material-based assessments', sourceId: 'other', low: 50, high: 90, asOf: '2025', confidence: 'disputed' },
  ],
};

/**
 * @typedef {Object} ArsenalEstimateRecord
 * @property {string} stateId
 * @property {string} country
 * @property {string} flag
 * @property {number} lat
 * @property {number} lng
 * @property {Estimate[]} estimates
 * @property {boolean} provisional
 */

let cache = null;

/** @returns {ArsenalEstimateRecord[]} */
export function getArsenalEstimates() {
  if (cache) return cache;
  cache = arsenalData
    .filter((a) => ESTIMATES[a.id])
    .map((a) => ({
      stateId: a.id,
      country: a.country,
      flag: a.flag,
      lat: a.lat,
      lng: a.lng,
      estimates: ESTIMATES[a.id],
      provisional: false,
    }));
  return cache;
}
