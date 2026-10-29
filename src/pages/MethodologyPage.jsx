import { motion } from 'framer-motion';
import { FIELD_PROVENANCE } from '../data/enrichedFacilities';
import {
  FileText, ShieldCheck, BookOpen, Database, Info,
  ExternalLink, CheckCircle, XCircle, AlertCircle,
} from 'lucide-react';

const SOURCES_TABLE = [
  { name: 'IAEA PRIS', full: 'Power Reactor Information System', type: 'Official / International', scope: 'Commercial nuclear power plant data worldwide (status, capacity, type, operator, first power)', url: 'https://pris.iaea.org/' },
  { name: 'IAEA', full: 'International Atomic Energy Agency', type: 'Official / International', scope: 'Nuclear safety, events, INES scale, safeguards reports, educational resources', url: 'https://www.iaea.org/' },
  { name: 'SIPRI', full: 'Stockholm International Peace Research Institute', type: 'Reputable civil-society research', scope: 'Nuclear arsenal country-level estimates (SIPRI Yearbook, annual)', url: 'https://www.sipri.org/' },
  { name: 'FAS', full: 'Federation of American Scientists – Nuclear Notebook', type: 'Reputable civil-society research', scope: 'Nuclear arsenal estimates by country', url: 'https://fas.org/' },
  { name: 'WHO', full: 'World Health Organization', type: 'Official / International', scope: 'Radiation and human health effects, emergency guidance', url: 'https://www.who.int/' },
  { name: 'UNSCEAR', full: 'UN Scientific Committee on the Effects of Atomic Radiation', type: 'Official / International', scope: 'Scientific assessment of radiation sources and effects; accident health assessments', url: 'https://www.unscear.org/' },
  { name: 'ICRP', full: 'International Commission on Radiological Protection', type: 'Scientific advisory body', scope: 'Radiation protection standards and dose limits', url: 'https://www.icrp.org/' },
  { name: 'US NRC', full: 'US Nuclear Regulatory Commission', type: 'Official / National regulator', scope: 'US plant licensing, accident documentation, radiation health data', url: 'https://www.nrc.gov/' },
  { name: 'National regulators', full: 'e.g. ONR (UK), ASN (France), NRA (Japan), CNSC (Canada), others', type: 'Official / National', scope: 'Country-specific plant operational data and accident records', url: null },
  { name: 'Operator disclosures', full: 'e.g. EDF, TEPCO, NEI, WNA public releases', type: 'Official operator / industry', scope: 'Supplemental plant operational information where PRIS incomplete', url: null },
  { name: 'INSAG reports', full: 'International Nuclear Safety Advisory Group', type: 'Official / IAEA', scope: 'Root cause analyses of major accidents (INSAG-7 Chernobyl, INSAG-11)', url: 'https://www.iaea.org/publications/search/type/insag-report' },
];

const CATEGORY_DEFINITIONS = [
  { label: 'Commercial nuclear power plant (site level)', color: '#3b82f6', def: 'A civilian electricity-generating nuclear power station with one or more reactor units, included in IAEA PRIS or confirmed by national regulators/operators as commercially operational, under construction, suspended, or permanently shut down. Displayed at plant/site level on the infrastructure map.' },
  { label: 'Accident site', color: '#ef4444', def: 'A civilian nuclear facility that experienced a significant accident rated INES Level 3 or above, as documented by IAEA and/or national regulatory bodies. Information presented is factual, educational, and based on official post-accident reports.' },
  { label: 'Historical nuclear event', color: '#f59e0b', def: 'A significant historical event related to nuclear weapons use or nuclear testing, presented as a distinct educational layer for historical literacy purposes. Clearly separated from civilian nuclear infrastructure.' },
  { label: 'Nuclear arsenal (country level)', color: '#a78bfa', def: 'Country-level warhead estimates for nuclear-armed states, drawn from SIPRI Yearbook and FAS Nuclear Notebook. Country level only — no site, base, deployment location, or operational detail.' },
];

const INCLUSIONS = [
  'All publicly listed civilian commercial nuclear power plants in IAEA PRIS (operating, under construction, suspended, permanently shut down)',
  'Reactor site-level data: country, operator, reactor type, net capacity, status, commissioning year',
  'Major civilian nuclear accident sites (INES 3+) as documented by IAEA and national regulators',
  'Historical nuclear events from the public record (atomic bomb use, nuclear tests) — clearly framed as a separate educational layer',
  'Nuclear arsenal totals at country level from SIPRI/FAS public estimates',
  'Educational content on nuclear fission, fusion, reactor technology, radiation, and safety',
  'Educational health content on ionizing radiation from WHO, UNSCEAR, and ICRP',
];

