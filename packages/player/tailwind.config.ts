import sharedConfig from "@dust/tailwind-config";
import type { Config } from "tailwindcss";

const config: Pick<Config, "prefix" | "presets" | "content" | "darkMode"> = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  presets: [sharedConfig],
};

export default config;
