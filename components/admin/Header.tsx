"use client";

import ThemeToggle from "@/components/ThemeToggle";

export default function Header({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-divider bg-[var(--nav-bg)] px-6 py-4 backdrop-blur-xl">
      <div>
        <h1 className="font-display text-[19px] font-bold text-ink">{title}</h1>
        {subtitle && <p className="mt-0.5 text-[12.5px] text-ink-faint">{subtitle}</p>}
      </div>
      <ThemeToggle />
    </header>
  );
}
