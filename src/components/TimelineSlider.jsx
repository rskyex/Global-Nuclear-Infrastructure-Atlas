import { useState, useEffect, useRef } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';
import { governanceEvents } from '../data/governanceTimeline';

const MIN_YEAR = 1970;
const MAX_YEAR = 2024;
const SPEEDS = [500, 1000, 2000];

const EVENT_COLORS = {
  treaty: '#10b981', accident: '#ef4444', policy: '#3b82f6',
  proliferation: '#f59e0b', conflict: '#ec4899',
};

export default function TimelineSlider({ selectedYear, onYearChange, onEventSelect }) {
  const [playing, setPlaying] = useState(false);
  const [speedIdx, setSpeedIdx] = useState(1);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        onYearChange(prev => {
          const next = (typeof prev === 'function' ? prev : () => prev)();
          return next;
        });
      }, SPEEDS[speedIdx]);
    }
    return () => clearInterval(intervalRef.current);
  }, [playing, speedIdx]);

  // Advance year via callback
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      onYearChange(y => {
        if (y >= MAX_YEAR) { setPlaying(false); return MAX_YEAR; }
        return y + 1;
      });
    }, SPEEDS[speedIdx]);
    return () => clearInterval(id);
  }, [playing, speedIdx, onYearChange]);

  const eventsAtYear = governanceEvents.filter(e => e.year === selectedYear);
  const pct = ((selectedYear - MIN_YEAR) / (MAX_YEAR - MIN_YEAR)) * 100;

  return (
    <div className="flex-shrink-0 border-t" style={{ borderColor: 'rgba(30,50,80,0.6)', background: 'rgba(7,13,26,0.95)' }}>
      {/* Event markers row */}
      <div className="relative h-4 mx-14 mt-1">
        {governanceEvents.filter(e => e.year >= MIN_YEAR).map((e, i) => {
          const pos = ((e.year - MIN_YEAR) / (MAX_YEAR - MIN_YEAR)) * 100;
          return (
            <button key={i} onClick={() => { onYearChange(e.year); onEventSelect?.(e); }}
              className="absolute top-0 w-2 h-2 rounded-full -translate-x-1/2 hover:scale-150 transition-transform"
              style={{ left: `${pos}%`, background: EVENT_COLORS[e.category] || '#6b7280' }}
              title={`${e.year}: ${e.title}`}
            />
          );
        })}
      </div>

      {/* Slider row */}
      <div className="flex items-center gap-3 px-4 py-2">
        <button onClick={() => onYearChange(y => Math.max(MIN_YEAR, y - 1))}
          className="text-slate-500 hover:text-slate-300"><ChevronLeft size={14} /></button>

        <button onClick={() => setPlaying(!playing)}
          className="w-7 h-7 rounded-full flex items-center justify-center border transition-all"
          style={{ borderColor: playing ? '#3b82f660' : 'rgba(30,50,80,0.6)', background: playing ? '#3b82f620' : 'transparent' }}>
          {playing ? <Pause size={12} className="text-blue-400" /> : <Play size={12} className="text-slate-400" />}
        </button>

        <button onClick={() => onYearChange(y => Math.min(MAX_YEAR, y + 1))}
          className="text-slate-500 hover:text-slate-300"><ChevronRight size={14} /></button>

        <span className="text-sm font-bold text-blue-400 w-12 text-center"
          style={{ fontFamily: 'JetBrains Mono, monospace' }}>{selectedYear}</span>

        {/* Slider */}
        <div className="flex-1 relative">
          <input type="range" min={MIN_YEAR} max={MAX_YEAR} value={selectedYear}
            onChange={e => onYearChange(Number(e.target.value))}
            className="w-full h-1 rounded-full appearance-none cursor-pointer"
            style={{ background: `linear-gradient(to right, #3b82f6 ${pct}%, #1a3050 ${pct}%)` }}
          />
        </div>

        {/* Speed control */}
        <button onClick={() => setSpeedIdx((speedIdx + 1) % SPEEDS.length)}
          className="text-xs text-slate-500 hover:text-slate-300 px-2 py-1 rounded border"
          style={{ borderColor: 'rgba(30,50,80,0.5)' }}>
          {['Fast', 'Med', 'Slow'][speedIdx]}
        </button>
      </div>

      {/* Event display */}
      {eventsAtYear.length > 0 && (
        <div className="px-4 pb-2 flex gap-2 overflow-x-auto">
          {eventsAtYear.map((e, i) => (
            <div key={i} className="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs border"
              style={{ borderColor: (EVENT_COLORS[e.category] || '#6b7280') + '40',
                background: (EVENT_COLORS[e.category] || '#6b7280') + '10' }}>
              <span className="font-semibold mr-1.5" style={{ color: EVENT_COLORS[e.category] }}>{e.title}</span>
              <span className="text-slate-400">{e.description}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
