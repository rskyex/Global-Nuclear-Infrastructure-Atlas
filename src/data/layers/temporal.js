/**
 * Layer 6 — Temporal Trajectory (derived seed)
 *
 * Cross-cutting layer that animates build-out, shutdowns, and accidents over
 * time. It derives time-stamped entities from existing data:
 *   - reactors  → first-power year (build-out) from commercialPlants.firstPower
 *   - accidents → accidentDate from accidents.js
 * plus a small curated set of notable shutdown years (phase-outs), flagged
 * provisional because per-unit shutdown dates are not carried in the core
 * dataset yet.
 *
 * INTENDED REAL SOURCE (swap-in target):
 *   - IAEA PRIS per-unit construction / first-grid / permanent-shutdown dates.
 *     https://pris.iaea.org/
 *
 * The selected year (URL param `t`) drives visibility of dated features here and
 * is threaded into other layers' render context so they can compose with time
 * (e.g. the oversight gradient at a chosen year).
 */

import { enrichedFacilities } from '../enrichedFacilities';
import { accidentSites } from '../accidents';

export const TEMPORAL_RANGE = { min: 1954, max: 2024 };

/**
 * Curated notable permanent shutdowns (site-level, approximate year), so
 * phase-outs visibly diverge from build-out. Keyed by enriched facility id.
 * Provisional — replace with PRIS per-unit shutdown dates.
 */
const SHUTDOWN_YEARS = {
  'de-grafenrheinfeld': 2015,
  'de-gundremmingen': 2021,
  'de-grohnde': 2021,
  'de-brokdorf': 2021,
  'de-isar': 2023,
  'de-neckarwestheim': 2023,
  'de-emsland': 2023,
  'fr-fessenheim': 2020,
  'jp-fukushima-daiichi': 2011,
  'lt-ignalina': 2009,
  'us-indian-point': 2021,
  'se-barseback': 2005,
};

let reactorCache = null;

/**
 * @typedef {Object} TemporalReactor
 * @property {string} id
 * @property {string} name
 * @property {string} country
 * @property {number} lat
 * @property {number} lng
 * @property {number} firstPower
 * @property {number|null} shutdownYear
 * @property {string} status
 * @property {boolean} provisional
 */

/** @returns {TemporalReactor[]} */
export function getTemporalReactors() {
  if (reactorCache) return reactorCache;
  reactorCache = enrichedFacilities
    .filter((f) => Number.isFinite(f.lat) && Number.isFinite(f.lng) && Number.isFinite(f.firstPower))
    .map((f) => ({
      id: f.id,
      name: f.name,
      country: f.country,
      lat: f.lat,
      lng: f.lng,
      firstPower: f.firstPower,
      shutdownYear: SHUTDOWN_YEARS[f.id] ?? null,
      status: f.status,
      provisional: f.id in SHUTDOWN_YEARS, // only the shutdown year is provisional; first-power is from PRIS
    }));
  return reactorCache;
}

let accidentCache = null;

/**
 * @typedef {Object} TemporalAccident
 * @property {string} id
 * @property {string} name
 * @property {number} lat
 * @property {number} lng
 * @property {number} year
 * @property {number} inesLevel
 */

/** @returns {TemporalAccident[]} */
export function getTemporalAccidents() {
  if (accidentCache) return accidentCache;
  accidentCache = accidentSites
    .filter((a) => a.accidentDate && Number.isFinite(a.lat) && Number.isFinite(a.lng))
    .map((a) => ({
      id: a.id,
      name: a.name,
      lat: a.lat,
      lng: a.lng,
      year: Number(String(a.accidentDate).slice(0, 4)),
      inesLevel: a.inesLevel ?? null,
    }))
    .filter((a) => Number.isFinite(a.year));
  return accidentCache;
}

/**
 * Visibility/state of a dated reactor at a given year.
 * @returns {'future'|'operating'|'new'|'shutdown'}
 */
export function reactorStateAt(reactor, year) {
  if (reactor.firstPower > year) return 'future';
  if (reactor.shutdownYear && reactor.shutdownYear <= year) return 'shutdown';
  if (year - reactor.firstPower <= 2) return 'new';
  return 'operating';
}
