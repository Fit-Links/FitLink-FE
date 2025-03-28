import sharedConfig from "@5unwan/tailwind-config";

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/@5unwan/ui/**/*.{ts,tsx}",
  ],
  presets: [sharedConfig],
};
export default config;
