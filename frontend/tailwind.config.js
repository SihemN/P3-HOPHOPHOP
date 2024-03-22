/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,cjs,mjs}"],
  theme: {
    extend: {
      fontFamily: {
        "Neue-Kabel": ["neue-kabel", "sans-serif"],
      },
    },
    colors: {
      green: {
        lighter: "#95D9CC",
        default: "#0EB495",
      },
      red: {
        lighter: "#FFC5BF",
        default: "#F86151",
      },
      orange: {
        lighter: "#FFD1A8",
        default: "#F8A75D",
      },
      dark: "1D1F21",
      cream: "FFFDFA",
    },

    plugins: [],
  },
};
