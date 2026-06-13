/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#0B0F12',
        darkgray: '#161B22',
        charcoal: '#1E262F',
        cyanAccent: '#00E5FF',
        goldAccent: '#FFD369',
        crimsonAccent: '#FF5252',
        iceWhite: '#F7F9FA',
        mutedGray: '#8A99A5',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
