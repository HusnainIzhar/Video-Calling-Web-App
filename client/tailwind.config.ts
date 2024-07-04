import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          dark: "#0d1117",
          2: "#161b22",
          3: "#2d333b",
          4: "#010409",
          textInactive: "#848d97",
          textActive: "#dbe2e8",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"),],
};
export default config;
