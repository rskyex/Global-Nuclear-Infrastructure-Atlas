import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe, BookOpen, Clock, Shield, Activity, FileText,
  Atom, Info, CheckCircle, XCircle, Database,
  Layers, AlertTriangle, Star, Building2, ChevronRight,
  Target, Zap, Cpu, MapPin, X, ExternalLink, User,
  BarChart3, Radiation,
} from 'lucide-react';
import MapView from '../components/MapView';
import commercialPlants from '../data/commercialPlants';
import { enrichedFacilities, facilitySummary } from '../data/enrichedFacilities';
import arsenalData from '../data/arsenalData';
import accidents from '../data/accidents';
import historicalEvents from '../data/historicalEvents';
import { countryPolicies } from '../data/countryPolicies';
import { STATUS_COLORS, getStatusLabel, getCategoryColor, getCategoryLabel } from '../utils/categoryHelpers';

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

const OVERLAY_LAYERS = [
  { key: 'safeguards', label: 'Safeguards', icon: Shield, color: '#10b981' },
  { key: 'decommissioning', label: 'Decommission Risk', icon: AlertTriangle, color: '#f59e0b' },
  { key: 'conflict', label: 'Conflict Proximity', icon: Target, color: '#ef4444' },
  { key: 'cyber', label: 'Cyber-Nuclear', icon: Cpu, color: '#ec4899' },
  { key: 'fukushima', label: 'Post-Fukushima', icon: Zap, color: '#3b82f6' },
  { key: 'postsoviet', label: 'Post-Soviet', icon: MapPin, color: '#06b6d4' },
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

function FacilityDetailModal({ facility, onClose }) {
  if (!facility) return null;
  const catColor = getCategoryColor(facility.category);
  const stColor = STATUS_COLORS[facility.status] ?? '#6b7280';
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-md rounded-xl border overflow-hidden"
        style={{ background: '#0a1428', borderColor: 'rgba(30,50,80,0.8)' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-start justify-between p-4 border-b" style={{ borderColor: 'rgba(30,50,80,0.7)' }}>
          <div className="flex-1 pr-3">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ background: catColor + '25', color: catColor, border: `1px solid ${catColor}35` }}>
                {getCategoryLabel(facility.category)}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: stColor + '25', color: stColor, border: `1px solid ${stColor}35` }}>
                {getStatusLabel(facility.status)}
              </span>
            </div>
            <h3 className="text-sm font-bold text-white leading-tight">{facility.name}</h3>
            <span className="text-xs text-slate-400">{facility.country}</span>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-300 flex-shrink-0 mt-1">
            <X size={16} />
          </button>
        </div>
        <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Reactor Type', value: facility.reactorType },
              { label: 'Capacity', value: facility.capacityMW ? `${facility.capacityMW.toLocaleString()} MWe` : '—' },
              { label: 'Operator', value: facility.operator },
              { label: 'Region', value: facility.region },
            ].filter(r => r.value).map(({ label, value }) => (
              <div key={label} className="rounded-lg p-2" style={{ background: 'rgba(10,20,40,0.8)', border: '1px solid rgba(30,50,80,0.5)' }}>
                <div className="text-xs text-slate-500 mb-0.5">{label}</div>
                <div className="text-xs font-semibold text-slate-200 truncate">{value}</div>
              </div>
            ))}
          </div>
          {facility.overview && (
            <p className="text-xs text-slate-300 leading-relaxed">{facility.overview}</p>
          )}
          {facility.accidentDate && (
            <div className="text-xs text-slate-400">Date: <span className="text-slate-200" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{facility.accidentDate}</span></div>
          )}
          {facility.eventDate && (
            <div className="text-xs text-slate-400">Date: <span className="text-slate-200" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{facility.eventDate}</span></div>
          )}
          {facility.sources?.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">Sources</div>
              <div className="space-y-1">
                {facility.sources.map((s, i) => (
                  <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 no-underline">
                    <ExternalLink size={10} />{s.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="p-4 border-t flex gap-2" style={{ borderColor: 'rgba(30,50,80,0.7)' }}>
          <Link to="/infrastructure"
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium no-underline transition-all"
            style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)', color: '#3b82f6' }}>
            Open in Full Map <ChevronRight size={12} />
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function HomePage() {
  const [activeLayers, setActiveLayers] = useState({ plants: true, accidents: true, history: true });
  const [activeOverlay, setActiveOverlay] = useState(null);
  const [showConflictRadius, setShowConflictRadius] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);

  const toggleLayer = (id) => setActiveLayers(v => ({ ...v, [id]: !v[id] }));

  const toggleOverlay = (key) => {
    if (key === 'conflict') {
      setShowConflictRadius(v => !v);
      if (activeOverlay === 'conflict') setActiveOverlay(null);
    } else {
      setActiveOverlay(v => v === key ? null : key);
    }
  };

  // Build combined map items — use enriched facilities for overlay support
  const mapItems = useMemo(() => {
    const items = [];
    if (activeLayers.plants) {
      enrichedFacilities.forEach(p => items.push({ ...p, category: 'power_plant' }));
    }
    if (activeLayers.accidents) {
      accidents.forEach(a => items.push(a));
    }
    if (activeLayers.history) {
      historicalEvents.forEach(e => items.push(e));
    }
    return items;
  }, [activeLayers]);

  const constructionCount = commercialPlants.filter(p => p.status === 'under_construction').length;
  const countryCount = [...new Set(commercialPlants.map(p => p.country))].length;
  const totalWarheads = arsenalData.reduce((s, c) => s + c.totalWarheads, 0).toLocaleString();
  const policyFluxCount = countryPolicies.filter(c => c.policy_flux).length;
  const topArsenals = arsenalData.sort((a, b) => b.totalWarheads - a.totalWarheads).slice(0, 5);
  const majorAccidents = accidents.filter(a => a.inesLevel >= 5);
  const smrCountries = countryPolicies.filter(c => c.smr_programme).length;

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
          <div className="flex items-center gap-1.5 flex-wrap">
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
          style={{ height: 440, borderColor: 'rgba(30,50,80,0.6)' }}>
          <MapView
            items={mapItems}
            onFacilitySelect={setSelectedFacility}
            activeOverlay={activeOverlay}
            showConflictRadius={showConflictRadius}
          />

          {/* Legend overlay */}
          <div className="absolute bottom-3 left-3 z-20 flex flex-col gap-1 pointer-events-none">
            {LAYERS.filter(l => activeLayers[l.id]).map(l => (
              <div key={l.id} className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs"
                style={{ background: 'rgba(7,13,26,0.88)', backdropFilter: 'blur(8px)', border: '1px solid rgba(30,50,80,0.6)' }}>
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: l.color }} />
                <span className="text-slate-300">{l.label}</span>
              </div>
            ))}
            {activeOverlay && (
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs"
                style={{ background: 'rgba(7,13,26,0.88)', backdropFilter: 'blur(8px)', border: '1px solid rgba(30,50,80,0.6)' }}>
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: OVERLAY_LAYERS.find(o => o.key === activeOverlay)?.color }} />
                <span className="text-slate-300">{OVERLAY_LAYERS.find(o => o.key === activeOverlay)?.label} overlay</span>
              </div>
            )}
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

        {/* Analysis overlay toggles */}
        <div className="mt-3 rounded-xl border p-3" style={{ background: 'rgba(10,20,40,0.6)', borderColor: 'rgba(30,50,80,0.5)' }}>
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 size={11} className="text-slate-400" />
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Analysis Overlays</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {OVERLAY_LAYERS.map(({ key, label, icon: Icon, color }) => {
              const isActive = activeOverlay === key || (key === 'conflict' && showConflictRadius);
              return (
                <button
                  key={key}
                  onClick={() => toggleOverlay(key)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all border"
                  style={{
                    background: isActive ? color + '15' : 'rgba(7,13,26,0.5)',
                    borderColor: isActive ? color + '40' : 'rgba(30,50,80,0.4)',
                    color: isActive ? color : '#64748b',
                  }}
                >
                  <Icon size={11} />
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Global Risk Summary Pills */}
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            { label: 'Safeguards Gaps', value: facilitySummary.safeguardsGaps, icon: Shield, color: '#f59e0b' },
            { label: 'Conflict Proximity', value: facilitySummary.conflictProximity, icon: Target, color: '#ef4444' },
            { label: 'High Risk (4+)', value: facilitySummary.highRisk, icon: AlertTriangle, color: '#ef4444' },
            { label: 'Digital I&C', value: facilitySummary.digitalIandC, icon: Cpu, color: '#8b5cf6' },
            { label: 'Post-Soviet', value: facilitySummary.postSoviet, icon: MapPin, color: '#06b6d4' },
            { label: 'Policy Flux', value: policyFluxCount, icon: Activity, color: '#ec4899' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs"
              style={{ background: 'rgba(7,13,26,0.6)', borderColor: color + '20' }}>
              <Icon size={11} style={{ color }} />
              <span className="font-bold" style={{ color, fontFamily: 'JetBrains Mono, monospace' }}>{value}</span>
              <span className="text-slate-500">{label}</span>
            </div>
          ))}
        </div>

        <p className="text-xs text-slate-600 mt-2">
          Click any marker to inspect. Toggle layers and analysis overlays above. For full filtering, search, and analytics, use the
          full <Link to="/infrastructure" className="text-blue-400 hover:underline">Infrastructure</Link> or{' '}
          <Link to="/accidents" className="text-amber-400 hover:underline">Accidents</Link> pages.
        </p>
      </section>

      {/* Facility detail modal */}
      <AnimatePresence>
        {selectedFacility && (
          <FacilityDetailModal facility={selectedFacility} onClose={() => setSelectedFacility(null)} />
        )}
      </AnimatePresence>

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

      {/* ── ANALYSIS HIGHLIGHTS ── */}
      <section className="px-6 pb-10 max-w-5xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 size={13} className="text-slate-400" />
          <h2 className="text-sm font-semibold text-slate-200">Analysis Highlights</h2>
          <div className="flex-1 h-px" style={{ background: 'rgba(30,50,80,0.7)' }} />
        </div>
        <div className="grid md:grid-cols-2 gap-4">

          {/* Arsenal Overview */}
          <div className="rounded-xl border p-4" style={{ background: 'rgba(10,20,40,0.6)', borderColor: 'rgba(239,68,68,0.2)' }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Shield size={13} className="text-red-400" />
                <span className="text-xs font-semibold text-red-400">Global Nuclear Arsenals</span>
              </div>
              <Link to="/arsenals" className="text-xs text-red-400 hover:text-red-300 no-underline flex items-center gap-1">
                Full page <ChevronRight size={10} />
              </Link>
            </div>
            <div className="space-y-1.5">
              {topArsenals.map(a => (
                <div key={a.id} className="flex items-center gap-2">
                  <span className="text-xs w-4">{a.flag}</span>
                  <span className="text-xs text-slate-300 flex-1 truncate">{a.country}</span>
                  <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(30,50,80,0.5)', maxWidth: 100 }}>
                    <div className="h-full rounded-full" style={{ width: `${(a.totalWarheads / topArsenals[0].totalWarheads) * 100}%`, background: '#ef4444' }} />
                  </div>
                  <span className="text-xs font-bold text-red-400 w-14 text-right" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    {a.totalWarheads.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-2 text-xs text-slate-600">Source: SIPRI / FAS estimates (country-level only)</div>
          </div>

          {/* Accidents Overview */}
          <div className="rounded-xl border p-4" style={{ background: 'rgba(10,20,40,0.6)', borderColor: 'rgba(245,158,11,0.2)' }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle size={13} className="text-amber-400" />
                <span className="text-xs font-semibold text-amber-400">Major Accidents (INES 5+)</span>
              </div>
              <Link to="/accidents" className="text-xs text-amber-400 hover:text-amber-300 no-underline flex items-center gap-1">
                Full page <ChevronRight size={10} />
              </Link>
            </div>
            <div className="space-y-2">
              {majorAccidents.map(a => (
                <div key={a.id} className="flex items-start gap-2">
                  <span className="text-xs font-bold px-1.5 py-0.5 rounded"
                    style={{ background: a.inesLevel >= 7 ? '#ef444425' : '#f59e0b25', color: a.inesLevel >= 7 ? '#ef4444' : '#f59e0b', fontFamily: 'JetBrains Mono, monospace' }}>
                    INES {a.inesLevel}
                  </span>
                  <div className="flex-1">
                    <div className="text-xs text-slate-200 font-medium">{a.name}</div>
                    <div className="text-xs text-slate-500">{a.country} · {a.accidentDate}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 text-xs text-slate-600">{accidents.length} total incident sites mapped across the INES scale</div>
          </div>

          {/* Policy Intelligence */}
          <div className="rounded-xl border p-4" style={{ background: 'rgba(10,20,40,0.6)', borderColor: 'rgba(139,92,246,0.2)' }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Activity size={13} className="text-violet-400" />
                <span className="text-xs font-semibold text-violet-400">Policy Intelligence</span>
              </div>
              <Link to="/policy" className="text-xs text-violet-400 hover:text-violet-300 no-underline flex items-center gap-1">
                Full page <ChevronRight size={10} />
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {[
                { label: 'Countries tracked', value: countryPolicies.length, color: '#8b5cf6' },
                { label: 'Policy flux', value: policyFluxCount, color: '#ec4899' },
                { label: 'SMR programmes', value: smrCountries, color: '#06b6d4' },
              ].map(s => (
                <div key={s.label} className="rounded-lg p-2 text-center" style={{ background: 'rgba(7,13,26,0.6)', border: '1px solid rgba(30,50,80,0.4)' }}>
                  <div className="text-base font-bold" style={{ color: s.color, fontFamily: 'JetBrains Mono, monospace' }}>{s.value}</div>
                  <div className="text-xs text-slate-500 leading-tight">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="text-xs text-slate-400 leading-relaxed">
              Tracks nuclear policy posture, enrichment capability, treaty status (NPT/TPNW), and post-Fukushima policy trajectory across all nuclear-capable states.
            </div>
          </div>

          {/* Infrastructure Analytics */}
          <div className="rounded-xl border p-4" style={{ background: 'rgba(10,20,40,0.6)', borderColor: 'rgba(59,130,246,0.2)' }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Globe size={13} className="text-blue-400" />
                <span className="text-xs font-semibold text-blue-400">Infrastructure Analytics</span>
              </div>
              <Link to="/infrastructure" className="text-xs text-blue-400 hover:text-blue-300 no-underline flex items-center gap-1">
                Full page <ChevronRight size={10} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {[
                { label: 'Facilities mapped', value: facilitySummary.total, color: '#3b82f6' },
                { label: 'Under construction', value: constructionCount, color: '#3b82f6' },
                { label: 'Decommissioning', value: facilitySummary.decommissioning, color: '#6b7280' },
                { label: 'High governance risk', value: facilitySummary.highRisk, color: '#ef4444' },
              ].map(s => (
                <div key={s.label} className="rounded-lg p-2" style={{ background: 'rgba(7,13,26,0.6)', border: '1px solid rgba(30,50,80,0.4)' }}>
                  <div className="text-base font-bold" style={{ color: s.color, fontFamily: 'JetBrains Mono, monospace' }}>{s.value}</div>
                  <div className="text-xs text-slate-500 leading-tight">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="text-xs text-slate-400 leading-relaxed">
              Full analytics: status breakdown, capacity by country, reactor type distribution, governance risk scoring, safeguards coverage, and cyber-nuclear intersection analysis.
            </div>
          </div>
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

      {/* ── FAULTLINE SUITE ── */}
      <section className="px-6 pb-10 max-w-5xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <Globe size={13} className="text-slate-400" />
          <h2 className="text-sm font-semibold text-slate-200">Part of Faultline</h2>
          <div className="flex-1 h-px" style={{ background: 'rgba(30,50,80,0.7)' }} />
        </div>
        <div className="rounded-xl border overflow-hidden" style={{ background: 'rgba(10,20,40,0.6)', borderColor: 'rgba(59,130,246,0.2)' }}>
          {/* Faultline OG banner */}
          <div className="relative w-full" style={{ height: 160 }}>
            <img src="/faultline-og.png" alt="Faultline" className="w-full h-full object-cover" style={{ opacity: 0.7 }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(10,20,40,0.95))' }} />
            <div className="absolute bottom-3 left-5">
              <h3 className="text-lg font-bold text-white">Faultline</h3>
              <span className="text-xs text-slate-400">Strategic Infrastructure Risk Platform</span>
            </div>
          </div>
          <div className="p-5">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Faultline is a public-facing research platform on strategic infrastructure risk, AI governance, and interpretive systems.
                  It houses multiple research modules — including this Nuclear Infrastructure Atlas — designed to make complex
                  dual-use systems and authority architectures legible to researchers, policymakers, and the public.
                </p>
                <div className="flex flex-wrap gap-2">
                  <a href="https://faultline-nqmm.vercel.app" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium no-underline transition-all hover:brightness-110"
                    style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)', color: '#3b82f6' }}>
                    <ExternalLink size={10} />
                    Visit Faultline
                  </a>
                </div>
              </div>
              <div className="sm:w-56 flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Suite Modules</span>
                {[
                  { name: 'Nuclear Infrastructure Atlas', desc: 'Civil nuclear mapping', color: '#3b82f6', url: 'https://globalnuclearinfrastructureatlas.vercel.app', current: true },
                  { name: 'Orbital Risk Tracker', desc: 'Space & satellite risk', color: '#8b5cf6', url: 'https://orbitalrisktracker.vercel.app' },
                  { name: 'Cyber Escalation Atlas', desc: 'Cyber conflict mapping', color: '#ec4899', url: 'https://cyber-escalation-atlas.vercel.app' },
                  { name: 'Space Mandate Atlas', desc: 'Space governance & mandates', color: '#06b6d4', url: 'https://space-mandate-atlas.vercel.app' },
                ].map(m => (
                  <a key={m.name} href={m.current ? undefined : m.url} target={m.current ? undefined : '_blank'} rel="noopener noreferrer"
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs no-underline transition-all hover:brightness-110"
                    style={{ background: m.current ? m.color + '10' : 'rgba(7,13,26,0.5)', border: `1px solid ${m.current ? m.color + '30' : 'rgba(30,50,80,0.4)'}`, cursor: m.current ? 'default' : 'pointer' }}>
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: m.color }} />
                    <div className="flex-1 min-w-0">
                      <div style={{ color: m.current ? m.color : '#94a3b8' }} className="font-medium truncate">{m.name}</div>
                      <div className="text-slate-600 truncate">{m.desc}</div>
                    </div>
                    {!m.current && <ExternalLink size={9} className="text-slate-600 flex-shrink-0" />}
                    {m.current && <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: m.color + '20', color: m.color, fontSize: '0.6rem' }}>YOU ARE HERE</span>}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CREATOR ── */}
      <section className="px-6 pb-12 max-w-5xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <User size={13} className="text-slate-400" />
          <h2 className="text-sm font-semibold text-slate-200">About the Creator</h2>
          <div className="flex-1 h-px" style={{ background: 'rgba(30,50,80,0.7)' }} />
        </div>
        <div className="rounded-xl border overflow-hidden" style={{ background: 'rgba(10,20,40,0.6)', borderColor: 'rgba(30,50,80,0.5)' }}>
          {/* Portfolio OG banner */}
          <div className="relative w-full" style={{ height: 120 }}>
            <img src="/risa-koyanagi-og.png" alt="Risa Koyanagi" className="w-full h-full object-cover" style={{ opacity: 0.6 }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 30%, rgba(10,20,40,0.95))' }} />
          </div>
          <div className="px-5 pb-5 -mt-8 relative">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-shrink-0">
                <img src="/profile.jpg" alt="Risa Koyanagi"
                  className="w-16 h-16 rounded-full object-cover"
                  style={{ border: '3px solid rgba(10,20,40,0.9)', boxShadow: '0 0 16px rgba(59,130,246,0.15)' }} />
              </div>
              <div className="flex-1 pt-2">
                <h3 className="text-sm font-bold text-white mb-1">Risa Koyanagi</h3>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs mb-3"
                  style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.25)', color: '#a78bfa' }}>
                  Cambridge Future Scholar
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Risa Koyanagi is a Cambridge Future Scholar and researcher working across space, nuclear,
                  and emerging technology governance and strategic risk. Her work focuses on legitimation,
                  dual-use systems, and authority architecture. She also designs public-facing research
                  platforms on AI governance, strategic infrastructure risk, and interpretive systems.
                </p>
                <div className="flex flex-wrap gap-2">
                  <a href="https://risakoyanagi.com" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium no-underline transition-all hover:brightness-110"
                    style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)', color: '#3b82f6' }}>
                    <ExternalLink size={10} />
                    risakoyanagi.com
                  </a>
                  <a href="https://faultline-nqmm.vercel.app" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium no-underline transition-all hover:brightness-110"
                    style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.25)', color: '#a78bfa' }}>
                    <ExternalLink size={10} />
                    Faultline
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
