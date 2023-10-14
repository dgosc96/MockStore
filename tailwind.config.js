/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      fontFamily: {
        ysabeau: ['Ysabeau SC', 'sans-serif'],
      },
      boxShadow: {
        light: '0 0px 10px 0px rgba(0, 0, 0, 0.1)',
        tile: '0 0 30px 5px rgba(0, 0, 0, 0.1)',
        'tile-up': '0 5px 20px 15px rgba(0, 0, 0, 0.1)',
        sidebar: '-15px 0px 200px 5px rgba(0, 0, 0, 0.2)',
        'inner-xl': 'inset 0px 0px 20px 2px rgb(0 0 0 / 0.5)',
      },
    },
  },
  plugins: [],
};
