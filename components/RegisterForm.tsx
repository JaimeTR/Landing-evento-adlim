"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ChevronsRight, MessageCircle } from "lucide-react";
import confetti from "canvas-confetti";
import { insertLead, type TipoParticipacion } from "@/lib/supabase/leads";

const WHATSAPP_NUMBER = "51914507338";

const PARTICIPACION_OPTIONS: Array<{ value: TipoParticipacion; label: string; desc: string }> = [
  { value: "hands-on", label: "Hands-On", desc: "Práctica quirúrgica en vivo" },
  { value: "live-observer", label: "Live Observer", desc: "Transmisión audiovisual" },
];

type Status = "idle" | "sending" | "error";
type Phase = "idle" | "exiting" | "entering";

const STEPS = [
  { key: "sobre-ti", label: "Sobre ti" },
  { key: "participacion", label: "Participación" },
  { key: "contacto", label: "Contacto" },
] as const;

const inputClass =
  "w-full rounded-xl border border-input-border bg-input-bg px-3.5 py-[13.5px] text-[14.5px] text-ink placeholder:text-ink-faint transition-colors duration-150 hover:border-[color-mix(in_srgb,var(--accent)_55%,var(--input-border))] focus:border-accent focus:outline-none focus:shadow-[0_0_0_4px_color-mix(in_srgb,var(--accent)_16%,transparent)]";
const labelClass = "mb-1.5 block text-[12.5px] font-bold text-ink";

function buildWhatsappMessage(data: {
  nombres: string;
  apellido: string;
  especialidad: string;
  tipoParticipacion: TipoParticipacion;
  usaRf: boolean;
  pais: string;
  telefono: string;
  email: string;
}) {
  const tipoLabel = data.tipoParticipacion === "hands-on" ? "Hands-On (práctica quirúrgica)" : "Live Observer (transmisión audiovisual)";
  const lines = [
    `Hola, soy *${data.nombres} ${data.apellido}* y quiero inscribirme al curso *Técnicas Avanzadas de Cirugía Estética Genital Femenina - Sistema FRAXX* (12 nov., Lima - Perú).`,
    "",
    `Especialidad: ${data.especialidad}`,
    `País: ${data.pais}`,
    `Tipo de participación: ${tipoLabel}`,
    `¿Uso equipos de RF?: ${data.usaRf ? "Sí" : "No"}`,
    `Teléfono: ${data.telefono}`,
    `Email: ${data.email}`,
    "",
    "Quedo atento(a) a las indicaciones para procesar mi pago.",
  ];
  return lines.join("\n");
}

