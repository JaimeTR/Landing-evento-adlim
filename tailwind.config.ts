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
        accent: "var(--accent)",
        "accent-2": "var(--accent-2)",
        "accent-deep": "var(--accent-deep)",
        gold: "var(--gold)",
        divider: "var(--divider)",
        panel: "var(--panel-bg)",
        "panel-strong": "var(--panel-bg-strong)",
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
