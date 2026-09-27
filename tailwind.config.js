/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        kabayan: {
          blue: '#0038A8',
          red: '#CE1126',
          yellow: '#FCD116'
        }
      }
    }
  },
  plugins: []
}
