/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,cjs,mjs}"],
  theme: {
    extend: {
      fontFamily: {
        "Neue-Kabel": ["neue-kabel", "sans-serif"],
        "Puffin-Display-Soft": ["puffin-display-soft", "sans-serif"],
      },
      clipPath: {
        "forme-personnalisee": "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
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

      blue: {
        lighter: "#B9D9F6",
        default: "#054B8C",
      },

      dark: {
        default: "#1D1F21",
      },
      cream: "#FFFDFA",
      white: "#FFFFFF",
    },

    plugins: [],
  },
};

// Librairie d'Icons : Phosphor Icons
// https://github.com/phosphor-icons/core

// Installer les librairies :
// npm install react-icons --save

// Exemple pour utiliser icon :
// ******On importe l'icon
// import { nomIcon } from "react-icons/ai";
// ******On appelle composant :
// <nomIcon />
// passer des props :
//  <nomIcon className="text-green-default" />
