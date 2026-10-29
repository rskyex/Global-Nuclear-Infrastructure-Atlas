import { FlaskConical } from 'lucide-react';
import SourceBadge from './SourceBadge';
import { CONFIDENCE_META } from '../data/provenance';

/**
 * SampleDataBadge — a deliberately visible indicator that a record is a typed
 * placeholder rather than wired-in real data. Used wherever `provisional: true`.
 */
export function SampleDataBadge({ className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium ${className}`}
      style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.35)', color: '#fbbf24' }}
      title="Typed placeholder / curated seed data — not a live authoritative feed. Intended source noted alongside."
    >
      <FlaskConical size={9} className="flex-shrink-0" />
      sample data
    </span>
  );
}

/**
 * ConfidenceDot — small coloured marker for a provenance confidence level.
 */
export function ConfidenceDot({ confidence }) {
  const meta = CONFIDENCE_META[confidence];
  if (!meta) return null;
  return (
    <span className="inline-flex items-center gap-1 text-[10px]" title={meta.hint} style={{ color: meta.color }}>
      <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: meta.color }} />
      {meta.label}
    </span>
  );
}

/**
 * Provenance — the single reusable primitive for surfacing sources on any datum.
 *
 * @param {Object} props
 * @param {import('../data/provenance').Provenance | import('../data/provenance').Provenance[]} [props.provenance]
 * @param {boolean} [props.provisional]  When true, renders the sample-data indicator.
 * @param {string}  [props.label]        Optional heading (default "Source").
 */
export default function Provenance({ provenance, provisional = false, label = 'Source' }) {
  const list = Array.isArray(provenance) ? provenance : provenance ? [provenance] : [];
  if (list.length === 0 && !provisional) return null;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[10px] uppercase tracking-wider text-slate-400">{label}</span>
        {provisional && <SampleDataBadge />}
      </div>
      {list.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {list.map((p, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <SourceBadge source={p} />
              {p.confidence && p.confidence !== 'declared' && <ConfidenceDot confidence={p.confidence} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
