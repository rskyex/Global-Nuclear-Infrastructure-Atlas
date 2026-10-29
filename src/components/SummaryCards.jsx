import { motion } from 'framer-motion';
import { Atom, AlertTriangle, Globe, Layers, FlaskConical, Activity } from 'lucide-react';

const CARDS = [
  {
    key: 'operatingPlants',
    label: 'Operating Civilian Plants',
    icon: Atom,
    color: '#3b82f6',
    glow: 'rgba(59,130,246,0.15)',
    border: 'rgba(59,130,246,0.3)',
  },
  {
    key: 'researchReactors',
    label: 'Research Reactors',
    icon: FlaskConical,
    color: '#8b5cf6',
    glow: 'rgba(139,92,246,0.15)',
    border: 'rgba(139,92,246,0.3)',
  },
  {
    key: 'fuelCycleFacilities',
    label: 'Fuel Cycle Facilities',
    icon: Layers,
    color: '#06b6d4',
    glow: 'rgba(6,182,212,0.15)',
    border: 'rgba(6,182,212,0.3)',
  },
  {
    key: 'accidentSites',
    label: 'Documented Accident Sites',
    icon: AlertTriangle,
    color: '#ef4444',
    glow: 'rgba(239,68,68,0.15)',
    border: 'rgba(239,68,68,0.3)',
  },
  {
    key: 'countries',
    label: 'Countries Represented',
    icon: Globe,
    color: '#10b981',
    glow: 'rgba(16,185,129,0.15)',
    border: 'rgba(16,185,129,0.3)',
  },
];

export default function SummaryCards({ summary }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-2 p-3">
      {CARDS.map(({ key, label, icon: Icon, color, glow, border }, i) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07, duration: 0.4 }}
          className="rounded-lg p-3 flex flex-col gap-1.5"
          style={{
            background: `linear-gradient(135deg, rgba(13,27,46,0.95), rgba(7,13,26,0.95))`,
            border: `1px solid ${border}`,
            boxShadow: `0 0 16px ${glow}`,
          }}>
          <div className="flex items-center justify-between">
            <Icon size={14} style={{ color }} />
            <Activity size={10} className="text-slate-400" />
          </div>
          <div className="text-2xl font-bold" style={{ color, fontFamily: 'JetBrains Mono, monospace' }}>
            {summary[key] ?? 0}
          </div>
          <div className="text-xs text-slate-400 leading-tight">{label}</div>
        </motion.div>
      ))}
    </div>
  );
}
