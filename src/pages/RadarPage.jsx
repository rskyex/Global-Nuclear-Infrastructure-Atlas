import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, Legend,
} from 'recharts';
import {
  Activity, Atom, AlertTriangle, Globe, Layers, TrendingUp,
  FlaskConical, Clock, Zap
} from 'lucide-react';
import { ALL_ITEMS } from '../hooks/useFilters';
import { CATEGORY_COLORS, STATUS_COLORS, getCategoryLabel, getStatusLabel } from '../utils/categoryHelpers';
import accidentSites from '../data/accidents';

const DarkTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="px-3 py-2 rounded-lg text-xs"
      style={{ background: 'rgba(7,13,26,0.98)', border: '1px solid rgba(26,48,80,0.8)', color: '#e2e8f0', zIndex: 9999 }}>
      {label && <div className="font-medium text-slate-300 mb-1">{label}</div>}
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: p.color || p.fill }} />
          <span className="text-slate-400">{p.name || p.dataKey}:</span>
          <span className="font-mono font-semibold">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

const CHART_CARD = {
  background: 'rgba(13,27,46,0.8)',
  border: '1px solid rgba(26,48,80,0.7)',
  borderRadius: 14,
  padding: '20px',
};

const SECTION_LABEL = "text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1";
const CHART_TITLE = "text-sm font-semibold text-white mb-1";
const CHART_SUB = "text-xs text-slate-400 mb-4";

