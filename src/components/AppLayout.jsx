import Navbar from './Navbar';

export default function AppLayout({ children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#070d1a' }}>
      <Navbar />
      <main style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {children}
      </main>
      <footer
        className="flex-shrink-0 flex items-center justify-center px-6 py-2 text-xs text-slate-400 border-t"
        style={{ borderColor: 'rgba(26,48,80,0.5)', background: 'rgba(4,13,26,0.8)', fontFamily: 'JetBrains Mono, monospace' }}
      >
        © {new Date().getFullYear()} Risa Koyanagi. All rights reserved.
      </footer>
    </div>
  );
}
