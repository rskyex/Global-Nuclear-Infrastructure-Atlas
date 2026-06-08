import { useEffect, Fragment } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';

const TILE_URL = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
const TILE_ATTR = '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

/** Fit bounds once on mount only, so toggling layers never resets the view. */
function FitOnce({ points }) {
  const map = useMap();
  useEffect(() => {
    if (!points.length) return;
    const lats = points.map((p) => p[0]);
    const lngs = points.map((p) => p[1]);
    map.fitBounds(
      [[Math.min(...lats), Math.min(...lngs)], [Math.max(...lats), Math.max(...lngs)]],
      { padding: [60, 60], maxZoom: 5 },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

/**
 * AnalysisMapView — base map plus a stack of active analysis layers.
 *
 * Renders each active layer (ascending zOrder) by calling its `renderMap`.
 * Layers compose on one shared, never-remounted map instance.
 */
export default function AnalysisMapView({ registry, activeIds, getOpacity, settings, centroids, fitPoints, onSelect }) {
  const activeLayers = registry
    .filter((l) => activeIds.includes(l.id))
    .sort((a, b) => a.zOrder - b.zOrder);

  return (
    <MapContainer
      center={[20, 10]} zoom={2} minZoom={2} maxZoom={12}
      style={{ width: '100%', height: '100%' }}
      zoomControl={true} worldCopyJump={false}
    >
      <TileLayer url={TILE_URL} attribution={TILE_ATTR} subdomains="abcd" maxZoom={19} />
      <FitOnce points={fitPoints} />
      {activeLayers.map((layer) => (
        <Fragment key={layer.id}>
          {layer.renderMap({
            centroids,
            opacity: getOpacity(layer.id),
            settings: settings[layer.id] || layer.defaultSettings || {},
            onSelect,
          })}
        </Fragment>
      ))}
    </MapContainer>
  );
}
