import { Clock } from 'lucide-react';

export default function TimelineSection({ timeline }) {
  if (!timeline || timeline.length === 0) return null;
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Clock size={13} className="text-blue-400" />
        <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Timeline</span>
      </div>
      <div className="relative pl-4 space-y-3">
        <div className="absolute left-1.5 top-0 bottom-0 w-px bg-gradient-to-b from-blue-700/60 via-blue-800/30 to-transparent" />
        {timeline.map((item, i) => (
          <div key={i} className="relative flex gap-3">
            <div className="absolute -left-4 top-1 w-2.5 h-2.5 rounded-full border border-blue-600/50 bg-blue-900/60 flex-shrink-0" />
            <div className="min-w-0">
              <div className="text-xs font-semibold text-blue-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                {item.year}
              </div>
              <div className="text-xs text-slate-400 mt-0.5 leading-relaxed">{item.event}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
