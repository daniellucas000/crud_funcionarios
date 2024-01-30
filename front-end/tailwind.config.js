/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        custom: ['Inter', 'sans-serif'],
      },
      colors: {
        main: '#f7f6fb',
        modal: '#fcfbfe',
        input: '#ecedf6',
        button: '#577bfa',
        borderCard: '#7070701a',
        cardEmail: '#B3B4C0',
      },
    },
  },
  plugins: [],
};
