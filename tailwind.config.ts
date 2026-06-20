import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#fbf9f5",
        paper: "#fffdf9",
        ink: "#1b1c1a",
        muted: "#54433f",
        coral: {
          DEFAULT: "#ff9b85",
          deep: "#964736",
          pale: "#ffdad3",
        },
        mint: {
          DEFAULT: "#86e3ce",
          deep: "#006b5c",
          pale: "#96f4de",
        },
        sunflower: {
          DEFAULT: "#ffd872",
          deep: "#755b00",
          pale: "#ffdf91",
        },
        cloud: {
          low: "#f5f3ef",
          DEFAULT: "#efeeea",
          high: "#eae8e4",
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', "Nunito Sans", "ui-sans-serif", "system-ui"],
        body: ['"Nunito Sans"', "ui-sans-serif", "system-ui"],
      },
      borderRadius: {
        soft: "1.5rem",
        cloud: "2rem",
        pebble: "3rem",
      },
      boxShadow: {
        coral: "0 20px 50px rgba(255, 155, 133, 0.18)",
        mint: "0 18px 45px rgba(134, 227, 206, 0.22)",
        soft: "0 18px 40px rgba(84, 67, 63, 0.08)",
      },
    },
  },
  plugins: [],
} satisfies Config;
