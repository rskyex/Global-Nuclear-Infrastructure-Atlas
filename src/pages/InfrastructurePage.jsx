import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, X, Filter, ChevronDown, ExternalLink,
  Globe, Zap, Building2, Info, BarChart3, Download,
} from 'lucide-react';
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis,
  Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import MapView from '../components/MapView';
import LayerPanel from '../components/LayerPanel';
import GlobalRiskBar from '../components/GlobalRiskBar';
import useFilters from '../hooks/useFilters';
import { STATUS_COLORS, getStatusLabel } from '../utils/categoryHelpers';
import { enrichedFacilities, facilitySummary } from '../data/enrichedFacilities';
import { countryPolicies } from '../data/countryPolicies';
import TimelineSlider from '../components/TimelineSlider';

const STATUS_OPTIONS = [
  { value: 'all', label: 'All Statuses' },
  { value: 'operating', label: 'Operating' },
  { value: 'under_construction', label: 'Under Construction' },
  { value: 'suspended', label: 'Suspended' },
  { value: 'shutdown', label: 'Shutdown / Decommissioned' },
];

function DarkTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border px-3 py-2 text-xs shadow-xl"
      style={{ background: '#0a1428', borderColor: 'rgba(30,50,80,0.8)' }}>
      <div className="text-slate-300 font-medium mb-1">{label}</div>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2" style={{ color: p.color }}>
          <span className="w-2 h-2 rounded-full inline-block flex-shrink-0" style={{ background: p.color }} />
          {p.name}: <span className="font-semibold ml-1">{p.value}</span>
        </div>
      ))}
    </div>
  );
}

function PlantDetailPanel({ plant, onClose }) {
  if (!plant) return null;
  const statusColor = STATUS_COLORS[plant.status] ?? '#6b7280';
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="flex flex-col h-full overflow-y-auto"
        style={{ background: 'rgba(7,13,26,0.98)' }}
      >
        <div className="flex items-start justify-between p-4 border-b" style={{ borderColor: 'rgba(30,50,80,0.7)' }}>
          <div className="flex-1 pr-2">
            <h3 className="text-sm font-bold text-white leading-tight">{plant.name}</h3>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span className="text-xs text-slate-400">{plant.country}</span>
              <span className="text-slate-600">·</span>
              <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ background: statusColor + '20', color: statusColor, border: `1px solid ${statusColor}40` }}>
                {getStatusLabel(plant.status)}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-300 flex-shrink-0">
            <X size={16} />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Key stats */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Reactor Type', value: plant.reactorType },
              { label: 'Units', value: plant.units },
              { label: 'Net Capacity', value: plant.netCapacityMW ? `${plant.netCapacityMW.toLocaleString()} MW` : '—' },
              { label: 'First Power', value: plant.firstPower ?? 'Not yet' },
              { label: 'Operator', value: plant.operator },
              { label: 'Region', value: plant.region },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-lg p-2.5" style={{ background: 'rgba(10,20,40,0.8)', border: '1px solid rgba(30,50,80,0.5)' }}>
                <div className="text-xs text-slate-500 mb-0.5">{label}</div>
                <div className="text-xs font-semibold text-slate-200 leading-tight">{value ?? '—'}</div>
              </div>
            ))}
          </div>

          {/* Overview */}
          <div>
            <div className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">Overview</div>
            <p className="text-xs text-slate-300 leading-relaxed">{plant.overview}</p>
          </div>

          {plant.digital_i_and_c && (
            <div data-testid="plant-digital-ic">
              <div className="text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wide">Digital I&amp;C</div>
              <p className="text-xs text-slate-300">{plant.digital_i_and_c_note || 'Yes'}</p>
            </div>
          )}

          {plant.cyber_incident && (
            <div data-testid="plant-cyber-incident">
              <div className="text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wide">{plant.cyber_incident.label}</div>
              <p className="text-xs text-slate-300 leading-relaxed">{plant.cyber_incident.detail}</p>
            </div>
          )}

          {plant.critical_infrastructure_overlap && (
            <p data-testid="plant-cyber-overlap" className="text-xs text-slate-400">
              Host state is a target in the Cyber Escalation Atlas
            </p>
          )}

          {/* Sources */}
          <div data-testid="plant-sources">
            <div className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">Sources</div>
            {plant.sources?.length > 0 ? (
              <div className="space-y-1.5">
                {plant.sources.map((s, i) => (
                  <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 no-underline break-all">
                    <ExternalLink size={11} className="flex-shrink-0" />
                    {s.name}
                    <span className="text-slate-600 text-xs">({s.type})</span>
                  </a>
                ))}
                {plant.sources.every((s) => /pris/i.test(s.name)) && (
                  <p className="text-xs text-slate-500 leading-relaxed pt-1">
                    This link opens the IAEA PRIS home page. Search PRIS for this plant by name to see the reactor records.
                  </p>
                )}
              </div>
            ) : (
              <p className="text-xs text-amber-400">No source is recorded for this plant yet.</p>
            )}
          </div>

          <div className="text-xs text-slate-600 border-t pt-3" style={{ borderColor: 'rgba(30,50,80,0.5)' }}>
            Last updated: {plant.lastUpdated}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="flex flex-col items-center justify-center h-full gap-3 p-6 text-center"
    >
      <div className="w-10 h-10 rounded-full flex items-center justify-center"
        style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}>
        <Globe size={18} className="text-blue-400 opacity-50" />
      </div>
      <div className="text-xs text-slate-500 leading-relaxed max-w-36">
        Click a marker on the map to inspect plant details
      </div>
    </motion.div>
  );
}

