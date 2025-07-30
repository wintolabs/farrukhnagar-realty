import type { Config } from "tailwindcss";
import animatePlugin from "tailwindcss-animate";
import { withUt } from "uploadthing/tw";

const config: Config = {
  darkMode: "class",
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-poppins)", "Poppins", "sans-serif"],
      },
      colors: {
        primary: "#C1DEE8",
        secondary: "#FBD9B9",
      },
    },
  },
  plugins: [animatePlugin],
};

export default withUt(config);
