/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-extraneous-dependencies
const scrollbar = require("tailwind-scrollbar");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,cjs,mjs}"],
  theme: {
    extend: {
      screens: {
        tall: { raw: "(min-width: 1200px)" },
        tallheader: { raw: "(min-width: 1000px)" },
        mega: { raw: "(min-width: 1920px)" },
      },

      fontFamily: {
        "Neue-Kabel": ["neue-kabel", "sans-serif"],
        "Puffin-Display-Soft": ["puffin-display-soft", "sans-serif"],
      },
      clipPath: {
        "forme-personnalisee": "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
      },

      width: {
        custom: "calc(100% - 50px)",
      },

      height: {
        custom: "calc(100vh - 5rem)",
      },

      boxShadow: {
        top: "0 -5px 15px -5px rgba(0, 0, 0, 0.1)",
      },
    },

    colors: {
      green: {
        lighter: "#95D9CC",
        default: "#0EB495",
        lightest: "#CAEBE3",
      },
      red: {
        lighter: "#FFC5BF",
        default: "#F86151",
        clear: "#FEEFED",
      },
      orange: {
        light: "#FFF0E3",
        lighter: "#FFD1A8",
        default: "#F8A75D",
      },
      blue: {
        lighter: "#B9D9F6",
        medium: "#5f92c1",
        default: "#054B8C",
        lightest: "#EDF4F9",
      },
      dark: {
        default: "#1D1F21",
        shadow: "#B4B4B4",
      },
      cream: "#FFFDFA",
      cream_dark: "#fffcf5",
      white: "#FFFFFF",
    },

    animation: {
      marquee: "marquee 40s linear infinite",
      marquee2: "marquee2 40s linear infinite",
      marquee3: "marquee 40s linear infinite",
      marquee4: "marquee2 40s linear infinite",
      burgerDown: "burgerDown 0.5s ease-out forwards",
      "menu-slide-down": "menuSlideDown 0.5s ease-in-out forwards",
      "spin-360": "spin-360 1s linear infinite",
      "reverse-spin-360": "reverse-spin-360 0.3s ease-out forwards",
      scaleUp: "scaleUp 0.3s forwards",
    },

    keyframes: {
      scaleUp: {
        "0%": { transform: "scale(1)" },
        "100%": { transform: "scale(1.2)" },
      },
      "spin-360": {
        "0%": { transform: "rotate(0deg)" },
        "100%": { transform: "rotate(360deg)" },
      },
      "reverse-spin-360": {
        "0%": { transform: "rotate(360deg)" },
        "100%": { transform: "rotate(0deg)" },
      },
      marquee: {
        "0%": { transform: "translateX(0%)" },
        "100%": { transform: "translateX(-100%)" },
      },
      marquee2: {
        "0%": { transform: "translateX(100%)" },
        "100%": { transform: "translateX(0%)" },
      },
      marquee3: {
        "0%": { transform: "translateX(100%)" },
        "100%": { transform: "translateX(0%)" },
      },
      marquee4: {
        "0%": { transform: "translateX(0%)" },
        "100%": { transform: "translateX(-100%)" },
      },

      burgerDown: {
        "0%": {
          transform: "scale(0.95)",
          transformOrigin: "top right",
          opacity: 0,
        },
        "100%": {
          transform: "scale(1)",
          transformOrigin: "top right",
          opacity: 1,
        },
      },

      menuSlideDown: {
        "0%": { transform: "translateY(-3%)", opacity: 0 },
        "100%": { transform: "translateY(0)", opacity: 1 },
      },
    },
  },

  plugins: [
    scrollbar,
    // eslint-disable-next-line func-names
    function ({ addUtilities }) {
      const newUtilities = {
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
        ".z-100": {
          zIndex: 100,
        },
        // // Personnalisation de la scrollbar
        // "::webkit-scrollbar": {
        //   width: "12px", // Largeur de la scrollbar
        // },
        // "::webkit-scrollbar-track": {
        //   background: "#f8a75d", // Couleur de fond de la piste de défilement
        // },
        // "::webkit-scrollbar-thumb": {
        //   background: "#ffd1a8", // Couleur du bouton de défilement
        // },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
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
