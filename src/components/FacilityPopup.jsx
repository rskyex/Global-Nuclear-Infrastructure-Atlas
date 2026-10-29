import { getCategoryLabel, getStatusLabel, getCategoryColor, getStatusColor, getInesColor } from '../utils/categoryHelpers';
import { MapPin, ChevronRight } from 'lucide-react';

export default function FacilityPopup({ facility, onOpenDetail }) {
  if (!facility) return null;
  const catColor = getCategoryColor(facility.category);
  const stColor = getStatusColor(facility.status);

  return (
    <div style={{ minWidth: 260, maxWidth: 300, fontFamily: 'Inter, sans-serif' }}>
      {/* Category bar */}
      <div className="px-3 pt-3 pb-1">
        <div className="flex items-center gap-2 flex-wrap mb-2">
          <span className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{ background: catColor + '25', color: catColor, border: `1px solid ${catColor}35` }}>
            {getCategoryLabel(facility.category)}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full"
            style={{ background: stColor + '25', color: stColor, border: `1px solid ${stColor}35` }}>
            {getStatusLabel(facility.status)}
          </span>
          {facility.inesLevel && (
            <span className="text-xs px-2 py-0.5 rounded-full font-bold"
              style={{ background: getInesColor(facility.inesLevel) + '20', color: getInesColor(facility.inesLevel) }}>
              INES {facility.inesLevel}
            </span>
          )}
        </div>
        <h3 className="text-sm font-bold text-white leading-snug">{facility.name}</h3>
        <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-400">
          <MapPin size={10} />
          <span>{facility.country}</span>
        </div>
      </div>

      {/* Summary */}
      <div className="px-3 py-2 border-t border-slate-800/60">
        {facility.operator && (
          <div className="flex gap-2 mb-1">
            <span className="text-xs text-slate-400 w-16 flex-shrink-0">Operator</span>
            <span className="text-xs text-slate-300 flex-1 truncate">{facility.operator}</span>
          </div>
        )}
        {facility.reactorType && (
          <div className="flex gap-2 mb-1">
            <span className="text-xs text-slate-400 w-16 flex-shrink-0">Type</span>
            <span className="text-xs text-slate-300 flex-1 truncate">{facility.reactorType}</span>
          </div>
        )}
        {facility.capacityMW && (
          <div className="flex gap-2 mb-1">
            <span className="text-xs text-slate-400 w-16 flex-shrink-0">Capacity</span>
            <span className="text-xs text-slate-300 flex-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              {facility.capacityMW.toLocaleString()} MWe
            </span>
          </div>
        )}
        {facility.accidentDate && (
          <div className="flex gap-2 mb-1">
            <span className="text-xs text-slate-400 w-16 flex-shrink-0">Date</span>
            <span className="text-xs text-slate-300 flex-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              {facility.accidentDate}
            </span>
          </div>
        )}
        {facility.eventDate && (
          <div className="flex gap-2">
            <span className="text-xs text-slate-400 w-16 flex-shrink-0">Date</span>
            <span className="text-xs text-slate-300 flex-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              {facility.eventDate}
            </span>
          </div>
        )}
        {facility.overview && (
          <p className="text-xs text-slate-400 mt-2 leading-relaxed line-clamp-3">
            {facility.overview.trim().substring(0, 150)}...
          </p>
        )}
      </div>

      {/* Open full detail */}
      <div className="px-3 pb-3">
        <button
          onClick={() => onOpenDetail(facility)}
          className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all"
          style={{
            background: `linear-gradient(135deg, ${catColor}20, ${catColor}10)`,
            border: `1px solid ${catColor}30`,
            color: catColor,
          }}>
          View Full Record
          <ChevronRight size={12} />
        </button>
      </div>
    </div>
  );
}
