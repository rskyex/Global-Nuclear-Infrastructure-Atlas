import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Atom, Globe, BookOpen, Clock, Shield, Activity, FileText, BarChart3, ChevronRight } from 'lucide-react';
import { suiteModules } from '../shared/tokens';

const NAV_LINKS = [
  { to: '/infrastructure', label: 'Infrastructure', icon: Globe },
  { to: '/policy', label: 'Policy Intel', icon: BarChart3 },
  { to: '/basics', label: 'Nuclear Basics', icon: BookOpen },
  { to: '/accidents', label: 'Accidents', icon: Clock },
  { to: '/arsenals', label: 'Arsenals', icon: Shield },
  { to: '/radiation', label: 'Radiation & Health', icon: Activity },
  { to: '/methodology', label: 'Methodology', icon: FileText },
];

export default function Navbar() {
  return (
    <nav className="h-14 flex-shrink-0 flex items-center justify-between px-4 md:px-6"
      style={{
        background: 'rgba(7,13,26,0.97)',
        borderBottom: '1px solid rgba(26,48,80,0.8)',
        backdropFilter: 'blur(12px)',
        zIndex: 1000,
      }}>
      {/* Suite breadcrumb + Logo */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <a href={suiteModules.landing.url} target="_blank" rel="noopener noreferrer"
          className="text-xs text-slate-600 hover:text-slate-400 no-underline hidden lg:inline">Faultline</a>
        <ChevronRight size={10} className="text-slate-700 hidden lg:inline" />
      </div>
      <NavLink to="/" className="flex items-center gap-2 group no-underline flex-shrink-0">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="text-blue-400"
        >
          <Atom size={22} />
        </motion.div>
        <div className="leading-tight">
          <div className="text-xs font-semibold tracking-widest text-blue-400 uppercase hidden lg:block"
            style={{ letterSpacing: '0.18em' }}>
            Global Nuclear Infrastructure
          </div>
          <div className="text-sm font-bold text-white hidden lg:block" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            Atlas
          </div>
          <div className="text-sm font-bold text-white lg:hidden" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            NI Atlas
          </div>
        </div>
      </NavLink>

      {/* Nav links */}
      <div className="flex items-center gap-0.5 overflow-x-auto">
        {NAV_LINKS.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to}
            className={({ isActive }) =>
              `flex items-center gap-1.5 px-2 py-1.5 rounded-md text-xs font-medium transition-all no-underline whitespace-nowrap
              ${isActive
                ? 'text-blue-400 bg-blue-950/50 border border-blue-800/50'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'}`
            }>
            <Icon size={13} className="flex-shrink-0" />
            <span className="hidden xl:inline">{label}</span>
            <span className="hidden md:inline xl:hidden">{label.split(' ')[0]}</span>
          </NavLink>
        ))}

        {/* Data badge */}
        <div className="ml-2 hidden xl:flex items-center gap-1 px-2 py-1 rounded text-xs text-slate-600 border border-slate-800/60 flex-shrink-0"
          style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          Public data only
        </div>
      </div>
    </nav>
  );
}
