"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import { useBookingModal } from "./BookingModalContext";

const NAV_LINKS = [
  { id: "agenda", label: "Cronograma" },
  { id: "precios", label: "Inversión" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const { openModal } = useBookingModal();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
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
        <span className={`relative inline-block flex-none transition-all duration-300 ${scrolled ? "h-8 w-[120px] sm:w-[140px]" : "h-9 w-[150px] sm:h-11 sm:w-[190px]"}`}>
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
        <div className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`text-[13px] font-bold uppercase tracking-[.4px] transition-colors ${
                active === link.id ? "text-orange-ink" : "text-ink-soft hover:text-orange-ink"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3.5">
          <div className="hidden whitespace-nowrap text-[11.5px] font-bold uppercase tracking-[.8px] text-ink-soft md:block">
            <b className="text-orange-ink">12 nov.</b> · Lima, Perú
          </div>
          <button
            type="button"
            onClick={() => openModal()}
            className="inline-flex items-center rounded-full bg-orange px-4 py-2 text-[12px] font-bold uppercase tracking-[.4px] text-white transition-transform hover:scale-[1.03] sm:px-5 sm:text-[12.5px]"
          >
            Reservar
          </button>
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}
