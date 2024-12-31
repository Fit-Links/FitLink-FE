import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
import resolveConfig from "tailwindcss/resolveConfig";

import tailwindConfig from "../../tailwind.config.ts";

const customTailwindTheme = resolveConfig(tailwindConfig).theme.fontSize;
const customFontSizes = Object.keys(customTailwindTheme);

const customTwMerge = extendTailwindMerge({
  extend: {
    theme: {},
    classGroups: {
      "font-size": [
        {
          text: customFontSizes,
        },
      ],
    },
  },
});

export const cn = (...inputs: ClassValue[]) => {
  return customTwMerge(clsx(inputs));
};
