import type { Config } from "tailwindcss";

// We want each package to be responsible for its own content.
const config: Omit<Config, "content"> = {
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "hsl(var(--brand-primary))",
          secondary: "hsl(var(--brand-secondary))",
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
  plugins: [],
};
export default config;
