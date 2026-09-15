"use client";

export default function ThemeToggle() {
  function handleToggle() {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("fraxx-theme", next);
    } catch {
      // ignore storage errors (private mode, disabled storage)
    }
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label="Cambiar tema claro/oscuro"
      className="relative flex h-11 w-11 flex-none items-center justify-center rounded-xl border border-panel-border bg-panel transition-transform duration-200 [transition-timing-function:cubic-bezier(.16,1,.3,1)] hover:-translate-y-0.5"
    >
      <svg
        className="theme-icon icon-sun h-[19px] w-[19px] text-accent"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 3v2.2M12 18.8V21M4.2 12H2M22 12h-2.2M5.6 5.6l1.5 1.5M16.9 16.9l1.5 1.5M18.4 5.6l-1.5 1.5M7.1 16.9l-1.5 1.5" />
      </svg>
      <svg
        className="theme-icon icon-moon h-[19px] w-[19px] text-accent"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 14.3A8.5 8.5 0 1 1 9.7 4a7 7 0 0 0 10.3 10.3Z" />
      </svg>
    </button>
  );
}
