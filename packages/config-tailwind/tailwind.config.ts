import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import tailwindcssAnimate from "tailwindcss-animate";

// We want each package to be responsible for its own content.
const config: Omit<Config, "content"> = {
  theme: {
    extend: {
      screens: {
        xs: '380px',
      },
      colors: {
        brand: {
          primary: {
            100: "hsl(241 100 93)",
            200: "hsl(241 100 87)",
            300: "hsl(241 100 80)",
            400: "hsl(241 100 73)",
            500: "hsl(241 100 67)",
            600: "hsl(241 57 53)",
            700: "hsl(241 50 40)",
            800: "hsl(241 50 27)",
            900: "hsl(241 50 13)",
          },
          secondary: {
            100: "hsl(14 100 94)",
            200: "hsl(14 100 88)",
            300: "hsl(14 100 83)",
            400: "hsl(14 100 77)",
            500: "hsl(14 100 71)",
            600: "hsl(14 54 57)",
            700: "hsl(14 41 43)",
            800: "hsl(14 41 28)",
            900: "hsl(14 41 14)",
          },
        },
        text: {
          primary: "hsl(var(--text-primary))",
          sub1: "hsl(var(--text-sub1))",
          sub2: "hsl(var(--text-sub2))",
          sub3: "hsl(var(--text-sub3))",
          sub4: "hsl(var(--text-sub4))",
          sub5: "hsl(var(--text-sub5))",
        },
        background: {
          primary: "hsl(var(--background-primary))",
          sub1: "hsl(var(--background-sub1))",
          sub2: "hsl(var(--background-sub2))",
          sub3: "hsl(var(--background-sub3))",
          sub4: "hsl(var(--background-sub4))",
          sub5: "hsl(var(--background-sub5))",
        },
        notification: "hsl(var(--notification))",
      },
      spacing: {
        mobile: "480px",
      },
      fontSize: {
        "title-1": [
          "22px",
          {
            lineHeight: "1.3",
            fontWeight: "500",
          },
        ],
        "title-2": [
          "20px",
          {
            lineHeight: "1.3",
            fontWeight: "500",
          },
        ],
        "title-3": [
          "20px",
          {
            lineHeight: "1.3",
            fontWeight: "400",
          },
        ],
        headline: [
          "17px",
          {
            lineHeight: "1.4",
            fontWeight: "500",
          },
        ],
        "subhead-1": [
          "17px",
          {
            lineHeight: "1.4",
            fontWeight: "400",
          },
        ],
        "subhead-2": [
          "15px",
          {
            lineHeight: "1.4",
            fontWeight: "600",
          },
        ],
        "body-1": [
          "15px",
          {
            lineHeight: "1.5",
            fontWeight: "500",
          },
        ],
        "body-2": [
          "13px",
          {
            lineHeight: "1.5",
            fontWeight: "600",
          },
        ],
        "body-3": [
          "13px",
          {
            lineHeight: "1.5",
            fontWeight: "500",
          },
        ],
        "body-4": [
          "12px",
          {
            lineHeight: "1.5",
            fontWeight: "400",
          },
        ],
        "body-5": [
          "10px",
          {
            lineHeight: "1.5",
            fontWeight: "500",
          },
        ],
        "body-6": [
          "10px",
          {
            lineHeight: "1.5",
            fontWeight: "400",
          },
        ],
      },
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    tailwindcssAnimate,
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".dot-mask-lg": {
          mask: "radial-gradient(circle 10.5px at calc(100% - 3px) calc(0% + 3px),#0000 98%,#000)",
          "-webkit-mask":
            "radial-gradient(circle 10.5px at calc(100% - 3px) calc(0% + 3px),#0000 98%,#000)",
        },
        ".dot-mask-sm": {
          mask: "radial-gradient(circle 8px at calc(100% - 2px) calc(0% + 2px),#0000 98%,#000)",
          "-webkit-mask":
            "radial-gradient(circle 8px at calc(100% - 2px) calc(0% + 2px),#0000 98%,#000)",
        },
        ".backface-hidden": {
          "backface-visibility": "hidden",
          "-webkit-backface-visibility": "hidden",
        },
      });
    }),
  ],
};
export default config;
