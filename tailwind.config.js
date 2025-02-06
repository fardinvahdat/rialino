/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors:{
        primary:{
          b1:'#1A70FF',
          b2:"#1A70FFD2",
          l1:"#D6E4FF"
        },
        gray:{
          b1:"#000000",
          b2:"#303030",
          b3:"#3E3E3E",
          b4:"#555555",
          b5:"#5D5D5D",
          b6:"#737373",
          l1:"#B4B4B4",
          l2:"#F9F9F9",
          l3:"#ffffff",
          l4:"#fafafa",
          border:"#d7d8d9"
        },
      },
      borderRadius:{
        md:"10px",
        lg:"25px",
      },
    },
  },
  plugins: [],
}