export default function InfrastructurePage() {
  const {
    searchQuery, setSearchQuery,
    selectedStatus, setSelectedStatus,
    selectedCountry, setSelectedCountry,
    quickFilter, setQuickFilter,
    countries,
    filteredPlants,
    summary,
    allPlants,
  } = useFilters({ useEnriched: true });

  const [selectedPlant, setSelectedPlant] = useState(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [activeOverlay, setActiveOverlay] = useState(null);
  const [showConflictRadius, setShowConflictRadius] = useState(false);
  const [timelineYear, setTimelineYear] = useState(2024);
  const [showTimeline, setShowTimeline] = useState(false);
  const [timelineEvent, setTimelineEvent] = useState(null);

  const policyFluxCount = useMemo(() =>
    countryPolicies.filter(c => c.policy_flux).length, []);

  // Analytics data
  const statusData = useMemo(() => {
    const counts = {};
    allPlants.forEach(p => {
      const key = p.status === 'decommissioned' ? 'shutdown' : p.status;
      counts[key] = (counts[key] || 0) + 1;
    });
    return Object.entries(counts).map(([status, count]) => ({
      name: getStatusLabel(status),
      value: count,
      fill: STATUS_COLORS[status] ?? '#6b7280',
    }));
  }, [allPlants]);

  const countryData = useMemo(() => {
    const counts = {};
    allPlants.filter(p => p.status === 'operating').forEach(p => {
      counts[p.country] = (counts[p.country] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 15);
  }, [allPlants]);

  const capacityData = useMemo(() => {
    const counts = {};
    allPlants.filter(p => p.status === 'operating' && p.netCapacityMW).forEach(p => {
      counts[p.country] = (counts[p.country] || 0) + p.netCapacityMW;
    });
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value: Math.round(value / 1000) }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 12);
  }, [allPlants]);

  const reactorTypeData = useMemo(() => {
    const counts = {};
    allPlants.filter(p => p.status === 'operating').forEach(p => {
      const type = p.reactorType?.split(' ')[0] ?? 'Unknown';
      counts[type] = (counts[type] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [allPlants]);

  // Map items: add a category field for marker icon compatibility
  const mapItems = useMemo(() =>
    filteredPlants.map(p => ({ ...p, category: 'power_plant' }))
  , [filteredPlants]);

  const CHART_COLORS = ['#3b82f6','#10b981','#8b5cf6','#f59e0b','#ef4444','#06b6d4','#ec4899','#84cc16'];

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: '#040d1a' }}>
      {/* Top bar */}
      <div className="flex-shrink-0 px-4 py-3 border-b flex items-center gap-3 flex-wrap"
        style={{ borderColor: 'rgba(30,50,80,0.7)', background: 'rgba(7,13,26,0.9)' }}>
        <div className="flex items-center gap-2">
          <Building2 size={15} className="text-blue-400" />
          <span className="text-sm font-semibold text-slate-200">Civil Nuclear Infrastructure</span>
          <span className="text-xs text-slate-500 hidden sm:inline">· IAEA PRIS data</span>
        </div>
        <div className="flex-1" />
        {/* Search */}
        <div className="relative flex-shrink-0">
          <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Search plants…"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-7 pr-3 py-1.5 text-xs rounded-lg text-slate-200 placeholder-slate-500 outline-none w-36 sm:w-48"
            style={{ background: 'rgba(10,20,40,0.9)', border: '1px solid rgba(30,50,80,0.8)' }}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
              <X size={11} />
            </button>
          )}
        </div>
        {/* Status filter */}
        <div className="relative flex-shrink-0">
          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            className="appearance-none pl-3 pr-7 py-1.5 text-xs rounded-lg text-slate-200 outline-none cursor-pointer"
            style={{ background: 'rgba(10,20,40,0.9)', border: '1px solid rgba(30,50,80,0.8)' }}
          >
            {STATUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
        </div>
        {/* Country filter */}
        <div className="relative flex-shrink-0">
          <select
            value={selectedCountry}
            onChange={e => setSelectedCountry(e.target.value)}
            className="appearance-none pl-3 pr-7 py-1.5 text-xs rounded-lg text-slate-200 outline-none cursor-pointer max-w-32"
            style={{ background: 'rgba(10,20,40,0.9)', border: '1px solid rgba(30,50,80,0.8)' }}
          >
            {countries.map(c => <option key={c} value={c}>{c === 'all' ? 'All Countries' : c}</option>)}
          </select>
          <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
        </div>
        {/* Analytics toggle */}
        <button
          onClick={() => setShowAnalytics(v => !v)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex-shrink-0
            ${showAnalytics ? 'text-blue-400 bg-blue-950/50 border border-blue-800/50' : 'text-slate-400 hover:text-slate-200 border border-slate-800/50'}`}
        >
          <BarChart3 size={12} />
          Analytics
        </button>
        {/* Timeline toggle */}
        <button
          onClick={() => setShowTimeline(v => !v)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex-shrink-0
            ${showTimeline ? 'text-blue-400 bg-blue-950/50 border border-blue-800/50' : 'text-slate-400 hover:text-slate-200 border border-slate-800/50'}`}
        >
          <ChevronDown size={12} />
          Timeline
        </button>
        {/* CSV Export */}
        <button
          onClick={() => {
            const keys = ['id','name','country','status','reactorType','units','netCapacityMW','operator',
              'governance_risk_score','safeguards_status','seismic_zone','proximity_conflict',
              'digital_i_and_c','digital_i_and_c_note','reported_cyber_incident','post_fukushima_policy_change'];
            const rows = filteredPlants.map(p => keys.map(k => {
              const v = p[k]; return `"${String(v ?? '').replace(/"/g,'""')}"`;
            }).join(','));
            const csv = [keys.join(','), ...rows].join('\n');
            const blob = new Blob([csv], { type: 'text/csv' });
            const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
            a.download = 'nuclear_facilities.csv'; a.click();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 border border-slate-800/50 flex-shrink-0"
        >
          <Download size={12} />
          CSV
        </button>
      </div>

      {/* Summary pill row */}
      <div className="flex-shrink-0 px-4 py-2 flex items-center gap-3 border-b overflow-x-auto"
        style={{ borderColor: 'rgba(30,50,80,0.4)' }}>
        {[
          { label: 'showing', value: filteredPlants.length, color: '#3b82f6' },
          { label: 'operating', value: summary.operating, color: '#10b981' },
          { label: 'under construction', value: summary.underConstruction, color: '#3b82f6' },
          { label: 'shutdown', value: summary.shutdown, color: '#6b7280' },
          { label: 'countries', value: summary.countries, color: '#8b5cf6' },
        ].map(({ label, value, color }) => (
          <div key={label} className="flex items-center gap-1.5 text-xs flex-shrink-0">
            <span className="font-bold" style={{ color, fontFamily: 'JetBrains Mono, monospace' }}>{value}</span>
            <span className="text-slate-500">{label}</span>
          </div>
        ))}
      </div>

      {/* Global Risk Summary Bar */}
      <GlobalRiskBar summary={facilitySummary} policyFluxCount={policyFluxCount} />

      {/* Quick filters */}
      <div className="flex-shrink-0 px-4 py-1.5 flex items-center gap-2 border-b overflow-x-auto"
        style={{ borderColor: 'rgba(30,50,80,0.4)' }}>
        <span className="text-xs text-slate-500 flex-shrink-0">Quick:</span>
        {[
          { key: null, label: 'All' },
          { key: 'highRisk', label: 'High Risk (4+)' },
          { key: 'policyFlux', label: 'Policy Flux' },
          { key: 'cyber', label: 'Cyber Intersection' },
        ].map(qf => (
          <button key={qf.key ?? 'all'} onClick={() => setQuickFilter(qf.key)}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all border flex-shrink-0 ${
              quickFilter === qf.key ? 'text-blue-400 bg-blue-950/50 border-blue-800/50' : 'text-slate-500 border-slate-800/40 hover:text-slate-300'
            }`}>
            {qf.label}
          </button>
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Layer panel sidebar */}
        <div className="w-52 flex-shrink-0 border-r p-3 overflow-y-auto hidden lg:block"
          style={{ borderColor: 'rgba(30,50,80,0.6)', background: 'rgba(4,13,26,0.9)' }}>
          <LayerPanel
            activeOverlay={activeOverlay} setActiveOverlay={setActiveOverlay}
            showConflictRadius={showConflictRadius} setShowConflictRadius={setShowConflictRadius}
          />
        </div>

        {/* Map */}
        <div className="flex-1 relative">
          {filteredPlants.length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-slate-500 text-sm mb-2">No plants match current filters</div>
                <button onClick={() => { setSearchQuery(''); setSelectedStatus('all'); setSelectedCountry('all'); }}
                  className="text-xs text-blue-400 hover:text-blue-300">
                  Reset filters
                </button>
              </div>
            </div>
          ) : (
            <MapView items={mapItems} onFacilitySelect={setSelectedPlant} activeOverlay={activeOverlay} showConflictRadius={showConflictRadius} />
          )}
          {/* Hint badge */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
            <div className="px-3 py-1.5 rounded-full text-xs text-slate-400 border whitespace-nowrap"
              style={{ background: 'rgba(7,13,26,0.85)', borderColor: 'rgba(30,50,80,0.6)', backdropFilter: 'blur(8px)' }}>
              <Info size={11} className="inline mr-1 mb-0.5" />
              Click a marker to inspect plant details
            </div>
          </div>
        </div>

        {/* Detail panel: side column from md up; on phones it overlays the map only while a plant is open */}
        <div className={`${selectedPlant
            ? 'flex absolute inset-y-0 right-0 w-full max-w-sm z-[1100] md:static md:max-w-none'
            : 'hidden md:flex'} md:w-72 flex-shrink-0 border-l flex-col`}
          style={{ borderColor: 'rgba(30,50,80,0.7)', background: 'rgba(7,13,26,0.98)' }}>
          {selectedPlant ? (
            <PlantDetailPanel plant={selectedPlant} onClose={() => setSelectedPlant(null)} />
          ) : (
            <EmptyState />
          )}
        </div>
      </div>

      {/* Analytics drawer */}
      <AnimatePresence>
        {showAnalytics && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 320, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="flex-shrink-0 border-t overflow-hidden"
            style={{ borderColor: 'rgba(30,50,80,0.7)', background: 'rgba(7,13,26,0.95)' }}
          >
            <div className="h-full px-4 py-3 flex gap-4 overflow-x-auto">
              {/* Status chart */}
              <div className="flex-shrink-0 w-52">
                <div className="text-xs font-semibold text-slate-400 mb-2">By Status</div>
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie data={statusData} cx="50%" cy="50%" outerRadius={70} dataKey="value" label={({ name, percent }) => `${name} ${(percent*100).toFixed(0)}%`} labelLine={false} fontSize={9}>
                      {statusData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                    </Pie>
                    <Tooltip content={<DarkTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Country chart */}
              <div className="flex-shrink-0 w-80">
                <div className="text-xs font-semibold text-slate-400 mb-2">Operating Plants by Country (Top 15)</div>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={countryData} layout="vertical" margin={{ top: 0, right: 10, bottom: 0, left: 60 }}>
                    <XAxis type="number" tick={{ fill: '#64748b', fontSize: 9 }} axisLine={false} tickLine={false} />
                    <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8', fontSize: 9 }} axisLine={false} tickLine={false} width={60} />
                    <Tooltip content={<DarkTooltip />} />
                    <Bar dataKey="value" name="Sites" fill="#3b82f6" radius={[0, 2, 2, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Capacity chart */}
              <div className="flex-shrink-0 w-80">
                <div className="text-xs font-semibold text-slate-400 mb-2">Total Installed Capacity by Country (GW, operating)</div>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={capacityData} layout="vertical" margin={{ top: 0, right: 10, bottom: 0, left: 60 }}>
                    <XAxis type="number" tick={{ fill: '#64748b', fontSize: 9 }} axisLine={false} tickLine={false} />
                    <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8', fontSize: 9 }} axisLine={false} tickLine={false} width={60} />
                    <Tooltip content={<DarkTooltip />} />
                    <Bar dataKey="value" name="GW" fill="#10b981" radius={[0, 2, 2, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Reactor types */}
              <div className="flex-shrink-0 w-52">
                <div className="text-xs font-semibold text-slate-400 mb-2">Reactor Types (operating)</div>
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie data={reactorTypeData} cx="50%" cy="50%" outerRadius={70} dataKey="value" label={({ name, percent }) => `${name} ${(percent*100).toFixed(0)}%`} labelLine={false} fontSize={9}>
                      {reactorTypeData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                    </Pie>
                    <Tooltip content={<DarkTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Timeline slider */}
      {showTimeline && (
        <TimelineSlider
          selectedYear={timelineYear}
          onYearChange={setTimelineYear}
          onEventSelect={setTimelineEvent}
        />
      )}
    </div>
  );
}
