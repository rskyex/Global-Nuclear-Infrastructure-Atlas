import { Video, ExternalLink, Info } from 'lucide-react';

export default function LiveFeedCard({ embed, facilityName, officialSource }) {
  if (embed) {
    return (
      <div className="rounded-lg overflow-hidden"
        style={{ border: '1px solid rgba(59,130,246,0.3)', background: 'rgba(7,13,26,0.8)' }}>
        <div className="flex items-center gap-2 px-3 py-2 border-b border-blue-900/30">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-medium text-green-400">Official Public Feed Available</span>
          <Info size={10} className="text-slate-400 ml-auto" />
        </div>
        <div className="aspect-video">
          <iframe
            src={embed}
            title={`Official public feed – ${facilityName}`}
            className="w-full h-full"
            allowFullScreen
            frameBorder="0"
          />
        </div>
        <div className="px-3 py-2 text-xs text-slate-400">
          Embedded from official or publicly authorized source only. Not real-time surveillance.
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg p-3 flex items-start gap-3"
      style={{ background: 'rgba(13,27,46,0.5)', border: '1px solid rgba(26,48,80,0.6)' }}>
      <Video size={14} className="text-slate-400 flex-shrink-0 mt-0.5" />
      <div>
        <div className="text-xs font-medium text-slate-400">No Official Public Live Feed Available</div>
        <div className="text-xs text-slate-400 mt-1 leading-relaxed">
          No official or publicly authorized live feed has been identified for this facility. 
          Only officially published and publicly authorized feeds are embedded in this platform.
        </div>
      </div>
    </div>
  );
}
