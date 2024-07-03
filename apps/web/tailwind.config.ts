// tailwind config is required for editor support

import sharedConfig from "@dust/tailwind-config";
import type { Config } from "tailwindcss";

const config: Pick<Config, "content" | "presets" | "darkMode"> = {
  darkMode: "class",
  content: ["./src/app/**/*.tsx"],
  presets: [sharedConfig],
};

export default config;
