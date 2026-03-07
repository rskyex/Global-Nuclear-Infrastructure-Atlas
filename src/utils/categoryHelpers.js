/**
 * Category and status helper utilities
 */

export const CATEGORY_LABELS = {
  power_plant: 'Civilian Power Plant',
  research_reactor: 'Research Reactor',
  fuel_cycle: 'Fuel Cycle Facility',
  accident_site: 'Accident Site',
  historical_event: 'Historical Event',
};

export const STATUS_LABELS = {
  operating: 'Operating',
  under_construction: 'Under Construction',
  planned: 'Planned',
  suspended: 'Suspended',
  shutdown: 'Shutdown',
  decommissioned: 'Decommissioned',
  damaged: 'Damaged',
  historical: 'Historical',
};

export const CATEGORY_COLORS = {
  power_plant: '#3b82f6',      // blue
  research_reactor: '#8b5cf6', // violet
  fuel_cycle: '#06b6d4',       // cyan
  accident_site: '#ef4444',    // red
  historical_event: '#f59e0b', // amber
};

export const STATUS_COLORS = {
  operating: '#10b981',
  under_construction: '#3b82f6',
  planned: '#06b6d4',
  suspended: '#f59e0b',
  shutdown: '#6b7280',
  decommissioned: '#6b7280',
  damaged: '#ef4444',
  historical: '#a16207',
};

export const getCategoryLabel = (cat) => CATEGORY_LABELS[cat] ?? cat;
export const getStatusLabel = (st) => STATUS_LABELS[st] ?? st;
export const getCategoryColor = (cat) => CATEGORY_COLORS[cat] ?? '#6b7280';
export const getStatusColor = (st) => STATUS_COLORS[st] ?? '#6b7280';

export const INES_COLORS = {
  7: '#7c3aed',
  6: '#dc2626',
  5: '#ea580c',
  4: '#ca8a04',
  3: '#65a30d',
  2: '#0891b2',
  1: '#2563eb',
};

export const getInesColor = (level) => INES_COLORS[level] ?? '#6b7280';