export default function RadarPage() {
  // ── derived data ──────────────────────────────────────────────
  const categoryData = useMemo(() => {
    const counts = {};
    ALL_ITEMS.forEach(f => { counts[f.category] = (counts[f.category] || 0) + 1; });
    return Object.entries(counts).map(([cat, value]) => ({
      name: getCategoryLabel(cat),
      value,
      color: CATEGORY_COLORS[cat] || '#6b7280',
      shortName: cat.replace('_', ' ').split(' ').map(w => w[0].toUpperCase() + w.slice(1)).join(' '),
    }));
  }, []);

  const statusData = useMemo(() => {
    const counts = {};
    ALL_ITEMS.filter(f => f.category === 'power_plant').forEach(f => {
      counts[f.status] = (counts[f.status] || 0) + 1;
    });
    return Object.entries(counts).map(([st, count]) => ({
      name: getStatusLabel(st),
      count,
      color: STATUS_COLORS[st] || '#6b7280',
    }));
  }, []);

  const countryData = useMemo(() => {
    const counts = {};
    ALL_ITEMS.filter(f => ['power_plant', 'fuel_cycle'].includes(f.category)).forEach(f => {
      const key = f.country.split(' (')[0].split(',')[0];
      counts[key] = (counts[key] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([country, count]) => ({ country: country.split(' ')[0], count }));
  }, []);

  const reactorTypeData = useMemo(() => {
    const counts = {};
    ALL_ITEMS.filter(f => f.reactorType).forEach(f => {
      const key = f.reactorType.split('(')[0].trim().split(' ')[0];
      counts[key] = (counts[key] || 0) + 1;
    });
    return Object.entries(counts).map(([type, count]) => ({ type, count }));
  }, []);

  const accidentTimelineData = useMemo(() => {
    return accidentSites
      .filter(a => a.accidentDate)
      .map(a => ({
        year: parseInt(a.accidentDate.substring(0, 4)),
        name: a.name.split(' ').slice(0, 2).join(' '),
        ines: a.inesLevel || 0,
      }))
      .sort((a, b) => a.year - b.year);
  }, []);

  const capacityData = useMemo(() => {
    return ALL_ITEMS
      .filter(f => f.category === 'power_plant' && f.capacityMW && f.status === 'operating')
      .sort((a, b) => b.capacityMW - a.capacityMW)
      .slice(0, 8)
      .map(f => ({
        name: f.name.split(' ').slice(0, 2).join(' '),
        mwe: f.capacityMW,
      }));
  }, []);

  const totalCapacity = useMemo(() =>
    ALL_ITEMS.filter(f => f.category === 'power_plant' && f.status === 'operating')
      .reduce((sum, f) => sum + (f.capacityMW || 0), 0),
  []);

  // ── stat tiles ─────────────────────────────────────────────────
  const STATS = [
    { label: 'Total Records', value: ALL_ITEMS.length, icon: Layers, color: '#3b82f6' },
    { label: 'Operating Plants', value: ALL_ITEMS.filter(f => f.category === 'power_plant' && f.status === 'operating').length, icon: Atom, color: '#10b981' },
    { label: 'GWe Tracked', value: (totalCapacity / 1000).toFixed(1), icon: Zap, color: '#f59e0b', suffix: ' GWe' },
    { label: 'Accident Sites', value: ALL_ITEMS.filter(f => f.category === 'accident_site').length, icon: AlertTriangle, color: '#ef4444' },
    { label: 'Countries', value: new Set(ALL_ITEMS.map(f => f.country)).size, icon: Globe, color: '#06b6d4' },
    { label: 'Historical Events', value: ALL_ITEMS.filter(f => f.category === 'historical_event').length, icon: Clock, color: '#a78bfa' },
  ];

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: '#070d1a' }}>
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-xs font-semibold tracking-widest text-cyan-400 uppercase mb-2">Analytics Dashboard</div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Radar</h1>
          <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
            Visual analytics across the full dataset — facility distribution, operational status,
            country coverage, and documented accident timelines. All figures derived from
            officially published public sources.
          </p>
        </motion.div>

        {/* Stat tiles */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="rounded-xl p-3 flex flex-col gap-1"
                style={{ background: `rgba(13,27,46,0.8)`, border: `1px solid ${s.color}25`, boxShadow: `0 0 16px ${s.color}10` }}>
                <Icon size={14} style={{ color: s.color }} />
                <div className="text-xl font-bold leading-none" style={{ color: s.color, fontFamily: 'JetBrains Mono, monospace' }}>
                  {s.value}{s.suffix}
                </div>
                <div className="text-xs text-slate-400 leading-tight">{s.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Row 1: Category pie + Status bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Category breakdown */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={CHART_CARD}>
            <div className={CHART_TITLE}>Records by Category</div>
            <div className={CHART_SUB}>Distribution across all {ALL_ITEMS.length} dataset entries</div>
            <div className="flex items-center gap-4">
              <div style={{ width: 160, height: 160, flexShrink: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={categoryData} cx="50%" cy="50%" innerRadius={44} outerRadius={72}
                      paddingAngle={3} dataKey="value" startAngle={90} endAngle={-270}>
                      {categoryData.map((e, i) => <Cell key={i} fill={e.color} opacity={0.85} />)}
                    </Pie>
                    <Tooltip content={<DarkTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 flex-1">
                {categoryData.map(({ name, value, color }) => (
                  <div key={name} className="flex items-center gap-2 text-xs">
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: color }} />
                    <span className="text-slate-400 flex-1 leading-tight">{name}</span>
                    <span className="font-mono text-slate-200">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Power plant status */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            style={CHART_CARD}>
            <div className={CHART_TITLE}>Power Plant Status</div>
            <div className={CHART_SUB}>Operational status of civilian power reactor sites only</div>
            <div style={{ height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusData} margin={{ top: 4, right: 4, left: -28, bottom: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(26,48,80,0.4)" />
                  <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#6b7280' }} />
                  <YAxis tick={{ fontSize: 9, fill: '#6b7280' }} />
                  <Tooltip content={<DarkTooltip />} cursor={{ fill: 'rgba(59,130,246,0.05)' }} />
                  <Bar dataKey="count" name="Plants" radius={[4, 4, 0, 0]}>
                    {statusData.map((e, i) => <Cell key={i} fill={e.color} opacity={0.8} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Row 2: Country + Capacity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Country */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={CHART_CARD}>
            <div className={CHART_TITLE}>Countries – Power Plants + Fuel Cycle</div>
            <div className={CHART_SUB}>Facility count by country (top 8)</div>
            <div style={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={countryData} layout="vertical" margin={{ top: 4, right: 8, left: 0, bottom: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(26,48,80,0.4)" />
                  <XAxis type="number" tick={{ fontSize: 9, fill: '#6b7280' }} />
                  <YAxis type="category" dataKey="country" tick={{ fontSize: 9, fill: '#94a3b8' }} width={60} />
                  <Tooltip content={<DarkTooltip />} cursor={{ fill: 'rgba(59,130,246,0.04)' }} />
                  <Bar dataKey="count" name="Facilities" fill="#3b82f6" opacity={0.7} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Capacity */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            style={CHART_CARD}>
            <div className={CHART_TITLE}>Operating Capacity (MWe)</div>
            <div className={CHART_SUB}>Top operating civilian power plants by net capacity</div>
            <div style={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={capacityData} margin={{ top: 4, right: 4, left: -10, bottom: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(26,48,80,0.4)" />
                  <XAxis dataKey="name" tick={{ fontSize: 8, fill: '#6b7280' }} angle={-30} textAnchor="end" interval={0} />
                  <YAxis tick={{ fontSize: 9, fill: '#6b7280' }} />
                  <Tooltip content={<DarkTooltip />} cursor={{ fill: 'rgba(6,182,212,0.05)' }} />
                  <Bar dataKey="mwe" name="MWe" fill="#06b6d4" opacity={0.75} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Row 3: Reactor types + Accident INES timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Reactor types */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            style={CHART_CARD}>
            <div className={CHART_TITLE}>Reactor Type Distribution</div>
            <div className={CHART_SUB}>Among facilities with a documented reactor type</div>
            <div style={{ height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={reactorTypeData} margin={{ top: 4, right: 4, left: -24, bottom: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(26,48,80,0.4)" />
                  <XAxis dataKey="type" tick={{ fontSize: 9, fill: '#94a3b8' }} />
                  <YAxis tick={{ fontSize: 9, fill: '#6b7280' }} />
                  <Tooltip content={<DarkTooltip />} cursor={{ fill: 'rgba(139,92,246,0.05)' }} />
                  <Bar dataKey="count" name="Facilities" fill="#8b5cf6" opacity={0.75} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Accident INES timeline */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            style={CHART_CARD}>
            <div className={CHART_TITLE}>Documented Accidents – INES Level by Year</div>
            <div className={CHART_SUB}>Civilian nuclear accidents from official IAEA/NRC records</div>
            <div style={{ height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={accidentTimelineData} margin={{ top: 4, right: 4, left: -24, bottom: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(26,48,80,0.4)" />
                  <XAxis dataKey="year" tick={{ fontSize: 9, fill: '#94a3b8' }} />
                  <YAxis domain={[0, 8]} ticks={[0,1,2,3,4,5,6,7]} tick={{ fontSize: 9, fill: '#6b7280' }} label={{ value: 'INES', angle: -90, position: 'insideLeft', fill: '#475569', fontSize: 9 }} />
                  <Tooltip content={<DarkTooltip />} cursor={{ fill: 'rgba(239,68,68,0.05)' }} />
                  <Bar dataKey="ines" name="INES Level" fill="#ef4444" opacity={0.75} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 space-y-1">
              {accidentTimelineData.map((a, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <span className="font-mono text-slate-400 w-10 flex-shrink-0">{a.year}</span>
                  <div className="h-1.5 rounded-full" style={{ width: a.ines * 28, background: '#ef4444', opacity: 0.6 + (a.ines - 4) * 0.1 }} />
                  <span className="text-slate-400">{a.name}</span>
                  <span className="ml-auto text-red-400 font-mono font-bold text-xs">INES {a.ines}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Footer note */}
        <div className="text-xs text-slate-400 border-t border-slate-800/50 pt-4 leading-relaxed">
          All figures are derived from officially published public information (IAEA PRIS, NRC, operator disclosures).
          Dataset reflects entries currently in the atlas; it is not a comprehensive global registry.
          "Latest Publicly Available Status" — not real-time monitoring.
        </div>
      </div>
    </div>
  );
}
