import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        greenweb: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        // Brand: deep forest, harvest wheat, field soil (used across the site chrome and home page)
        forest: { 50: '#eef5f0', 100: '#d5e8db', 200: '#a9d0b6', 300: '#74b38b', 400: '#43915f', 500: '#2a7747', 600: '#1f5f39', 700: '#184a2d', 800: '#123824', 900: '#0b2618', 950: '#061a10' },
        wheat: { 50: '#fbf6e9', 100: '#f5e8c4', 200: '#ecd08a', 300: '#e2b85a', 400: '#d6a13a', 500: '#bd8526', 600: '#98661d' },
        field: { bg: '#f4f6f1', line: '#dfe5dc', ink: '#13251b', muted: '#56665c' },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config