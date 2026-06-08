/**
 * Layer 4 — Fuel Cycle Network (seed)
 *
 * PROVISIONAL DATA. Models the civil fuel cycle as a connected graph
 * (mining → conversion → enrichment → fabrication → reactor → reprocessing →
 * waste) rather than isolated points, so dual-use chokepoints — the
 * proliferation-sensitive enrichment and reprocessing steps — are visible as
 * network nodes. Coordinates are approximate public facility locations included
 * only to position nodes; this is a curated, representative subset, NOT an
 * exhaustive inventory.
 *
 * INTENDED REAL SOURCES (swap-in targets):
 *   - World Nuclear Association country & facility profiles .. https://world-nuclear.org
 *   - IAEA INFCIS / Nuclear Fuel Cycle Information System
 *
 * Every node/edge is part of a `provisional: true` dataset and surfaced with a
 * "sample data" indicator.
 *
 * @typedef {Object} FuelCycleNode
 * @property {string} id
 * @property {string} name
 * @property {'mining'|'conversion'|'enrichment'|'fabrication'|'reactor'|'reprocessing'|'waste'} stage
 * @property {string} stateId
 * @property {string} country
 * @property {number} lat
 * @property {number} lng
 * @property {string} [capacity]
 *
 * @typedef {Object} FuelCycleEdge
 * @property {string} from
 * @property {string} to
 * @property {'domestic'|'import'} type
 */

import { prov, SOURCES } from '../provenance';

/** Stage presentation metadata. `sensitive` marks the proliferation chokepoints. */
export const FUEL_STAGES = {
  mining: { label: 'Mining & milling', color: '#a8956a', order: 0, sensitive: false },
  conversion: { label: 'Conversion', color: '#0891b2', order: 1, sensitive: false },
  enrichment: { label: 'Enrichment', color: '#7c3aed', order: 2, sensitive: true },
  fabrication: { label: 'Fuel fabrication', color: '#059669', order: 3, sensitive: false },
  reactor: { label: 'Reactor', color: '#3b82f6', order: 4, sensitive: false },
  reprocessing: { label: 'Reprocessing', color: '#ef4444', order: 5, sensitive: true },
  waste: { label: 'Waste / storage', color: '#6b7280', order: 6, sensitive: false },
};

const PROVENANCE = [prov('World Nuclear Association', { sourceUrl: SOURCES.IAEA, confidence: 'estimated' })];

/** @type {FuelCycleNode[]} */
const NODES = [
  // Mining
  { id: 'kz-mine', name: 'Kazatomprom ISL mines', stage: 'mining', stateId: 'KZ', country: 'Kazakhstan', lat: 47.8, lng: 67.7, capacity: 'World\'s largest U producer' },
  { id: 'ca-cigar', name: 'Cigar Lake', stage: 'mining', stateId: 'CA', country: 'Canada', lat: 58.06, lng: -104.53 },
  // Conversion
  { id: 'fr-tricastin-conv', name: 'Orano Tricastin / Malvési (conversion)', stage: 'conversion', stateId: 'FR', country: 'France', lat: 44.33, lng: 4.73 },
  { id: 'ca-porthope', name: 'Cameco Port Hope', stage: 'conversion', stateId: 'CA', country: 'Canada', lat: 43.95, lng: -78.29 },
  { id: 'us-metropolis', name: 'Honeywell Metropolis', stage: 'conversion', stateId: 'US', country: 'United States', lat: 37.15, lng: -88.73 },
  // Enrichment (sensitive)
  { id: 'fr-georgesbesse', name: 'Orano Georges Besse II', stage: 'enrichment', stateId: 'FR', country: 'France', lat: 44.33, lng: 4.74 },
  { id: 'nl-almelo', name: 'Urenco Almelo', stage: 'enrichment', stateId: 'NL', country: 'Netherlands', lat: 52.36, lng: 6.66 },
  { id: 'de-gronau', name: 'Urenco Gronau', stage: 'enrichment', stateId: 'DE', country: 'Germany', lat: 52.21, lng: 7.04 },
  { id: 'uk-capenhurst', name: 'Urenco Capenhurst', stage: 'enrichment', stateId: 'GB', country: 'United Kingdom', lat: 53.27, lng: -2.84 },
  { id: 'us-eunice', name: 'Urenco USA (Eunice)', stage: 'enrichment', stateId: 'US', country: 'United States', lat: 32.0, lng: -103.16 },
  { id: 'ru-novouralsk', name: 'Rosatom UEIP Novouralsk', stage: 'enrichment', stateId: 'RU', country: 'Russia', lat: 57.25, lng: 60.09 },
  { id: 'jp-rokkasho-enr', name: 'JNFL Rokkasho (enrichment)', stage: 'enrichment', stateId: 'JP', country: 'Japan', lat: 40.96, lng: 141.37 },
  // Fabrication
  { id: 'fr-romans', name: 'Framatome Romans', stage: 'fabrication', stateId: 'FR', country: 'France', lat: 45.05, lng: 5.05 },
  { id: 'us-columbia-fab', name: 'Westinghouse Columbia', stage: 'fabrication', stateId: 'US', country: 'United States', lat: 33.9, lng: -80.9 },
  { id: 'ru-novosibirsk', name: 'NCCP Novosibirsk', stage: 'fabrication', stateId: 'RU', country: 'Russia', lat: 55.0, lng: 82.9 },
  // Reactor (representative national fleet node)
  { id: 'fr-reactor', name: 'French reactor fleet', stage: 'reactor', stateId: 'FR', country: 'France', lat: 47.5, lng: 2.5 },
  { id: 'us-reactor', name: 'US reactor fleet', stage: 'reactor', stateId: 'US', country: 'United States', lat: 39.0, lng: -95.0 },
  { id: 'ru-reactor', name: 'Russian reactor fleet', stage: 'reactor', stateId: 'RU', country: 'Russia', lat: 55.0, lng: 50.0 },
  { id: 'jp-reactor', name: 'Japanese reactor fleet', stage: 'reactor', stateId: 'JP', country: 'Japan', lat: 36.0, lng: 138.0 },
  // Reprocessing (sensitive)
  { id: 'fr-lahague', name: 'Orano La Hague', stage: 'reprocessing', stateId: 'FR', country: 'France', lat: 49.68, lng: -1.88 },
  { id: 'uk-sellafield', name: 'Sellafield', stage: 'reprocessing', stateId: 'GB', country: 'United Kingdom', lat: 54.42, lng: -3.50 },
  { id: 'ru-mayak', name: 'Mayak (Ozersk)', stage: 'reprocessing', stateId: 'RU', country: 'Russia', lat: 55.7, lng: 60.8 },
  { id: 'jp-rokkasho-rep', name: 'JNFL Rokkasho (reprocessing)', stage: 'reprocessing', stateId: 'JP', country: 'Japan', lat: 40.97, lng: 141.38 },
  // Waste / storage
  { id: 'fi-onkalo', name: 'Onkalo (deep geological repository)', stage: 'waste', stateId: 'FI', country: 'Finland', lat: 61.24, lng: 21.48 },
  { id: 'fr-bure', name: 'Cigéo / Bure (planned)', stage: 'waste', stateId: 'FR', country: 'France', lat: 48.5, lng: 5.2 },
];

