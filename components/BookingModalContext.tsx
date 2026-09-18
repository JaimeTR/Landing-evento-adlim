"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { X } from "lucide-react";
import type { TipoParticipacion } from "@/lib/supabase/leads";
import RegisterForm from "./RegisterForm";

type Ctx = { openModal: (tipo?: TipoParticipacion) => void };
const BookingModalContext = createContext<Ctx | null>(null);

export function useBookingModal() {
  const ctx = useContext(BookingModalContext);
  if (!ctx) throw new Error("useBookingModal must be used within BookingModalProvider");
  return ctx;
}

export default function BookingModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [tipo, setTipo] = useState<TipoParticipacion | undefined>(undefined);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  function openModal(t?: TipoParticipacion) {
    setTipo(t);
    setOpen(true);
  }

  return (
    <BookingModalContext.Provider value={{ openModal }}>
      {children}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Reserva tu cupo"
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[color-mix(in_srgb,var(--ink)_55%,transparent)] px-4 py-8 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="panel relative w-full max-w-[560px] px-6 py-7 sm:px-8 sm:py-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-ink-faint transition-colors hover:bg-[color-mix(in_srgb,var(--ink)_8%,transparent)] hover:text-ink"
            >
              <X className="h-5 w-5" strokeWidth={2.2} />
            </button>
            <h2 className="shine-text mb-1.5 font-display text-[20px] font-normal uppercase tracking-[0.03em]">
              Reserva tu cupo
            </h2>
            <p className="mb-6 text-[13.5px] text-ink-soft">Completa tus datos y te contactamos</p>
            <RegisterForm key={tipo ?? "default"} defaultTipoParticipacion={tipo} />
          </div>
        </div>
      )}
    </BookingModalContext.Provider>
  );
}
