/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'phone': {'max': '639px'},                   // Telefonlar (Smartphones)
      'tablet': {'min': '640px', 'max': '1023px'}, // Planshetlar (Tablets)
      'laptop': {'min': '1024px', 'max': '1279px'},// Noutbooklar (Laptops)
      'desktop': {'min': '1280px'},               // Kompyuterlar (Desktops)
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        savdox: {
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
        },
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
