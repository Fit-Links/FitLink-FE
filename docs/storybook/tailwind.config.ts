import sharedConfig from "@5unwan/tailwind-config";

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./stories/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/@5unwan/ui/**/*.tsx",
    "node_modules/trainer/components/**",
  ],
  presets: [sharedConfig],
};
export default config;
