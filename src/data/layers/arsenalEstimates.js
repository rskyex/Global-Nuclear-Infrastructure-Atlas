/**
 * Layer 3 — Estimate Range & Provenance (arsenals) (seed)
 *
 * PROVISIONAL DATA. Replaces the single point figure in arsenalData.js with a
 * per-source estimate so the uncertainty is first-class: each entry is one
 * research body's published estimate, and the rendered band spans the spread
 * across sources. Warhead totals are NOT officially confirmed by most states.
 *
 * INTENDED REAL SOURCES (swap-in targets):
 *   - SIPRI Yearbook (annual world nuclear forces) ... https://www.sipri.org/yearbook
 *   - FAS Nuclear Notebook ........................... https://fas.org/issues/nuclear-weapons/status-world-nuclear-forces/
 *   - IISS Military Balance (where published)
 *
 * Figures are rounded public estimates (≈2023) curated for illustration; until
 * the live datasets are wired in, every record is flagged `provisional: true`
 * and shown with a "sample data" indicator and a "figures are contested
 * estimates" caption. Where a source disagrees with another the spread is shown
 * rather than collapsed to one number.
 *
 * @typedef {Object} Estimate
 * @property {string} source
 * @property {string} [sourceUrl]
 * @property {number} low
 * @property {number} high
 * @property {string} asOf
 * @property {'declared'|'estimated'|'disputed'} [confidence]
 */

import arsenalData from '../arsenalData';
import { SOURCES } from '../provenance';

const SIPRI = { source: 'SIPRI Yearbook 2023', sourceUrl: SOURCES.SIPRI, confidence: 'estimated' };
const FAS = { source: 'FAS Nuclear Notebook', sourceUrl: SOURCES.FAS, confidence: 'estimated' };
const IISS = { source: 'IISS (independent estimate)', confidence: 'disputed' };

/** Per-source total-inventory estimates, keyed by arsenalData id. */
const ESTIMATES = {
  usa: [
    { ...SIPRI, low: 5244, high: 5244, asOf: '2023' },
    { ...FAS, low: 5044, high: 5044, asOf: '2024' },
  ],
  russia: [
    { ...SIPRI, low: 5889, high: 5889, asOf: '2023' },
    { ...FAS, low: 5580, high: 5580, asOf: '2024' },
  ],
  uk: [
    { ...SIPRI, low: 225, high: 225, asOf: '2023' },
    { ...FAS, low: 225, high: 225, asOf: '2024' },
  ],
  france: [
    { ...SIPRI, low: 290, high: 290, asOf: '2023' },
    { ...FAS, low: 290, high: 290, asOf: '2024' },
  ],
  china: [
    { ...SIPRI, low: 410, high: 410, asOf: '2023' },
    { ...FAS, low: 438, high: 438, asOf: '2024' },
    { ...IISS, low: 410, high: 500, asOf: '2023' },
  ],
  india: [
    { ...SIPRI, low: 164, high: 164, asOf: '2023' },
    { ...FAS, low: 172, high: 172, asOf: '2024' },
  ],
  pakistan: [
    { ...SIPRI, low: 170, high: 170, asOf: '2023' },
    { ...FAS, low: 170, high: 170, asOf: '2024' },
  ],
  israel: [
    { ...SIPRI, low: 90, high: 90, asOf: '2023' },
    { ...FAS, low: 90, high: 90, asOf: '2024' },
  ],
  north_korea: [
    { ...SIPRI, low: 30, high: 30, asOf: '2023' },
    { ...FAS, low: 40, high: 50, asOf: '2024' },
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
 * @property {number} rangeLow    min across sources
 * @property {number} rangeHigh   max across sources
 * @property {boolean} provisional
 */

let cache = null;

/** @returns {ArsenalEstimateRecord[]} */
export function getArsenalEstimates() {
  if (cache) return cache;
  cache = arsenalData
    .filter((a) => ESTIMATES[a.id])
    .map((a) => {
      const estimates = ESTIMATES[a.id];
      const rangeLow = Math.min(...estimates.map((e) => e.low));
      const rangeHigh = Math.max(...estimates.map((e) => e.high));
      return {
        stateId: a.id,
        country: a.country,
        flag: a.flag,
        lat: a.lat,
        lng: a.lng,
        estimates,
        rangeLow,
        rangeHigh,
        provisional: true,
      };
    });
  return cache;
}

/** Distinct source labels, for the layer's "which sources" toggle. */
export const ESTIMATE_SOURCES = ['SIPRI Yearbook 2023', 'FAS Nuclear Notebook', 'IISS (independent estimate)'];
