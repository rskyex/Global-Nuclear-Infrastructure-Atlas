import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PanelLeftClose, PanelLeftOpen, BarChart3, Map, ChevronDown, ChevronUp } from 'lucide-react';
import MapView from '../components/MapView';
import FilterPanel from '../components/FilterPanel';
import SummaryCards from '../components/SummaryCards';
import MarkerLegend from '../components/MarkerLegend';
import FacilityDetailPanel from '../components/FacilityDetailPanel';
import ChartCards from '../components/ChartCards';
import useFilters from '../hooks/useFilters';

export default function HomePage() {
  const filters = useFilters();
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showCharts, setShowCharts] = useState(false);
  const [showSummary, setShowSummary] = useState(true);

  const handleSelectFacility = (facility) => {
    setSelectedFacility(facility);
  };

  const handleCloseDetail = () => {
    setSelectedFacility(null);
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Summary cards (collapsible) */}
      <div style={{ background: 'rgba(7,13,26,0.95)', borderBottom: '1px solid rgba(26,48,80,0.6)' }}>
        <button
          onClick={() => setShowSummary(s => !s)}
          className="w-full flex items-center justify-between px-4 py-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors">
          <span className="flex items-center gap-1.5">
            <BarChart3 size={11} />
            Dataset Summary
          </span>
          {showSummary ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
        </button>
        <AnimatePresence>
          {showSummary && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
              <SummaryCards summary={filters.summary} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              key="sidebar"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 260, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex-shrink-0 overflow-y-auto overflow-x-hidden"
              style={{
                background: 'rgba(7,13,26,0.97)',
                borderRight: '1px solid rgba(26,48,80,0.7)',
                zIndex: 10,
              }}>
              <div style={{ width: 260 }}>
                <FilterPanel {...filters} />
                <div className="px-3 pb-3">
                  <MarkerLegend />
                </div>
                <div className="px-3 py-2 text-xs text-slate-600 border-t border-slate-800/50 leading-relaxed">
                  Showing {filters.filteredItems.length} of {filters.summary.totalItems} records. 
                  Latest publicly available status only.
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Map area */}
        <div className="flex-1 relative overflow-hidden">
          {/* Sidebar toggle button */}
          <button
            onClick={() => setSidebarOpen(s => !s)}
            className="absolute top-3 left-3 z-[500] p-2 rounded-lg transition-colors"
            title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            style={{
              background: 'rgba(7,13,26,0.9)',
              border: '1px solid rgba(26,48,80,0.7)',
              color: '#64748b',
            }}>
            {sidebarOpen ? <PanelLeftClose size={15} /> : <PanelLeftOpen size={15} />}
          </button>

          {/* Charts toggle */}
          <button
            onClick={() => setShowCharts(s => !s)}
            className="absolute top-3 left-14 z-[500] flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs transition-colors"
            style={{
              background: showCharts ? 'rgba(59,130,246,0.15)' : 'rgba(7,13,26,0.9)',
              border: `1px solid ${showCharts ? 'rgba(59,130,246,0.4)' : 'rgba(26,48,80,0.7)'}`,
              color: showCharts ? '#93c5fd' : '#64748b',
            }}>
            <BarChart3 size={13} />
            <span className="hidden sm:inline">Analytics</span>
          </button>

          {/* Map */}
          <div className="absolute inset-0">
            <MapView items={filters.filteredItems} onFacilitySelect={handleSelectFacility} />
          </div>

          {/* Charts overlay */}
          <AnimatePresence>
            {showCharts && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-0 left-0 right-0 overflow-auto"
                style={{
                  background: 'rgba(7,13,26,0.95)',
                  borderTop: '1px solid rgba(26,48,80,0.7)',
                  maxHeight: '40%',
                  backdropFilter: 'blur(12px)',
                  zIndex: 400,
                }}>
                <ChartCards />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right detail panel */}
        <AnimatePresence>
          {selectedFacility && (
            <motion.div
              key="detail"
              initial={{ width: 0 }}
              animate={{ width: 360 }}
              exit={{ width: 0 }}
              transition={{ duration: 0.25 }}
              className="flex-shrink-0 overflow-hidden"
              style={{ zIndex: 20 }}>
              <div style={{ width: 360, height: '100%' }}>
                <FacilityDetailPanel
                  facility={selectedFacility}
                  onClose={handleCloseDetail}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
