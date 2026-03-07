import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Globe, BookOpen, Clock, Shield, Activity, FileText,
  Atom, Info, CheckCircle, XCircle, Database,
} from 'lucide-react';
import commercialPlants from '../data/commercialPlants';
import arsenalData from '../data/arsenalData';
import accidents from '../data/accidents';
import historicalEvents from '../data/historicalEvents';

const SECTIONS = [
  {
    to: '/infrastructure',
    icon: Globe,
    label: 'Civil Nuclear Infrastructure',
    description: 'Interactive world map of commercial nuclear power plants. Filter by status, country, and reactor type. Detailed info panels for each site.',
    color: '#3b82f6',
    glow: 'rgba(59,130,246,0.15)',
  },
  {
    to: '/basics',
    icon: BookOpen,
    label: 'Nuclear Basics',
    description: 'How nuclear fission power works, chain reactions, reactor types, safety systems, and the science of nuclear fusion.',
    color: '#8b5cf6',
    glow: 'rgba(139,92,246,0.15)',
  },
  {
    to: '/accidents',
    icon: Clock,
    label: 'Accidents & History',
    description: 'Major civilian accidents, INES-scale summaries, historical nuclear events and tests. Factual, sober, evidence-based.',
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.15)',
  },
  {
    to: '/arsenals',
    icon: Shield,
    label: 'Global Nuclear Arsenals',
    description: 'Country-level warhead estimates from SIPRI and FAS. Charts, trends, and NPT status — at country level only.',
    color: '#ef4444',
    glow: 'rgba(239,68,68,0.15)',
  },
  {
    to: '/radiation',
    icon: Activity,
    label: 'Radiation & Human Health',
    description: 'Dose units explained, health effects of ionizing radiation, dose comparisons, protective actions, and common misconceptions.',
    color: '#10b981',
    glow: 'rgba(16,185,129,0.15)',
  },
  {
    to: '/methodology',
    icon: FileText,
    label: 'Methodology',
    description: 'Sources, inclusion criteria, editorial boundaries, category definitions, and a frank explanation of what is excluded and why.',
    color: '#64748b',
    glow: 'rgba(100,116,139,0.15)',
  },
];

const INCLUDED = [
  'All publicly listed civilian commercial nuclear power plants worldwide',
  'Reactor status: operating, under construction, suspended, decommissioned',
  'Plant-level detail: operator, capacity, reactor type, commissioning year',
  'Major civilian accident sites with INES-level summary',
  'Historical nuclear events from public record',
  'Nuclear arsenal totals at country level (SIPRI/FAS estimates)',
  'Educational content on fission, fusion, radiation, and safety',
];

const EXCLUDED = [
  'Military nuclear facility mapping (sites, bases, storage locations)',
  'Detailed global mapping of enrichment and reprocessing facilities',
  'Weapon deployment, basing, or targeting information',
  'Operational tactical or strategic analysis',
  'Classified or leaked material of any kind',
  'Sensationalist or alarmist framing',
];

