import type { Config } from "tailwindcss";
import { blackA, violet, mauve, indigo } from "@radix-ui/colors";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        ...blackA,
        ...violet,
        ...mauve,
        ...indigo,
        'radix-indigo-1': indigo.indigo1,
        'radix-indigo-2': indigo.indigo2,
        'radix-indigo-3': indigo.indigo3,
        'radix-indigo-4': indigo.indigo4,
        'radix-indigo-5': indigo.indigo5,
        'radix-indigo-6': indigo.indigo6,
        'radix-indigo-7': indigo.indigo7,
        'radix-indigo-8': indigo.indigo8,
        'radix-indigo-9': indigo.indigo9,
        'radix-indigo-10': indigo.indigo10,
        'radix-indigo-11': indigo.indigo11,
        'radix-indigo-12': indigo.indigo12,
      },
    },
  },
  plugins: [],
};
export default config;
