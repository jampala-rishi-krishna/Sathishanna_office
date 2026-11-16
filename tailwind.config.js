/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          // Core palette: oxblood + antique gold on a rose-tinted porcelain.
          primary: '#5A1426', // oxblood — primary actions, headings accents
          deep: '#2E0A13', // darkest oxblood — dark sections
          accent: '#7A1F35', // hover state for primary
          gold: '#B08A4E', // antique gold — single accent, used sparingly
          goldsoft: '#E3D2B4',
          blush: '#F4E9E7', // tinted section background
          porcelain: '#FCF9F8', // page background
          ink: '#24171B', // body text
          stone: '#6B5B5F', // secondary text
          line: '#E6D9D7', // hairlines and borders
          // Legacy keys kept so nothing else breaks
          secondary: '#F4E9E7',
          cream: '#F4E9E7',
          dark: '#24171B',
          light: '#FCF9F8',
        },
        whatsapp: '#1F9D55',
      },
      fontFamily: {
        display: ['"Bodoni Moda"', 'Georgia', 'serif'],
        serif: ['"Bodoni Moda"', 'Georgia', 'serif'],
        sans: ['"Hanken Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        prose: '62ch',
      },
      borderRadius: {
        arch: '999px 999px 1.25rem 1.25rem',
        pill: '9999px',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
};
