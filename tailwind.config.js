/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        kaiseiDecol: ["Kaisei Decol", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      backgroundColor: {
        secondary: "#5F5EA3",
        primary: "#B33424",
        primaryHover: "#A52A1A",
      },
      borderColor: {
        primary: "#B33424",
      },
      textColor: {
        primary: "#B33424",
        secondary: "#5F5EA3",
        dark: "#333333",
      },
    },
  },
  plugins: [],
};
