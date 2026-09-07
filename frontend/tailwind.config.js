/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          hover: '#1D4ED8',
          light: 'rgba(37, 99, 235, 0.1)',
          tint: '#EFF6FF'
        },
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a'
        },
        success: {
          DEFAULT: '#10B981',
          light: 'rgba(16, 185, 129, 0.1)'
        },
        danger: {
          DEFAULT: '#EF4444',
          light: 'rgba(239, 68, 68, 0.1)'
        },
        warning: {
          DEFAULT: '#F59E0B',
          light: 'rgba(245, 158, 11, 0.1)'
        },
        info: {
          DEFAULT: '#0EA5E9',
          light: 'rgba(14, 165, 233, 0.1)'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      }
    },
  },
  plugins: [],
}
