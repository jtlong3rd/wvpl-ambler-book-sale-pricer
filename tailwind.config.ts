import type { Config } from "tailwindcss";

export default {
  content: ["./{app,src}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
