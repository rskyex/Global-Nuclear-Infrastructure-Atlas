import { useState, useMemo } from 'react';
import facilities from '../data/facilities';
import accidentSites from '../data/accidents';
import historicalEvents from '../data/historicalEvents';

export const ALL_ITEMS = [...facilities, ...accidentSites, ...historicalEvents];

export const DEFAULT_LAYERS = {
  power_plant: true,
  research_reactor: true,
  fuel_cycle: true,
  accident_site: true,
  historical_event: false, // Historical events off by default for cleaner initial view
};

export default function useFilters() {
  const [layers, setLayers] = useState(DEFAULT_LAYERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');

  const countries = useMemo(() => {
    const set = new Set(ALL_ITEMS.map(f => f.country));
    return ['all', ...Array.from(set).sort()];
  }, []);

  const filteredItems = useMemo(() => {
    return ALL_ITEMS.filter(item => {
      // Layer toggle
      if (!layers[item.category]) return false;

      // Search
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const searchable = [
          item.name,
          item.country,
          item.operator,
          item.reactorType,
          item.facilityType,
          item.overview,
        ].filter(Boolean).join(' ').toLowerCase();
        if (!searchable.includes(q)) return false;
      }

      // Status filter
      if (selectedStatus !== 'all' && item.status !== selectedStatus) return false;

      // Country filter
      if (selectedCountry !== 'all' && item.country !== selectedCountry) return false;

      return true;
    });
  }, [layers, searchQuery, selectedStatus, selectedCountry]);

  const toggleLayer = (layerKey) => {
    setLayers(prev => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  const summary = useMemo(() => {
    const all = ALL_ITEMS;
    return {
      operatingPlants: all.filter(f => f.category === 'power_plant' && f.status === 'operating').length,
      accidentSites: all.filter(f => f.category === 'accident_site').length,
      countries: new Set(all.map(f => f.country)).size,
      fuelCycleFacilities: all.filter(f => f.category === 'fuel_cycle').length,
      researchReactors: all.filter(f => f.category === 'research_reactor').length,
      totalItems: all.length,
    };
  }, []);

  return {
    layers, toggleLayer,
    searchQuery, setSearchQuery,
    selectedStatus, setSelectedStatus,
    selectedCountry, setSelectedCountry,
    countries,
    filteredItems,
    summary,
    allItems: ALL_ITEMS,
  };
}
