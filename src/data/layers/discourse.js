/**
 * Layer 7 — Discourse / Naming (experimental, curated)
 *
 * INTERPRETIVE — NOT MEASURED. Treats how programmes and facilities are *named
 * and framed* as an analysable attribute: the official designation versus the
 * descriptive function, plus the framing the name asserts (peaceful, research,
 * deterrent, energy-security…). This layer is explicitly curated commentary,
 * not a dataset of measured values, and every record is flagged
 * `provisional: true` and shown with a "sample data" indicator.
 *
 * Sources are the public names/designations themselves and the public record of
 * how each programme has been framed; coordinates approximate a representative
 * location for annotation only.
 *
 * @typedef {Object} DiscourseRecord
 * @property {string} entityId
 * @property {string} officialName
 * @property {string} descriptiveFunction
 * @property {string} country
 * @property {number} lat
 * @property {number} lng
 * @property {string[]} framingTags
 * @property {string} [note]
 * @property {import('../provenance').Provenance} provenance
 * @property {boolean} provisional
 */

import { prov } from '../provenance';

/** Framing categories, for the layer's filter control. */
export const FRAMING_TAGS = ['peaceful', 'research', 'energy-security', 'deterrence', 'self-defence'];

const SELF = (who) => prov(`${who} — public designation`, { confidence: 'declared' });

/** @type {DiscourseRecord[]} */
const RECORDS = [
  {
    entityId: 'in-smiling-buddha',
    officialName: '"Smiling Buddha" / Pokhran-I — described as a "Peaceful Nuclear Explosion"',
    descriptiveFunction: 'First Indian nuclear weapon test',
    country: 'India',
    lat: 27.095, lng: 71.752,
    framingTags: ['peaceful', 'research'],
    note: 'The "peaceful nuclear explosion" framing was contested internationally and helped catalyse the NSG.',
    provenance: SELF('India'),
    provisional: true,
  },
  {
    entityId: 'ir-natanz-naming',
    officialName: 'Natanz "Nuclear Enrichment Facility" — framed as peaceful civil energy',
    descriptiveFunction: 'Uranium enrichment complex',
    country: 'Iran',
    lat: 33.7225, lng: 51.7269,
    framingTags: ['peaceful', 'energy-security'],
    provenance: SELF('Iran'),
    provisional: true,
  },
  {
    entityId: 'kp-deterrent',
    officialName: 'DPRK "self-defensive nuclear deterrent"',
    descriptiveFunction: 'Nuclear weapons programme',
    country: 'North Korea',
    lat: 39.0392, lng: 125.7625,
    framingTags: ['self-defence', 'deterrence'],
    provenance: SELF('DPRK'),
    provisional: true,
  },
  {
    entityId: 'us-atoms-for-peace',
    officialName: '"Atoms for Peace" — civil-nuclear framing of dual-use technology export',
    descriptiveFunction: 'US programme exporting research reactors & fuel (1953→)',
    country: 'United States',
    lat: 38.9, lng: -77.04,
    framingTags: ['peaceful', 'research', 'energy-security'],
    note: 'Framed nuclear technology diffusion as peaceful; several recipient programmes later acquired weapons-relevant capability.',
    provenance: SELF('United States'),
    provisional: true,
  },
  {
    entityId: 'il-research-center',
    officialName: 'Negev "Nuclear Research Center"',
    descriptiveFunction: 'Plutonium-production complex (per external assessment)',
    country: 'Israel',
    lat: 31.0008, lng: 35.1447,
    framingTags: ['research'],
    note: 'The "research center" designation coexists with a policy of nuclear opacity.',
    provenance: SELF('Israel'),
    provisional: true,
  },
  {
    entityId: 'pk-research-labs',
    officialName: 'Khan "Research Laboratories" (Kahuta)',
    descriptiveFunction: 'Uranium enrichment for weapons (per external assessment)',
    country: 'Pakistan',
    lat: 33.6167, lng: 73.4,
    framingTags: ['research'],
    provenance: SELF('Pakistan'),
    provisional: true,
  },
];

/** @returns {DiscourseRecord[]} */
export function getDiscourseData() {
  return RECORDS;
}
