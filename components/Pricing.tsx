"use client";

import { CreditCard } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import FlechaMark from "./FlechaMark";
import { useBookingModal } from "./BookingModalContext";
import type { TipoParticipacion } from "@/lib/supabase/leads";

const PLANS: Array<{
  segmento: string;
  detalle: string;
  rf: string;
  tiers: Array<{ label: string; price: string }>;
  featured: boolean;
  tipo: TipoParticipacion;
}> = [
  {
    segmento: "Hands-On",
    detalle: "Práctica quirúrgica con pacientes",
    rf: "$1,000.00",
    tiers: [
      { label: "Lanzamiento", price: "$1,000.00" },
      { label: "Preventa", price: "$1,150.00" },
      { label: "Precio regular", price: "$1,300.00" },
    ],
    featured: true,
    tipo: "hands-on",
  },
  {
    segmento: "Live Observer",
    detalle: "Transmisión audiovisual en vivo",
    rf: "$250.00",
    tiers: [
      { label: "Lanzamiento", price: "$280.00" },
      { label: "Preventa", price: "$300.00" },
      { label: "Precio regular", price: "$350.00" },
    ],
    featured: false,
    tipo: "live-observer",
  },
];

const NOTES = [
  { label: "Lanzamiento", desc: "hasta el 30 de setiembre" },
  { label: "Preventa", desc: "del 1 al 20 de octubre" },
  { label: "Precio regular", desc: "a partir del 21 de octubre" },
  { label: "Precio especial RF", desc: "para usuarios de equipos RF Loktal, válido hasta el día previo al Hands-On" },
];

function getVigenteLabel(): string {
  const now = new Date();
  const y = now.getFullYear();
  // Mismas fechas que NOTES: lanzamiento hasta el 30 de setiembre,
  // preventa del 1 al 20 de octubre, regular desde el 21 de octubre.
  if (now <= new Date(y, 8, 30, 23, 59, 59)) return "Lanzamiento";
  if (now <= new Date(y, 9, 20, 23, 59, 59)) return "Preventa";
  return "Precio regular";
}

export default function Pricing() {
  const { openModal } = useBookingModal();
  const vigente = getVigenteLabel();

  return (
    <div className="w-full" id="precios">
      <div className="mx-auto max-w-[1120px] px-6">
        <ScrollReveal>
          <div className="mb-10 text-center">
            <div className="mb-3 flex items-center justify-center gap-3">
              <h2 className="font-display text-[42px] font-bold tracking-[0.02em] text-ink sm:text-[50px]">
                Inversión
              </h2>
              <CreditCard className="h-8 w-8 text-orange" strokeWidth={2.2} />
            </div>
            <p className="text-[14.5px] text-ink-soft">Precio según tu fecha de inscripción. Hoy rige: <b className="text-ink">{vigente}</b>.</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {PLANS.map((plan) => (
            <ScrollReveal key={plan.segmento}>
              <div
                className={`panel relative flex h-full flex-col px-6 py-7 sm:px-7 ${
                  plan.featured ? "ring-2 ring-orange" : ""
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-6 rounded-full bg-orange px-3 py-1 text-[11px] font-bold uppercase tracking-[.6px] text-[#19203a]">
                    Más elegido
                  </span>
                )}

                <div className="mb-5">
                  <div className="font-display text-[20px] font-bold text-ink">{plan.segmento}</div>
                  <div className="text-[13px] text-ink-faint">{plan.detalle}</div>
                </div>

                <div className="mb-5 flex flex-col gap-2 border-t border-divider pt-5">
                  {plan.tiers.map((t) => {
                    const isVigente = t.label === vigente;
                    return (
                      <div
                        key={t.label}
                        className={`flex items-center justify-between rounded-lg px-2 py-1 text-[13.5px] ${
                          isVigente ? "bg-[color-mix(in_srgb,var(--teal)_10%,transparent)]" : ""
                        }`}
                      >
                        <span className="text-ink-soft">
                          {t.label}
                          {isVigente && (
                            <span className="ml-2 rounded-full bg-teal px-2 py-0.5 text-[10px] font-bold uppercase tracking-[.5px] text-[#19203a]">
                              Hoy
                            </span>
                          )}
                        </span>
                        <span className="font-semibold text-ink">{t.price}</span>
                      </div>
                    );
                  })}
                  <div className="mt-1 flex items-center justify-between rounded-xl bg-[color-mix(in_srgb,var(--orange)_10%,transparent)] px-3 py-2 text-[13.5px]">
                    <span className="font-bold text-orange-ink">Especial · Usuarios RF Loktal</span>
                    <span className="font-bold text-orange-ink">{plan.rf}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => openModal(plan.tipo)}
                  className="mt-auto inline-flex items-center justify-center rounded-full bg-navy px-5 py-3 text-[14px] font-bold text-white transition-transform hover:scale-[1.02]"
                >
                  Reservar mi cupo
                </button>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {NOTES.map((n) => (
              <div
                key={n.label}
                className="flex items-start gap-2.5 rounded-2xl border border-divider bg-[color-mix(in_srgb,var(--surface)_60%,transparent)] px-4 py-3"
              >
                <FlechaMark className="mt-0.5 h-4 w-4 flex-none" />
                <div className="text-[12.5px] leading-[18px] text-ink-faint">
                  <span className="font-bold text-ink-soft">{n.label}:</span> {n.desc}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
