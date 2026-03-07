import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Globe, BookOpen, Clock, Shield, Activity, FileText,
  Atom, Info, CheckCircle, XCircle, Database,
  Layers, AlertTriangle, Star, Building2, ChevronRight,
} from 'lucide-react';
import MapView from '../components/MapView';
import commercialPlants from '../data/commercialPlants';
import arsenalData from '../data/arsenalData';
import accidents from '../data/accidents';
import historicalEvents from '../data/historicalEvents';

// Layer definitions for the map legend / toggles
const LAYERS = [
  {
    id: 'plants',
    label: 'Commercial plants',
    icon: Building2,
    color: '#3b82f6',
    count: commercialPlants.length,
  },
  {
    id: 'accidents',
    label: 'Accident sites',
    icon: AlertTriangle,
    color: '#ef4444',
    count: accidents.length,
  },
  {
    id: 'history',
    label: 'Historical events',
    icon: Star,
    color: '#f59e0b',
    count: historicalEvents.length,
  },
];

const SECTIONS = [
  {
    to: '/infrastructure',
    icon: Globe,
    label: 'Civil Nuclear Infrastructure',
    description: 'Full map with filters, search, analytics, and detail panels for each plant.',
    color: '#3b82f6',
    glow: 'rgba(59,130,246,0.15)',
  },
  {
    to: '/basics',
    icon: BookOpen,
    label: 'Nuclear Basics',
    description: 'How reactors work, fission vs fusion, safety systems, spent fuel.',
    color: '#8b5cf6',
    glow: 'rgba(139,92,246,0.15)',
  },
  {
    to: '/accidents',
    icon: Clock,
    label: 'Accidents & History',
    description: 'Major civilian accidents, INES scale, historical nuclear events.',
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.15)',
  },
  {
    to: '/arsenals',
    icon: Shield,
    label: 'Global Nuclear Arsenals',
    description: 'Country-level warhead estimates from SIPRI and FAS.',
    color: '#ef4444',
    glow: 'rgba(239,68,68,0.15)',
  },
  {
    to: '/radiation',
    icon: Activity,
    label: 'Radiation & Health',
    description: 'Dose units, health effects, exposure pathways, protective actions.',
    color: '#10b981',
    glow: 'rgba(16,185,129,0.15)',
  },
  {
    to: '/methodology',
    icon: FileText,
    label: 'Methodology',
    description: 'Sources, inclusion criteria, editorial principles, and exclusions.',
    color: '#64748b',
    glow: 'rgba(100,116,139,0.15)',
  },
];

const INCLUDED = [
  'All publicly listed civilian commercial nuclear power plants (IAEA PRIS)',
  'Reactor status: operating, under construction, suspended, decommissioned',
  'Major civilian accident sites with INES-level summary',
  'Historical nuclear events from public record',
  'Nuclear arsenal totals at country level only (SIPRI/FAS estimates)',
  'Educational content on fission, fusion, radiation, and safety',
];

const EXCLUDED = [
  'Military nuclear facility mapping of any kind',
  'Enrichment / reprocessing site maps at global granularity',
  'Weapon deployment, basing, or targeting information',
  'Classified or leaked material',
  'Sensationalist or alarmist framing',
];

