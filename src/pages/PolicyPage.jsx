import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Download, Search, X, ChevronDown, ChevronUp, ExternalLink, Activity, Atom } from 'lucide-react';
import { countryPolicies } from '../data/countryPolicies';

const POSTURE_COLORS = {
  expanding: '#10b981', maintaining: '#3b82f6',
  phasing_out: '#ef4444', moratorium: '#f59e0b', no_programme: '#6b7280',
};
const POSTURE_LABELS = {
  expanding: 'Expanding', maintaining: 'Maintaining',
  phasing_out: 'Phasing Out', moratorium: 'Moratorium', no_programme: 'No Programme',
};

function exportCSV(data) {
  const headers = Object.keys(data[0]).filter(k => k !== 'flag');
  const rows = data.map(row => headers.map(h => {
    const v = row[h];
    if (Array.isArray(v)) return `"${v.join('; ')}"`;
    if (typeof v === 'boolean') return v ? 'Yes' : 'No';
    return `"${String(v ?? '').replace(/"/g, '""')}"`;
  }).join(','));
  const csv = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url;
  a.download = 'nuclear_policy_data.csv'; a.click();
  URL.revokeObjectURL(url);
}

export default function PolicyPage() {
  const [search, setSearch] = useState('');
  const [postureFilter, setPostureFilter] = useState('all');
  const [smrFilter, setSmrFilter] = useState('all');
  const [sortKey, setSortKey] = useState('country');
  const [sortDir, setSortDir] = useState('asc');

  const filtered = useMemo(() => {
    let list = countryPolicies;
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(c => c.country.toLowerCase().includes(q) || c.region.toLowerCase().includes(q));
    }
    if (postureFilter !== 'all') list = list.filter(c => c.policy_posture === postureFilter);
    if (smrFilter !== 'all') list = list.filter(c => smrFilter === 'yes' ? c.smr_programme : !c.smr_programme);
    return [...list].sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey];
      const cmp = String(av ?? '').localeCompare(String(bv ?? ''));
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [search, postureFilter, smrFilter, sortKey, sortDir]);

  const toggleSort = key => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };
  const SortIcon = ({ k }) => sortKey === k
    ? (sortDir === 'asc' ? <ChevronUp size={10} /> : <ChevronDown size={10} />)
    : <ChevronDown size={10} className="opacity-30" />;

  return (
    <div className="h-full flex flex-col overflow-hidden" style={{ background: '#040d1a' }}>
      {/* Header */}
      <div className="flex-shrink-0 px-4 py-3 border-b flex items-center gap-3 flex-wrap"
        style={{ borderColor: 'rgba(30,50,80,0.7)', background: 'rgba(7,13,26,0.9)' }}>
        <Atom size={15} className="text-blue-400" />
        <span className="text-sm font-semibold text-slate-200">Policy Intelligence</span>
        <div className="flex-1" />
        <div className="relative flex-shrink-0">
          <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input type="text" placeholder="Search country..." value={search} onChange={e => setSearch(e.target.value)}
            className="pl-7 pr-3 py-1.5 text-xs rounded-lg text-slate-200 placeholder-slate-500 outline-none w-40"
            style={{ background: 'rgba(10,20,40,0.9)', border: '1px solid rgba(30,50,80,0.8)' }} />
          {search && <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"><X size={11} /></button>}
        </div>
        <select value={postureFilter} onChange={e => setPostureFilter(e.target.value)}
          className="text-xs rounded-lg text-slate-200 px-2 py-1.5 outline-none"
          style={{ background: 'rgba(10,20,40,0.9)', border: '1px solid rgba(30,50,80,0.8)' }}>
          <option value="all">All Postures</option>
          {Object.entries(POSTURE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <select value={smrFilter} onChange={e => setSmrFilter(e.target.value)}
          className="text-xs rounded-lg text-slate-200 px-2 py-1.5 outline-none"
          style={{ background: 'rgba(10,20,40,0.9)', border: '1px solid rgba(30,50,80,0.8)' }}>
          <option value="all">All SMR</option>
          <option value="yes">SMR Active</option>
          <option value="no">No SMR</option>
        </select>
        <button onClick={() => exportCSV(filtered)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 border"
          style={{ borderColor: 'rgba(30,50,80,0.6)' }}>
          <Download size={12} /> CSV
        </button>
      </div>

      {/* Summary */}
      <div className="flex-shrink-0 px-4 py-2 flex gap-4 border-b overflow-x-auto" style={{ borderColor: 'rgba(30,50,80,0.4)' }}>
        <div className="text-xs text-slate-500"><span className="font-bold text-blue-400" style={{ fontFamily: 'JetBrains Mono' }}>{filtered.length}</span> countries</div>
        {Object.entries(POSTURE_LABELS).map(([k, label]) => {
          const c = filtered.filter(p => p.policy_posture === k).length;
          if (c === 0) return null;
          return <div key={k} className="text-xs text-slate-500"><span className="font-bold" style={{ color: POSTURE_COLORS[k], fontFamily: 'JetBrains Mono' }}>{c}</span> {label.toLowerCase()}</div>;
        })}
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-xs">
          <thead className="sticky top-0 z-10" style={{ background: 'rgba(7,13,26,0.98)' }}>
            <tr className="border-b" style={{ borderColor: 'rgba(30,50,80,0.6)' }}>
              {[
                { key: 'country', label: 'Country' },
                { key: 'policy_posture', label: 'Posture' },
                { key: 'current_policy_driver', label: 'Driver' },
                { key: 'smr_programme', label: 'SMR' },
                { key: 'enrichment_capability', label: 'Enrichment' },
                { key: 'export_policy', label: 'Export' },
                { key: 'recent_policy_shift', label: 'Recent Shift' },
              ].map(col => (
                <th key={col.key} className="px-3 py-2 text-left text-slate-500 font-medium cursor-pointer hover:text-slate-300 select-none"
                  onClick={() => toggleSort(col.key)}>
                  <span className="flex items-center gap-1">{col.label} <SortIcon k={col.key} /></span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.iso_code} className="border-b hover:bg-slate-900/30 transition-colors" style={{ borderColor: 'rgba(30,50,80,0.3)' }}>
                <td className="px-3 py-2 text-slate-200 font-medium whitespace-nowrap">
                  <span className="mr-1.5">{c.flag}</span>{c.country}
                  {c.policy_flux && <Activity size={10} className="inline ml-1.5 text-pink-400" title="Policy Flux" />}
                </td>
                <td className="px-3 py-2">
                  <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: POSTURE_COLORS[c.policy_posture] + '20', color: POSTURE_COLORS[c.policy_posture] }}>
                    {POSTURE_LABELS[c.policy_posture]}
                  </span>
                </td>
                <td className="px-3 py-2 text-slate-400 capitalize">{(c.current_policy_driver || '').replace(/_/g, ' ')}</td>
                <td className="px-3 py-2">{c.smr_programme ? <span className="text-green-400">Yes</span> : <span className="text-slate-600">No</span>}</td>
                <td className="px-3 py-2 text-slate-400 capitalize">{c.enrichment_capability}</td>
                <td className="px-3 py-2 text-slate-400 capitalize">{c.export_policy}</td>
                <td className="px-3 py-2 text-slate-400 max-w-xs truncate" title={c.recent_policy_shift}>{c.recent_policy_shift}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
