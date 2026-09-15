import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  return (
    <nav className="sticky top-0 z-40 border-b border-divider bg-[var(--nav-bg)] backdrop-blur-2xl backdrop-saturate-150 transition-colors duration-300">
      <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-4 px-6 py-3">
        <span className="font-display text-[17px] font-bold uppercase tracking-[1px] text-ink">
          ADLIM <span className="text-accent">Partners</span>
        </span>
        <div className="flex items-center gap-3.5">
          <div className="hidden whitespace-nowrap text-[11.5px] font-bold uppercase tracking-[.8px] text-ink-soft md:block">
            <b className="text-gold">12 nov.</b> · Lima, Perú
          </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
