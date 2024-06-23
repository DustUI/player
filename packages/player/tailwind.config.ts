import sharedConfig from "@dust/tailwind-config";
import type { Config } from "tailwindcss";

const config: Pick<Config, "prefix" | "presets" | "content"> = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  presets: [sharedConfig],
};

export default config;
