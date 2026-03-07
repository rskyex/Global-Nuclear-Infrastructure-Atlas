import { useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import L from 'leaflet';
import FacilityPopup from './FacilityPopup';
import { getMarkerIcon } from '../utils/markerIcons';

// Fix Leaflet default icon path issue with Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Dark tile layer options:
// Option 1: CartoDB Dark Matter (good dark basemap)
// Option 2: Stadia Maps (requires API key for production)
// Using CartoDB Dark Matter as it's free for modest traffic
const TILE_URL = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
const TILE_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

function MapBoundsHandler({ items }) {
  const map = useMap();
  useEffect(() => {
    if (items.length === 0) return;
    const bounds = L.latLngBounds(items.map(i => [i.lat, i.lng]));
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [60, 60], maxZoom: 5 });
    }
  }, []); // Only on mount
  return null;
}

export default function MapView({ items, onFacilitySelect }) {
  return (
    <MapContainer
      center={[20, 10]}
      zoom={2}
      minZoom={2}
      maxZoom={12}
      style={{ width: '100%', height: '100%' }}
      zoomControl={true}
      worldCopyJump={false}>
      {/* Dark basemap – CartoDB Dark Matter */}
      <TileLayer
        url={TILE_URL}
        attribution={TILE_ATTRIBUTION}
        subdomains="abcd"
        maxZoom={19}
      />

      {/* Facility markers */}
      {items.map(facility => (
        <Marker
          key={facility.id}
          position={[facility.lat, facility.lng]}
          icon={getMarkerIcon(facility)}
          eventHandlers={{
            click: () => onFacilitySelect && onFacilitySelect(facility),
          }}>
          <Popup
            maxWidth={310}
            minWidth={270}
            closeButton={true}
            className="atlas-popup">
            <FacilityPopup
              facility={facility}
              onOpenDetail={onFacilitySelect}
            />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
