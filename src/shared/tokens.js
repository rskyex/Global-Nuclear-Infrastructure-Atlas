/**
 * Faultline Suite – Shared Design Tokens
 * Used across: Nuclear Atlas, Orbital Risk Tracker, Cyber Escalation Atlas
 */

export const colors = {
  bg: '#070d1a',
  surface: '#0d1b2e',
  card: '#111f35',
  border: '#1a3050',
  borderLight: 'rgba(26,48,80,0.6)',
  text: '#e2e8f0',
  textMuted: '#94a3b8',
  textDim: '#64748b',
  blue: '#3b82f6',
  cyan: '#06b6d4',
  violet: '#8b5cf6',
  amber: '#f59e0b',
  red: '#ef4444',
  green: '#10b981',
  pink: '#ec4899',
  gray: '#6b7280',
};

export const fonts = {
  sans: "'Inter', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
};

export const spacing = {
  xs: '0.25rem', sm: '0.5rem', md: '1rem', lg: '1.5rem', xl: '2rem',
};

export const suiteModules = {
  landing: { name: 'Faultline', url: 'https://faultline-nqmm.vercel.app' },
  nuclear: { name: 'Global Nuclear Infrastructure Atlas', url: 'https://globalnuclearinfrastructureatlas.vercel.app' },
  orbital: { name: 'Orbital Risk Tracker', url: 'https://orbitalrisktracker.vercel.app' },
  cyber: { name: 'Cyber Escalation Atlas', url: 'https://cyber-escalation-atlas.vercel.app' },
  lunar: { name: 'Lunar Mandate Atlas', url: 'https://lunar-mandate-atlas.vercel.app/' },
};

export default { colors, fonts, spacing, suiteModules };
