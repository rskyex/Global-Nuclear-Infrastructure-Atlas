import { useState } from 'react';
import { Layers, Info } from 'lucide-react';
import { CATEGORY_ORDER } from '../layers/registry';

/**
 * AnalysisLayerPanel — composable layer control, grouped by category.
 *
 * Each layer row exposes: an independent on/off toggle, an opacity slider
 * (when active), an info affordance, and any layer-specific Controls. Toggling
 * one layer never affects another or the map view (state lives in the URL via
 * useLayerState; the map is never remounted).
 */
export default function AnalysisLayerPanel({
  registry,
  isActive,
  toggleLayer,
  getOpacity,
  setLayerOpacity,
  settings,
  setSetting,
}) {
  const [openInfo, setOpenInfo] = useState(null);

  const byCategory = CATEGORY_ORDER
    .map((cat) => ({ cat, layers: registry.filter((l) => l.category === cat) }))
    .filter((g) => g.layers.length > 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
        <Layers size={12} />
        <span className="uppercase tracking-wider">Analysis Layers</span>
      </div>

      {byCategory.map(({ cat, layers }) => (
        <div key={cat} className="space-y-1.5">
          <div className="text-[10px] uppercase tracking-wider text-slate-600 px-0.5">{cat}</div>
          {layers.map((layer) => {
            const active = isActive(layer.id);
            const Icon = layer.icon;
            const opacity = getOpacity(layer.id);
            const layerSettings = settings[layer.id] || layer.defaultSettings || {};
            return (
              <div
                key={layer.id}
                className="rounded-md p-2"
                style={{
                  background: active ? 'rgba(13,27,46,0.9)' : 'rgba(7,13,26,0.5)',
                  border: `1px solid ${active ? 'rgba(59,130,246,0.35)' : 'rgba(26,48,80,0.4)'}`,
                }}
              >
                <div className="flex items-center gap-2">
                  {Icon && <Icon size={13} style={{ color: active ? '#93c5fd' : '#6b7280', flexShrink: 0 }} />}
                  <button
                    onClick={() => toggleLayer(layer.id)}
                    className="text-xs text-left flex-1 truncate"
                    style={{ color: active ? '#e2e8f0' : '#94a3b8' }}
                    title={layer.description}
                    aria-pressed={active}
                  >
                    {layer.label}
                  </button>
                  <button
                    onClick={() => setOpenInfo(openInfo === layer.id ? null : layer.id)}
                    className="text-slate-500 hover:text-slate-300 flex-shrink-0"
                    aria-label={`About ${layer.label}`}
                    aria-expanded={openInfo === layer.id}
                  >
                    <Info size={12} />
                  </button>
                  {/* Toggle switch */}
                  <button
                    onClick={() => toggleLayer(layer.id)}
                    role="switch"
                    aria-checked={active}
                    aria-label={`Toggle ${layer.label}`}
                    className="flex-shrink-0"
                  >
                    <div
                      className="w-7 h-3.5 rounded-full relative transition-all"
                      style={{
                        background: active ? 'rgba(59,130,246,0.35)' : 'rgba(55,65,81,0.5)',
                        border: `1px solid ${active ? 'rgba(59,130,246,0.6)' : '#374151'}`,
                      }}
                    >
                      <div
                        className="w-2.5 h-2.5 rounded-full absolute top-0.5 transition-all"
                        style={{ background: active ? '#3b82f6' : '#4b5563', left: active ? '13px' : '2px' }}
                      />
                    </div>
                  </button>
                </div>

                {openInfo === layer.id && (
                  <p className="text-[11px] text-slate-400 leading-relaxed pt-2">{layer.info}</p>
                )}

                {active && (
                  <>
                    {/* Layer-specific controls */}
                    {layer.Controls && (
                      <layer.Controls settings={layerSettings} setSetting={(k, v) => setSetting(layer.id, k, v)} />
                    )}
                    {/* Opacity */}
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] text-slate-500 w-9">{Math.round(opacity * 100)}%</span>
                      <input
                        type="range"
                        min={10}
                        max={100}
                        step={5}
                        value={Math.round(opacity * 100)}
                        onChange={(e) => setLayerOpacity(layer.id, Number(e.target.value) / 100)}
                        aria-label={`${layer.label} opacity`}
                        className="flex-1 h-1 rounded-full appearance-none cursor-pointer"
                        style={{ background: `linear-gradient(to right, #3b82f6 ${opacity * 100}%, #1a3050 ${opacity * 100}%)` }}
                      />
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
