import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        "ink-faint": "var(--ink-faint)",
        navy: "var(--navy)",
        teal: "var(--teal)",
        "teal-soft": "var(--teal-soft)",
        orange: "var(--orange)",
        "orange-ink": "var(--orange-ink)",
        amber: "var(--amber)",
        magenta: "var(--magenta)",
        olive: "var(--olive)",
        "olive-soft": "var(--olive-soft)",
        rose: "var(--rose)",
        accent: "var(--accent)",
        "accent-2": "var(--accent-2)",
        "accent-deep": "var(--accent-deep)",
        gold: "var(--gold)",
        divider: "var(--divider)",
        surface: "var(--surface)",
        "surface-soft": "var(--surface-soft)",
        panel: "var(--panel-bg)",
        "panel-border": "var(--panel-border)",
        "input-bg": "var(--input-bg)",
        "input-fg": "var(--input-fg)",
        "input-border": "var(--input-border)",
        ok: "var(--ok)",
        err: "var(--err)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
    },
  },
  plugins: [],
};

export default config;
