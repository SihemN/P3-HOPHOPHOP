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
        clear: " #FEEFED",
      },
      orange: {
        lighter: "#FFD1A8",
        default: "#F8A75D",
      },

      blue: {
        lighter: "#B9D9F6",
        medium: "#5f92c1",
        default: "#054B8C",
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
    },

    keyframes: {
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
        plugins: [],
      },

      menuSlideDown: {
        "0%": { transform: "translateY(-3%)", opacity: 0 },
        "100%": { transform: "translateY(0)", opacity: 1 },
      },
    },
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
