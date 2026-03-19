import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          blue: '#00d4ff',
          purple: '#b300ff',
          pink: '#ff006e',
          green: '#00ff88',
          yellow: '#ffee00',
        },
        dark: {
          900: '#050508',
          800: '#0a0a12',
          700: '#0f0f1a',
          600: '#161625',
          500: '#1e1e35',
        }
      },
      animation: {
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { opacity: '1', filter: 'brightness(1)' },
          '50%': { opacity: '0.85', filter: 'brightness(1.2)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      boxShadow: {
        'neon-blue': '0 0 20px #00d4ff, 0 0 40px #00d4ff40',
        'neon-purple': '0 0 20px #b300ff, 0 0 40px #b300ff40',
        'neon-pink': '0 0 20px #ff006e, 0 0 40px #ff006e40',
        'neon-green': '0 0 20px #00ff88, 0 0 40px #00ff8840',
        'glow-sm': '0 0 10px currentColor',
        'glow-md': '0 0 20px currentColor, 0 0 40px currentColor',
      }
    },
  },
  plugins: [],
}
export default config
