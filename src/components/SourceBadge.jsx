import { ExternalLink, ShieldCheck, BookOpen } from 'lucide-react';

/**
 * SourceBadge renders a single source as a compact, linkable chip.
 *
 * Backward-compatible: accepts the legacy facility-source shape
 *   { name, url, type: 'official' | 'secondary' }
 * OR the shared Provenance shape
 *   { source, sourceUrl, asOf, confidence }
 * so the same primitive can be used across the original pillars and the new
 * analysis layers.
 */
export default function SourceBadge({ source }) {
  if (!source) return null;

  // Normalise both supported shapes into one.
  const name = source.name ?? source.source ?? 'Source';
  const url = source.url ?? source.sourceUrl;
  // Treat declared/treaty-register sources as "official" for styling parity
  // with the legacy `type` field.
  const isOfficial = source.type
    ? source.type === 'official'
    : source.confidence === 'declared' || source.confidence === undefined;

  const inner = (
    <>
      {isOfficial
        ? <ShieldCheck size={10} className="flex-shrink-0" />
        : <BookOpen size={10} className="flex-shrink-0" />}
      <span className="truncate">{name}</span>
      {source.asOf && <span className="opacity-50 flex-shrink-0">· {source.asOf}</span>}
      {url && <ExternalLink size={9} className="flex-shrink-0 opacity-60 group-hover:opacity-100" />}
    </>
  );

  const style = {
    background: isOfficial ? 'rgba(59,130,246,0.08)' : 'rgba(107,114,128,0.08)',
    border: `1px solid ${isOfficial ? 'rgba(59,130,246,0.2)' : 'rgba(107,114,128,0.2)'}`,
    color: isOfficial ? '#93c5fd' : '#9ca3af',
  };

  const className = 'flex items-center gap-1.5 px-2 py-1 rounded text-xs transition-colors no-underline group';

  if (!url) {
    return <span className={className} style={style}>{inner}</span>;
  }

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={className} style={style}>
      {inner}
    </a>
  );
}
