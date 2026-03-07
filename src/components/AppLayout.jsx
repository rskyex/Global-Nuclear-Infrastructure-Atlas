import Navbar from './Navbar';

export default function AppLayout({ children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#070d1a' }}>
      <Navbar />
      <main style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {children}
      </main>
    </div>
  );
}
