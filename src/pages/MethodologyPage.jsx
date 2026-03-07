import { motion } from 'framer-motion';
import { ShieldCheck, BookOpen, Clock, Globe, AlertCircle, Database, Info, ExternalLink, Lock, Eye } from 'lucide-react';

const SOURCES_TABLE = [
  { name: 'IAEA PRIS', full: 'Power Reactor Information System', type: 'Official', scope: 'Operating civilian power reactors worldwide', url: 'https://pris.iaea.org/' },
  { name: 'IAEA RRDB', full: 'Research Reactor Database', type: 'Official', scope: 'Research reactors worldwide', url: 'https://nucleus.iaea.org/RRDB/' },
  { name: 'IAEA Event Reports', full: 'IAEA Incident and Emergency Centre / Event Reports', type: 'Official', scope: 'Nuclear events and accidents', url: 'https://www.iaea.org/topics/ines' },
  { name: 'NRC', full: 'US Nuclear Regulatory Commission', type: 'Official', scope: 'US nuclear facilities and events', url: 'https://www.nrc.gov/' },
  { name: 'ONR', full: 'UK Office for Nuclear Regulation', type: 'Official', scope: 'UK nuclear sites', url: 'https://www.onr.org.uk/' },
  { name: 'ASN', full: 'Autorité de Sûreté Nucléaire (France)', type: 'Official', scope: 'French nuclear sites', url: 'https://www.asn.fr/' },
  { name: 'STUK', full: 'Radiation and Nuclear Safety Authority (Finland)', type: 'Official', scope: 'Finnish nuclear sites', url: 'https://www.stuk.fi/en' },
  { name: 'Operator Sites', full: 'EDF, TVO, Nawah, Bruce Power, TEPCO, etc.', type: 'Official', scope: 'Facility-specific public information', url: null },
  { name: 'UNSCEAR', full: 'UN Scientific Committee on the Effects of Atomic Radiation', type: 'Official', scope: 'Radiation health effects data', url: 'https://www.unscear.org/' },
];

const CATEGORY_DEFS = [
  {
    cat: 'Civilian Nuclear Power Plant',
    color: '#3b82f6',
    def: 'A nuclear reactor facility primarily used for generating electricity for civilian use, operated under a civilian licence, and included in the IAEA PRIS database or equivalent national registry.',
  },
  {
    cat: 'Research Reactor',
    color: '#8b5cf6',
    def: 'A nuclear reactor designed primarily for research, training, isotope production, or materials testing rather than electricity generation. Listed in the IAEA Research Reactor Database (RRDB) or equivalent national registry.',
  },
  {
    cat: 'Fuel Cycle Facility',
    color: '#06b6d4',
    def: 'Facilities involved in uranium conversion, enrichment, fuel fabrication, spent fuel storage/reprocessing, or radioactive waste disposal/management, as publicly documented by national or international authorities.',
  },
  {
    cat: 'Accident Site',
    color: '#ef4444',
    def: 'A former civilian nuclear facility or site that experienced a significant accident classified on the IAEA INES scale (level 3 or above), or that sustained damage affecting its operational status, as documented in official public records.',
  },
  {
    cat: 'Historical Nuclear Event',
    color: '#f59e0b',
    def: 'A location associated with historically documented nuclear use (atomic bomb deployment) or nuclear testing, as documented in official governmental, academic, and international institutional records. This layer is strictly separate from civilian nuclear infrastructure.',
  },
];

const LIMITATIONS = [
  'Data coverage reflects publicly available information and may not be comprehensive for all countries or facility types.',
  'Countries vary significantly in the transparency and volume of public nuclear information they publish.',
  '"Latest Publicly Available Status" means the most recent public update found in official sources, not continuous surveillance or classified data.',
  'Capacity and technical figures may differ slightly between sources due to measurement conventions and updates.',
  'Fuel cycle facilities are generally less comprehensively publicly documented than power plants; this atlas includes only those with clear public source attribution.',
  'The historical events layer includes only events with robust public documentation. It is not a comprehensive nuclear testing registry.',
  'Live feeds are embedded only if they originate from officially identified public sources (operators, regulators, or public institutions).',
  'This platform does not connect to classified databases, intelligence data, or non-public regulatory information.',
];

