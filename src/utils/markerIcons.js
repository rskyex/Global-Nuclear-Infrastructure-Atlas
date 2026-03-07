/**
 * Custom SVG marker icons for Leaflet
 * Each category has a distinct visual style.
 */
import L from 'leaflet';

const createSvgIcon = (svgContent, size = [32, 32], anchor = [16, 16]) => {
  return L.divIcon({
    html: svgContent,
    className: '',
    iconSize: size,
    iconAnchor: anchor,
    popupAnchor: [0, -16],
  });
};

// Operating civilian power plant – blue glowing pin
export const powerPlantIcon = createSvgIcon(`
  <div class="marker-pulse" style="position:relative;width:32px;height:32px;display:flex;align-items:center;justify-content:center;">
    <div style="position:absolute;width:24px;height:24px;border-radius:50%;background:rgba(59,130,246,0.2);border:1.5px solid rgba(59,130,246,0.5);animation:markerPulse 2.5s ease-in-out infinite;"></div>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="5" fill="#3b82f6" opacity="0.9"/>
      <circle cx="12" cy="12" r="8" stroke="#3b82f6" stroke-width="1.5" opacity="0.5" fill="none"/>
      <circle cx="12" cy="12" r="2" fill="white"/>
    </svg>
  </div>
`, [32, 32], [16, 16]);

// Suspended/damaged power plant – amber
export const suspendedPowerPlantIcon = createSvgIcon(`
  <div style="position:relative;width:32px;height:32px;display:flex;align-items:center;justify-content:center;">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="5" fill="#f59e0b" opacity="0.9"/>
      <circle cx="12" cy="12" r="8" stroke="#f59e0b" stroke-width="1.5" opacity="0.4" fill="none"/>
      <circle cx="12" cy="12" r="2" fill="white"/>
    </svg>
  </div>
`, [32, 32], [16, 16]);

// Decommissioned/shutdown – gray
export const shutdownIcon = createSvgIcon(`
  <div style="position:relative;width:32px;height:32px;display:flex;align-items:center;justify-content:center;">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="5" fill="#6b7280" opacity="0.9"/>
      <circle cx="12" cy="12" r="8" stroke="#6b7280" stroke-width="1.5" opacity="0.4" fill="none"/>
      <circle cx="12" cy="12" r="2" fill="#9ca3af"/>
    </svg>
  </div>
`, [32, 32], [16, 16]);

// Research reactor – violet/cyan
export const researchReactorIcon = createSvgIcon(`
  <div style="position:relative;width:32px;height:32px;display:flex;align-items:center;justify-content:center;">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <polygon points="12,2 22,20 2,20" stroke="#8b5cf6" stroke-width="1.5" fill="rgba(139,92,246,0.15)" opacity="0.9"/>
      <circle cx="12" cy="15" r="2.5" fill="#8b5cf6"/>
    </svg>
  </div>
`, [32, 32], [16, 16]);

// Fuel cycle – cyan hexagon
export const fuelCycleIcon = createSvgIcon(`
  <div style="position:relative;width:32px;height:32px;display:flex;align-items:center;justify-content:center;">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <polygon points="12,2 21,7 21,17 12,22 3,17 3,7" stroke="#06b6d4" stroke-width="1.5" fill="rgba(6,182,212,0.15)" opacity="0.9"/>
      <circle cx="12" cy="12" r="2.5" fill="#06b6d4"/>
    </svg>
  </div>
`, [32, 32], [16, 16]);

// Accident site – red flame/warning
export const accidentSiteIcon = createSvgIcon(`
  <div style="position:relative;width:32px;height:32px;display:flex;align-items:center;justify-content:center;">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <polygon points="12,2 22,22 2,22" stroke="#ef4444" stroke-width="1.5" fill="rgba(239,68,68,0.2)" opacity="0.95"/>
      <line x1="12" y1="9" x2="12" y2="15" stroke="#ef4444" stroke-width="2" stroke-linecap="round"/>
      <circle cx="12" cy="18" r="1" fill="#ef4444"/>
    </svg>
  </div>
`, [32, 32], [16, 22]);

// Historical event – amber star/memorial
export const historicalEventIcon = createSvgIcon(`
  <div style="position:relative;width:32px;height:32px;display:flex;align-items:center;justify-content:center;">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" stroke="#f59e0b" stroke-width="1.5" fill="rgba(245,158,11,0.2)" opacity="0.95"/>
    </svg>
  </div>
`, [32, 32], [16, 16]);

// Under construction
export const underConstructionIcon = createSvgIcon(`
  <div style="position:relative;width:32px;height:32px;display:flex;align-items:center;justify-content:center;">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="#3b82f6" stroke-width="1.5" fill="rgba(59,130,246,0.1)" stroke-dasharray="3 2"/>
      <circle cx="12" cy="12" r="2.5" fill="#3b82f6" opacity="0.7"/>
    </svg>
  </div>
`, [32, 32], [16, 16]);

export const getMarkerIcon = (facility) => {
  const { category, status } = facility;

  if (category === 'accident_site') return accidentSiteIcon;
  if (category === 'historical_event') return historicalEventIcon;
  if (category === 'research_reactor') return researchReactorIcon;
  if (category === 'fuel_cycle') return fuelCycleIcon;

  // Power plant variants
  if (status === 'operating') return powerPlantIcon;
  if (status === 'under_construction') return underConstructionIcon;
  if (status === 'suspended' || status === 'damaged') return suspendedPowerPlantIcon;
  return shutdownIcon;
};
