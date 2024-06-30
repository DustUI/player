// tailwind config is required for editor support

import sharedConfig from "@dust/tailwind-config";
import type { Config } from "tailwindcss";

const config: Pick<Config, "content" | "presets" | "darkMode"> = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx,md,mdx}",
    "./src/components/**/*.{js,jsx,ts,tsx,md,mdx}",

    "./src/app/**/*.tsx,md,mdx",
  ],
  presets: [sharedConfig],
};

export default config;
