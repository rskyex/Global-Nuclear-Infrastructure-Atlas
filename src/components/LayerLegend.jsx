/**
 * LayerLegend — registry-driven legend. Renders the legend rows supplied by
 * each currently-active layer. Layers provide `legend: {color,label}[]`.
 */
export default function LayerLegend({ layers }) {
  const active = layers.filter((l) => l.legend && l.legend.length);
  if (active.length === 0) return null;

  return (
    <div
      className="rounded-lg p-3 space-y-3"
      style={{ background: 'rgba(7,13,26,0.92)', border: '1px solid rgba(26,48,80,0.7)', backdropFilter: 'blur(8px)' }}
    >
      {active.map((layer) => (
        <div key={layer.id} className="space-y-1.5">
          <div className="text-[11px] font-semibold text-slate-300">{layer.label}</div>
          {layer.legend.map((row) => (
            <div key={row.key ?? row.label} className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: row.color }} />
              <span className="text-[11px] text-slate-400">{row.label}</span>
            </div>
          ))}
        </div>
      ))}
      <div className="pt-1.5 border-t text-[10px] text-slate-400 leading-snug" style={{ borderColor: 'rgba(26,48,80,0.6)' }}>
        Composable overlays · public sources · provisional records flagged in popups.
      </div>
    </div>
  );
}
