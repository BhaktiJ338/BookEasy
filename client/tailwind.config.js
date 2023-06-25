/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:'#F5385D',
        primary_dark:'#d3163c',
        primary_light:'#f75e7c',
        complement:'#C8FFF4'
      }
    },
  },
  plugins: [],
}

