"use client";

import Image from "next/image";
import { LifeBuoy, Phone, MessageCircle, MapPin } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import CloverMark from "./CloverMark";
import { useBookingModal } from "./BookingModalContext";

const DEFAULT_WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "51914507338";

const SOPORTE_URL =
  `https://wa.me/${DEFAULT_WHATSAPP}?text=` +
  encodeURIComponent("Hola, necesito ayuda con algo sobre el Hands-On de ADLIM Partners.");

const linkClass =
  "flex items-center gap-2 text-[13px] font-semibold text-white/75 transition-colors hover:text-white";

export default function Footer() {
  const { openModal } = useBookingModal();

  return (
    <footer className="relative overflow-hidden bg-navy">
      {/* fondo suave decorativo del prefooter */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <CloverMark
          color="rgba(255,255,255,0.06)"
          className="absolute -left-16 -top-10 h-[280px] w-[280px] sm:h-[360px] sm:w-[360px]"
        />
        <Image
          src="/brand/salud-femenina.png"
          alt=""
          width={324}
          height={327}
          className="absolute -right-10 top-[8%] h-[180px] w-[180px] opacity-[0.08] sm:h-[240px] sm:w-[240px]"
        />
      </div>

      {/* prefooter CTA — mismo fondo navy, acoplado visualmente al pie */}
      <ScrollReveal>
        <div className="relative mx-auto flex max-w-[720px] flex-col items-center gap-4 px-6 pb-10 pt-14 text-center sm:pt-16">
          <h3 className="font-display text-[22px] font-bold text-white sm:text-[26px]">
            ¿Listo para asegurar tu cupo?
          </h3>
          <p className="max-w-[440px] text-[14.5px] text-white/70">
            Cupos limitados. Regístrate ahora o escríbenos para resolver tus dudas.
          </p>
          <div className="mt-1 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => openModal()}
              className="inline-flex items-center justify-center rounded-full bg-orange px-6 py-3 text-[14px] font-bold text-white transition-transform hover:scale-[1.02]"
            >
              Inscribirme ahora
            </button>
            <a
              href={SOPORTE_URL}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-[14px] font-bold text-white/90 transition-colors hover:text-white"
            >
              <LifeBuoy className="h-4 w-4" strokeWidth={2.2} />
              Soporte y ayuda
            </a>
          </div>
        </div>
      </ScrollReveal>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-[1120px] flex-col items-center gap-3 px-6 py-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <Image src="/brand/adlim-logo-horizontal-white.png" alt="ADLIM Partners" width={3340} height={901} className="h-8 w-auto" />
          <span className="text-[12.5px] font-semibold text-white/70">
            Cirugía Estética Genital Femenina · Sistema FRAXX
          </span>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-[1120px] flex-col items-center gap-x-6 gap-y-2 px-6 py-4 text-center sm:flex-row sm:flex-wrap sm:justify-between sm:text-left">
          <span className={linkClass}>
            <MapPin className="h-4 w-4 text-orange" strokeWidth={1.8} />
            Lima - Perú
          </span>
          <div className="flex flex-col items-center gap-x-6 gap-y-2 sm:flex-row sm:flex-wrap">
            <a href={`https://wa.me/${DEFAULT_WHATSAPP}`} target="_blank" rel="noopener" className={linkClass}>
              <MessageCircle className="h-4 w-4 text-teal-soft" strokeWidth={1.8} />
              914 507 338
            </a>
            <a href="https://wa.me/51971165129" target="_blank" rel="noopener" className={linkClass}>
              <Phone className="h-4 w-4 text-teal-soft" strokeWidth={1.8} />
              971 165 129
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
