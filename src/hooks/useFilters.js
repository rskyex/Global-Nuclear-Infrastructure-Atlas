import { useState, useMemo } from 'react';
import { commercialPlants } from '../data/commercialPlants';
import { enrichedFacilities } from '../data/enrichedFacilities';

export { commercialPlants as ALL_PLANTS };

export default function useFilters({ useEnriched = false } = {}) {
  const source = useEnriched ? enrichedFacilities : commercialPlants;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedReactorType, setSelectedReactorType] = useState('all');
  const [riskThreshold, setRiskThreshold] = useState(0);
  const [quickFilter, setQuickFilter] = useState(null); // 'highRisk' | 'policyFlux' | 'cyber' | null

  const countries = useMemo(() => {
    const set = new Set(source.map(p => p.country));
    return ['all', ...Array.from(set).sort()];
  }, [source]);

  const reactorTypes = useMemo(() => {
    const set = new Set(source.map(p => p.reactorType).filter(Boolean));
    return ['all', ...Array.from(set).sort()];
  }, [source]);

  const filteredPlants = useMemo(() => {
    return source.filter(plant => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const searchable = [
          plant.name, plant.country, plant.region,
          plant.operator, plant.reactorType, plant.overview,
        ].filter(Boolean).join(' ').toLowerCase();
        if (!searchable.includes(q)) return false;
      }
      if (selectedStatus !== 'all' && plant.status !== selectedStatus) return false;
      if (selectedCountry !== 'all' && plant.country !== selectedCountry) return false;
      if (selectedReactorType !== 'all' && plant.reactorType !== selectedReactorType) return false;
      if (useEnriched && riskThreshold > 0 && (plant.governance_risk_score || 0) < riskThreshold) return false;

      // Quick filters
      if (quickFilter === 'highRisk' && (plant.governance_risk_score || 0) < 4) return false;
      if (quickFilter === 'cyber' && !plant.digital_i_and_c && !plant.reported_cyber_incident) return false;
      if (quickFilter === 'policyFlux') {
        const cg = plant.country_governance;
        if (!cg || cg.post_fukushima_trajectory === 'no_change') return false;
      }

      return true;
    });
  }, [source, searchQuery, selectedStatus, selectedCountry, selectedReactorType, riskThreshold, quickFilter, useEnriched]);

  const summary = useMemo(() => ({
    total: source.length,
    operating: source.filter(p => p.status === 'operating').length,
    underConstruction: source.filter(p => p.status === 'under_construction').length,
    shutdown: source.filter(p => p.status === 'shutdown' || p.status === 'decommissioned').length,
    suspended: source.filter(p => p.status === 'suspended').length,
    countries: new Set(source.map(p => p.country)).size,
  }), [source]);

  return {
    searchQuery, setSearchQuery,
    selectedStatus, setSelectedStatus,
    selectedCountry, setSelectedCountry,
    selectedReactorType, setSelectedReactorType,
    riskThreshold, setRiskThreshold,
    quickFilter, setQuickFilter,
    countries, reactorTypes,
    filteredPlants, summary,
    allPlants: source,
  };
}
