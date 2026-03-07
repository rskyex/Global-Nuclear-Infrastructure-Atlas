import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PanelLeftClose, PanelLeftOpen, BarChart3, ChevronDown, ChevronUp,
  Clock, FlaskConical, Activity, Database, MousePointer2,
  ChevronRight, Globe, ArrowDown, ShieldCheck, BookOpen, AlertCircle,
  Layers, Scale, Zap, TrendingUp
} from 'lucide-react';
import MapView from '../components/MapView';
import FilterPanel from '../components/FilterPanel';
import SummaryCards from '../components/SummaryCards';
import MarkerLegend from '../components/MarkerLegend';
import FacilityDetailPanel from '../components/FacilityDetailPanel';
import ChartCards from '../components/ChartCards';
import useFilters from '../hooks/useFilters';

// ─── Explore Modules block ────────────────────────────────────────────────────
const MODULE_CARDS = [
  {
    to: '/history',
    label: 'History',
    subtitle: 'Accidents & Major Events',
    icon: Clock,
    color: '#ef4444',
    glow: 'rgba(239,68,68,0.18)',
    border: 'rgba(239,68,68,0.3)',
    bg: 'rgba(239,68,68,0.06)',
    description: 'Chernobyl, Fukushima, TMI, Windscale — detailed timelines, root cause analysis, INES classifications, and long-term consequences from official public records.',
    tag: 'INES 5–7',
  },
  {
    to: '/fusion',
    label: 'Fusion',
    subtitle: 'Nuclear Fuel Cycle Basics',
    icon: FlaskConical,
    color: '#8b5cf6',
    glow: 'rgba(139,92,246,0.18)',
    border: 'rgba(139,92,246,0.3)',
    bg: 'rgba(139,92,246,0.06)',
    description: 'From uranium mining to deep geological disposal — the complete civilian fuel cycle explained step by step with physics fundamentals and policy context.',
    tag: '8-step cycle',
  },
  {
    to: '/radar',
    label: 'Radar',
    subtitle: 'Analytics Dashboard',
    icon: Activity,
    color: '#06b6d4',
    glow: 'rgba(6,182,212,0.18)',
    border: 'rgba(6,182,212,0.3)',
    bg: 'rgba(6,182,212,0.06)',
    description: 'Visual analytics across the full dataset — facility distribution by category, operational status, country breakdowns, and accident timelines.',
    tag: 'Live charts',
  },
  {
    to: '/#methodology',
    label: 'Data Sources',
    subtitle: 'Methodology',
    icon: Database,
    color: '#10b981',
    glow: 'rgba(16,185,129,0.18)',
    border: 'rgba(16,185,129,0.3)',
    bg: 'rgba(16,185,129,0.06)',
    description: 'How data is sourced, categorized, and presented. Jervis framework, legibility scoring, IAEA/NRC provenance, and known limitations.',
    tag: 'Transparent',
    anchor: true,
  },
];