// The governance_risk_score rules exactly as coded in computeGovernanceRisk
// (src/data/enrichedFacilities.js). Keep in step with that function.
const SCORE_RULES = [
  ['Starting score', '1'],
  ['No country governance data for the host state', '+2'],
  ['Host state has no Additional Protocol in force', '+1'],
  ['Host state community consent mechanism coded "absent"', '+1'],
  ['Host state safeguards are facility-specific (non-NPT states)', '+1'],
  ['Plant is analyst-flagged for conflict exposure (as of 2024)', '+1'],
  ['Plant status is shutdown or decommissioned', '+1'],
  ['Plant status is suspended', '+1'],
  ['Host state post-Fukushima trajectory coded "accelerated phase-out"', '+1'],
  ['Seismic zone High and first power before 1990', '+1'],
  ['Voluntary Offer Agreement (NPT weapon states)', '0 (no effect)'],
  ['Final score is clamped to', '1–5'],
];

const EXCLUSIONS = [
  { item: 'Military nuclear facility mapping', reason: 'Sites, bases, and storage locations for military nuclear material are not mapped at site/facility level under any circumstances' },
  { item: 'Detailed global mapping of enrichment / reprocessing facilities', reason: 'Sensitive dual-use fuel cycle facilities are not mapped at equivalent plant-level granularity globally. They may appear only in educational text or high-level country summaries.' },
  { item: 'Weapon site, deployment site, or tactical detail', reason: 'No operational, deployment, basing, or targeting information is included under any framing' },
  { item: 'Classified or leaked material', reason: 'The atlas uses only publicly available official or authoritative public-interest material' },
  { item: 'Speculative or unsourced data', reason: 'Plant records cite named public sources. Some enriched analytical fields have no per-field source yet; they are listed under "Governance risk score (current rules)" below.' },
  { item: 'Operational or strategic analysis framing', reason: 'This is an educational atlas, not a security-analysis platform. No escalation analysis or operational framing is used. A rule-based governance risk score does exist; its rules are published below and are under review.' },
];

function SectionHeading({ icon: Icon, label, color = '#3b82f6' }) {
  return (
    <div className="flex items-center gap-2 mb-5">
      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: color + '15', border: `1px solid ${color}25` }}>
        <Icon size={13} style={{ color }} />
      </div>
      <h2 className="text-base font-semibold text-slate-100">{label}</h2>
      <div className="flex-1 h-px" style={{ background: 'rgba(30,50,80,0.8)' }} />
    </div>
  );
}

