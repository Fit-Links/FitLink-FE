import type { Config } from "tailwindcss";
import plugin from 'tailwindcss/plugin';

// We want each package to be responsible for its own content.
const config: Omit<Config, "content"> = {
  theme: {
    extend: {
      colors: {
        brand: {
          primary: {
            100: 'hsl(241 100 93)',
            200: 'hsl(241 100 87)',
            300: 'hsl(241 100 80)',
            400: 'hsl(241 100 73)',
            500: 'hsl(241 100 67)',
            600: 'hsl(241 57 53)',
            700: 'hsl(241 50 40)',
            800: 'hsl(241 50 27)',
            900: 'hsl(241 50 13)',
          },
          secondary: {
            100: 'hsl(14 100 94)',
            200: 'hsl(14 100 88)',
            300: 'hsl(14 100 83)',
            400: 'hsl(14 100 77)',
            500: 'hsl(14 100 71)',
            600: 'hsl(14 54 57)',
            700: 'hsl(14 41 43)',
            800: 'hsl(14 41 28)',
            900: 'hsl(14 41 14)',
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
          sub4: "hsl(var(--background-sub4))"
        },
        notification: "hsl(var(--notification))",
      }
    }
  },
  plugins: [
    plugin(function({addUtilities}) {
      addUtilities(
        {
          '.dot-mask-lg': {
            mask: 'radial-gradient(circle 10.5px at calc(100% - 3px) calc(0% + 3px),#0000 98%,#000)',
            '-webkit-mask': 'radial-gradient(circle 10.5px at calc(100% - 3px) calc(0% + 3px),#0000 98%,#000)',
          },
          '.dot-mask-sm': {
            mask: 'radial-gradient(circle 8px at calc(100% - 2px) calc(0% + 2px),#0000 98%,#000)',
            '-webkit-mask': 'radial-gradient(circle 8px at calc(100% - 2px) calc(0% + 2px),#0000 98%,#000)',
          }
        }
      )
    })
  ],
};
export default config;
