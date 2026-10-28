import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, ChevronDown, Shield, AlertTriangle, Target, Globe, Zap, Cpu, MapPin } from 'lucide-react';

const OVERLAY_LAYERS = [
  { key: 'safeguards', label: 'Safeguards Coverage', icon: Shield, color: '#10b981',
    description: 'Colour-coded by IAEA safeguards agreement type' },
  { key: 'decommissioning', label: 'Decommissioning Risk', icon: AlertTriangle, color: '#f59e0b',
    description: 'Facilities in decommissioning/suspended with risk score rings' },
  { key: 'conflict', label: 'Conflict Proximity', icon: Target, color: '#ef4444',
    description: '200km radius around facilities near active conflict zones' },
  { key: 'treaty', label: 'Treaty Adherence', icon: Globe, color: '#8b5cf6',
    description: 'Country-level NPT/TPNW/Additional Protocol adherence' },
  { key: 'fukushima', label: 'Post-Fukushima Policy', icon: Zap, color: '#3b82f6',
    description: 'Policy trajectory since March 2011 by country' },
  { key: 'cyber', label: 'Cyber-Nuclear Intersection', icon: Cpu, color: '#ec4899',
    description: 'Digital I&C, documented incidents, and host states targeted in the Cyber Escalation Atlas' },
  { key: 'postsoviet', label: 'Post-Soviet Sub-Atlas', icon: MapPin, color: '#06b6d4',
    description: 'Facilities in former Soviet states with design and liability data' },
];

// Digital I&C sites only; colours match the cyber overlay markers in MapView
const CYBER_LEGEND = [
  { color: '#ef4444', label: 'Documents leaked from operator network; no control-system compromise reported' },
  { color: '#f59e0b', label: 'Host state is a target in the Cyber Escalation Atlas' },
  { color: '#8b5cf6', label: 'Digital I&C' },
];

export const SAFEGUARDS_LEGEND = [
  { color: '#10b981', label: 'Additional Protocol / EURATOM / VOA' },
  { color: '#f59e0b', label: 'CSA only / Facility-specific' },
  { color: '#ef4444', label: 'No safeguards agreement' },
  { color: '#6b7280', label: 'Unknown' },
];

export const FUKUSHIMA_LEGEND = [
  { color: '#ef4444', label: 'Accelerated phase-out' },
  { color: '#f59e0b', label: 'Partial moratorium' },
  { color: '#3b82f6', label: 'Policy reversal (return to nuclear)' },
  { color: '#6b7280', label: 'No change' },
  { color: '#10b981', label: 'New build programme' },
];

export default function LayerPanel({ activeOverlay, setActiveOverlay, showConflictRadius, setShowConflictRadius }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="space-y-2">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors w-full"
      >
        <Layers size={12} />
        <span className="uppercase tracking-wider">Overlay Layers</span>
        <ChevronDown size={11} className={`ml-auto transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-1 overflow-hidden"
          >
            {OVERLAY_LAYERS.map(({ key, label, icon: Icon, color, description }) => {
              const isActive = activeOverlay === key || (key === 'conflict' && showConflictRadius);
              return (
                <button
                  key={key}
                  onClick={() => {
                    if (key === 'conflict') {
                      setShowConflictRadius(!showConflictRadius);
                      if (activeOverlay === 'conflict') setActiveOverlay(null);
                    } else {
                      setActiveOverlay(activeOverlay === key ? null : key);
                    }
                  }}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs transition-all text-left w-full"
                  style={{
                    background: isActive ? 'rgba(13,27,46,0.9)' : 'rgba(7,13,26,0.5)',
                    border: `1px solid ${isActive ? color + '50' : 'rgba(26,48,80,0.4)'}`,
                    opacity: isActive ? 1 : 0.6,
                  }}
                  title={description}
                >
                  <Icon size={12} style={{ color: isActive ? color : '#6b7280', flexShrink: 0 }} />
                  <span style={{ color: isActive ? '#e2e8f0' : '#6b7280' }} className="truncate">{label}</span>
                  <div className="ml-auto flex-shrink-0">
                    <div className="w-6 h-3 rounded-full transition-all relative"
                      style={{
                        background: isActive ? color + '40' : 'rgba(55,65,81,0.5)',
                        border: `1px solid ${isActive ? color + '60' : '#374151'}`,
                      }}>
                      <div className="w-2 h-2 rounded-full absolute top-0.5 transition-all"
                        style={{ background: isActive ? color : '#4b5563', left: isActive ? '10px' : '2px' }} />
                    </div>
                  </div>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend for active overlay */}
      {activeOverlay === 'safeguards' && (
        <div className="mt-2 p-2 rounded-md text-xs space-y-1" style={{ background: 'rgba(13,27,46,0.8)', border: '1px solid rgba(26,48,80,0.5)' }}>
          <div className="text-slate-500 font-medium mb-1">Safeguards Legend</div>
          {SAFEGUARDS_LEGEND.map(l => (
            <div key={l.color} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: l.color }} />
              <span className="text-slate-400">{l.label}</span>
            </div>
          ))}
        </div>
      )}
      {activeOverlay === 'fukushima' && (
        <div className="mt-2 p-2 rounded-md text-xs space-y-1" style={{ background: 'rgba(13,27,46,0.8)', border: '1px solid rgba(26,48,80,0.5)' }}>
          <div className="text-slate-500 font-medium mb-1">Post-Fukushima Legend</div>
          {FUKUSHIMA_LEGEND.map(l => (
            <div key={l.color} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: l.color }} />
              <span className="text-slate-400">{l.label}</span>
            </div>
          ))}
        </div>
      )}
      {activeOverlay === 'cyber' && (
        <div data-testid="cyber-legend" className="mt-2 p-2 rounded-md text-xs space-y-1" style={{ background: 'rgba(13,27,46,0.8)', border: '1px solid rgba(26,48,80,0.5)' }}>
          <div className="text-slate-500 font-medium mb-1">Cyber-Nuclear Legend</div>
          {CYBER_LEGEND.map(l => (
            <div key={l.color} className="flex items-start gap-2">
              <div className="w-3 h-3 rounded-full flex-shrink-0 mt-0.5" style={{ background: l.color }} />
              <span className="text-slate-400">{l.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
