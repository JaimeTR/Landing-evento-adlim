"use client";

import { useEffect, useState } from "react";
import { MapPin, Radio, Users2 } from "lucide-react";
import RegisterForm from "./RegisterForm";

export default function Hero() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const t1 = setTimeout(() => setStage(1), 80);
      const t2 = setTimeout(() => setStage(2), 220);
      const t3 = setTimeout(() => setStage(3), 420);
      const t4 = setTimeout(() => setStage(4), 560);
      return () => [t1, t2, t3, t4].forEach(clearTimeout);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      <div className="mx-auto w-full max-w-[1120px] px-6">
        <div className="grid grid-cols-1 items-center gap-9 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <div
              className={`fade-up ${stage >= 1 ? "in" : ""} mb-6 inline-flex items-center gap-2.5 rounded-full border border-panel-border bg-panel py-1.5 pl-4 pr-4`}
            >
              <span className="text-[12px] font-bold text-ink-soft">
                1er Hands-On por <span className="text-gold">ADLIM Partners</span>
              </span>
            </div>

            <h1 className="mb-3 font-display text-[clamp(30px,4.2vw,48px)] font-bold leading-[1.1] tracking-tight text-ink">
              <span className={`reveal-line ${stage >= 1 ? "in" : ""}`}>
                <span className="shine-text shine-line1">Técnicas Avanzadas de</span>
              </span>
              <span className={`reveal-line ${stage >= 2 ? "in" : ""}`}>
                <span className="shine-text shine-accent shine-line2">Cirugía Estética Genital Femenina</span>
              </span>
            </h1>

            <div
              className={`fade-up ${stage >= 2 ? "in" : ""} mb-5 inline-flex items-center rounded-full border border-panel-border bg-panel px-5 py-2`}
            >
              <span className="font-display text-[14.5px] font-bold text-ink">
                con el Sistema <span className="text-accent">FRAXX</span>
              </span>
            </div>

            <div className={`fade-up ${stage >= 3 ? "in" : ""} mb-6 flex items-center gap-3`}>
              <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-deep text-[14px] font-bold text-white">
                MG
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5 text-[14.5px] font-bold text-ink">
                  Dr. Marco Gaxiola C. <span aria-label="México">🇲🇽</span>
                </div>
                <div className="text-[12px] text-ink-faint">Ginecología Estética y Regenerativa</div>
              </div>
            </div>

            <p className={`fade-up ${stage >= 3 ? "in" : ""} mb-[26px] max-w-[520px] text-[15px] leading-[25px] text-ink-soft`}>
              Curso Hands-On con prácticas en vivo con pacientes: anatomía clínica aplicada, biofísica de
              tejidos vulvares, técnicas quirúrgicas y resolución de complicaciones. Cupos limitados.
            </p>

            <div className={`fade-up ${stage >= 4 ? "in" : ""} flex flex-wrap items-center justify-center gap-3 lg:justify-start`}>
              <span className="inline-flex items-center gap-2 rounded-full border border-panel-border bg-panel px-4 py-2 text-[12.5px] font-bold text-ink">
                <MapPin className="h-3.5 w-3.5 text-accent" strokeWidth={2.2} />
                Lima - Perú
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-panel-border bg-panel px-4 py-2 text-[12.5px] font-bold text-ink">
                <Radio className="h-3.5 w-3.5 text-accent" strokeWidth={2.2} />
                Prácticas en vivo
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-panel-border bg-panel px-4 py-2 text-[12.5px] font-bold text-ink">
                <Users2 className="h-3.5 w-3.5 text-accent" strokeWidth={2.2} />
                Cupos limitados
              </span>
            </div>
          </div>

          <div className="relative" id="form-section">
            <div className="panel px-6 py-8 sm:px-8 sm:py-9">
              <h2 className="mb-1.5 font-display text-[21px] font-bold text-ink">Reserva tu cupo</h2>
              <p className="mb-6 text-[13.5px] text-ink-soft">
                Completa tus datos y te contactamos por WhatsApp para coordinar el pago.
              </p>
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
