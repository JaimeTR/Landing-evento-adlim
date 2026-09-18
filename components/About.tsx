"use client";

import Image from "next/image";
import { Activity, ShieldCheck, Users } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import CloverMark from "./CloverMark";

const VALUES = [
  {
    title: "Prácticas en vivo",
    desc: "Sesión práctica con modelo biológico y hands-on real con pacientes del curso.",
    color: "teal",
    Icon: Activity,
  },
  {
    title: "Cupos limitados",
    desc: "Grupo reducido para garantizar atención directa del instructor en cada práctica.",
    color: "olive",
    Icon: Users,
  },
  {
    title: "Respaldo clínico",
    desc: "Anatomía, biofísica de tejidos y resolución de complicaciones, con base científica.",
    color: "orange",
    Icon: ShieldCheck,
  },
];

export default function About() {
  return (
    <div className="relative w-full py-16 sm:py-20">
      <div className="relative mx-auto max-w-[1120px] px-6">
        <ScrollReveal className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.4fr_0.6fr] lg:gap-14">
          {/* 40% — photo */}
          <div className="flex justify-center lg:h-full lg:justify-start">
            <div className="relative w-full max-w-[420px] lg:h-full lg:max-w-none">
              <div
                aria-hidden
                className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color-mix(in_srgb,var(--orange)_42%,transparent)] blur-3xl"
              />
              <div
                aria-hidden
                className="absolute left-1/2 top-[8%] h-[200px] w-[200px] -translate-x-[65%] rounded-full bg-[color-mix(in_srgb,var(--teal)_28%,transparent)] blur-3xl"
              />
              <div
                aria-hidden
                className="absolute bottom-[6%] right-1/2 h-[170px] w-[170px] translate-x-[55%] rounded-full bg-[color-mix(in_srgb,var(--olive)_20%,transparent)] blur-3xl"
              />
              <CloverMark className="absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 opacity-[0.14] blur-sm sm:h-[420px] sm:w-[420px]" />
              <Image
                src="/dr-marco-gaxiola-about.png"
                alt="Dr. Marco Gaxiola C."
                width={932}
                height={1355}
                className="relative z-10 h-auto w-full object-contain lg:h-full lg:w-auto lg:max-h-[560px]"
                style={{
                  maskImage: "linear-gradient(to bottom, black 82%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 82%, transparent 100%)",
                }}
              />
            </div>
          </div>

          {/* 60% — info + cards */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <h3 className="mb-0 font-display text-[46px] font-bold leading-tight tracking-[0.02em] text-ink">
              Dr. Marco Gaxiola C.{" "}
              <svg
                className="inline-block h-9 w-9 align-middle drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]"
                viewBox="0 0 40 40"
                role="img"
                aria-label="México"
              >
                <defs>
                  <clipPath id="mx-flag-circle">
                    <circle cx="20" cy="20" r="19" />
                  </clipPath>
                  <radialGradient id="mx-flag-sheen" cx="35%" cy="25%" r="75%">
                    <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
                    <stop offset="45%" stopColor="#fff" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#000" stopOpacity="0.12" />
                  </radialGradient>
                </defs>
                <g clipPath="url(#mx-flag-circle)">
                  <rect x="1" y="1" width="12.7" height="38" fill="#006341" />
                  <rect x="13.7" y="1" width="12.6" height="38" fill="#fff" />
                  <rect x="26.3" y="1" width="12.7" height="38" fill="#CE1126" />
                  <circle cx="20" cy="20" r="3.4" fill="#8B5A2B" />
                  <circle cx="20" cy="20" r="1.7" fill="#2E7D32" />
                  <circle cx="20" cy="20" r="19" fill="url(#mx-flag-sheen)" />
                </g>
                <circle cx="20" cy="20" r="18.5" fill="none" stroke="#fff" strokeOpacity="0.6" strokeWidth="1" />
              </svg>
            </h3>
            <p className="mb-3 text-[21.5px] font-bold uppercase tracking-[.6px] text-orange-ink">
              Ginecología Estética y Regenerativa
            </p>
            <p className="mb-5 text-[13px] leading-[20px] text-ink-faint">
              Ginecólogo y Obstetra · Profesor en diplomados especializados · Secretario de la WSCG ·
              Miembro activo de ISCG
            </p>
            <p className="mb-8 text-[14.5px] leading-[24px] text-ink-soft">
              Conduce el{" "}
              <b className="font-bold italic text-ink">
                1er Hands-On de Técnicas Avanzadas de Cirugía Estética Genital Femenina con el Sistema
                FRAXX en Perú
              </b>
              : historia y panorama de la ginecología estética, anatomía clínica aplicada, clasificación
              de variantes anatómicas, biofísica de tejidos vulvares, técnicas quirúrgicas y resolución de
              complicaciones — con práctica en vivo con pacientes.
            </p>

            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
              {VALUES.map((v) => (
                <div
                  key={v.title}
                  className="group rounded-[24px] border border-white/40 bg-white/25 px-5 py-6 text-left shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 dark:border-white/25 dark:bg-white/[0.16]"
                >
                  <div
                    className="icon-float mb-3.5 flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110"
                    style={{ background: `color-mix(in srgb, var(--${v.color}) 22%, transparent)` }}
                  >
                    <v.Icon className="h-5 w-5" style={{ color: `var(--${v.color})` }} strokeWidth={2.2} />
                  </div>
                  <h4 className="mb-2 text-lg font-bold leading-snug text-ink">{v.title}</h4>
                  <p className="text-[12.5px] leading-[19px] text-ink-faint">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
