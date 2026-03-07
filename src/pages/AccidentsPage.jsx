import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Star, Filter, Calendar, MapPin, ExternalLink, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import accidentSites from '../data/accidents';
import historicalEvents from '../data/historicalEvents';
import TimelineSection from '../components/TimelineSection';
import SourceBadge from '../components/SourceBadge';
import { getInesColor } from '../utils/categoryHelpers';

const INES_LABELS = {
  7: 'Major Accident',
  6: 'Serious Accident',
  5: 'Accident with Wider Consequences',
  4: 'Accident with Local Consequences',
  3: 'Serious Incident',
};

function AccidentCard({ accident, isExpanded, onToggle }) {
  const color = accident.inesLevel ? getInesColor(accident.inesLevel) : '#ef4444';
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-xl overflow-hidden"
      style={{ border: `1px solid ${color}25`, background: 'rgba(13,27,46,0.7)' }}>
      {/* Card header */}
      <button
        onClick={onToggle}
        className="w-full text-left p-4 flex items-start gap-3">
        {/* INES badge */}
        <div className="flex-shrink-0 w-14 h-14 rounded-lg flex flex-col items-center justify-center"
          style={{ background: color + '15', border: `1px solid ${color}30` }}>
          {accident.inesLevel && (
            <>
              <div className="text-xs text-slate-500">INES</div>
              <div className="text-xl font-bold" style={{ color }}>{accident.inesLevel}</div>
            </>
          )}
          {!accident.inesLevel && (
            <AlertTriangle size={20} style={{ color }} />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-white leading-snug">{accident.name}</h3>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <MapPin size={10} />
              {accident.country}
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <Calendar size={10} />
              {accident.accidentDate}
            </div>
            {accident.inesLevel && (
              <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ background: color + '20', color, border: `1px solid ${color}30` }}>
                INES {accident.inesLevel} – {INES_LABELS[accident.inesLevel]}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed line-clamp-2">{accident.overview?.substring(0, 180)}...</p>
        </div>
        <div className="flex-shrink-0 text-slate-500 mt-1">
          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </div>
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t px-4 pb-4 pt-4 space-y-4"
          style={{ borderColor: `${color}20` }}>
          {accident.overview && (
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Overview</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{accident.overview.trim()}</p>
            </div>
          )}
          {accident.whatHappened && (
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">What Happened</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{accident.whatHappened.trim()}</p>
            </div>
          )}
          {accident.whyItHappened && (
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Root Causes</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{accident.whyItHappened.trim()}</p>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {accident.immediateConsequences && (
              <div className="rounded-lg p-3" style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.15)' }}>
                <h4 className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-2">Immediate Consequences</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{accident.immediateConsequences.trim()}</p>
              </div>
            )}
            {accident.longTermConsequences && (
              <div className="rounded-lg p-3" style={{ background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.15)' }}>
                <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">Long-Term Consequences</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{accident.longTermConsequences.trim()}</p>
              </div>
            )}
          </div>
          {accident.remediationStatus && (
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Current / Remediation Status</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{accident.currentStatus?.trim() || accident.remediationStatus}</p>
            </div>
          )}
          {accident.timeline && <TimelineSection timeline={accident.timeline} />}
          {accident.sources && (
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Official Public Sources</h4>
              <div className="flex flex-wrap gap-2">
                {accident.sources.map((src, i) => <SourceBadge key={i} source={src} />)}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

function HistoricalEventCard({ event }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-xl overflow-hidden"
      style={{ border: '1px solid rgba(245,158,11,0.2)', background: 'rgba(13,27,46,0.7)' }}>
      <button onClick={() => setExpanded(e => !e)} className="w-full text-left p-4 flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)' }}>
          <Star size={16} className="text-amber-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-white leading-snug">{event.name}</h3>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <MapPin size={10} /> {event.country}
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <Calendar size={10} /> {event.eventDate}
            </div>
          </div>
        </div>
        {expanded ? <ChevronUp size={14} className="text-slate-500 mt-1 flex-shrink-0" /> : <ChevronDown size={14} className="text-slate-500 mt-1 flex-shrink-0" />}
      </button>
      {expanded && (
        <div className="border-t px-4 pb-4 pt-4 space-y-4" style={{ borderColor: 'rgba(245,158,11,0.15)' }}>
          {event.overview && <p className="text-xs text-slate-300 leading-relaxed">{event.overview.trim()}</p>}
          {event.historicalContext && (
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Historical Context</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{event.historicalContext.trim()}</p>
            </div>
          )}
          {event.consequences && (
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Consequences</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{event.consequences.trim()}</p>
            </div>
          )}
          {event.currentMemorial && (
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Memorial / Current Status</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{event.currentMemorial.trim()}</p>
            </div>
          )}
          {event.sources && (
            <div className="flex flex-wrap gap-2">
              {event.sources.map((src, i) => <SourceBadge key={i} source={src} />)}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}

export default function AccidentsPage() {
  const [expandedId, setExpandedId] = useState(null);
  const [activeTab, setActiveTab] = useState('accidents');

  const toggleExpand = (id) => setExpandedId(prev => prev === id ? null : id);

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: '#070d1a' }}>
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-xs font-semibold tracking-widest text-red-400 uppercase mb-2">Educational Reference</div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">Accidents & Historical Events</h1>
          <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">
            A factual, policy-oriented review of major civilian nuclear accidents and key historical 
            nuclear events, based on officially published public information. Presented in an educational 
            context to support informed understanding of nuclear history and safety culture.
          </p>
          <div className="mt-3 flex items-start gap-2 px-3 py-2 rounded-lg text-xs"
            style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.15)', color: '#f87171' }}>
            <AlertTriangle size={12} className="flex-shrink-0 mt-0.5" />
            Historical nuclear events (atomic bomb use, nuclear tests) are maintained as a 
            separate educational layer from civilian nuclear infrastructure. They are presented 
            here for historical literacy and peace education purposes only.
          </div>
        </motion.div>

        {/* INES Scale reference */}
        <div className="rounded-xl p-4" style={{ background: 'rgba(13,27,46,0.7)', border: '1px solid rgba(26,48,80,0.6)' }}>
          <div className="flex items-center gap-2 mb-3">
            <BookOpen size={13} className="text-slate-400" />
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">INES Scale Reference</span>
          </div>
          <p className="text-xs text-slate-500 mb-3">
            The International Nuclear and Radiological Event Scale (INES), developed by the IAEA, 
            is used to communicate the severity of nuclear events to the public. It runs from 0 (deviation) to 7 (major accident).
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[7,6,5,4].map(level => (
              <div key={level} className="rounded-lg px-3 py-2 text-center"
                style={{ background: getInesColor(level) + '10', border: `1px solid ${getInesColor(level)}25` }}>
                <div className="text-lg font-bold" style={{ color: getInesColor(level), fontFamily: 'JetBrains Mono, monospace' }}>{level}</div>
                <div className="text-xs text-slate-400 mt-0.5">{INES_LABELS[level]}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-600 mt-2">Source: IAEA INES – iaea.org/topics/ines</p>
        </div>

        {/* Tab navigation */}
        <div className="flex gap-2">
          {[
            { key: 'accidents', label: 'Civilian Accident Sites', icon: AlertTriangle, count: accidentSites.length },
            { key: 'historical', label: 'Historical Nuclear Events', icon: Star, count: historicalEvents.length },
          ].map(({ key, label, icon: Icon, count }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all"
              style={{
                background: activeTab === key ? 'rgba(59,130,246,0.15)' : 'rgba(13,27,46,0.5)',
                border: `1px solid ${activeTab === key ? 'rgba(59,130,246,0.4)' : 'rgba(26,48,80,0.6)'}`,
                color: activeTab === key ? '#93c5fd' : '#64748b',
              }}>
              <Icon size={12} />
              {label}
              <span className="px-1.5 py-0.5 rounded-full text-xs"
                style={{ background: activeTab === key ? 'rgba(59,130,246,0.2)' : 'rgba(26,48,80,0.4)' }}>
                {count}
              </span>
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'accidents' && (
          <div className="space-y-3">
            <p className="text-xs text-slate-500 italic">
              Civilian nuclear accident sites documented by the IAEA and national regulatory authorities. 
              All information from officially published public sources.
            </p>
            {accidentSites.map(accident => (
              <AccidentCard
                key={accident.id}
                accident={accident}
                isExpanded={expandedId === accident.id}
                onToggle={() => toggleExpand(accident.id)}
              />
            ))}
          </div>
        )}
        {activeTab === 'historical' && (
          <div className="space-y-3">
            <div className="px-3 py-2 rounded-lg text-xs"
              style={{ background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.15)', color: '#fbbf24' }}>
              <strong>Separate Educational Layer</strong>: Historical nuclear events – including the 
              use of atomic bombs and nuclear testing – are presented as a distinct educational context, 
              clearly separated from civilian nuclear power and fuel cycle infrastructure.
            </div>
            {historicalEvents.map(event => (
              <HistoricalEventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
