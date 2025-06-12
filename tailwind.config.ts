// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        "light-black": "#515151",
        font: '"Satoshi", sans-serif',
        "bg-color": "#2f1528",
        "bg-pink": "#572c4b",
        grey: "#f7f7f7",
      },
    },
  },
  plugins: [],
};

export default config;
