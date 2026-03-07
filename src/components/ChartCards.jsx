import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts';
import { ALL_ITEMS } from '../hooks/useFilters';
import { getCategoryLabel, CATEGORY_COLORS, STATUS_COLORS } from '../utils/categoryHelpers';

const RADIAN = Math.PI / 180;

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="px-3 py-2 rounded-lg text-xs"
        style={{ background: 'rgba(13,27,46,0.95)', border: '1px solid rgba(26,48,80,0.8)', color: '#e2e8f0' }}>
        <div className="font-medium">{payload[0].name}</div>
        <div className="text-slate-400">Count: <span className="text-white font-mono">{payload[0].value}</span></div>
      </div>
    );
  }
  return null;
};

export default function ChartCards() {
  const categoryData = useMemo(() => {
    const counts = {};
    ALL_ITEMS.forEach(f => {
      counts[f.category] = (counts[f.category] || 0) + 1;
    });
    return Object.entries(counts).map(([cat, count]) => ({
      name: getCategoryLabel(cat),
      value: count,
      color: CATEGORY_COLORS[cat] || '#6b7280',
    }));
  }, []);

  const statusData = useMemo(() => {
    const counts = {};
    ALL_ITEMS.filter(f => f.category === 'power_plant').forEach(f => {
      counts[f.status] = (counts[f.status] || 0) + 1;
    });
    return Object.entries(counts).map(([st, count]) => ({
      name: st.charAt(0).toUpperCase() + st.slice(1).replace('_', ' '),
      count,
      color: STATUS_COLORS[st] || '#6b7280',
    }));
  }, []);

  const countryData = useMemo(() => {
    const counts = {};
    ALL_ITEMS.filter(f => ['power_plant', 'fuel_cycle'].includes(f.category)).forEach(f => {
      counts[f.country] = (counts[f.country] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([country, count]) => ({ country: country.split(' ')[0], count }));
  }, []);

  const cardStyle = {
    background: 'rgba(13,27,46,0.8)',
    border: '1px solid rgba(26,48,80,0.7)',
    borderRadius: 12,
    padding: '16px',
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {/* Category breakdown */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={cardStyle}>
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">By Category</div>
        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={36} outerRadius={64}
                paddingAngle={3} dataKey="value">
                {categoryData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} opacity={0.85} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-1 mt-2">
          {categoryData.map(({ name, value, color }) => (
            <div key={name} className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
              <span className="text-slate-400 flex-1 truncate">{name}</span>
              <span className="text-slate-300 font-mono">{value}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Power plant status */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={cardStyle}>
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Power Plant Status</div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={statusData} margin={{ top: 4, right: 4, left: -20, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(26,48,80,0.5)" />
              <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#6b7280' }} />
              <YAxis tick={{ fontSize: 9, fill: '#6b7280' }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" radius={[3, 3, 0, 0]}>
                {statusData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} opacity={0.8} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Top countries */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={cardStyle}>
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
          Countries (Plants + Fuel Cycle)
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={countryData} layout="vertical" margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(26,48,80,0.5)" />
              <XAxis type="number" tick={{ fontSize: 9, fill: '#6b7280' }} />
              <YAxis type="category" dataKey="country" tick={{ fontSize: 9, fill: '#94a3b8' }} width={55} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(59,130,246,0.05)' }} />
              <Bar dataKey="count" fill="#3b82f6" opacity={0.7} radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
