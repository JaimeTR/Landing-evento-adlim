"use client";

import { Stethoscope, Users2, ShieldCheck } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const VALUES = [
  {
    title: "Prácticas en vivo",
    desc: "Sesión práctica con modelo biológico y hands-on real con pacientes durante el curso.",
    icon: Stethoscope,
  },
  {
    title: "Cupos limitados",
    desc: "Grupo reducido para garantizar atención directa del instructor en cada práctica.",
    icon: Users2,
  },
  {
    title: "Respaldo clínico",
    desc: "Anatomía, biofísica de tejidos y resolución de complicaciones, con base científica.",
    icon: ShieldCheck,
  },
];

export default function About() {
  return (
    <div className="w-full">
      <div className="mx-auto max-w-[1120px] px-6">
        <ScrollReveal className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="mb-5 flex h-20 w-20 flex-none items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-deep text-[22px] font-bold text-white">
              MG
            </div>
            <h3 className="mb-1.5 font-display text-[24px] font-bold text-ink">
              Dr. Marco Gaxiola C. <span aria-label="México">🇲🇽</span>
            </h3>
            <p className="mb-4 text-[13.5px] font-bold uppercase tracking-[.6px] text-accent">
              Ginecología Estética y Regenerativa
            </p>
            <p className="text-[14.5px] leading-[24px] text-ink-soft">
              Conduce el 1er Hands-On de Técnicas Avanzadas de Cirugía Estética Genital Femenina con el
              Sistema FRAXX en Perú: historia y panorama de la ginecología estética, anatomía clínica
              aplicada, clasificación de variantes anatómicas, biofísica de tejidos vulvares, técnicas
              quirúrgicas y resolución de complicaciones — con práctica en vivo con pacientes.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {VALUES.map((v, i) => (
              <div
                key={v.title}
                className="panel group px-5 py-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-16px_var(--panel-shadow)]"
              >
                <div
                  className="icon-float mb-3.5 flex h-11 w-11 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] transition-colors duration-300 group-hover:bg-[color-mix(in_srgb,var(--accent)_22%,transparent)]"
                  style={{ animationDelay: `${i * 0.25}s` }}
                >
                  <v.icon className="h-5 w-5 text-accent transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110" strokeWidth={1.8} />
                </div>
                <h4 className="mb-2 text-lg font-bold leading-snug text-ink">{v.title}</h4>
                <p className="text-[12.5px] leading-[19px] text-ink-faint">{v.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
