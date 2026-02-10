/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        eco: {
          green: '#22c55e',
          dark: '#14532d',
          light: '#dcfce7',
        },
      },
    },
  },
  plugins: [],
};
