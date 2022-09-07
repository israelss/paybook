/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '425px'
      }
    }
  },
  plugins: [require('daisyui')]
}
