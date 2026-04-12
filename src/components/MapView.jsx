import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import FacilityPopup from './FacilityPopup';
import { getMarkerIcon } from '../utils/markerIcons';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const TILE_URL = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
const TILE_ATTR = '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

// Safeguards color mapping
const SAFEGUARDS_COLORS = {
  green: '#10b981',  // Additional Protocol
  amber: '#f59e0b',  // CSA only
  red: '#ef4444',    // No agreement
  grey: '#6b7280',   // Unknown
};

function getSafeguardsColor(facility) {
  const s = facility.safeguards_status;
  if (!s) return SAFEGUARDS_COLORS.grey;
  if (s.includes('Additional Protocol') || s.includes('EURATOM') || s.includes('Voluntary Offer')) return SAFEGUARDS_COLORS.green;
  if (s.includes('CSA') || s.includes('Facility-specific')) return SAFEGUARDS_COLORS.amber;
  return SAFEGUARDS_COLORS.grey;
}

function getRiskRingColor(score) {
  if (score >= 4) return '#ef4444';
  if (score >= 3) return '#f59e0b';
  return '#3b82f6';
}

function MapBoundsHandler({ items }) {
  const map = useMap();
  useEffect(() => {
    if (items.length === 0) return;
    const bounds = L.latLngBounds(items.map(i => [i.lat, i.lng]));
    if (bounds.isValid()) map.fitBounds(bounds, { padding: [60, 60], maxZoom: 5 });
  }, []);
  return null;
}

// Get marker color override based on active layer
function getLayerMarkerIcon(facility, activeOverlay) {
  if (activeOverlay === 'safeguards') {
    const color = getSafeguardsColor(facility);
    return L.divIcon({
      html: `<div style="width:16px;height:16px;border-radius:50%;background:${color};border:2px solid ${color}80;box-shadow:0 0 6px ${color}60;"></div>`,
      className: '', iconSize: [16, 16], iconAnchor: [8, 8], popupAnchor: [0, -8],
    });
  }
  if (activeOverlay === 'cyber') {
    const hasDigital = facility.digital_i_and_c;
    const hasCyber = facility.reported_cyber_incident;
    const hasOverlap = facility.critical_infrastructure_overlap;
    if (!hasDigital) return getMarkerIcon(facility);
    const ringColor = hasCyber ? '#ef4444' : hasOverlap ? '#f59e0b' : '#8b5cf6';
    return L.divIcon({
      html: `<div style="position:relative;width:24px;height:24px;display:flex;align-items:center;justify-content:center;">
        <div style="width:20px;height:20px;border-radius:50%;border:2px solid ${ringColor};background:${ringColor}30;display:flex;align-items:center;justify-content:center;">
          <div style="width:8px;height:8px;border-radius:50%;background:${ringColor};"></div>
        </div>
        ${hasCyber ? `<div style="position:absolute;top:-2px;right:-2px;width:8px;height:8px;border-radius:50%;background:#ef4444;border:1px solid #070d1a;"></div>` : ''}
        ${hasOverlap ? `<div style="position:absolute;bottom:-2px;right:-2px;width:7px;height:7px;border-radius:50%;background:#f59e0b;border:1px solid #070d1a;"></div>` : ''}
      </div>`,
      className: '', iconSize: [24, 24], iconAnchor: [12, 12], popupAnchor: [0, -12],
    });
  }
  if (activeOverlay === 'decommissioning') {
    const isDecom = facility.operational_status === 'decommissioning' || facility.status === 'suspended';
    if (!isDecom) return getMarkerIcon(facility);
    const score = facility.governance_risk_score || 1;
    const ringSize = 12 + score * 4;
    const color = getRiskRingColor(score);
    return L.divIcon({
      html: `<div style="position:relative;width:${ringSize}px;height:${ringSize}px;display:flex;align-items:center;justify-content:center;">
        <div style="width:${ringSize}px;height:${ringSize}px;border-radius:50%;border:2px solid ${color};background:${color}20;display:flex;align-items:center;justify-content:center;">
          <div style="width:8px;height:8px;border-radius:50%;background:${color};"></div>
        </div>
      </div>`,
      className: '', iconSize: [ringSize, ringSize], iconAnchor: [ringSize/2, ringSize/2],
    });
  }
  return getMarkerIcon(facility);
}

export default function MapView({
  items,
  onFacilitySelect,
  activeOverlay = null,
  showConflictRadius = false,
}) {
  const conflictItems = showConflictRadius ? items.filter(f => f.proximity_conflict) : [];

  return (
    <MapContainer
      center={[20, 10]} zoom={2} minZoom={2} maxZoom={12}
      style={{ width: '100%', height: '100%' }}
      zoomControl={true} worldCopyJump={false}
    >
      <TileLayer url={TILE_URL} attribution={TILE_ATTR} subdomains="abcd" maxZoom={19} />

      {/* Conflict proximity radius circles */}
      {conflictItems.map(f => (
        <Circle
          key={`conflict-${f.id}`}
          center={[f.lat, f.lng]}
          radius={200000}
          pathOptions={{
            color: '#ef4444', fillColor: '#ef444430', fillOpacity: 0.15,
            weight: 1.5, dashArray: '6 4',
          }}
        />
      ))}

      {/* Facility markers */}
      {items.map(facility => (
        <Marker
          key={facility.id}
          position={[facility.lat, facility.lng]}
          icon={getLayerMarkerIcon(facility, activeOverlay)}
          eventHandlers={{ click: () => onFacilitySelect && onFacilitySelect(facility) }}
        >
          <Popup maxWidth={310} minWidth={270} closeButton={true} className="atlas-popup">
            <FacilityPopup facility={facility} onOpenDetail={onFacilitySelect} />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
