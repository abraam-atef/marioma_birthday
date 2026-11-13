/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        script: ['"Great Vibes"', '"Dancing Script"', 'cursive'],
        hand: ['"Dancing Script"', 'cursive'],
      },
    },
  },
  plugins: [],
}
