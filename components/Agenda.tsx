import ScrollReveal from "./ScrollReveal";

const AGENDA = [
  { time: "08:00 - 08:30", title: "Registro y bienvenida" },
  { time: "08:30 - 09:00", title: "Historia y panorama actual de la ginecología estética", speaker: "Dr. Marco Antonio Gaxiola Cueto" },
  { time: "09:00 - 09:30", title: "Anatomía clínica aplicada a cirugía estética genital femenina", speaker: "Dr. Marco Antonio Gaxiola Cueto" },
  {
    time: "09:30 - 10:00",
    title: "Clasificación de las variantes anatómicas del área genital: labios menores, labios mayores, clítoris",
    speaker: "Dr. Marco Antonio Gaxiola Cueto",
  },
  {
    time: "10:00 - 10:30",
    title: "Biofísica de los tejidos vulvares del sistema FRAXX y diferentes técnicas quirúrgicas",
    speaker: "Dr. Marco Antonio Gaxiola Cueto",
  },
  { time: "10:30 - 11:00", title: "Resolución de complicaciones", speaker: "Dr. Marco Antonio Gaxiola Cueto" },
  { time: "11:00 - 11:30", title: "Sistema fraccionado en territorio nacional (Perú)", speaker: "Dra. Katia Camacho" },
  { time: "11:30 - 12:00", title: "Sesión práctica con modelo biológico", speaker: "Dr. Marco Antonio Gaxiola Cueto" },
  { time: "12:00 - 12:30", title: "Lunch Break" },
  { time: "13:00 - 19:00", title: "Hands on: práctica con pacientes", speaker: "Dr. Marco Antonio Gaxiola Cueto" },
  { time: "19:00", title: "Clausura del curso" },
];

export default function Agenda() {
  return (
    <div className="w-full" id="agenda">
      <div className="mx-auto max-w-[1120px] px-6">
        <ScrollReveal>
          <div className="mb-8 text-center">
            <h2 className="mb-2 font-display text-[28px] font-bold text-ink sm:text-[32px]">Programa</h2>
            <p className="text-[14.5px] text-ink-soft">Jueves 12 de noviembre de 2026.</p>
          </div>

          <div className="panel px-5 py-3 sm:px-7 sm:py-5">
            {AGENDA.map((item, i) => (
              <div
                key={item.time + item.title}
                className={`flex flex-col gap-1 py-4 sm:flex-row sm:items-start sm:gap-6 ${
                  i !== AGENDA.length - 1 ? "border-b border-divider" : ""
                }`}
              >
                <div className="flex-none text-[12.5px] font-bold uppercase tracking-[.6px] text-accent sm:w-[130px]">
                  {item.time}
                </div>
                <div>
                  <div className="text-[14px] font-semibold text-ink">{item.title}</div>
                  {item.speaker && <div className="mt-0.5 text-[12.5px] text-ink-faint">{item.speaker}</div>}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
