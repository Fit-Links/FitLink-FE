import sharedConfig from "@5unwan/tailwind-config";

import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./stories/**/*.{js,ts,jsx,tsx,mdx}"],
  presets: [sharedConfig],
};
export default config;
