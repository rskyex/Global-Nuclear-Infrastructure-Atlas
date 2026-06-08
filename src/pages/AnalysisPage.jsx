import { useMemo, useState } from 'react';
import { Network, Info } from 'lucide-react';
import AnalysisMapView from '../components/AnalysisMapView';
import AnalysisLayerPanel from '../components/AnalysisLayerPanel';
import LayerLegend from '../components/LayerLegend';
import TimelineSlider from '../components/TimelineSlider';
import useLayerState from '../hooks/useLayerState';
import { LAYER_REGISTRY } from '../layers/registry';
import { enrichedFacilities } from '../data/enrichedFacilities';

/**
 * AnalysisPage — composable "analysis layers" view.
 *
 * Layers overlay on one shared base map and combine; active layers + opacity
 * are encoded in the URL (see useLayerState) so views are shareable and restore
 * on reload. This page is strictly additive — it does not touch the existing
 * four pillars or the /infrastructure overlays.
 */
export default function AnalysisPage() {
  const layerState = useLayerState(LAYER_REGISTRY);
  const { activeIds, isActive, toggleLayer, getOpacity, setLayerOpacity, year, setYear } = layerState;
  const timeActive = isActive('temporal');

  // Layer-scoped UI settings (e.g. the legal layer's focused regime).
  const [settings, setSettings] = useState({});
  const setSetting = (layerId, key, value) =>
    setSettings((prev) => ({ ...prev, [layerId]: { ...prev[layerId], [key]: value } }));

  // Country centroids from facility coordinates — used by country-level layers
  // so we never need a separate world-GeoJSON dependency.
  const centroids = useMemo(() => {
    const acc = new Map();
    enrichedFacilities.forEach((f) => {
      if (!Number.isFinite(f.lat) || !Number.isFinite(f.lng)) return;
      const cur = acc.get(f.country) || { lat: 0, lng: 0, n: 0 };
      cur.lat += f.lat; cur.lng += f.lng; cur.n += 1;
      acc.set(f.country, cur);
    });
    const out = new Map();
    acc.forEach((v, country) => out.set(country, [v.lat / v.n, v.lng / v.n]));
    return out;
  }, []);

  const fitPoints = useMemo(
    () => enrichedFacilities.filter((f) => Number.isFinite(f.lat) && Number.isFinite(f.lng)).map((f) => [f.lat, f.lng]),
    [],
  );

  const activeLayers = LAYER_REGISTRY.filter((l) => activeIds.includes(l.id));

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: '#040d1a' }}>
      {/* Top bar */}
      <div
        className="flex-shrink-0 px-4 py-3 border-b flex items-center gap-3 flex-wrap"
        style={{ borderColor: 'rgba(30,50,80,0.7)', background: 'rgba(7,13,26,0.9)' }}
      >
        <div className="flex items-center gap-2">
          <Network size={15} className="text-blue-400" />
          <span className="text-sm font-semibold text-slate-200">Analysis Layers</span>
          <span className="text-xs text-slate-500 hidden sm:inline">· who classifies & interprets what</span>
        </div>
        <div className="flex-1" />
        <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
          <Info size={11} />
          {activeLayers.length} active · view encoded in URL
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Layer panel */}
        <div
          className="w-60 flex-shrink-0 border-r p-3 overflow-y-auto hidden lg:block"
          style={{ borderColor: 'rgba(30,50,80,0.6)', background: 'rgba(4,13,26,0.9)' }}
        >
          <AnalysisLayerPanel
            registry={LAYER_REGISTRY}
            isActive={isActive}
            toggleLayer={toggleLayer}
            getOpacity={getOpacity}
            setLayerOpacity={setLayerOpacity}
            settings={settings}
            setSetting={setSetting}
          />
        </div>

        {/* Map */}
        <div className="flex-1 relative">
          <AnalysisMapView
            registry={LAYER_REGISTRY}
            activeIds={activeIds}
            getOpacity={getOpacity}
            settings={settings}
            centroids={centroids}
            fitPoints={fitPoints}
            year={year}
            timeActive={timeActive}
          />

          {timeActive && (
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 px-2.5 py-1 rounded-full text-xs font-bold pointer-events-none"
              style={{ background: 'rgba(7,13,26,0.9)', border: '1px solid rgba(59,130,246,0.4)', color: '#93c5fd', fontFamily: 'JetBrains Mono, monospace' }}>
              {year}
            </div>
          )}

          {/* Legend */}
          <div className="absolute bottom-4 left-4 z-20 max-w-xs">
            <LayerLegend layers={activeLayers} />
          </div>

          {/* Mobile layer panel (compact) */}
          <div
            className="lg:hidden absolute top-3 right-3 z-20 w-56 max-h-[70%] overflow-y-auto rounded-lg p-2.5"
            style={{ background: 'rgba(7,13,26,0.95)', border: '1px solid rgba(30,50,80,0.7)', backdropFilter: 'blur(8px)' }}
          >
            <AnalysisLayerPanel
              registry={LAYER_REGISTRY}
              isActive={isActive}
              toggleLayer={toggleLayer}
              getOpacity={getOpacity}
              setLayerOpacity={setLayerOpacity}
              settings={settings}
              setSetting={setSetting}
            />
          </div>

          {activeLayers.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center px-6">
                <div className="text-slate-400 text-sm mb-1">No analysis layers active</div>
                <div className="text-slate-600 text-xs">Toggle a layer to overlay it on the map. Layers combine.</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Temporal slider — only when the temporal layer is active */}
      {timeActive && (
        <TimelineSlider
          selectedYear={year}
          onYearChange={(v) => setYear(typeof v === 'function' ? v(year) : v)}
        />
      )}
    </div>
  );
}
