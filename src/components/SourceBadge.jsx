import { ExternalLink, ShieldCheck, BookOpen } from 'lucide-react';

export default function SourceBadge({ source }) {
  const { name, url, type } = source;
  const isOfficial = type === 'official';
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 px-2 py-1 rounded text-xs transition-colors no-underline group"
      style={{
        background: isOfficial ? 'rgba(59,130,246,0.08)' : 'rgba(107,114,128,0.08)',
        border: `1px solid ${isOfficial ? 'rgba(59,130,246,0.2)' : 'rgba(107,114,128,0.2)'}`,
        color: isOfficial ? '#93c5fd' : '#9ca3af',
      }}>
      {isOfficial
        ? <ShieldCheck size={10} className="flex-shrink-0" />
        : <BookOpen size={10} className="flex-shrink-0" />}
      <span className="truncate">{name}</span>
      <ExternalLink size={9} className="flex-shrink-0 opacity-60 group-hover:opacity-100" />
    </a>
  );
}
