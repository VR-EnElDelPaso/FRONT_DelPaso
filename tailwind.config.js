/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        kaiseiDecol: ['Kaisei Decol', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      backgroundColor: {
        secondary: '#5F5EA3',
      }
    },
  },
  plugins: [],
};
