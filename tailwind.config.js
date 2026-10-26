/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#0c0c0c',
          dark: '#141414',
          surface: '#1c1c1c',
          card: '#222222',
          border: '#2a2a2a',
          muted: '#737373',
          light: '#f5f5f5',
          cream: '#eae8e4',
          accent: '#e63946',
        }
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        heading: ['"Syne"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.05em',
        widest: '0.25em',
        mega: '0.4em'
      }
    },
  },
  plugins: [],
}
