/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/*.tsx",
  ],
  theme: {
    extend: {
      fontFamily: {
        kaiseiDecol: ['Kaisei Decol', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