function ModuleCard({ card, index }) {
  const Icon = card.icon;
  const handleClick = (e) => {
    if (card.anchor) {
      e.preventDefault();
      document.getElementById('methodology')?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.07, duration: 0.4 }}
      whileHover={{ y: -3, transition: { duration: 0.15 } }}
      className="group">
      <Link
        to={card.anchor ? '/' : card.to}
        onClick={handleClick}
        className="block no-underline h-full rounded-xl p-4 transition-all duration-200"
        style={{
          background: card.bg,
          border: `1px solid ${card.border}`,
          boxShadow: `0 0 0 rgba(0,0,0,0)`,
        }}
        onMouseEnter={e => e.currentTarget.style.boxShadow = `0 4px 24px ${card.glow}`}
        onMouseLeave={e => e.currentTarget.style.boxShadow = `0 0 0 rgba(0,0,0,0)`}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg" style={{ background: card.color + '18', border: `1px solid ${card.color}25` }}>
              <Icon size={16} style={{ color: card.color }} />
            </div>
            <div>
              <div className="text-sm font-bold text-white leading-tight">{card.label}</div>
              <div className="text-xs text-slate-500">{card.subtitle}</div>
            </div>
          </div>
          <span className="text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0"
            style={{ background: card.color + '15', color: card.color, border: `1px solid ${card.color}25` }}>
            {card.tag}
          </span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed mb-3">{card.description}</p>
        <div className="flex items-center gap-1 text-xs font-medium group-hover:gap-2 transition-all"
          style={{ color: card.color }}>
          Explore <ChevronRight size={12} />
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Methodology section ──────────────────────────────────────────────────────
const JERVIS_DIMS = [
  {
    label: 'Legibility',
    icon: <BookOpen size={16} className="text-blue-400" />,
    color: '#3b82f6',
    def: 'How observable and interpretable is the action or event? High-legibility incidents leave clear public records; low-legibility incidents involve ambiguous attribution or limited official disclosure.',
    scale: ['Fully documented – IAEA/NRC public reporting', 'Partially documented – national regulator only', 'Limited – operator statements only', 'Opaque – no official public record'],
  },
  {
    label: 'Reversibility',
    icon: <Scale size={16} className="text-green-400" />,
    color: '#10b981',
    def: 'Can the situation be walked back? Reversibility assesses whether facility status changes, regulatory actions, or escalatory steps can be undone without lasting geopolitical or physical consequence.',
    scale: ['Fully reversible – restart possible after clearance', 'Conditionally reversible – with international verification', 'Partially reversible – legacy contamination remains', 'Irreversible – permanent shutdown / geological consequence'],
  },
  {
    label: 'Escalation',
    icon: <TrendingUp size={16} className="text-amber-400" />,
    color: '#f59e0b',
    def: 'Does the event or status represent a step on the escalation ladder? Escalation potential is assessed relative to baseline facility operation, considering proximity to populated areas, grid dependency, and international regulatory response.',
    scale: ['Baseline – normal operation', 'Elevated – increased IAEA monitoring', 'Concerning – formal safety event declared', 'Critical – INES 5+ or emergency declared'],
  },
];

const SCORING_ROWS = [
  { criterion: 'INES Level ≥ 5', weight: 'High', notes: 'Triggers enhanced historical record and accident-site classification.' },
  { criterion: 'Official IAEA report exists', weight: 'High', notes: 'Increases legibility score; confirms public record provenance.' },
  { criterion: 'Evacuations documented', weight: 'Medium', notes: 'Escalation signal; entered in consequences fields.' },
  { criterion: 'Exclusion zone active', weight: 'Medium', notes: 'Irreversibility indicator; shown in current status.' },
  { criterion: 'IAEA expert presence', weight: 'Medium', notes: 'Legibility and international monitoring signal.' },
  { criterion: 'Remediation programme underway', weight: 'Low–Medium', notes: 'Partial reversibility; tracked in remediation status field.' },
  { criterion: 'Operator-only source', weight: 'Low', notes: 'Reduces legibility confidence; flagged in source badge.' },
];

const SALAMI_CRITERIA = [
  'A sequence of individually below-threshold actions across multiple time periods.',
  'Each step is publicly deniable or ambiguous in isolation.',
  'The cumulative effect crosses a threshold that no single step would trigger.',
  'At least two independent official sources report individual steps separately.',
  'Pattern spans ≥ 3 documented events within a ≤ 24-month window.',
];

function MethodologySection() {
  return (
    <section id="methodology" className="max-w-5xl mx-auto px-4 py-14 space-y-12">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <div className="text-xs font-semibold tracking-widest text-green-400 uppercase mb-2">Platform Methodology</div>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Data Sources & Framework</h2>
        <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">
          How this atlas sources, evaluates, and presents civilian nuclear data — including the analytical
          framework used for assessing incident significance, escalation potential, and information confidence.
        </p>
      </motion.div>

      {/* Purpose + Principles row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            icon: <Globe size={16} className="text-blue-400" />,
            title: 'Project Purpose',
            text: 'An educational and policy-oriented interactive atlas of civilian nuclear infrastructure. Designed for journalism, academic research, and policy analysis — not surveillance or intelligence collection.',
            color: '#3b82f6',
          },
          {
            icon: <ShieldCheck size={16} className="text-green-400" />,
            title: 'Official Sources Only',
            text: 'Every record cites only officially published public information: IAEA PRIS, IAEA RRDB, NRC, ONR, ASN, STUK, operator disclosures, and UNSCEAR health reports. No classified or speculative data.',
            color: '#10b981',
          },
          {
            icon: <AlertCircle size={16} className="text-amber-400" />,
            title: 'Confidence Limits',
            text: '"Latest Publicly Available Status" denotes the most recent public filing — not real-time monitoring. Coverage varies by country. Operator-only sources receive lower legibility confidence.',
            color: '#f59e0b',
          },
        ].map((card, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.07 }}
            className="rounded-xl p-4"
            style={{ background: 'rgba(13,27,46,0.7)', border: `1px solid ${card.color}20` }}>
            <div className="flex items-center gap-2 mb-2">{card.icon}<span className="text-xs font-semibold text-white">{card.title}</span></div>
            <p className="text-xs text-slate-400 leading-relaxed">{card.text}</p>
          </motion.div>
        ))}
      </div>

      {/* Jervis Framework */}
      <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <div className="flex items-center gap-2 mb-1">
          <Layers size={14} className="text-blue-400" />
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Jervis Analytical Framework</h3>
        </div>
        <p className="text-xs text-slate-500 mb-5 max-w-2xl">
          Adapted from Robert Jervis' work on nuclear deterrence and the security dilemma
          (<em>Perception and Misperception in International Politics</em>, 1976;
          <em> The Illogic of American Nuclear Strategy</em>, 1984).
          This atlas applies three Jervis-derived dimensions to contextualise documented incidents and facility statuses.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {JERVIS_DIMS.map((dim, i) => (
            <motion.div key={dim.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="rounded-xl p-4"
              style={{ background: 'rgba(13,27,46,0.8)', border: `1px solid ${dim.color}25` }}>
              <div className="flex items-center gap-2 mb-2">
                {dim.icon}
                <span className="text-sm font-bold" style={{ color: dim.color }}>{dim.label}</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">{dim.def}</p>
              <div className="space-y-1">
                <div className="text-xs text-slate-600 font-medium uppercase tracking-wider mb-1.5">Score levels</div>
                {dim.scale.map((s, j) => (
                  <div key={j} className="flex items-start gap-2 text-xs text-slate-500">
                    <div className="flex-shrink-0 w-4 h-4 rounded flex items-center justify-center text-white text-xs font-bold mt-0.5"
                      style={{ background: dim.color, opacity: 1 - j * 0.2, fontSize: 9 }}>
                      {4 - j}
                    </div>
                    {s}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Scoring logic table */}
      <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <div className="flex items-center gap-2 mb-4">
          <Zap size={14} className="text-amber-400" />
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Incident Scoring Logic</h3>
        </div>
        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(26,48,80,0.7)' }}>
          <div className="grid grid-cols-12 gap-0 px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider"
            style={{ background: 'rgba(7,13,26,0.9)', borderBottom: '1px solid rgba(26,48,80,0.5)' }}>
            <div className="col-span-5">Criterion</div>
            <div className="col-span-2">Weight</div>
            <div className="col-span-5">Notes</div>
          </div>
          {SCORING_ROWS.map((row, i) => (
            <div key={i} className="grid grid-cols-12 gap-0 px-4 py-2.5 text-xs"
              style={{ background: i % 2 === 0 ? 'rgba(13,27,46,0.5)' : 'rgba(7,13,26,0.3)', borderBottom: '1px solid rgba(26,48,80,0.3)' }}>
              <div className="col-span-5 text-slate-300">{row.criterion}</div>
              <div className="col-span-2">
                <span className="px-2 py-0.5 rounded-full text-xs"
                  style={{
                    background: row.weight === 'High' ? 'rgba(239,68,68,0.12)' : row.weight === 'Medium' ? 'rgba(245,158,11,0.12)' : 'rgba(107,114,128,0.12)',
                    color: row.weight === 'High' ? '#f87171' : row.weight === 'Medium' ? '#fbbf24' : '#9ca3af',
                  }}>
                  {row.weight}
                </span>
              </div>
              <div className="col-span-5 text-slate-500 leading-relaxed">{row.notes}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Salami tactics */}
      <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp size={14} className="text-red-400" />
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Salami Tactics Criteria</h3>
        </div>
        <div className="rounded-xl p-4" style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.18)' }}>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            Salami tactics — incremental provocations each below the threshold of a decisive response —
            are a documented pattern in nuclear crisis management (Schelling, 1966; Jervis, 1989).
            This atlas applies the following criteria before categorising a sequence as a potential salami pattern:
          </p>
          <div className="space-y-2">
            {SALAMI_CRITERIA.map((c, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-red-400 mt-0.5"
                  style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)' }}>
                  {i + 1}
                </div>
                <span className="text-xs text-slate-300 leading-relaxed">{c}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-600 mt-4 italic">
            Note: Salami categorisation is a descriptive analytical label, not a legal or intelligence designation.
            It is applied only to publicly documented event sequences.
          </p>
        </div>
      </motion.div>

      {/* Data sources list */}
      <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <div className="flex items-center gap-2 mb-4">
          <Database size={14} className="text-cyan-400" />
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Primary Data Sources</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { name: 'IAEA PRIS', desc: 'Power Reactor Information System', url: 'https://pris.iaea.org/' },
            { name: 'IAEA RRDB', desc: 'Research Reactor Database', url: 'https://nucleus.iaea.org/RRDB/' },
            { name: 'NRC', desc: 'US Nuclear Regulatory Commission', url: 'https://www.nrc.gov/' },
            { name: 'ONR', desc: 'UK Office for Nuclear Regulation', url: 'https://www.onr.org.uk/' },
            { name: 'ASN', desc: 'French Nuclear Safety Authority', url: 'https://www.asn.fr/' },
            { name: 'STUK', desc: 'Finnish Radiation & Nuclear Safety', url: 'https://www.stuk.fi/en' },
            { name: 'UNSCEAR', desc: 'UN Scientific Committee on Atomic Radiation', url: 'https://www.unscear.org/' },
            { name: 'Operators', desc: 'EDF, TVO, TEPCO, Bruce Power, Nawah…', url: null },
          ].map((src, i) => (
            <div key={i} className="rounded-lg p-3"
              style={{ background: 'rgba(13,27,46,0.6)', border: '1px solid rgba(26,48,80,0.5)' }}>
              <div className="text-xs font-bold text-cyan-400 mb-0.5">{src.name}</div>
              <div className="text-xs text-slate-500 leading-snug">{src.desc}</div>
              {src.url && (
                <a href={src.url} target="_blank" rel="noopener noreferrer"
                  className="text-xs text-slate-600 hover:text-slate-400 mt-1.5 block truncate no-underline">
                  ↗ {src.url.replace('https://', '')}
                </a>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      <div className="text-xs text-slate-600 border-t border-slate-800/50 pt-4 leading-relaxed">
        This platform uses publicly available information exclusively. It does not connect to classified
        databases or intelligence systems. All limitations are documented here.
        Data is structured to support future IAEA PRIS API integration when public endpoints become available.
      </div>
    </section>
  );
}

// ─── Main HomePage ─────────────────────────────────────────────────────────────
export default function HomePage() {
  const filters = useFilters();
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showCharts, setShowCharts] = useState(false);
  const [showSummary, setShowSummary] = useState(true);
  const mapSectionRef = useRef(null);

  const scrollToMap = () => {
    mapSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col flex-1 overflow-y-auto" style={{ background: '#070d1a' }}>
      {/* ── Hero + Explore Modules ───────────────────────────────── */}
      <div className="flex-shrink-0 px-4 pt-8 pb-6 max-w-6xl mx-auto w-full">
        {/* Hero text */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="mb-6">
          <div className="text-xs font-semibold tracking-widest text-blue-400 uppercase mb-2"
            style={{ letterSpacing: '0.2em' }}>
            Educational & Policy Platform · Public Data Only
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
            Global Nuclear Infrastructure Atlas
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
            An interactive world map of civilian nuclear power plants, research reactors,
            fuel cycle facilities, accident sites, and historical events — built from officially
            published public information for education, journalism, and policy analysis.
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            <button
              onClick={scrollToMap}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                background: 'rgba(59,130,246,0.2)',
                border: '1px solid rgba(59,130,246,0.4)',
                color: '#93c5fd',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(59,130,246,0.3)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(59,130,246,0.2)'}>
              <Globe size={14} />
              Explore Incidents
              <ArrowDown size={13} />
            </button>
            <a href="#methodology"
              onClick={e => { e.preventDefault(); document.getElementById('methodology')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all no-underline"
              style={{
                background: 'rgba(16,185,129,0.1)',
                border: '1px solid rgba(16,185,129,0.25)',
                color: '#6ee7b7',
              }}>
              <BookOpen size={14} />
              Methodology
            </a>
          </div>
        </motion.div>

        {/* ── Explore Modules block ── */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px flex-1 bg-gradient-to-r from-blue-900/60 to-transparent" />
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest px-2">Explore Modules</span>
            <div className="h-px flex-1 bg-gradient-to-l from-blue-900/60 to-transparent" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {MODULE_CARDS.map((card, i) => (
              <ModuleCard key={card.label} card={card} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Map Section ────────────────────────────────────────────── */}
      <div ref={mapSectionRef} className="flex-shrink-0 px-4 pb-2 max-w-6xl mx-auto w-full">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Globe size={13} className="text-blue-400" />
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Interactive Map</span>
          </div>
          {/* Marker hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs"
            style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', color: '#94a3b8' }}>
            <MousePointer2 size={11} className="text-blue-400" />
            Click markers on the map to inspect facility details
          </motion.div>
        </div>
      </div>

      {/* Summary cards */}
      <div className="flex-shrink-0 max-w-6xl mx-auto w-full px-4">
        <div style={{ background: 'rgba(7,13,26,0.95)', borderRadius: 12, border: '1px solid rgba(26,48,80,0.6)' }}>
          <button
            onClick={() => setShowSummary(s => !s)}
            className="w-full flex items-center justify-between px-4 py-2 text-xs text-slate-500 hover:text-slate-300 transition-colors">
            <span className="flex items-center gap-1.5">
              <BarChart3 size={11} />
              Dataset Summary
            </span>
            {showSummary ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
          </button>
          <AnimatePresence>
            {showSummary && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                <SummaryCards summary={filters.summary} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Map + Sidebar + Detail Panel */}
      <div className="flex-shrink-0 max-w-6xl mx-auto w-full px-4 mt-3 pb-4">
        <div className="flex gap-3" style={{ height: 520 }}>
          {/* Left sidebar */}
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                key="sidebar"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 248, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex-shrink-0 overflow-y-auto overflow-x-hidden rounded-xl"
                style={{
                  background: 'rgba(7,13,26,0.97)',
                  border: '1px solid rgba(26,48,80,0.7)',
                }}>
                <div style={{ width: 248 }}>
                  <FilterPanel {...filters} />
                  <div className="px-3 pb-3">
                    <MarkerLegend />
                  </div>
                  <div className="px-3 py-2 text-xs text-slate-600 border-t border-slate-800/50 leading-relaxed">
                    Showing {filters.filteredItems.length} of {filters.summary.totalItems} records.
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Map area */}
          <div className="flex-1 relative overflow-hidden rounded-xl"
            style={{ border: '1px solid rgba(26,48,80,0.6)' }}>
            {/* Controls row */}
            <div className="absolute top-3 left-3 z-[500] flex items-center gap-2">
              <button
                onClick={() => setSidebarOpen(s => !s)}
                className="p-2 rounded-lg transition-colors"
                style={{ background: 'rgba(7,13,26,0.9)', border: '1px solid rgba(26,48,80,0.7)', color: '#64748b' }}>
                {sidebarOpen ? <PanelLeftClose size={14} /> : <PanelLeftOpen size={14} />}
              </button>
              <button
                onClick={() => setShowCharts(s => !s)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs transition-colors"
                style={{
                  background: showCharts ? 'rgba(59,130,246,0.15)' : 'rgba(7,13,26,0.9)',
                  border: `1px solid ${showCharts ? 'rgba(59,130,246,0.4)' : 'rgba(26,48,80,0.7)'}`,
                  color: showCharts ? '#93c5fd' : '#64748b',
                }}>
                <BarChart3 size={13} />
                <span className="hidden sm:inline">Analytics</span>
              </button>
            </div>

            {/* Map */}
            <div className="absolute inset-0">
              <MapView items={filters.filteredItems} onFacilitySelect={f => setSelectedFacility(f)} />
            </div>

            {/* No-selection empty state (shown when no facility is selected) */}
            <AnimatePresence>
              {!selectedFacility && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ delay: 1 }}
                  className="absolute bottom-4 right-4 z-[450] flex items-center gap-2 px-3 py-2 rounded-lg text-xs"
                  style={{
                    background: 'rgba(7,13,26,0.88)',
                    border: '1px solid rgba(26,48,80,0.7)',
                    backdropFilter: 'blur(8px)',
                    color: '#64748b',
                    pointerEvents: 'none',
                  }}>
                  <MousePointer2 size={12} className="text-blue-500 animate-pulse" />
                  No incident selected — click a marker to inspect
                </motion.div>
              )}
            </AnimatePresence>

            {/* Charts overlay */}
            <AnimatePresence>
              {showCharts && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-0 left-0 right-0 overflow-auto"
                  style={{
                    background: 'rgba(7,13,26,0.97)',
                    borderTop: '1px solid rgba(26,48,80,0.7)',
                    maxHeight: '42%',
                    backdropFilter: 'blur(12px)',
                    zIndex: 400,
                  }}>
                  <ChartCards />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right detail panel */}
          <AnimatePresence>
            {selectedFacility && (
              <motion.div
                key="detail"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 340, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="flex-shrink-0 overflow-hidden rounded-xl"
                style={{ border: '1px solid rgba(26,48,80,0.7)' }}>
                <div style={{ width: 340, height: '100%' }}>
                  <FacilityDetailPanel
                    facility={selectedFacility}
                    onClose={() => setSelectedFacility(null)}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Methodology Section ─────────────────────────────────────── */}
      <div style={{ borderTop: '1px solid rgba(26,48,80,0.5)', marginTop: 24 }}>
        <MethodologySection />
      </div>
    </div>
  );
}
