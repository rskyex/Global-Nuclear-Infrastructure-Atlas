/**
 * Layer 5 — Legal-Normative Geography (seed)
 *
 * PROVISIONAL DATA. This file curates two fields that are NOT yet present in
 * the core dataset — CTBT status and Nuclear-Weapon-Free-Zone (NWFZ) membership
 * — from public treaty registers, and merges them with the NPT / TPNW /
 * Additional-Protocol values already carried in src/data/countryGovernance.js
 * (which remain the single source of truth for those three fields).
 *
 * INTENDED REAL SOURCES (swap-in targets):
 *   - CTBT status .......... CTBTO "Status of Signature and Ratification"
 *                            https://www.ctbto.org/our-mission/states-signatories
 *   - NPT / TPNW / NWFZ .... UNODA Treaties Database
 *                            https://treaties.unoda.org/
 *
 * Until those live registers are wired in, every record is flagged
 * `provisional: true` and surfaced with a visible "sample data" indicator.
 * Values are curated from the public registers above but are not machine-verified
 * at load time.
 */

import countryGovernance from '../countryGovernance';
import { prov, SOURCES } from '../provenance';

/**
 * @typedef {Object} LegalNormativeRecord
 * @property {string} stateId
 * @property {string} country
 * @property {'party'|'non_party'|'withdrew'} npt
 * @property {'ratified'|'signed'|'neither'} ctbt
 * @property {'ratified'|'signed'|'non_signatory'} tpnw
 * @property {string|null} nwfz       NWFZ treaty name, or null if none applies.
 * @property {boolean} additionalProtocol
 * @property {string} [note]
 * @property {import('../provenance').Provenance[]} provenance
 * @property {boolean} provisional
 */

/**
 * Curated overlay: CTBT status + NWFZ membership only (the two fields missing
 * from the core dataset). Keyed by country name to match countryGovernance.
 * `cn` = CTBT note where the status is contested or partial.
 */
const OVERLAY = {
  Argentina: { ctbt: 'ratified', nwfz: 'Tlatelolco' },
  Armenia: { ctbt: 'ratified', nwfz: null },
  Bangladesh: { ctbt: 'ratified', nwfz: null },
  Belarus: { ctbt: 'ratified', nwfz: null },
  Belgium: { ctbt: 'ratified', nwfz: null },
  Brazil: { ctbt: 'ratified', nwfz: 'Tlatelolco' },
  Canada: { ctbt: 'ratified', nwfz: null },
  China: { ctbt: 'signed', nwfz: null },
  'Czech Republic': { ctbt: 'ratified', nwfz: null },
  Egypt: { ctbt: 'signed', nwfz: 'Pelindaba (signatory)', cn: 'Signed but not ratified Pelindaba.' },
  Finland: { ctbt: 'ratified', nwfz: null },
  France: { ctbt: 'ratified', nwfz: null },
  Germany: { ctbt: 'ratified', nwfz: null },
  Hungary: { ctbt: 'ratified', nwfz: null },
  India: { ctbt: 'neither', nwfz: null },
  Iran: { ctbt: 'signed', nwfz: null },
  Japan: { ctbt: 'ratified', nwfz: null },
  Mexico: { ctbt: 'ratified', nwfz: 'Tlatelolco' },
  Netherlands: { ctbt: 'ratified', nwfz: null },
  Pakistan: { ctbt: 'neither', nwfz: null },
  Romania: { ctbt: 'ratified', nwfz: null },
  Russia: { ctbt: 'signed', nwfz: null, cn: 'Ratification revoked in 2023; remains a signatory.', disputed: true },
  Slovenia: { ctbt: 'ratified', nwfz: null },
  'South Africa': { ctbt: 'ratified', nwfz: 'Pelindaba' },
  'South Korea': { ctbt: 'ratified', nwfz: null },
  Spain: { ctbt: 'ratified', nwfz: null },
  Sweden: { ctbt: 'ratified', nwfz: null },
  Switzerland: { ctbt: 'ratified', nwfz: null },
  Turkey: { ctbt: 'ratified', nwfz: null },
  Ukraine: { ctbt: 'ratified', nwfz: null },
  'United Arab Emirates': { ctbt: 'ratified', nwfz: null },
  'United Kingdom': { ctbt: 'ratified', nwfz: null },
  'United States': { ctbt: 'signed', nwfz: null },
};

