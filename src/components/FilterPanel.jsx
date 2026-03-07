import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Layers, ChevronDown, X, Filter } from 'lucide-react';

const LAYER_CONFIG = [
  { key: 'power_plant', label: 'Civilian Power Plants', color: '#3b82f6', dot: 'bg-blue-500' },
  { key: 'research_reactor', label: 'Research Reactors', color: '#8b5cf6', dot: 'bg-violet-500' },
  { key: 'fuel_cycle', label: 'Fuel Cycle Facilities', color: '#06b6d4', dot: 'bg-cyan-500' },
  { key: 'accident_site', label: 'Accident Sites', color: '#ef4444', dot: 'bg-red-500' },
  { key: 'historical_event', label: 'Historical Events', color: '#f59e0b', dot: 'bg-amber-500' },
];

const STATUS_OPTIONS = [
  { value: 'all', label: 'All Statuses' },
  { value: 'operating', label: 'Operating' },
  { value: 'under_construction', label: 'Under Construction' },
  { value: 'suspended', label: 'Suspended' },
  { value: 'shutdown', label: 'Shutdown' },
  { value: 'decommissioned', label: 'Decommissioned' },
  { value: 'damaged', label: 'Damaged' },
  { value: 'historical', label: 'Historical' },
];

export default function FilterPanel({
  layers, toggleLayer,
  searchQuery, setSearchQuery,
  selectedStatus, setSelectedStatus,
  selectedCountry, setSelectedCountry,
  countries,
}) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="p-3 space-y-3">
      {/* Search */}
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          placeholder="Search by name, country, type, operator..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-8 py-2 text-sm rounded-lg text-slate-200 placeholder-slate-500 outline-none transition-all"
          style={{
            background: 'rgba(13,27,46,0.9)',
            border: '1px solid rgba(26,48,80,0.8)',
          }}
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
            <X size={13} />
          </button>
        )}
      </div>

      {/* Layer toggles */}
      <div>
        <div className="flex items-center gap-1.5 mb-2">
          <Layers size={12} className="text-slate-500" />
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Map Layers</span>
        </div>
        <div className="grid grid-cols-1 gap-1.5">
          {LAYER_CONFIG.map(({ key, label, color, dot }) => (
            <button
              key={key}
              onClick={() => toggleLayer(key)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs transition-all text-left"
              style={{
                background: layers[key] ? `rgba(13,27,46,0.9)` : 'rgba(7,13,26,0.5)',
                border: `1px solid ${layers[key] ? color + '50' : 'rgba(26,48,80,0.4)'}`,
                opacity: layers[key] ? 1 : 0.5,
              }}>
              <div className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: layers[key] ? color : '#374151' }} />
              <span style={{ color: layers[key] ? '#e2e8f0' : '#6b7280' }}>{label}</span>
              <div className="ml-auto">
                <div className="w-6 h-3 rounded-full transition-all relative"
                  style={{ background: layers[key] ? color + '40' : 'rgba(55,65,81,0.5)', border: `1px solid ${layers[key] ? color + '60' : '#374151'}` }}>
                  <div className="w-2 h-2 rounded-full absolute top-0.5 transition-all"
                    style={{ background: layers[key] ? color : '#4b5563', left: layers[key] ? '10px' : '2px' }} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Advanced filters toggle */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors">
        <Filter size={11} />
        Advanced Filters
        <ChevronDown size={11} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2 overflow-hidden">
            {/* Status filter */}
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Status</label>
              <select
                value={selectedStatus}
                onChange={e => setSelectedStatus(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs rounded-md text-slate-200 outline-none"
                style={{ background: 'rgba(13,27,46,0.9)', border: '1px solid rgba(26,48,80,0.8)' }}>
                {STATUS_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            {/* Country filter */}
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Country</label>
              <select
                value={selectedCountry}
                onChange={e => setSelectedCountry(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs rounded-md text-slate-200 outline-none"
                style={{ background: 'rgba(13,27,46,0.9)', border: '1px solid rgba(26,48,80,0.8)' }}>
                {countries.map(c => (
                  <option key={c} value={c}>{c === 'all' ? 'All Countries' : c}</option>
                ))}
              </select>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
