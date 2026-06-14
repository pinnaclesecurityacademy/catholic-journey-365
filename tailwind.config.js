/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        parchment: {
          50: '#FAF7F4',
          100: '#F7F3EE',
          200: '#E8DDD0',
        },
        leather: {
          400: '#D4A96A',
          600: '#7C5C3E',
          800: '#4A3728',
          900: '#1C1917',
        },
        sage: {
          500: '#4A6741',
        },
        gold: '#D4A96A',
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