let cache = null;

/**
 * @returns {LegalNormativeRecord[]}
 */
export function getLegalNormativeData() {
  if (cache) return cache;

  cache = Object.entries(countryGovernance)
    .filter(([country]) => country in OVERLAY)
    .map(([country, gov]) => {
      const o = OVERLAY[country];
      const provenance = [
        prov('UNODA Treaty Database', { sourceUrl: SOURCES.UNODA, confidence: 'declared' }),
        prov('CTBTO Status of Signatories', {
          sourceUrl: SOURCES.CTBTO,
          confidence: o.disputed ? 'disputed' : 'declared',
        }),
      ];
      return {
        stateId: gov.iso_code || country,
        country,
        flag: gov.flag,
        npt: gov.npt_status,
        ctbt: o.ctbt,
        tpnw: gov.tpnw_status,
        nwfz: o.nwfz,
        additionalProtocol: Boolean(gov.additional_protocol),
        note: o.cn,
        provenance,
        provisional: true,
      };
    });

  return cache;
}

/**
 * Presentation metadata for each regime, so the layer panel and legend can list
 * the toggleable sub-regimes consistently.
 */
export const LEGAL_REGIMES = [
  { key: 'npt', label: 'NPT', describe: (r) => nptLabel(r.npt) },
  { key: 'ctbt', label: 'CTBT', describe: (r) => ctbtLabel(r.ctbt) },
  { key: 'tpnw', label: 'TPNW', describe: (r) => tpnwLabel(r.tpnw) },
  { key: 'nwfz', label: 'NWFZ', describe: (r) => r.nwfz || 'None' },
  { key: 'additionalProtocol', label: 'Add. Protocol', describe: (r) => (r.additionalProtocol ? 'In force' : 'Not in force') },
];

export const nptLabel = (v) => ({ party: 'Party', non_party: 'Non-party', withdrew: 'Withdrew' }[v] || 'Unknown');
export const ctbtLabel = (v) => ({ ratified: 'Ratified', signed: 'Signed only', neither: 'Neither' }[v] || 'Unknown');
export const tpnwLabel = (v) => ({ ratified: 'Ratified', signed: 'Signed', non_signatory: 'Non-signatory' }[v] || 'Unknown');

/**
 * Colour ramp shared by the legal layer (strong = bound by the regime).
 */
export const LEGAL_STATUS_COLOR = {
  // regime adherence strength: bound → unbound
  bound: '#10b981',
  partial: '#f59e0b',
  unbound: '#ef4444',
  none: '#6b7280',
};

/**
 * Reduce a record + selected regime into an adherence bucket for colouring.
 * @param {LegalNormativeRecord} r
 * @param {string} regime
 * @returns {'bound'|'partial'|'unbound'|'none'}
 */
export function regimeBucket(r, regime) {
  switch (regime) {
    case 'npt':
      return r.npt === 'party' ? 'bound' : r.npt === 'withdrew' ? 'unbound' : 'unbound';
    case 'ctbt':
      return r.ctbt === 'ratified' ? 'bound' : r.ctbt === 'signed' ? 'partial' : 'unbound';
    case 'tpnw':
      return r.tpnw === 'ratified' ? 'bound' : r.tpnw === 'signed' ? 'partial' : 'unbound';
    case 'nwfz':
      return r.nwfz ? 'bound' : 'none';
    case 'additionalProtocol':
      return r.additionalProtocol ? 'bound' : 'unbound';
    default:
      return 'none';
  }
}
