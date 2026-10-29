import { motion } from 'framer-motion';

const LEGEND_ITEMS = [
  { color: '#3b82f6', shape: 'circle', label: 'Operating Civilian Plant', glow: true },
  { color: '#8b5cf6', shape: 'triangle', label: 'Research Reactor' },
  { color: '#06b6d4', shape: 'hex', label: 'Fuel Cycle Facility' },
  { color: '#f59e0b', shape: 'circle', label: 'Suspended / Inactive' },
  { color: '#6b7280', shape: 'circle', label: 'Decommissioned / Shutdown' },
  { color: '#ef4444', shape: 'warning', label: 'Accident Site' },
  { color: '#f59e0b', shape: 'star', label: 'Historical Event' },
];

const ShapeIcon = ({ shape, color }) => {
  const s = 14;
  if (shape === 'circle') return (
    <svg width={s} height={s} viewBox="0 0 14 14">
      <circle cx="7" cy="7" r="5" fill={color} opacity="0.85" />
      <circle cx="7" cy="7" r="2.5" fill="white" opacity="0.6" />
    </svg>
  );
  if (shape === 'triangle') return (
    <svg width={s} height={s} viewBox="0 0 14 14">
      <polygon points="7,1 13,13 1,13" fill={color} opacity="0.85" />
    </svg>
  );
  if (shape === 'hex') return (
    <svg width={s} height={s} viewBox="0 0 14 14">
      <polygon points="7,1 12.5,4 12.5,10 7,13 1.5,10 1.5,4" fill={color} opacity="0.85" />
    </svg>
  );
  if (shape === 'warning') return (
    <svg width={s} height={s} viewBox="0 0 14 14">
      <polygon points="7,1 13,13 1,13" fill={color} opacity="0.85" />
      <line x1="7" y1="5" x2="7" y2="9" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="7" cy="11" r="0.8" fill="white" />
    </svg>
  );
  if (shape === 'star') return (
    <svg width={s} height={s} viewBox="0 0 14 14">
      <polygon points="7,1 8.5,5 13,5 9.5,8 10.5,12 7,10 3.5,12 4.5,8 1,5 5.5,5" fill={color} opacity="0.85" />
    </svg>
  );
  return null;
};

export default function MarkerLegend() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="rounded-lg p-3"
      style={{
        background: 'rgba(7,13,26,0.9)',
        border: '1px solid rgba(26,48,80,0.7)',
        backdropFilter: 'blur(8px)',
      }}>
      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Legend</div>
      <div className="space-y-1.5">
        {LEGEND_ITEMS.map(({ color, shape, label, glow }) => (
          <div key={label} className="flex items-center gap-2">
            <div className="flex-shrink-0">
              <ShapeIcon shape={shape} color={color} />
            </div>
            <span className="text-xs text-slate-400">{label}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 pt-2 border-t border-slate-800 text-xs text-slate-400 leading-snug">
        Based on officially published public information. Last updated: 2024.
      </div>
    </motion.div>
  );
}
