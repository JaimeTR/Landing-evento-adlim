import Image from "next/image";
import { CalendarDays, Coffee, DoorOpen, FlagTriangleRight, Mic, Stethoscope } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import CloverMark from "./CloverMark";

const AGENDA = [
  { time: "08:00 - 08:30", title: "Registro y bienvenida", type: "registro" },
  {
    time: "08:30 - 09:00",
    title: "Historia y panorama actual de la ginecología estética",
    speaker: "Dr. Marco Antonio Gaxiola Cueto",
    type: "charla",
  },
  {
    time: "09:00 - 09:30",
    title: "Anatomía clínica aplicada a cirugía estética genital femenina",
    speaker: "Dr. Marco Antonio Gaxiola Cueto",
    type: "charla",
  },
  {
    time: "09:30 - 10:00",
    title: "Clasificación de variantes anatómicas genitales",
    speaker: "Dr. Marco Antonio Gaxiola Cueto",
    type: "charla",
  },
  {
    time: "10:00 - 10:30",
    title: "Biofísica de tejidos vulvares y técnicas quirúrgicas FRAXX",
    speaker: "Dr. Marco Antonio Gaxiola Cueto",
    type: "charla",
  },
  {
    time: "10:30 - 11:00",
    title: "Resolución de complicaciones",
    speaker: "Dr. Marco Antonio Gaxiola Cueto",
    type: "charla",
  },
  {
    time: "11:00 - 11:30",
    title: "Sistema fraccionado en territorio nacional (Perú)",
    speaker: "Dra. Katia Camacho",
    type: "charla",
  },
  {
    time: "11:30 - 12:00",
    title: "Sesión práctica con modelo biológico",
    speaker: "Dr. Marco Antonio Gaxiola Cueto",
    type: "practica",
  },
  { time: "12:00 - 12:30", title: "Lunch Break", speaker: "Pausa para almorzar y networking entre colegas", type: "break" },
  {
    time: "13:00 - 19:00",
    title: "Hands on: práctica con pacientes",
    speaker: "Dr. Marco Antonio Gaxiola Cueto",
    type: "practica",
  },
  { time: "19:00", title: "Clausura del curso", type: "cierre" },
];

const TYPE_STYLES: Record<string, { color: string; Icon: typeof Mic }> = {
  registro: { color: "amber", Icon: DoorOpen },
  charla: { color: "teal", Icon: Mic },
  practica: { color: "orange", Icon: Stethoscope },
  break: { color: "olive", Icon: Coffee },
  cierre: { color: "navy-fg", Icon: FlagTriangleRight },
};

export default function Agenda() {
  return (
    <div className="relative w-full overflow-hidden" id="agenda">
      {/* Decorative watermarks — only 2, far apart (top vs bottom of this long section), large and bled off the edge */}
      <CloverMark className="pointer-events-none absolute -left-24 top-[2%] h-52 w-52 opacity-[0.11] drop-shadow-sm sm:-left-28 sm:h-72 sm:w-72" />
      <Image
        src="/brand/salud-femenina.png"
        alt=""
        width={324}
        height={327}
        className="pointer-events-none absolute -right-24 bottom-[2%] h-52 w-52 opacity-[0.2] drop-shadow-sm sm:-right-28 sm:h-72 sm:w-72"
      />

      <div className="relative mx-auto max-w-[720px] px-6">
        <ScrollReveal className="mb-10 text-center">
          <div className="mb-3 flex items-center justify-center gap-3">
            <h2 className="font-display text-[42px] font-bold tracking-[0.02em] text-ink sm:text-[50px]">
              Cronograma
            </h2>
            <CalendarDays className="h-8 w-8 text-orange" strokeWidth={2.2} />
          </div>
          <p className="text-[14.5px] text-ink-soft">Jueves 12 de noviembre de 2026.</p>
        </ScrollReveal>

        <div className="relative">
          <div
            aria-hidden
            className="absolute bottom-5 left-[19px] top-5 border-l-[3px] border-dotted border-orange sm:left-[23px]"
          />
          <div className="flex flex-col gap-4">
            {AGENDA.map((item) => {
              const { color, Icon } = TYPE_STYLES[item.type];
              return (
                <ScrollReveal key={item.time + item.title} className="relative flex items-center gap-4 sm:gap-5">
                  <div
                    className="relative z-10 flex h-10 w-10 flex-none items-center justify-center rounded-full border-2 bg-surface sm:h-12 sm:w-12"
                    style={{ borderColor: `var(--${color})` }}
                  >
                    <Icon className="h-[18px] w-[18px] sm:h-5 sm:w-5" style={{ color: `var(--${color})` }} strokeWidth={2.2} />
                  </div>

                  <div className="panel flex-1 px-5 py-4 sm:px-6">
                    <div
                      className="text-[13.5px] font-bold uppercase tracking-[.6px]"
                      style={{ color: `var(--${color})` }}
                    >
                      {item.time}
                    </div>
                    <div className="mt-0.5 text-[14px] font-semibold leading-snug text-ink">{item.title}</div>
                    {item.speaker && <div className="mt-1 text-[12.5px] text-ink-faint">{item.speaker}</div>}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
