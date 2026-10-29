import { useEffect } from 'react';
import { BASEMAP_URL, BASEMAP_ATTRIBUTION, BASEMAP_CLASS, BASEMAP_MAX_ZOOM, BASEMAP_ERROR_TILE } from '../shared/basemap';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import FacilityPopup from './FacilityPopup';
import { getMarkerIcon } from '../utils/markerIcons';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});


// Safeguards color mapping
const SAFEGUARDS_COLORS = {
  green: '#10b981',  // no gap: CSA + Additional Protocol in force, EURATOM, VOA
  amber: '#f59e0b',  // safeguards gap (see SAFEGUARDS_GAP_DEFINITION)
  grey: '#6b7280',   // unknown
};

// Same rule as the "Safeguards Gaps" counter (enrichedFacilities.safeguards_gap).
function getSafeguardsColor(facility) {
  if (!facility.safeguards_status) return SAFEGUARDS_COLORS.grey;
  return facility.safeguards_gap ? SAFEGUARDS_COLORS.amber : SAFEGUARDS_COLORS.green;
}

// UCDP conflict exposure: a highlight on the marker, not a radius.
function conflictIcon() {
  return L.divIcon({
    html: `<div style="width:22px;height:22px;border-radius:50%;border:2px dashed #ef4444;background:#ef444425;display:flex;align-items:center;justify-content:center;"><div style="width:8px;height:8px;border-radius:50%;background:#ef4444;"></div></div>`,
    className: '', iconSize: [22, 22], iconAnchor: [11, 11], popupAnchor: [0, -11],
  });
}

function markerLabel(f) {
  const parts = [f.name, f.country, f.status?.replace(/_/g, ' ')];
  if (f.safeguards_gap) parts.push('safeguards gap');
  if (f.proximity_conflict) parts.push('UCDP conflict exposure');
  return parts.filter(Boolean).join(', ');
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

  return (
    <MapContainer
      center={[20, 10]} zoom={2} minZoom={2} maxZoom={12}
      style={{ width: '100%', height: '100%' }}
      zoomControl={true} worldCopyJump={false}
    >
      <TileLayer url={BASEMAP_URL} attribution={BASEMAP_ATTRIBUTION} className={BASEMAP_CLASS} maxZoom={BASEMAP_MAX_ZOOM} errorTileUrl={BASEMAP_ERROR_TILE} />

      {/* Facility markers */}
      {items.map(facility => (
        <Marker
          key={facility.id}
          position={[facility.lat, facility.lng]}
          icon={showConflictRadius && facility.proximity_conflict ? conflictIcon() : getLayerMarkerIcon(facility, activeOverlay)}
          title={markerLabel(facility)}
          keyboard={true}
          eventHandlers={{
            click: () => onFacilitySelect && onFacilitySelect(facility),
            // Leaflet makes markers focusable (Enter opens them); give the element a name.
            add: (e) => {
              const el = e.target.getElement();
              if (el) { el.setAttribute('aria-label', markerLabel(facility)); el.setAttribute('role', 'button'); }
            },
          }}
        >
          <Popup maxWidth={310} minWidth={270} closeButton={true} className="atlas-popup">
            <FacilityPopup facility={facility} onOpenDetail={onFacilitySelect} />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
