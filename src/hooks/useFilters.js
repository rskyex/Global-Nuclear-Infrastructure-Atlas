import { useState, useMemo } from 'react';
import commercialPlants from '../data/commercialPlants';

export { commercialPlants as ALL_PLANTS };

export default function useFilters() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedReactorType, setSelectedReactorType] = useState('all');

  const countries = useMemo(() => {
    const set = new Set(commercialPlants.map(p => p.country));
    return ['all', ...Array.from(set).sort()];
  }, []);

  const reactorTypes = useMemo(() => {
    const set = new Set(commercialPlants.map(p => p.reactorType).filter(Boolean));
    return ['all', ...Array.from(set).sort()];
  }, []);

  const filteredPlants = useMemo(() => {
    return commercialPlants.filter(plant => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const searchable = [
          plant.name,
          plant.country,
          plant.region,
          plant.operator,
          plant.reactorType,
          plant.overview,
        ].filter(Boolean).join(' ').toLowerCase();
        if (!searchable.includes(q)) return false;
      }
      if (selectedStatus !== 'all' && plant.status !== selectedStatus) return false;
      if (selectedCountry !== 'all' && plant.country !== selectedCountry) return false;
      if (selectedReactorType !== 'all' && plant.reactorType !== selectedReactorType) return false;
      return true;
    });
  }, [searchQuery, selectedStatus, selectedCountry, selectedReactorType]);

  const summary = useMemo(() => ({
    total: commercialPlants.length,
    operating: commercialPlants.filter(p => p.status === 'operating').length,
    underConstruction: commercialPlants.filter(p => p.status === 'under_construction').length,
    shutdown: commercialPlants.filter(p => p.status === 'shutdown' || p.status === 'decommissioned').length,
    suspended: commercialPlants.filter(p => p.status === 'suspended').length,
    countries: new Set(commercialPlants.map(p => p.country)).size,
  }), []);

  return {
    searchQuery, setSearchQuery,
    selectedStatus, setSelectedStatus,
    selectedCountry, setSelectedCountry,
    selectedReactorType, setSelectedReactorType,
    countries,
    reactorTypes,
    filteredPlants,
    summary,
    allPlants: commercialPlants,
  };
}
