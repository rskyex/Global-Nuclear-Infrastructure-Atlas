import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Atom, Globe, Zap, AlertTriangle, BookOpen, Info } from 'lucide-react';

const NAV_LINKS = [
  { to: '/', label: 'Global Map', icon: Globe, exact: true },
  { to: '/fuel-cycle', label: 'Fuel Cycle', icon: Zap },
  { to: '/accidents', label: 'Accidents & Events', icon: AlertTriangle },
  { to: '/methodology', label: 'Methodology', icon: BookOpen },
];

export default function Navbar() {
  return (
    <nav className="h-14 flex-shrink-0 flex items-center justify-between px-4 md:px-6"
      style={{
        background: 'rgba(7,13,26,0.95)',
        borderBottom: '1px solid rgba(26,48,80,0.8)',
        backdropFilter: 'blur(12px)',
        zIndex: 1000,
      }}>
      {/* Logo */}
      <NavLink to="/" className="flex items-center gap-2 group no-underline">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="text-blue-400"
        >
          <Atom size={22} />
        </motion.div>
        <div className="leading-tight">
          <div className="text-xs font-semibold tracking-widest text-blue-400 uppercase hidden sm:block"
            style={{ letterSpacing: '0.18em' }}>
            Global Nuclear Infrastructure
          </div>
          <div className="text-sm font-bold text-white hidden sm:block" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            Atlas
          </div>
          <div className="text-sm font-bold text-white sm:hidden" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            NI Atlas
          </div>
        </div>
      </NavLink>

      {/* Nav links */}
      <div className="flex items-center gap-1">
        {NAV_LINKS.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all no-underline
              ${isActive
                ? 'text-blue-400 bg-blue-950/50 border border-blue-800/50'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'}`
            }>
            <Icon size={13} />
            <span className="hidden md:inline">{label}</span>
          </NavLink>
        ))}

        {/* Disclaimer badge */}
        <div className="ml-2 hidden lg:flex items-center gap-1 px-2 py-1 rounded text-xs text-slate-500 border border-slate-800"
          style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          <Info size={10} />
          Public data only
        </div>
      </div>
    </nav>
  );
}