const PRINCIPLES = [
  {
    icon: <ShieldCheck size={16} className="text-green-400" />,
    title: 'Official Public Information Only',
    text: 'Every record in this atlas is based exclusively on officially published public information. No speculative, leaked, classified, or security-sensitive information is included.',
  },
  {
    icon: <Eye size={16} className="text-blue-400" />,
    title: 'Educational and Policy Purpose',
    text: 'This platform is designed for education, policy analysis, journalism, and public understanding. It is not a surveillance tool, an intelligence product, or a security assessment platform.',
  },
  {
    icon: <Lock size={16} className="text-amber-400" />,
    title: 'No Security-Sensitive Details',
    text: 'Facility descriptions are limited to publicly documented reactor type, design family, operator, status, and civilian/research use. Security layouts, vulnerabilities, restricted operational parameters, or information that could plausibly increase misuse risk are explicitly excluded.',
  },
  {
    icon: <Clock size={16} className="text-slate-400" />,
    title: '"Latest Publicly Available Status"',
    text: 'Where this platform describes "latest status," this refers to the most recent publicly available official information, not real-time or classified data. Reporting delays, update lags, and information gaps are inherent to public data systems.',
  },
  {
    icon: <Globe size={16} className="text-cyan-400" />,
    title: 'Live Feeds: Official Sources Only',
    text: 'Embedded video feeds appear only if they originate from plant operators, regulatory agencies, public institutions, or officially authorized public broadcasters. If no official public feed is identified, a placeholder is shown.',
  },
  {
    icon: <Database size={16} className="text-violet-400" />,
    title: 'Structured for Future API Integration',
    text: 'Data is structured to support future integration with official public APIs (e.g., IAEA PRIS if a public API becomes available). All records include source attribution and update timestamps. Comments in the codebase indicate API integration points.',
  },
];

