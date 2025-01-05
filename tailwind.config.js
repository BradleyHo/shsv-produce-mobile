// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'shfb': {
          orange: '#ff9800',
          'orange-dark': '#f57c00',
        }
      }
    },
  },
  plugins: [],
}
