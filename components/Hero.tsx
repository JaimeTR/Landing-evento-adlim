"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CalendarDays, MapPin } from "lucide-react";
import RegisterForm from "./RegisterForm";
import CloverMark from "./CloverMark";
import FlechaMark from "./FlechaMark";

const glassPill =
  "inline-flex items-center gap-2.5 rounded-full border px-5 py-3 text-[14.5px] font-bold text-ink backdrop-blur-md";
const glassPillStyle = {
  borderColor: "color-mix(in srgb, var(--ink) 16%, transparent)",
  background: "color-mix(in srgb, var(--ink) 6%, transparent)",
};

export default function Hero() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const t1 = setTimeout(() => setStage(1), 80);
      const t2 = setTimeout(() => setStage(2), 260);
      const t3 = setTimeout(() => setStage(3), 440);
      return () => [t1, t2, t3].forEach(clearTimeout);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="relative w-full overflow-hidden pb-14 pt-20 sm:pb-20 sm:pt-28">
      <Image
        src="/brand/salud-femenina.png"
        alt=""
        aria-hidden
        width={324}
        height={327}
        className="pointer-events-none absolute right-[6%] top-[8%] h-20 w-20 opacity-[0.5] sm:h-28 sm:w-28"
      />
      <div className="relative mx-auto w-full max-w-[1120px] px-6">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          {/* Copy column */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className={`fade-up ${stage >= 1 ? "in" : ""} mb-4 flex flex-wrap items-center justify-center gap-2.5 lg:justify-start`}>
              <span
                className={glassPill}
                style={{
                  borderColor: "color-mix(in srgb, var(--ink) 10%, transparent)",
                  background: "color-mix(in srgb, var(--surface) 55%, transparent)",
                }}
              >
                <CalendarDays className="h-4 w-4 flex-none text-amber" strokeWidth={2.2} />
                12 NOV.
                <span className="mx-0.5 h-3.5 w-px bg-[color-mix(in_srgb,var(--ink)_18%,transparent)]" />
                <MapPin className="h-4 w-4 flex-none text-orange" strokeWidth={2.2} />
                LIMA PE
                <svg className="h-3.5 w-5 flex-none rounded-[2px]" viewBox="0 0 30 20" role="img" aria-label="Perú">
                  <rect width="30" height="20" fill="#fff" />
                  <rect width="9" height="20" fill="#D91023" />
                  <rect x="21" width="9" height="20" fill="#D91023" />
                </svg>
              </span>
            </div>

            <h1 className="mb-6 font-display leading-[1.05] tracking-tight text-ink">
              <span className={`reveal-line ${stage >= 1 ? "in" : ""}`}>
                <span className="shine-text block text-[clamp(28px,4.6vw,48px)] font-normal">
                  Técnicas avanzadas de
                </span>
              </span>
              <span className={`reveal-line ${stage >= 1 ? "in" : ""}`}>
                <span
                  className="shine-text block text-[clamp(32px,5.4vw,55px)] font-bold uppercase tracking-[0.05em]"
                  style={{ animationDelay: "1.2s" }}
                >
                  Cirugía Estética Genital Femenina
                </span>
              </span>
              <span className={`reveal-line ${stage >= 2 ? "in" : ""}`}>
                <span className="block text-[clamp(28px,4.6vw,48px)] font-normal text-ink">
                  con el sistema{" "}
                  <span
                    className="shine-text text-[clamp(32px,5.4vw,55px)] font-bold uppercase tracking-[0.05em]"
                    style={{ animationDelay: "1.5s", ["--shine-base" as string]: "var(--orange)" }}
                  >
                    FRAXX
                  </span>
                </span>
              </span>
            </h1>

            <p className={`fade-up ${stage >= 2 ? "in" : ""} mb-6 max-w-[600px] text-[15px] leading-[25px] text-ink-soft`}>
              1er Hands-On de <b className="text-ink">ADLIM Partners</b>: práctica en vivo con
              pacientes, anatomía clínica aplicada, biofísica de tejidos vulvares, técnicas
              quirúrgicas y resolución de complicaciones. Cupos limitados.
            </p>

            <div className={`fade-up ${stage >= 3 ? "in" : ""} mb-5 flex flex-wrap items-center justify-center gap-2.5 lg:justify-start`}>
              <span
                className="inline-flex items-center gap-1 rounded-full border px-4 py-2 text-[13.5px] font-bold text-ink backdrop-blur-md"
                style={glassPillStyle}
              >
                <FlechaMark className="h-4 w-4 flex-none" />
                Prácticas en vivo
              </span>
              <span
                className="inline-flex items-center gap-1 rounded-full border px-4 py-2 text-[13.5px] font-bold text-ink backdrop-blur-md"
                style={glassPillStyle}
              >
                <FlechaMark className="h-4 w-4 flex-none" />
                Cupos limitados
              </span>
            </div>
          </div>

          {/* Form column */}
          <div className={`fade-up ${stage >= 2 ? "in" : ""} relative`} id="form-section">
            <CloverMark className="pointer-events-none absolute -bottom-12 -right-12 z-0 h-32 w-32 opacity-[0.18]" />
            <div className="panel relative z-10 px-6 py-7 sm:px-7 sm:py-8">
              <h2 className="shine-text mb-1.5 text-center font-display text-[20px] font-normal uppercase tracking-[0.03em] sm:text-left">Reserva tu cupo</h2>
              <p className="mb-6 text-center text-[13.5px] text-ink-soft sm:text-left">Completa tus datos y te contactamos</p>
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
