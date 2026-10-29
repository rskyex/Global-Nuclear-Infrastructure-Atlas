import { motion } from 'framer-motion';
import {
  Shield, Info, ExternalLink, AlertCircle, TrendingDown, TrendingUp, Minus,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, Legend,
} from 'recharts';
import arsenalData, { arsenalSummary } from '../data/arsenalData';

const TREND_ICON = {
  decreasing: <TrendingDown size={13} className="text-emerald-400" />,
  increasing: <TrendingUp size={13} className="text-red-400" />,
  stable: <Minus size={13} className="text-slate-400" />,
};

const TREND_LABEL = {
  decreasing: 'Decreasing',
  increasing: 'Increasing',
  stable: 'Stable',
};

function DarkTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border px-3 py-2 text-xs shadow-xl"
      style={{ background: '#0a1428', borderColor: 'rgba(30,50,80,0.8)' }}>
      <div className="text-slate-300 font-medium mb-1">{label}</div>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2" style={{ color: p.color || p.fill }}>
          <span className="w-2 h-2 rounded-full inline-block flex-shrink-0" style={{ background: p.color || p.fill }} />
          {p.name}: <span className="font-semibold ml-1">{p.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

function CountryCard({ c }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-xl border p-5"
      style={{
        background: 'rgba(10,20,40,0.7)',
        borderColor: c.color + '25',
        borderTopWidth: 3,
        borderTopColor: c.color,
      }}
    >
      <div className="flex items-start justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{c.flag}</span>
          <div>
            <div className="text-sm font-bold text-white">{c.country}</div>
            <div className="text-xs text-slate-400">{c.region}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold" style={{ color: c.color, fontFamily: 'JetBrains Mono, monospace' }}>
            {c.totalWarheads === 90 && c.id === 'israel' ? '~' : ''}{c.totalWarheads.toLocaleString()}
          </div>
          <div className="text-xs text-slate-400">est. total warheads</div>
        </div>
      </div>

      {/* Breakdown bars */}
      <div className="space-y-1.5 mb-4">
        {[
          { label: 'Deployed strategic', value: c.deployedStrategic, max: c.totalWarheads },
          { label: 'Deployed non-strategic', value: c.deployedNonStrategic, max: c.totalWarheads },
          { label: 'Reserve / non-deployed', value: c.reserve, max: c.totalWarheads },
          { label: 'Retired (awaiting dismantlement)', value: c.retired, max: c.totalWarheads },
        ].filter(b => b.value > 0).map(b => (
          <div key={b.label}>
            <div className="flex justify-between text-xs text-slate-400 mb-0.5">
              <span>{b.label}</span>
              <span style={{ color: c.color, fontFamily: 'JetBrains Mono, monospace' }}>{b.value}</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${(b.value / c.totalWarheads) * 100}%`, background: c.color, opacity: 0.7 }} />
            </div>
          </div>
        ))}
      </div>

      {/* Metadata */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400">NPT Status</span>
          <span className="text-slate-300">{c.nptStatus}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400">First Test</span>
          <span className="text-slate-300">
            {c.firstTest ? `${c.firstTest} — ${c.firstTestName}` : 'No confirmed test'}
          </span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400">Stockpile trend</span>
          <span className="flex items-center gap-1">
            {TREND_ICON[c.stockpileTrend]}
            <span className="text-slate-300">{TREND_LABEL[c.stockpileTrend]}</span>
          </span>
        </div>
      </div>

      <p className="text-xs text-slate-400 leading-relaxed mt-3 border-t pt-3"
        style={{ borderColor: c.color + '15' }}>
        {c.notes}
      </p>

      {/* Sources */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {c.sources.map((s, i) => (
          <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs no-underline px-2 py-1 rounded"
            style={{ background: 'rgba(30,50,80,0.5)', color: '#64748b' }}>
            <ExternalLink size={10} />
            {s.name}
          </a>
        ))}
      </div>
    </motion.div>
  );
}

export default function ArsenalsPage() {
  const chartData = [...arsenalData]
    .sort((a, b) => b.totalWarheads - a.totalWarheads)
    .map(c => ({
      name: c.country,
      flag: c.flag,
      Total: c.totalWarheads,
      'Deployed strategic': c.deployedStrategic,
      'Deployed non-strategic': c.deployedNonStrategic,
      Reserve: c.reserve,
      Retired: c.retired,
      fill: c.color,
    }));

  return (
    <div className="min-h-full overflow-y-auto px-6 py-8 max-w-5xl mx-auto"
      style={{ background: '#040d1a' }}>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)' }}>
            <Shield size={17} className="text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">Global Nuclear Arsenals</h1>
        </div>
        <p className="text-sm text-slate-400 max-w-2xl leading-relaxed mb-4">
          Country-level warhead estimates from SIPRI and FAS. All figures are public estimates
          from reputable civil-society research bodies. Most governments do not officially confirm precise numbers.
        </p>

        {/* Important disclaimer */}
        <div className="flex items-start gap-3 px-4 py-3 rounded-xl border text-xs text-amber-300 mb-4"
          style={{ background: 'rgba(245,158,11,0.05)', borderColor: 'rgba(245,158,11,0.2)' }}>
          <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
          <div>
            <strong className="block mb-1">Data Note</strong>
            All warhead estimates are from publicly available SIPRI Yearbook 2023 and FAS Nuclear Notebook data.
            Numbers are approximate and change over time. This page shows country-level totals only —
            no site, base, deployment location, or operational detail is included. This is an intentional
            editorial decision consistent with the atlas's educational and safety-conscious scope.
          </div>
        </div>
      </motion.div>

      {/* Global summary stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10"
      >
        {[
          { value: `~${arsenalSummary.totalGlobalWarheads.toLocaleString()}`, label: 'Estimated global warheads', color: '#ef4444' },
          { value: arsenalSummary.nuclearArmedStates, label: 'Nuclear-armed states', color: '#f59e0b' },
          { value: arsenalSummary.nptRecognized, label: 'NPT recognized states', color: '#3b82f6' },
          { value: arsenalSummary.nonNpt, label: 'Non-NPT / opacity', color: '#8b5cf6' },
        ].map(s => (
          <div key={s.label} className="rounded-xl border p-4 text-center"
            style={{ background: 'rgba(10,20,40,0.6)', borderColor: 'rgba(30,50,80,0.6)' }}>
            <div className="text-2xl font-bold mb-1" style={{ color: s.color, fontFamily: 'JetBrains Mono, monospace' }}>{s.value}</div>
            <div className="text-xs text-slate-400">{s.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Bar chart – total warheads */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="rounded-xl border p-5 mb-10"
        style={{ background: 'rgba(10,20,40,0.7)', borderColor: 'rgba(30,50,80,0.6)' }}
      >
        <h2 className="text-sm font-semibold text-slate-200 mb-1">Estimated Total Warheads by Country</h2>
        <p className="text-xs text-slate-400 mb-5">SIPRI Yearbook 2023 / FAS Nuclear Notebook estimates. Includes deployed, reserve, and retired warheads awaiting dismantlement.</p>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={chartData} margin={{ top: 0, right: 10, bottom: 30, left: 20 }}>
            <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false}
              angle={-25} textAnchor="end" interval={0} />
            <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip content={<DarkTooltip />} />
            <Bar dataKey="Total" name="Est. total warheads" radius={[3, 3, 0, 0]}>
              {chartData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Stacked chart – breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl border p-5 mb-10"
        style={{ background: 'rgba(10,20,40,0.7)', borderColor: 'rgba(30,50,80,0.6)' }}
      >
        <h2 className="text-sm font-semibold text-slate-200 mb-1">Warhead Breakdown by Category</h2>
        <p className="text-xs text-slate-400 mb-5">Deployed strategic, deployed non-strategic, reserve, and retired. Note: Israel and North Korea figures are not broken down officially; estimates vary.</p>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={chartData} margin={{ top: 0, right: 10, bottom: 30, left: 20 }}>
            <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false}
              angle={-25} textAnchor="end" interval={0} />
            <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip content={<DarkTooltip />} />
            <Legend wrapperStyle={{ color: '#94a3b8', fontSize: 10, paddingTop: 8 }} />
            <Bar dataKey="Deployed strategic" stackId="a" fill="#ef4444" />
            <Bar dataKey="Deployed non-strategic" stackId="a" fill="#f97316" />
            <Bar dataKey="Reserve" stackId="a" fill="#3b82f6" />
            <Bar dataKey="Retired" stackId="a" fill="#6b7280" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Country cards */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-5">
          <h2 className="text-base font-semibold text-slate-100">Nuclear-Armed States</h2>
          <div className="flex-1 h-px" style={{ background: 'rgba(30,50,80,0.8)' }} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {arsenalData.sort((a, b) => b.totalWarheads - a.totalWarheads).map(c => (
            <CountryCard key={c.id} c={c} />
          ))}
        </div>
      </div>

      {/* Methodology note */}
      <div className="rounded-xl border p-5 text-xs text-slate-400 leading-relaxed"
        style={{ background: 'rgba(10,20,40,0.5)', borderColor: 'rgba(30,50,80,0.5)' }}>
        <div className="flex items-center gap-2 mb-3">
          <Info size={14} className="text-slate-400" />
          <span className="font-semibold text-slate-300">Sources & Methodology Note</span>
        </div>
        <p className="mb-2">
          Warhead estimates in this page are drawn from the <strong className="text-slate-300">SIPRI Yearbook 2023</strong> and
          the <strong className="text-slate-300">FAS Nuclear Notebook</strong> series (Federation of American Scientists).
          Both are widely cited, independent, and reputable public-interest research sources.
        </p>
        <p className="mb-2">
          Nuclear weapon states are defined here as states that are believed to possess nuclear weapons,
          whether or not they are parties to the NPT. The five NPT-recognised states (USA, Russia, UK, France, China)
          officially acknowledge their arsenals. India, Pakistan, North Korea have tested weapons.
          Israel maintains a policy of nuclear opacity.
        </p>
        <p>
          <strong className="text-slate-300">Scope limitation</strong>: This page deliberately provides country-level totals only.
          No weapon site mapping, deployment-site mapping, operational detail, base-level breakdowns,
          or tactical/targeting structure is included. This is a principled editorial decision
          consistent with the atlas's educational and safety-conscious scope.
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {[
            { name: 'SIPRI Yearbook 2023', url: 'https://www.sipri.org/yearbook/2023' },
            { name: 'FAS Nuclear Notebook', url: 'https://fas.org/issues/nuclear-weapons/status-world-nuclear-forces/' },
            { name: 'Bulletin of the Atomic Scientists', url: 'https://thebulletin.org/nuclear-notebook/' },
          ].map(s => (
            <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs no-underline px-2 py-1 rounded text-blue-400 hover:text-blue-300"
              style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)' }}>
              <ExternalLink size={10} />
              {s.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