function SectionCard({ to, icon: Icon, label, description, color, glow }) {
  return (
    <Link to={to} className="no-underline group">
      <motion.div
        whileHover={{ y: -3 }}
        className="h-full rounded-xl border p-4 flex flex-col gap-2 transition-all duration-200 cursor-pointer"
        style={{ background: 'rgba(10,20,40,0.7)', borderColor: 'rgba(30,50,80,0.7)' }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = color + '60';
          e.currentTarget.style.boxShadow = `0 0 18px ${glow}`;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'rgba(30,50,80,0.7)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: color + '18', border: `1px solid ${color}30` }}>
            <Icon size={15} style={{ color }} />
          </div>
          <span className="text-xs font-semibold text-slate-100 group-hover:text-white transition-colors leading-tight">
            {label}
          </span>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed flex-1">{description}</p>
        <div className="text-xs font-medium flex items-center gap-1" style={{ color }}>
          Explore <ChevronRight size={11} />
        </div>
      </motion.div>
    </Link>
  );
}

export default function HomePage() {
  const [activeLayers, setActiveLayers] = useState({ plants: true, accidents: true, history: true });

  const toggleLayer = (id) => setActiveLayers(v => ({ ...v, [id]: !v[id] }));

  // Build combined map items based on active layers
  const mapItems = useMemo(() => {
    const items = [];
    if (activeLayers.plants) {
      commercialPlants.forEach(p => items.push({ ...p, category: 'power_plant' }));
    }
    if (activeLayers.accidents) {
      accidents.forEach(a => items.push(a)); // already has category: 'accident_site'
    }
    if (activeLayers.history) {
      historicalEvents.forEach(e => items.push(e)); // already has category: 'historical_event'
    }
    return items;
  }, [activeLayers]);

  const constructionCount = commercialPlants.filter(p => p.status === 'under_construction').length;
  const countryCount = [...new Set(commercialPlants.map(p => p.country))].length;
  const totalWarheads = arsenalData.reduce((s, c) => s + c.totalWarheads, 0).toLocaleString();

  return (
    <div className="h-full overflow-y-auto" style={{ background: '#040d1a' }}>
      {/* Hero */}
      <section className="relative px-6 pt-10 pb-6 max-w-5xl mx-auto">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)' }} />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative flex flex-col sm:flex-row sm:items-end gap-6"
        >
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs text-blue-400 mb-4"
              style={{ borderColor: 'rgba(59,130,246,0.3)', background: 'rgba(59,130,246,0.07)' }}>
              <Atom size={11} />
              Public-Interest Educational Atlas · IAEA · SIPRI · WHO
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-3">
              Global Nuclear
              <span className="block" style={{ color: '#3b82f6' }}>Infrastructure Atlas</span>
            </h1>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
              An open educational atlas of civilian nuclear power, accident history,
              global arsenals at country level, and radiation health — all from reputable public sources.
            </p>
          </div>
          {/* Quick stat pills */}
          <div className="flex flex-wrap sm:flex-col gap-2 sm:items-end">
            {[
              { v: commercialPlants.length, l: 'commercial plants', c: '#3b82f6' },
              { v: countryCount, l: 'countries', c: '#8b5cf6' },
              { v: `~${totalWarheads}`, l: 'est. warheads', c: '#ef4444' },
            ].map(s => (
              <div key={s.l} className="flex items-baseline gap-1.5 px-3 py-1.5 rounded-lg border"
                style={{ background: 'rgba(10,20,40,0.7)', borderColor: s.c + '25' }}>
                <span className="text-base font-bold" style={{ color: s.c, fontFamily: 'JetBrains Mono, monospace' }}>{s.v}</span>
                <span className="text-xs text-slate-500">{s.l}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── MAP SECTION ── */}
      <section className="px-6 pb-8 max-w-5xl mx-auto">
        <div className="flex items-center gap-2 mb-3">
          <Layers size={13} className="text-slate-400" />
          <span className="text-xs font-semibold text-slate-300">Global Overview Map</span>
          <div className="flex-1 h-px" style={{ background: 'rgba(30,50,80,0.7)' }} />
          {/* Layer toggles */}
          <div className="flex items-center gap-1.5">
            {LAYERS.map(layer => {
              const Icon = layer.icon;
              const active = activeLayers[layer.id];
              return (
                <button
                  key={layer.id}
                  onClick={() => toggleLayer(layer.id)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all border"
                  style={{
                    background: active ? layer.color + '15' : 'rgba(10,20,40,0.6)',
                    borderColor: active ? layer.color + '40' : 'rgba(30,50,80,0.5)',
                    color: active ? layer.color : '#475569',
                    opacity: active ? 1 : 0.6,
                  }}
                >
                  <Icon size={11} />
                  <span className="hidden sm:inline">{layer.label}</span>
                  <span className="text-xs opacity-60">({layer.count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Map container */}
        <div className="relative rounded-xl overflow-hidden border"
          style={{ height: 400, borderColor: 'rgba(30,50,80,0.6)' }}>
          <MapView items={mapItems} onFacilitySelect={() => {}} />

          {/* Legend overlay */}
          <div className="absolute bottom-3 left-3 z-20 flex flex-col gap-1 pointer-events-none">
            {LAYERS.filter(l => activeLayers[l.id]).map(l => (
              <div key={l.id} className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs"
                style={{ background: 'rgba(7,13,26,0.88)', backdropFilter: 'blur(8px)', border: '1px solid rgba(30,50,80,0.6)' }}>
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: l.color }} />
                <span className="text-slate-300">{l.label}</span>
              </div>
            ))}
          </div>

          {/* "Explore full map" CTA */}
          <div className="absolute top-3 right-3 z-20">
            <Link to="/infrastructure"
              className="no-underline flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all hover:brightness-110"
              style={{ background: 'rgba(37,99,235,0.9)', backdropFilter: 'blur(8px)' }}>
              <Globe size={12} />
              Full infrastructure map
            </Link>
          </div>
        </div>
        <p className="text-xs text-slate-600 mt-2">
          Click any marker to inspect. Toggle layers above. For filtering, search, and analytics, use the
          full <Link to="/infrastructure" className="text-blue-400 hover:underline">Infrastructure</Link> or{' '}
          <Link to="/accidents" className="text-amber-400 hover:underline">Accidents</Link> pages.
        </p>
      </section>

      {/* Section navigation cards */}
      <section className="px-6 pb-10 max-w-5xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-sm font-semibold text-slate-200">Atlas Sections</h2>
          <div className="flex-1 h-px" style={{ background: 'rgba(30,50,80,0.7)' }} />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {SECTIONS.map(s => <SectionCard key={s.to} {...s} />)}
        </div>
      </section>

      {/* What's included / excluded */}
      <section className="px-6 pb-12 max-w-5xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <Info size={13} className="text-slate-400" />
          <h2 className="text-sm font-semibold text-slate-200">Scope of this Atlas</h2>
          <div className="flex-1 h-px" style={{ background: 'rgba(30,50,80,0.7)' }} />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-xl border p-4" style={{ background: 'rgba(10,20,40,0.6)', borderColor: 'rgba(16,185,129,0.2)' }}>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle size={13} className="text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-400">Included</span>
            </div>
            <ul className="space-y-1.5">
              {INCLUDED.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                  <span className="text-emerald-600 flex-shrink-0 mt-0.5">·</span>{item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border p-4" style={{ background: 'rgba(10,20,40,0.6)', borderColor: 'rgba(239,68,68,0.2)' }}>
            <div className="flex items-center gap-2 mb-3">
              <XCircle size={13} className="text-red-400" />
              <span className="text-xs font-semibold text-red-400">Intentionally excluded</span>
            </div>
            <ul className="space-y-1.5">
              {EXCLUDED.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                  <span className="text-red-600 flex-shrink-0 mt-0.5">·</span>{item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-3 flex items-start gap-2.5 px-3 py-2.5 rounded-lg border text-xs text-slate-400"
          style={{ borderColor: 'rgba(30,50,80,0.5)', background: 'rgba(7,13,26,0.5)' }}>
          <Database size={12} className="flex-shrink-0 text-slate-500 mt-0.5" />
          All data from IAEA PRIS, SIPRI, WHO, national regulators, and operator public disclosures.
          See <Link to="/methodology" className="text-blue-400 hover:underline">Methodology</Link> for full details.
        </div>
      </section>
    </div>
  );
}