export default function MethodologyPage() {
  return (
    <div className="min-h-full overflow-y-auto px-6 py-8 max-w-5xl mx-auto"
      style={{ background: '#040d1a' }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(100,116,139,0.12)', border: '1px solid rgba(100,116,139,0.25)' }}>
            <FileText size={17} className="text-slate-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">Methodology</h1>
        </div>
        <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
          How this atlas is built, what sources it uses, what is included, what is excluded and why,
          and the editorial principles that govern its presentation.
        </p>
      </motion.div>

      <div className="space-y-12">
        {/* Mission & Scope */}
        <section>
          <SectionHeading icon={BookOpen} label="Mission & Scope" />
          <div className="text-sm text-slate-300 leading-relaxed space-y-3 max-w-3xl">
            <p>
              The Global Nuclear Infrastructure Atlas is a public-interest educational platform providing
              clear, accurate, and well-sourced information about civilian nuclear infrastructure, nuclear
              technology, accident history, nuclear arsenals at a country level, and radiation health.
            </p>
            <p>
              Its purpose is to support informed public understanding of nuclear topics by presenting
              reliable, publicly available information in a clear and accessible form. It is not a
              security-analysis platform, not a real-time monitoring system, and not a comprehensive
              technical reference for professionals. It is an educational atlas for a general audience.
            </p>
            <p>
              The platform explicitly applies an educational and safety-conscious presentation standard.
              The public availability of a dataset does not automatically justify presenting it at maximum
              granularity. Where a higher-granularity presentation would serve primarily harmful uses over
              legitimate educational ones, the atlas applies deliberate scope limits.
            </p>
          </div>
        </section>

        {/* Governance risk score — current rules, as coded */}
        <section id="risk-score">
          <SectionHeading icon={Database} label="Governance risk score (current rules, under review)" color="#f59e0b" />
          <div className="text-sm text-slate-300 leading-relaxed mb-4 max-w-3xl">
            Each plant carries a governance_risk_score from 1 to 5. It is computed in
            src/data/enrichedFacilities.js by the rules below, exactly as coded. The rules are under
            review: two safeguards terms overlap for India and Pakistan, and shutdown and phase-out
            add to the score. Treat the score as a summary of these rules, not as an assessment.
          </div>
          <div className="rounded-xl border overflow-hidden mb-6" style={{ borderColor: 'rgba(30,50,80,0.6)' }}>
            <table className="w-full text-xs">
              <thead>
                <tr style={{ background: 'rgba(15,30,60,0.8)' }}>
                  <th scope="col" className="text-left px-4 py-2.5 text-slate-300 font-semibold">Condition</th>
                  <th scope="col" className="text-left px-4 py-2.5 text-slate-300 font-semibold w-20">Points</th>
                </tr>
              </thead>
              <tbody>
                {SCORE_RULES.map(([cond, pts], i) => (
                  <tr key={cond} style={{ background: i % 2 === 0 ? 'rgba(10,20,40,0.4)' : 'rgba(10,20,40,0.2)' }}>
                    <td className="px-4 py-2 text-slate-300">{cond}</td>
                    <td className="px-4 py-2 text-slate-200 font-mono">{pts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3 className="text-sm font-semibold text-slate-200 mb-2">Enriched fields and their sources</h3>
          <p className="text-sm text-slate-300 mb-3 max-w-3xl">
            Plant identity fields (name, operator, capacity, status) cite named sources per record.
            The enriched fields below are country-level or analyst-coded. Fields marked &ldquo;none&rdquo;
            have no per-field source yet, which is an exception to the source policy.
          </p>
          <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'rgba(30,50,80,0.6)' }}>
            <table className="w-full text-xs">
              <thead>
                <tr style={{ background: 'rgba(15,30,60,0.8)' }}>
                  <th scope="col" className="text-left px-4 py-2.5 text-slate-300 font-semibold">Field</th>
                  <th scope="col" className="text-left px-4 py-2.5 text-slate-300 font-semibold">Level</th>
                  <th scope="col" className="text-left px-4 py-2.5 text-slate-300 font-semibold">Source</th>
                </tr>
              </thead>
              <tbody>
                {FIELD_PROVENANCE.map((f, i) => (
                  <tr key={f.field} style={{ background: i % 2 === 0 ? 'rgba(10,20,40,0.4)' : 'rgba(10,20,40,0.2)' }}>
                    <td className="px-4 py-2 text-slate-200 font-mono">{f.field}</td>
                    <td className="px-4 py-2 text-slate-300">{f.level}</td>
                    <td className="px-4 py-2 text-slate-300">{f.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Source policy */}
        <section>
          <SectionHeading icon={Database} label="Source Policy" color="#3b82f6" />
          <div className="text-sm text-slate-400 leading-relaxed mb-5 max-w-3xl">
            All data in this atlas must be traceable to a named reputable public source. The hierarchy
            of preferred sources is: (1) official international agency data (IAEA, UN bodies); (2) official
            national regulatory or government sources; (3) reputable public-interest civil-society research
            bodies (SIPRI, FAS); (4) authoritative operator public disclosures. Speculation, crowd-sourced
            data, and unverified secondary sources are not used.
          </div>
          <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'rgba(30,50,80,0.6)' }}>
            <table className="w-full text-xs">
              <thead>
                <tr style={{ background: 'rgba(15,30,60,0.8)' }}>
                  <th className="text-left px-4 py-2.5 text-slate-400 font-semibold">Source</th>
                  <th className="text-left px-4 py-2.5 text-slate-400 font-semibold hidden sm:table-cell">Type</th>
                  <th className="text-left px-4 py-2.5 text-slate-400 font-semibold">Scope in this atlas</th>
                  <th className="text-left px-4 py-2.5 text-slate-400 font-semibold w-8 hidden md:table-cell"></th>
                </tr>
              </thead>
              <tbody>
                {SOURCES_TABLE.map((s, i) => (
                  <tr key={s.name} style={{ background: i % 2 === 0 ? 'rgba(10,20,40,0.4)' : 'rgba(10,20,40,0.2)' }}>
                    <td className="px-4 py-2.5">
                      <div className="font-semibold text-slate-200">{s.name}</div>
                      <div className="text-slate-400">{s.full}</div>
                    </td>
                    <td className="px-4 py-2.5 text-slate-400 hidden sm:table-cell">{s.type}</td>
                    <td className="px-4 py-2.5 text-slate-400">{s.scope}</td>
                    <td className="px-4 py-2.5 hidden md:table-cell">
                      {s.url && (
                        <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                          <ExternalLink size={11} />
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* What is included */}
        <section>
          <SectionHeading icon={CheckCircle} label="Inclusion Criteria" color="#10b981" />
          <div className="rounded-xl border p-5" style={{ background: 'rgba(10,20,40,0.6)', borderColor: 'rgba(16,185,129,0.2)' }}>
            <ul className="space-y-2.5">
              {INCLUSIONS.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed">
                  <CheckCircle size={13} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* What is excluded */}
        <section>
          <SectionHeading icon={XCircle} label="Exclusions & Why" color="#ef4444" />
          <div className="text-sm text-slate-400 leading-relaxed mb-4 max-w-3xl">
            The following categories are intentionally excluded. These exclusions are principled editorial
            decisions, not technical limitations.
          </div>
          <div className="space-y-3">
            {EXCLUSIONS.map((e, i) => (
              <div key={i} className="flex items-start gap-4 rounded-xl border p-4"
                style={{ background: 'rgba(10,20,40,0.6)', borderColor: 'rgba(239,68,68,0.15)' }}>
                <XCircle size={14} className="text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-slate-200 mb-1">{e.item}</div>
                  <p className="text-xs text-slate-400 leading-relaxed">{e.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Category definitions */}
        <section>
          <SectionHeading icon={Info} label="Category Definitions" color="#8b5cf6" />
          <div className="space-y-4">
            {CATEGORY_DEFINITIONS.map(c => (
              <div key={c.label} className="rounded-xl border p-4"
                style={{ background: 'rgba(10,20,40,0.6)', borderColor: c.color + '25', borderLeftWidth: 3, borderLeftColor: c.color }}>
                <div className="text-sm font-semibold mb-1.5" style={{ color: c.color }}>{c.label}</div>
                <p className="text-xs text-slate-400 leading-relaxed">{c.def}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Granularity principle */}
        <section>
          <SectionHeading icon={ShieldCheck} label="Granularity Principle" color="#f59e0b" />
          <div className="text-sm text-slate-300 leading-relaxed space-y-3 max-w-3xl">
            <p>
              Different categories of nuclear infrastructure are presented at different levels of geographic granularity.
              This is a deliberate editorial choice, not an inconsistency.
            </p>
            <p>
              <strong className="text-slate-100">Commercial civilian nuclear power plants</strong> are publicly listed in IAEA PRIS
              and are mapped at site/plant level. These are established, civilian electricity-generating facilities whose
              locations are publicly known and whose civilian educational value is high. Presenting them at plant level
              is consistent with the atlas's mission.
            </p>
            <p>
              <strong className="text-slate-100">Sensitive fuel-cycle infrastructure</strong> (enrichment, reprocessing,
              certain storage) is not mapped at equivalent global individual-site granularity. While some such facilities
              are publicly known, a comprehensive global site-level map of sensitive fuel-cycle infrastructure would serve
              primarily non-educational purposes. Country-level educational summaries may appear in some contexts.
            </p>
            <p>
              <strong className="text-slate-100">Nuclear arsenals</strong> are presented at country level only.
              No site, base, deployment location, or operational breakdown is included.
            </p>
            <p>
              <strong className="text-slate-100">Military nuclear facilities</strong> are not mapped under any category.
            </p>
          </div>
        </section>

        {/* Update policy */}
        <section>
          <SectionHeading icon={AlertCircle} label="Currency & Limitations" color="#64748b" />
          <div className="text-sm text-slate-400 leading-relaxed space-y-3 max-w-3xl">
            <p>
              Data in this atlas reflects the best publicly available information at the time of compilation.
              Nuclear infrastructure status changes over time — plants commence, suspend, or cease operations,
              arsenals are adjusted, and new official estimates are published. The label
              <strong className="text-slate-300"> "Latest Publicly Available Information"</strong> indicates this
              atlas is based on public records as of its most recent update, not real-time operational monitoring.
            </p>
            <p>
              Warhead estimates carry inherent uncertainty. Most nuclear-armed governments do not publish
              official totals. SIPRI and FAS figures are the best available public estimates, but they should be
              read as approximate and indicative rather than precise.
            </p>
            <p>
              Commercial plant capacity and status figures may lag behind the most current IAEA PRIS data.
              Users seeking the most current operational data for professional purposes should consult IAEA PRIS directly.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
