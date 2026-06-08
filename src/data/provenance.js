/**
 * Shared provenance model for the Analysis Layers.
 *
 * Every datum surfaced by an analysis layer references one or more sources via
 * this shape. It is intentionally minimal so it can be attached to facility-,
 * country-, or estimate-level records alike, and rendered by a single reusable
 * primitive (see src/components/Provenance.jsx).
 *
 * @typedef {Object} Provenance
 * @property {string}  source        Human-readable source name (e.g. "IAEA", "UNODA Treaty Database").
 * @property {string} [sourceUrl]    Canonical public URL for the source.
 * @property {string} [asOf]         ISO date (YYYY-MM-DD) the value reflects / was retrieved.
 * @property {'declared'|'estimated'|'disputed'} [confidence]
 *           declared  – asserted by the entity itself or a treaty register (highest certainty)
 *           estimated – independently estimated by a research body (e.g. SIPRI/FAS)
 *           disputed  – authorities disagree, or the classification is contested
 */

/**
 * Presentation metadata per confidence level. Kept here so colour/label choices
 * are consistent everywhere provenance is shown.
 */
export const CONFIDENCE_META = {
  declared: { label: 'Declared', color: '#10b981', hint: 'Asserted by the entity or an official treaty register.' },
  estimated: { label: 'Estimated', color: '#f59e0b', hint: 'Independently estimated by a research body — not officially confirmed.' },
  disputed: { label: 'Disputed', color: '#ef4444', hint: 'Authorities disagree or the classification is contested.' },
};

/**
 * Small helper to build a Provenance object with light validation-by-convention.
 * @param {string} source
 * @param {Partial<Provenance>} [rest]
 * @returns {Provenance}
 */
export function prov(source, rest = {}) {
  return { source, ...rest };
}

/**
 * Common reusable sources, so layers don't re-type URLs.
 */
export const SOURCES = {
  IAEA: 'https://www.iaea.org/topics/safeguards',
  IAEA_NPT_SG: 'https://www.iaea.org/topics/safeguards-agreements',
  UNODA: 'https://treaties.unoda.org/',
  CTBTO: 'https://www.ctbto.org/our-mission/states-signatories',
  TPNW: 'https://treaties.unoda.org/t/tpnw',
  SIPRI: 'https://www.sipri.org/yearbook',
  FAS: 'https://fas.org/issues/nuclear-weapons/status-world-nuclear-forces/',
};
