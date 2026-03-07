/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        atlas: {
          bg: '#070d1a',
          surface: '#0d1b2e',
          card: '#111f35',
          border: '#1a3050',
          blue: '#3b82f6',
          cyan: '#06b6d4',
          violet: '#8b5cf6',
          amber: '#f59e0b',
          red: '#ef4444',
          green: '#10b981',
          gray: '#6b7280',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #3b82f640, 0 0 10px #3b82f620' },
          '100%': { boxShadow: '0 0 15px #3b82f680, 0 0 30px #3b82f640' },
        }
      },
    },
  },
  plugins: [],
}

