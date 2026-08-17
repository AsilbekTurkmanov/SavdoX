/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        uzum: {
          primary: '#7000FF',
          'primary-hover': '#5c00d4',
          'primary-light': '#f4ecff',
          yellow: '#ffe600',
          'yellow-hover': '#ebd300',
          bg: '#f4f5f7',
          card: '#ffffff',
          text: '#1f2026',
          muted: '#8b8e99',
          border: '#e2e4e9',
          red: '#ff3b30',
          green: '#00b956'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