export default function RegisterForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [status, setStatus] = useState<Status>("idle");
  const [submitted, setSubmitted] = useState(false);
  const [waLink, setWaLink] = useState<string>("");

  const isLastStep = stepIndex === STEPS.length - 1;

  function fieldsForStep(step: number): string[] {
    if (step === 0) return ["nombres", "apellido", "especialidad"];
    if (step === 1) return ["tipo_participacion", "usa_rf"];
    return ["pais", "telefono", "email"];
  }

  function validateStep(step: number): boolean {
    const form = formRef.current;
    if (!form) return false;
    for (const name of fieldsForStep(step)) {
      const el = form.elements.namedItem(name);
      if (el instanceof RadioNodeList) {
        const radios = Array.from(el) as HTMLInputElement[];
        if (!radios.some((r) => r.checked)) {
          radios[0]?.reportValidity();
          return false;
        }
        continue;
      }
      if (el && !(el as HTMLInputElement | HTMLSelectElement).checkValidity()) {
        (el as HTMLInputElement | HTMLSelectElement).reportValidity();
        return false;
      }
    }
    return true;
  }

  function goNext() {
    if (!validateStep(stepIndex)) return;
    if (phase !== "idle") return;

    setPhase("exiting");
    window.setTimeout(() => {
      setStepIndex((s) => Math.min(s + 1, STEPS.length - 1));
      setPhase("entering");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setPhase("idle"));
      });
    }, 460);
  }

  function goBack() {
    if (stepIndex === 0 || phase !== "idle") return;
    setStepIndex((s) => Math.max(s - 1, 0));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isLastStep) {
      goNext();
      return;
    }

    const form = formRef.current;
    if (!form) return;

    const honeypot = (form.elements.namedItem("campo_extra") as HTMLInputElement).value;
    if (honeypot) return;

    if (!validateStep(stepIndex)) return;

    const data = new FormData(form);
    const payload = {
      nombres: String(data.get("nombres") || "").trim(),
      apellido: String(data.get("apellido") || "").trim(),
      especialidad: String(data.get("especialidad") || "").trim(),
      tipoParticipacion: (String(data.get("tipo_participacion") || "hands-on")) as TipoParticipacion,
      usaRf: String(data.get("usa_rf") || "") === "si",
      pais: String(data.get("pais") || "").trim(),
      telefono: String(data.get("telefono") || "").trim(),
      email: String(data.get("email") || "").trim(),
    };

    setStatus("sending");

    const { error } = await insertLead({
      nombres: payload.nombres,
      apellido: payload.apellido,
      especialidad: payload.especialidad,
      tipo_participacion: payload.tipoParticipacion,
      usa_rf: payload.usaRf,
      pais: payload.pais,
      telefono: payload.telefono,
      email: payload.email,
      origen: "landing-webinar-fraxx",
    });

    if (error) {
      console.error(error);
      setStatus("error");
      return;
    }

    const message = buildWhatsappMessage(payload);
    const link = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    setWaLink(link);
    window.open(link, "_blank", "noopener");

    setSubmitted(true);
  }

  useEffect(() => {
    if (!submitted) return;
    const colors = ["#ff3fa6", "#ff7a3d", "#7b1fb0"];
    confetti({ particleCount: 90, spread: 70, startVelocity: 42, origin: { x: 0.3, y: 0.6 }, colors });
    confetti({ particleCount: 90, spread: 70, startVelocity: 42, origin: { x: 0.7, y: 0.6 }, colors });
  }, [submitted]);

  if (submitted) {
    return (
      <div className="px-2 py-4 text-center">
        <div className="relative mx-auto mb-[18px] flex h-16 w-16 items-center justify-center">
          <span className="success-ring absolute inset-0 rounded-full border-2 border-accent" />
          <span className="success-ring success-ring-delay absolute inset-0 rounded-full border-2 border-accent" />
          <div className="success-icon relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-2 shadow-[0_12px_26px_-8px_rgba(255,63,166,0.5)]">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
              <path
                className="success-check"
                d="M4 12.5L9.5 18L20 6"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <h3 className="mb-2 font-display text-[21px] font-bold text-ink">¡Registro recibido!</h3>
        <p className="mb-5 text-sm leading-[22px] text-ink-soft">
          Abrimos WhatsApp con tus datos para que coordines el pago de tu cupo. Si no se abrió
          automáticamente, usa el botón de abajo.
        </p>
        <a
          href={waLink}
          target="_blank"
          rel="noopener"
          className="inline-flex w-full items-center justify-center gap-2.5 rounded-[14px] bg-gradient-to-br from-accent to-accent-deep px-8 py-[15px] text-[14px] font-bold uppercase tracking-wide text-white shadow-[0_14px_30px_-10px_rgba(255,63,166,0.5)] transition-transform duration-200 hover:-translate-y-0.5"
        >
          <MessageCircle className="h-[18px] w-[18px]" strokeWidth={2.2} />
          Abrir WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate>
      {/* Step progress */}
      <div className="mb-7 flex items-center gap-2.5">
        {STEPS.map((step, i) => (
          <div key={step.key} className="flex flex-1 flex-col gap-2">
            <div
              className={`h-1.5 rounded-full transition-colors duration-500 ${
                i <= stepIndex ? "bg-accent" : "bg-divider"
              }`}
            />
            <span
              className={`text-[10.5px] font-bold uppercase tracking-[1.2px] transition-colors duration-300 ${
                i === stepIndex ? "text-ink" : "text-ink-faint"
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>

      <div
        className="transition-all duration-[420ms]"
        style={{
          transform: phase === "exiting" ? "translateX(-24px)" : phase === "entering" ? "translateX(24px)" : "translateX(0)",
          opacity: phase === "idle" ? 1 : 0,
          transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
        }}
      >
        {stepIndex === 0 && (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="mb-[18px]">
                <label htmlFor="nombres" className={labelClass}>
                  Nombres *
                </label>
                <input
                  id="nombres"
                  name="nombres"
                  type="text"
                  required
                  autoComplete="given-name"
                  placeholder="Ej. María"
                  className={inputClass}
                />
              </div>
              <div className="mb-[18px]">
                <label htmlFor="apellido" className={labelClass}>
                  Apellido *
                </label>
                <input
                  id="apellido"
                  name="apellido"
                  type="text"
                  required
                  autoComplete="family-name"
                  placeholder="Ej. Fernández"
                  className={inputClass}
                />
              </div>
            </div>
            <div className="mb-[18px]">
              <label htmlFor="especialidad" className={labelClass}>
                Especialidad / Profesión *
              </label>
              <input
                id="especialidad"
                name="especialidad"
                type="text"
                required
                placeholder="Ej. Ginecología Estética"
                className={inputClass}
              />
            </div>
          </>
        )}

        {stepIndex === 1 && (
          <>
            <div className="mb-[18px]">
              <label className={labelClass}>Tipo de participación *</label>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {PARTICIPACION_OPTIONS.map((opt) => (
                  <label
                    key={opt.value}
                    className="flex cursor-pointer flex-col rounded-xl border border-input-border bg-input-bg px-4 py-3 transition-colors has-[:checked]:border-accent has-[:checked]:shadow-[0_0_0_3px_color-mix(in_srgb,var(--accent)_18%,transparent)]"
                  >
                    <input
                      type="radio"
                      name="tipo_participacion"
                      value={opt.value}
                      required
                      defaultChecked={opt.value === "hands-on"}
                      className="sr-only"
                    />
                    <span className="text-[13.5px] font-bold text-ink">{opt.label}</span>
                    <span className="text-[11.5px] text-ink-faint">{opt.desc}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="mb-[18px]">
              <label htmlFor="usa_rf" className={labelClass}>
                ¿Usas equipos de radiofrecuencia (RF)? *
              </label>
              <select id="usa_rf" name="usa_rf" required defaultValue="" className={`themed-select ${inputClass}`}>
                <option value="" disabled>
                  Selecciona una opción
                </option>
                <option value="si">Sí</option>
                <option value="no">No</option>
              </select>
              <p className="mt-1.5 text-[11.5px] text-ink-faint">
                Los usuarios de equipos de RF acceden a un precio especial.
              </p>
            </div>
          </>
        )}

        {stepIndex === 2 && (
          <>
            <div className="mb-[18px]">
              <label htmlFor="pais" className={labelClass}>
                País *
              </label>
              <input
                id="pais"
                name="pais"
                type="text"
                required
                autoComplete="country-name"
                placeholder="Ej. Perú"
                className={inputClass}
              />
            </div>
            <div className="mb-[18px]">
              <label htmlFor="telefono" className={labelClass}>
                WhatsApp / Teléfono *
              </label>
              <input
                id="telefono"
                name="telefono"
                type="tel"
                required
                autoComplete="tel"
                placeholder="Ej. 987 654 321"
                className={inputClass}
              />
            </div>
            <div className="mb-[18px]">
              <label htmlFor="email" className={labelClass}>
                Correo electrónico *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="nombre@correo.com"
                className={inputClass}
              />
            </div>
          </>
        )}
      </div>

      <input
        type="text"
        name="campo_extra"
        id="campo_extra"
        style={{ position: "absolute", left: "-9999px" }}
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="mt-1.5 flex flex-col gap-3">
        <button
          type="submit"
          disabled={status === "sending"}
          className={`wipe-btn flex items-center justify-center gap-2.5 rounded-[14px] bg-gradient-to-br from-accent to-accent-deep px-8 py-[17px] text-[14.5px] font-bold uppercase tracking-wide text-white shadow-[0_14px_30px_-10px_rgba(255,63,166,0.5)] transition-transform duration-200 [transition-timing-function:cubic-bezier(.16,1,.3,1)] hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 ${
            phase === "exiting" ? "is-wiping" : ""
          }`}
        >
          <span className="wipe-label gap-2.5">
            <ChevronsRight className="h-[19px] w-[19px]" strokeWidth={2.2} />
            {status === "sending" ? "Enviando..." : isLastStep ? "Reservar y continuar por WhatsApp" : "Siguiente"}
          </span>
        </button>

        {stepIndex > 0 && (
          <button
            type="button"
            onClick={goBack}
            className="w-full rounded-[14px] border border-panel-border bg-panel px-8 py-3 text-[13.5px] font-bold text-ink-soft transition-colors hover:bg-panel-strong hover:text-ink"
          >
            Atrás
          </button>
        )}
      </div>

      {status === "error" && (
        <div className="mt-3.5 rounded-[10px] border border-[color-mix(in_srgb,var(--err)_35%,transparent)] bg-[color-mix(in_srgb,var(--err)_12%,transparent)] px-3.5 py-3 text-[13px] font-semibold text-err">
          No pudimos enviar tu registro. Intenta de nuevo o escríbenos por WhatsApp al 914 507 338.
        </div>
      )}

      <p className="mt-4 text-[11.5px] leading-4 text-ink-faint">
        Al registrarte aceptas que ADLIM Partners use tus datos de contacto para coordinar tu inscripción.
      </p>
    </form>
  );
}