function SectionCard({ to, icon: Icon, label, description, color, glow }) {
  return (
    <Link to={to} className="no-underline group">
      <motion.div
        whileHover={{ y: -3 }}
        className="h-full rounded-xl border p-5 flex flex-col gap-3 transition-all duration-200"
        style={{
          background: 'rgba(10,20,40,0.7)',
          borderColor: 'rgba(30,50,80,0.7)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = color + '60';
          e.currentTarget.style.boxShadow = `0 0 20px ${glow}`;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'rgba(30,50,80,0.7)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: color + '18', border: `1px solid ${color}30` }}>
            <Icon size={17} style={{ color }} />
          </div>
          <span className="text-sm font-semibold text-slate-100 group-hover:text-white transition-colors">
            {label}
          </span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed flex-1">{description}</p>
        <div className="text-xs font-medium flex items-center gap-1 mt-auto" style={{ color }}>
          Explore →
        </div>
      </motion.div>
    </Link>
  );
}

function StatCard({ value, label, color = '#3b82f6' }) {
  return (
    <div className="flex flex-col items-center gap-1 px-4 py-4 rounded-xl border"
      style={{
        background: 'rgba(10,20,40,0.6)',
        borderColor: 'rgba(30,50,80,0.6)',
      }}>
      <span className="text-2xl font-bold" style={{ color, fontFamily: 'JetBrains Mono, monospace' }}>{value}</span>
      <span className="text-xs text-slate-400 text-center leading-tight">{label}</span>
    </div>
  );
}

export default function HomePage() {
  const operatingCount = commercialPlants.filter(p => p.status === 'operating').length;
  const constructionCount = commercialPlants.filter(p => p.status === 'under_construction').length;
  const countryCount = [...new Set(commercialPlants.map(p => p.country))].length;
  const accidentCount = accidents.length;
  const historicalCount = historicalEvents.length;
  const arsenalCount = arsenalData.length;
  const totalWarheads = arsenalData.reduce((s, c) => s + c.totalWarheads, 0).toLocaleString();

  return (
    <div className="min-h-full overflow-y-auto" style={{ background: 'linear-gradient(180deg, #040d1a 0%, #070f1e 60%, #050b18 100%)' }}>
      {/* Hero */}
      <section className="relative px-6 pt-16 pb-12 max-w-5xl mx-auto">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)' }} />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs text-blue-400 mb-6"
            style={{ borderColor: 'rgba(59,130,246,0.3)', background: 'rgba(59,130,246,0.07)' }}>
            <Atom size={12} />
            Public-Interest Educational Atlas · Data from IAEA, SIPRI, WHO
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            Global Nuclear Infrastructure
            <span className="block" style={{ color: '#3b82f6' }}>Atlas</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
            An open educational atlas of civilian nuclear power infrastructure, nuclear technology literacy,
            accident history, global arsenals at country level, and radiation health — all sourced from
            publicly available, reputable information.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/infrastructure"
              className="no-underline px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:brightness-110"
              style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)' }}>
              Explore the Map
            </Link>
            <Link to="/basics"
              className="no-underline px-5 py-2.5 rounded-lg text-sm font-semibold text-slate-300 border transition-all hover:text-white hover:bg-slate-800/50"
              style={{ borderColor: 'rgba(100,116,139,0.4)' }}>
              Nuclear Basics
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Summary stats */}
      <section className="px-6 pb-12 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
        >
          <StatCard value={commercialPlants.length} label="Commercial plant sites" color="#3b82f6" />
          <StatCard value={countryCount} label="Countries with civil nuclear power" color="#8b5cf6" />
          <StatCard value={constructionCount} label="Under construction" color="#10b981" />
          <StatCard value={accidentCount + historicalCount} label="Accidents & events" color="#f59e0b" />
          <StatCard value={arsenalCount} label="Nuclear-armed states" color="#ef4444" />
          <StatCard value={`~${totalWarheads}`} label="Est. global warheads" color="#64748b" />
        </motion.div>
      </section>

      {/* Section cards grid */}
      <section className="px-6 pb-12 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-5">
            <h2 className="text-base font-semibold text-slate-100">Atlas Sections</h2>
            <div className="flex-1 h-px" style={{ background: 'rgba(30,50,80,0.8)' }} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SECTIONS.map(s => <SectionCard key={s.to} {...s} />)}
          </div>
        </motion.div>
      </section>

      {/* What's included / excluded */}
      <section className="px-6 pb-16 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-5">
            <Info size={14} className="text-slate-400" />
            <h2 className="text-base font-semibold text-slate-100">Scope of this Atlas</h2>
            <div className="flex-1 h-px" style={{ background: 'rgba(30,50,80,0.8)' }} />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-xl border p-5" style={{ background: 'rgba(10,20,40,0.6)', borderColor: 'rgba(16,185,129,0.2)' }}>
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle size={15} className="text-emerald-400 flex-shrink-0" />
                <span className="text-sm font-semibold text-emerald-400">What is included</span>
              </div>
              <ul className="space-y-2">
                {INCLUDED.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                    <span className="text-emerald-500 mt-0.5 flex-shrink-0">·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border p-5" style={{ background: 'rgba(10,20,40,0.6)', borderColor: 'rgba(239,68,68,0.2)' }}>
              <div className="flex items-center gap-2 mb-4">
                <XCircle size={15} className="text-red-400 flex-shrink-0" />
                <span className="text-sm font-semibold text-red-400">What is intentionally excluded</span>
              </div>
              <ul className="space-y-2">
                {EXCLUDED.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                    <span className="text-red-500 mt-0.5 flex-shrink-0">·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-4 flex items-start gap-3 px-4 py-3 rounded-lg border text-xs text-slate-400"
            style={{ borderColor: 'rgba(30,50,80,0.5)', background: 'rgba(7,13,26,0.5)' }}>
            <Database size={14} className="flex-shrink-0 text-slate-500 mt-0.5" />
            <span>
              All data is sourced from official or highly reputable public references including IAEA PRIS, SIPRI, WHO,
              national nuclear regulators, and operator public disclosures. The atlas applies an educational and
              safety-conscious presentation standard. Public availability alone does not justify maximum granularity.
              See the <Link to="/methodology" className="text-blue-400 hover:underline">Methodology</Link> page for full details.
            </span>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