export default function MethodologyPage() {
  return (
    <div className="flex-1 overflow-y-auto" style={{ background: '#070d1a' }}>
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-2">Platform Documentation</div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">Methodology & Data Sources</h1>
          <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">
            This page explains how data in the Global Nuclear Infrastructure Atlas is sourced, 
            structured, categorized, and presented. Transparency about methodology, limitations, 
            and data provenance is fundamental to this platform's integrity.
          </p>
        </motion.div>

        {/* Core principles */}
        <div>
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Core Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PRINCIPLES.map((p, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-xl p-4"
                style={{ background: 'rgba(13,27,46,0.7)', border: '1px solid rgba(26,48,80,0.6)' }}>
                <div className="flex items-center gap-2 mb-2">
                  {p.icon}
                  <h3 className="text-xs font-semibold text-white">{p.title}</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{p.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Category definitions */}
        <div>
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Category Definitions</h2>
          <div className="space-y-3">
            {CATEGORY_DEFS.map(({ cat, color, def }) => (
              <div key={cat} className="rounded-xl p-4 flex gap-3"
                style={{ background: 'rgba(13,27,46,0.7)', border: `1px solid ${color}20` }}>
                <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ background: color }} />
                <div>
                  <div className="text-xs font-semibold mb-1" style={{ color }}>{cat}</div>
                  <p className="text-xs text-slate-400 leading-relaxed">{def}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Primary sources */}
        <div>
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Primary Sources</h2>
          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(26,48,80,0.6)' }}>
            <div className="grid grid-cols-4 gap-0 px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider"
              style={{ background: 'rgba(7,13,26,0.8)', borderBottom: '1px solid rgba(26,48,80,0.5)' }}>
              <div>Source</div>
              <div>Type</div>
              <div className="col-span-2">Scope</div>
            </div>
            {SOURCES_TABLE.map((src, i) => (
              <div key={i} className="grid grid-cols-4 gap-0 px-4 py-3 text-xs"
                style={{ background: i % 2 === 0 ? 'rgba(13,27,46,0.4)' : 'rgba(7,13,26,0.3)', borderBottom: '1px solid rgba(26,48,80,0.3)' }}>
                <div className="text-blue-400 font-medium">
                  {src.url
                    ? <a href={src.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
                        {src.name} <ExternalLink size={9} />
                      </a>
                    : src.name}
                </div>
                <div>
                  <span className="px-2 py-0.5 rounded-full text-green-400"
                    style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
                    {src.type}
                  </span>
                </div>
                <div className="col-span-2 text-slate-400">{src.scope}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Status terminology */}
        <div>
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Status Terminology</h2>
          <div className="rounded-xl p-4 space-y-3 text-xs"
            style={{ background: 'rgba(13,27,46,0.7)', border: '1px solid rgba(26,48,80,0.6)' }}>
            {[
              ['Operating', '#10b981', 'Facility is in commercial operation as of the latest public reporting.'],
              ['Under Construction', '#3b82f6', 'Construction under way; not yet in commercial operation.'],
              ['Suspended', '#f59e0b', 'Operation halted; may or may not resume. Latest publicly available status.'],
              ['Shutdown', '#6b7280', 'Permanently shut down, not yet in formal decommissioning.'],
              ['Decommissioned / Decommissioning', '#6b7280', 'Formally in the decommissioning process or completed.'],
              ['Damaged', '#ef4444', 'Has sustained documented damage affecting normal operation.'],
              ['Historical', '#a16207', 'Past event or facility with no current operational component.'],
            ].map(([label, color, desc]) => (
              <div key={label} className="flex gap-3">
                <span className="px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 h-fit"
                  style={{ background: color + '15', color, border: `1px solid ${color}30` }}>
                  {label}
                </span>
                <span className="text-slate-400 leading-relaxed">{desc}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-600 mt-2">
            All status designations reflect the most recently available official public reporting, 
            not real-time or classified monitoring.
          </p>
        </div>

        {/* Limitations */}
        <div>
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Known Limitations</h2>
          <div className="rounded-xl p-4"
            style={{ background: 'rgba(13,27,46,0.7)', border: '1px solid rgba(245,158,11,0.2)' }}>
            <div className="flex items-center gap-2 mb-3 text-amber-400">
              <AlertCircle size={13} />
              <span className="text-xs font-semibold uppercase tracking-wider">Users should be aware of the following limitations:</span>
            </div>
            <ul className="space-y-2">
              {LIMITATIONS.map((lim, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                  <div className="w-1 h-1 rounded-full bg-amber-600 flex-shrink-0 mt-1.5" />
                  {lim}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Technical note */}
        <div className="rounded-xl p-4"
          style={{ background: 'rgba(13,27,46,0.5)', border: '1px solid rgba(26,48,80,0.5)' }}>
          <div className="flex items-center gap-2 mb-3">
            <Database size={13} className="text-slate-400" />
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Technical Notes</span>
          </div>
          <div className="text-xs text-slate-500 space-y-2 leading-relaxed">
            <p>
              <strong className="text-slate-400">Data architecture:</strong> Records are structured as JSON with defined 
              schema fields for source list, source type (official/secondary), official source flag, and lastUpdated timestamp. 
              The architecture supports future integration with official public APIs (e.g., IAEA PRIS) when such endpoints 
              become available.
            </p>
            <p>
              <strong className="text-slate-400">API integration points:</strong> Code comments mark locations where 
              static data files can be replaced with live API calls to IAEA PRIS, national registries, or other 
              official public data sources.
            </p>
            <p>
              <strong className="text-slate-400">Update cadence:</strong> This demonstration dataset reflects information 
              available as of the data file timestamp. In a production deployment, data would be reviewed and updated 
              on a regular schedule aligned with major public reporting cycles (e.g., IAEA PRIS updates, annual reports).
            </p>
            <p>
              <strong className="text-slate-400">Technology:</strong> Built with React, Vite, Tailwind CSS, React Leaflet, 
              Recharts, and Framer Motion. Map base layer: CartoDB Dark Matter (OpenStreetMap data). 
              Deployable to GitHub Pages, Vercel, or similar static hosting platforms.
            </p>
          </div>
        </div>

        {/* Contact / reporting */}
        <div className="rounded-xl p-4 text-center"
          style={{ background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.15)' }}>
          <p className="text-xs text-slate-400 leading-relaxed">
            This platform is an educational resource. If you identify a factual error, outdated information, 
            or a record that may inadvertently include non-public information, please contact the maintainers 
            through the project repository. All feedback is reviewed against official public sources.
          </p>
        </div>
      </div>
    </div>
  );
}