/** @type {FuelCycleEdge[]} */
const EDGES = [
  // France — a near-complete closed cycle (imports raw uranium)
  { from: 'kz-mine', to: 'fr-tricastin-conv', type: 'import' },
  { from: 'fr-tricastin-conv', to: 'fr-georgesbesse', type: 'domestic' },
  { from: 'fr-georgesbesse', to: 'fr-romans', type: 'domestic' },
  { from: 'fr-romans', to: 'fr-reactor', type: 'domestic' },
  { from: 'fr-reactor', to: 'fr-lahague', type: 'domestic' },
  { from: 'fr-lahague', to: 'fr-bure', type: 'domestic' },
  // United States — open cycle, imports/operates enrichment, no commercial reprocessing
  { from: 'ca-cigar', to: 'ca-porthope', type: 'domestic' },
  { from: 'ca-porthope', to: 'us-metropolis', type: 'import' },
  { from: 'us-metropolis', to: 'us-eunice', type: 'domestic' },
  { from: 'us-eunice', to: 'us-columbia-fab', type: 'domestic' },
  { from: 'us-columbia-fab', to: 'us-reactor', type: 'domestic' },
  // Russia — vertically integrated closed cycle
  { from: 'ru-novouralsk', to: 'ru-novosibirsk', type: 'domestic' },
  { from: 'ru-novosibirsk', to: 'ru-reactor', type: 'domestic' },
  { from: 'ru-reactor', to: 'ru-mayak', type: 'domestic' },
  // Japan — domestic enrichment + reprocessing at Rokkasho
  { from: 'jp-rokkasho-enr', to: 'jp-reactor', type: 'domestic' },
  { from: 'jp-reactor', to: 'jp-rokkasho-rep', type: 'domestic' },
  // United Kingdom — enrichment + historical reprocessing
  { from: 'uk-capenhurst', to: 'uk-sellafield', type: 'domestic' },
  // Cross-border enrichment supply (Urenco network)
  { from: 'nl-almelo', to: 'fr-romans', type: 'import' },
  { from: 'de-gronau', to: 'fr-romans', type: 'import' },
];

let cache = null;

/** @returns {{nodes: FuelCycleNode[], edges: FuelCycleEdge[], byId: Map<string,FuelCycleNode>}} */
export function getFuelCycle() {
  if (cache) return cache;
  const nodes = NODES.map((n) => ({ ...n, provenance: PROVENANCE, provisional: true }));
  const byId = new Map(nodes.map((n) => [n.id, n]));
  cache = { nodes, edges: EDGES, byId };
  return cache;
}

/** States that operate at least one node in a sensitive stage. */
export function statesWithSensitiveStages() {
  const set = new Set();
  NODES.forEach((n) => { if (FUEL_STAGES[n.stage].sensitive) set.add(n.stateId); });
  return set;
}
