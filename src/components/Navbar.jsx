import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Atom, Globe, Zap, Clock, Activity, Info, FlaskConical } from 'lucide-react';

const NAV_LINKS = [
  { to: '/', label: 'Map', icon: Globe, exact: true },
  { to: '/history', label: 'History', icon: Clock },
  { to: '/fusion', label: 'Fusion', icon: FlaskConical },
  { to: '/radar', label: 'Radar', icon: Activity },
];

export default function Navbar() {
  const navigate = useNavigate();

  const handleMethodologyClick = () => {
    // If already on home page, scroll to anchor; otherwise navigate then scroll
    if (window.location.pathname === '/') {
      document.getElementById('methodology')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        document.getElementById('methodology')?.scrollIntoView({ behavior: 'smooth' });
      }, 400);
    }
  };

  return (
    <nav className="h-14 flex-shrink-0 flex items-center justify-between px-4 md:px-6"
      style={{
        background: 'rgba(7,13,26,0.97)',
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

        {/* Methodology anchor link */}
        <button
          onClick={handleMethodologyClick}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all text-slate-400 hover:text-slate-200 hover:bg-slate-800/40">
          <Info size={13} />
          <span className="hidden md:inline">Methodology</span>
        </button>

        {/* Data badge */}
        <div className="ml-2 hidden lg:flex items-center gap-1 px-2 py-1 rounded text-xs text-slate-600 border border-slate-800/60"
          style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          Public data only
        </div>
      </div>
    </nav>
  );
}
