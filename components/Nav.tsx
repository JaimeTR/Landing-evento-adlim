"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`sticky top-0 z-40 flex justify-center transition-[padding] duration-300 ${scrolled ? "px-4 pt-3" : "px-0 pt-0"}`}>
      <nav
        className={`flex w-full items-center justify-between gap-4 border transition-all duration-300 ${
          scrolled
            ? "max-w-[760px] rounded-full px-6 py-2.5 shadow-[0_8px_32px_rgba(34,56,111,0.16)] backdrop-blur-xl"
            : "max-w-[1120px] rounded-none border-x-0 border-t-0 px-6 py-3"
        }`}
        style={{
          borderColor: scrolled ? "color-mix(in srgb, var(--ink) 12%, transparent)" : "var(--divider)",
          background: scrolled ? "color-mix(in srgb, var(--nav-bg) 65%, transparent)" : "var(--nav-bg)",
        }}
      >
        <span className={`relative inline-block transition-all duration-300 ${scrolled ? "h-8 w-[140px]" : "h-11 w-[190px]"}`}>
          <Image
            src="/brand/adlim-logo-horizontal.png"
            alt="ADLIM Partners"
            width={3340}
            height={901}
            priority
            className="absolute inset-y-0 left-0 h-full w-auto dark:hidden"
          />
          <Image
            src="/brand/adlim-logo-horizontal-white.png"
            alt="ADLIM Partners"
            width={3340}
            height={901}
            priority
            className="absolute inset-y-0 left-0 hidden h-full w-auto dark:block"
          />
        </span>
        <div className="flex items-center gap-3.5">
          <div className="hidden whitespace-nowrap text-[11.5px] font-bold uppercase tracking-[.8px] text-ink-soft md:block">
            <b className="text-orange">12 nov.</b> · Lima, Perú
          </div>
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}
