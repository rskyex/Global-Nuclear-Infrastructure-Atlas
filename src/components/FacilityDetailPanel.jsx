import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Zap, Clock, AlertCircle, Globe, ExternalLink, ChevronRight } from 'lucide-react';
import TimelineSection from './TimelineSection';
import LiveFeedCard from './LiveFeedCard';
import SourceBadge from './SourceBadge';
import { getCategoryLabel, getStatusLabel, getCategoryColor, getStatusColor, getInesColor } from '../utils/categoryHelpers';

function InfoRow({ label, value, mono }) {
  if (!value) return null;
  return (
    <div className="flex gap-2 py-1.5 border-b border-slate-800/60">
      <span className="text-xs text-slate-500 min-w-[100px] flex-shrink-0">{label}</span>
      <span className="text-xs text-slate-300 flex-1" style={mono ? { fontFamily: 'JetBrains Mono, monospace' } : {}}>
        {value}
      </span>
    </div>
  );
}

export default function FacilityDetailPanel({ facility, onClose }) {
  if (!facility) return null;

  const catColor = getCategoryColor(facility.category);
  const stColor = getStatusColor(facility.status);

  return (
    <AnimatePresence>
      <motion.div
        key={facility.id}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 30 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="flex flex-col h-full overflow-hidden"
        style={{
          background: 'rgba(7,13,26,0.98)',
          borderLeft: `1px solid rgba(26,48,80,0.8)`,
        }}>
        {/* Header */}
        <div className="flex-shrink-0 p-4 border-b border-slate-800/60"
          style={{ background: `linear-gradient(135deg, rgba(13,27,46,0.9), rgba(7,13,26,0.9))` }}>
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ background: catColor + '20', color: catColor, border: `1px solid ${catColor}30` }}>
                  {getCategoryLabel(facility.category)}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: stColor + '20', color: stColor, border: `1px solid ${stColor}30` }}>
                  {getStatusLabel(facility.status)}
                </span>
                {facility.inesLevel && (
                  <span className="text-xs px-2 py-0.5 rounded-full font-bold"
                    style={{ background: getInesColor(facility.inesLevel) + '20', color: getInesColor(facility.inesLevel) }}>
                    INES Level {facility.inesLevel}
                  </span>
                )}
              </div>
              <h2 className="text-base font-bold text-white leading-snug">{facility.name}</h2>
              <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-400">
                <MapPin size={11} />
                <span>{facility.country}</span>
                {facility.region && <><span className="text-slate-600">·</span><span>{facility.region}</span></>}
              </div>
            </div>
            <button onClick={onClose}
              className="flex-shrink-0 p-1.5 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-slate-800/50 transition-colors">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {/* Overview */}
          {facility.overview && (
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Overview</h3>
              <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">{facility.overview.trim()}</p>
            </div>
          )}

          {/* Key details */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Details</h3>
            <div className="rounded-lg overflow-hidden" style={{ border: '1px solid rgba(26,48,80,0.6)' }}>
              <InfoRow label="Operator" value={facility.operator} />
              <InfoRow label="Owner" value={facility.owner} />
              <InfoRow label="Reactor Type" value={facility.reactorType} />
              <InfoRow label="Facility Type" value={facility.facilityType} />
              {facility.capacityMW && (
                <InfoRow label="Capacity" value={`${facility.capacityMW.toLocaleString()} MWe`} mono />
              )}
              <InfoRow label="Last Updated" value={facility.lastUpdated} mono />
            </div>
          </div>

          {/* Electricity role (for power plants) */}
          {facility.electricityRole && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Zap size={12} className="text-yellow-400" />
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Electricity Role</h3>
              </div>
              <div className="rounded-lg p-3 text-xs space-y-1.5"
                style={{ background: 'rgba(13,27,46,0.6)', border: '1px solid rgba(26,48,80,0.5)' }}>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${facility.electricityRole.domestic ? 'bg-green-500' : 'bg-slate-600'}`} />
                  <span className="text-slate-400">Domestic grid supply: </span>
                  <span className="text-slate-200">{facility.electricityRole.domestic ? 'Yes' : 'No / Not documented'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${facility.electricityRole.crossBorder ? 'bg-blue-400' : 'bg-slate-600'}`} />
                  <span className="text-slate-400">Cross-border grid relevance: </span>
                  <span className="text-slate-200">{facility.electricityRole.crossBorder ? 'Documented' : 'Not separately documented'}</span>
                </div>
                {facility.electricityRole.notes && (
                  <p className="text-slate-500 mt-2 leading-relaxed">{facility.electricityRole.notes}</p>
                )}
              </div>
            </div>
          )}

          {/* Accident details */}
          {facility.whatHappened && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle size={12} className="text-red-400" />
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">What Happened</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{facility.whatHappened.trim()}</p>
            </div>
          )}
          {facility.whyItHappened && (
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Root Causes (Public Record)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{facility.whyItHappened.trim()}</p>
            </div>
          )}
          {facility.immediateConsequences && (
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Immediate Consequences</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{facility.immediateConsequences.trim()}</p>
            </div>
          )}
          {facility.longTermConsequences && (
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Long-Term Consequences</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{facility.longTermConsequences.trim()}</p>
            </div>
          )}
          {facility.remediationStatus && (
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Remediation Status</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{facility.remediationStatus}</p>
            </div>
          )}
          {facility.currentStatus && (
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Current Status</h3>
              <div className="rounded-lg p-3 text-xs text-slate-300 leading-relaxed"
                style={{ background: 'rgba(13,27,46,0.6)', border: '1px solid rgba(26,48,80,0.5)' }}>
                {facility.currentStatus}
              </div>
            </div>
          )}

          {/* Historical event details */}
          {facility.historicalContext && (
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Historical Context</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{facility.historicalContext.trim()}</p>
            </div>
          )}
          {facility.consequences && (
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Consequences</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{facility.consequences.trim()}</p>
            </div>
          )}
          {facility.currentMemorial && (
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Memorial / Current Status</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{facility.currentMemorial.trim()}</p>
            </div>
          )}

          {/* Purpose */}
          {facility.purpose && (
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Purpose</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{facility.purpose}</p>
            </div>
          )}

          {/* Timeline */}
          {facility.timeline && facility.timeline.length > 0 && (
            <TimelineSection timeline={facility.timeline} />
          )}

          {/* Incident history */}
          {facility.incidentHistory && facility.incidentHistory.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Documented Incidents</h3>
              <div className="space-y-2">
                {facility.incidentHistory.map((inc, i) => (
                  <div key={i} className="rounded-lg p-3"
                    style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.15)' }}>
                    <div className="text-xs font-medium text-red-400 mb-1">{inc.date}</div>
                    <p className="text-xs text-slate-400 leading-relaxed">{inc.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Live feed */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Official Public Feed</h3>
            <LiveFeedCard embed={facility.officialLiveFeedEmbed} facilityName={facility.name} />
          </div>

          {/* Sources */}
          {facility.sources && facility.sources.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Globe size={12} className="text-slate-500" />
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Official Public Sources</h3>
              </div>
              <div className="space-y-1.5">
                {facility.sources.map((src, i) => (
                  <SourceBadge key={i} source={src} />
                ))}
              </div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                All sources are officially published public information. "Latest Publicly Available Status" refers 
                to the most recent public data, not continuous surveillance.
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
