"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ChevronsRight, MessageCircle, CalendarDays, Phone, Mail, MapPin, User, Briefcase, Zap } from "lucide-react";
import confetti from "canvas-confetti";
import { insertLead, type TipoParticipacion } from "@/lib/supabase/leads";
import { buildWhatsappMessage } from "@/lib/event";

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "51914507338";

const PARTICIPACION_OPTIONS: Array<{ value: TipoParticipacion; label: string; desc: string }> = [
  { value: "hands-on", label: "Hands-On", desc: "Práctica quirúrgica en vivo" },
  { value: "live-observer", label: "Live Observer", desc: "Transmisión audiovisual" },
];

const ESPECIALIDAD_OPTIONS = [
  "Ginecología Estética y Regenerativa",
  "Ginecología y Obstetricia",
  "Cirugía Plástica y Reconstructiva",
  "Medicina Estética",
  "Dermatología",
  "Urología",
  "Medicina General",
  "Enfermería",
  "Otro",
];

type Status = "idle" | "sending" | "error";
type Phase = "idle" | "exiting" | "entering";

const STEPS = [
  { key: "sobre-ti", label: "Sobre ti" },
  { key: "participacion", label: "Participación" },
  { key: "contacto", label: "Contacto" },
] as const;

const inputClass =
  "w-full rounded-full border border-input-border bg-input-bg px-5 py-[13.5px] text-[14.5px] text-ink placeholder:text-ink-faint transition-colors duration-150 hover:border-[color-mix(in_srgb,var(--navy)_55%,var(--input-border))] focus:border-navy focus:outline-none focus:shadow-[0_0_0_4px_color-mix(in_srgb,var(--navy)_14%,transparent)]";
const labelClass = "mb-1.5 block text-[12.5px] font-bold text-ink";
const fieldIconClass = "pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-ink-faint";

// WhatsApp siempre es celular: agrupa en 3-3-3 ("999 999 999").
function formatCelularInput(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 9);
  return digits.replace(/(\d{3})(?=\d)/g, "$1 ");
}

// Teléfono opcional acepta fijo (7 dígitos, "999 9999") o celular (9 dígitos, "999 999 999").
function formatPhoneInput(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 9);
  if (digits.length <= 7) {
    const a = digits.slice(0, 3);
    const b = digits.slice(3, 7);
    return b ? `${a} ${b}` : a;
  }
  const a = digits.slice(0, 3);
  const b = digits.slice(3, 6);
  const c = digits.slice(6, 9);
  return [a, b, c].filter(Boolean).join(" ");
}

export default function RegisterForm({
  defaultTipoParticipacion,
}: {
  defaultTipoParticipacion?: TipoParticipacion;
} = {}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [status, setStatus] = useState<Status>("idle");
  const [submitted, setSubmitted] = useState(false);
  const [waLink, setWaLink] = useState<string>("");
  const [choice, setChoice] = useState<"none" | "whatsapp" | "wait">("none");
  const [especialidadOtro, setEspecialidadOtro] = useState(false);
  const [usaRf, setUsaRf] = useState(false);

  const isLastStep = stepIndex === STEPS.length - 1;

  function fieldsForStep(step: number): string[] {
    if (step === 0) return ["nombres", "apellido", "especialidad"];
    if (step === 1) return usaRf ? ["tipo_participacion", "usa_rf", "fecha_adquisicion_rf"] : ["tipo_participacion", "usa_rf"];
    return ["whatsapp", "email", "ciudad"];
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

    if (!validateStep(stepIndex)) return;

    const data = new FormData(form);
    const payload = {
      nombres: String(data.get("nombres") || "").trim(),
      apellido: String(data.get("apellido") || "").trim(),
      especialidad: String(data.get("especialidad") || "").trim(),
      tipoParticipacion: (String(data.get("tipo_participacion") || "hands-on")) as TipoParticipacion,
      usaRf: String(data.get("usa_rf") || "") === "si",
      fechaAdquisicionRf: String(data.get("fecha_adquisicion_rf") || "").trim(),
      whatsapp: String(data.get("whatsapp") || "").replace(/\s/g, "").trim(),
      telefonoOpcional: String(data.get("telefono_opcional") || "").replace(/\s/g, "").trim(),
      email: String(data.get("email") || "").trim(),
      ciudad: String(data.get("ciudad") || "").trim(),
    };

    setStatus("sending");

    const { error } = await insertLead({
      nombres: payload.nombres,
      apellido: payload.apellido,
      especialidad: payload.especialidad,
      tipo_participacion: payload.tipoParticipacion,
      usa_rf: payload.usaRf,
      pais: payload.ciudad,
      ciudad: payload.ciudad || undefined,
      telefono: payload.whatsapp,
      telefono_opcional: payload.telefonoOpcional || undefined,
      fecha_adquisicion_rf: payload.fechaAdquisicionRf || undefined,
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
          <span className="success-ring absolute inset-0 rounded-full border-2 border-orange" />
          <span className="success-ring success-ring-delay absolute inset-0 rounded-full border-2 border-orange" />
          <div className="success-icon relative flex h-16 w-16 items-center justify-center rounded-full bg-orange shadow-[0_12px_26px_-8px_rgba(255,120,38,0.5)]">
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

        {choice === "none" && (
          <>
            <p className="mb-5 text-sm leading-[22px] text-ink-soft">
              Ya enviamos tus datos de inscripción. Para procesar tu pago puedes{" "}
              <b className="font-bold text-ink">escribirnos ahora por WhatsApp</b>, o esperar a que el
              equipo de ADLIM Partners se contacte contigo para confirmar los datos y coordinar el
              proceso de pago.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={waLink}
                target="_blank"
                rel="noopener"
                onClick={() => setChoice("whatsapp")}
                className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-orange px-8 py-[15px] text-[14px] font-bold uppercase tracking-wide text-white shadow-[0_14px_30px_-10px_rgba(255,120,38,0.5)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                <MessageCircle className="h-[18px] w-[18px]" strokeWidth={2.2} />
                Enviar mensaje por WhatsApp
              </a>
              <button
                type="button"
                onClick={() => setChoice("wait")}
                className="w-full rounded-full border border-panel-border bg-panel px-8 py-3 text-[13.5px] font-bold text-ink-soft transition-colors hover:bg-panel-strong hover:text-ink"
              >
                Prefiero que me contacten
              </button>
            </div>
          </>
        )}

        {choice === "whatsapp" && (
          <p className="text-sm leading-[22px] text-ink-soft">
            Perfecto, quedamos atentos a tu mensaje por WhatsApp para coordinar el pago de tu cupo.
          </p>
        )}

        {choice === "wait" && (
          <p className="text-sm leading-[22px] text-ink-soft">
            Listo. El equipo de ADLIM Partners se contactará contigo para confirmar tus datos e indicarte
            el proceso de pago.
          </p>
        )}
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
                i <= stepIndex ? "bg-orange" : "bg-divider"
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
        <div hidden={stepIndex !== 0}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="mb-[18px]">
                <label htmlFor="nombres" className={labelClass}>
                  Nombres <span className="text-orange-ink">*</span>
                </label>
                <div className="relative">
                  <User className={fieldIconClass} strokeWidth={1.8} />
                  <input
                    id="nombres"
                    name="nombres"
                    type="text"
                    required
                    autoComplete="given-name"
                    placeholder="Ej. María"
                    className={`${inputClass} pl-11`}
                  />
                </div>
              </div>
              <div className="mb-[18px]">
                <label htmlFor="apellido" className={labelClass}>
                  Apellido <span className="text-orange-ink">*</span>
                </label>
                <div className="relative">
                  <User className={fieldIconClass} strokeWidth={1.8} />
                  <input
                    id="apellido"
                    name="apellido"
                    type="text"
                    required
                    autoComplete="family-name"
                    placeholder="Ej. Fernández"
                    className={`${inputClass} pl-11`}
                  />
                </div>
              </div>
            </div>
            <div className="mb-[18px]">
              <label htmlFor="especialidad" className={labelClass}>
                Especialidad / Profesión <span className="text-orange-ink">*</span>
              </label>
              <div className="relative">
                <Briefcase className={fieldIconClass} strokeWidth={1.8} />
                {especialidadOtro ? (
                  <input
                    id="especialidad"
                    name="especialidad"
                    type="text"
                    required
                    autoFocus
                    placeholder="Escribe tu especialidad"
                    className={`${inputClass} pl-11`}
                  />
                ) : (
                  <select
                    id="especialidad"
                    name="especialidad"
                    required
                    defaultValue=""
                    onChange={(e) => {
                      if (e.target.value === "Otro") setEspecialidadOtro(true);
                    }}
                    className={`themed-select ${inputClass} pl-11`}
                  >
                    <option value="" disabled>
                      Selecciona una opción
                    </option>
                    {ESPECIALIDAD_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
        </div>

        <div hidden={stepIndex !== 1}>
            <div className="mb-[18px]">
              <label className={labelClass}>Tipo de participación *</label>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {PARTICIPACION_OPTIONS.map((opt) => (
                  <label
                    key={opt.value}
                    className="flex cursor-pointer flex-col rounded-xl border border-input-border bg-input-bg px-4 py-3 transition-colors has-[:checked]:border-navy has-[:checked]:shadow-[0_0_0_3px_color-mix(in_srgb,var(--navy)_14%,transparent)]"
                  >
                    <input
                      type="radio"
                      name="tipo_participacion"
                      value={opt.value}
                      required
                      defaultChecked={opt.value === (defaultTipoParticipacion ?? "hands-on")}
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
                ¿Tiene tu equipo de radiofrecuencia de marca Loktal? <span className="text-orange-ink">*</span>
              </label>
              <div className="relative">
                <Zap className={fieldIconClass} strokeWidth={1.8} />
                <select
                  id="usa_rf"
                  name="usa_rf"
                  required
                  defaultValue=""
                  onChange={(e) => setUsaRf(e.target.value === "si")}
                  className={`themed-select ${inputClass} pl-11`}
                >
                  <option value="" disabled>
                    Selecciona una opción
                  </option>
                  <option value="si">Sí</option>
                  <option value="no">No</option>
                </select>
              </div>
              <p className="mt-1.5 text-[11.5px] text-ink-faint">
                Los usuarios de equipos de RF acceden a un precio especial.
              </p>
              {usaRf && (
                <div className="mt-[18px]">
                  <label htmlFor="fecha_adquisicion_rf" className={labelClass}>
                    Fecha de adquisición <span className="text-orange-ink">*</span>
                  </label>
                  <div className="relative">
                    <CalendarDays className={fieldIconClass} strokeWidth={1.8} />
                    <input
                      id="fecha_adquisicion_rf"
                      name="fecha_adquisicion_rf"
                      type="date"
                      required={usaRf}
                      max={new Date().toISOString().slice(0, 10)}
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </div>
              )}
            </div>
        </div>

        <div hidden={stepIndex !== 2}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="mb-[18px]">
                <label htmlFor="whatsapp" className={labelClass}>
                  WhatsApp <span className="text-orange-ink">*</span>
                </label>
                <div className="relative">
                  <MessageCircle className={fieldIconClass} strokeWidth={1.8} />
                  <input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    required
                    autoComplete="tel"
                    inputMode="numeric"
                    pattern="[0-9]{3} [0-9]{3} [0-9]{3}"
                    maxLength={11}
                    title="9 dígitos (número de celular), formato 999 999 999"
                    placeholder="Ej. 987 654 321"
                    onInput={(e) => {
                      e.currentTarget.value = formatCelularInput(e.currentTarget.value);
                    }}
                    className={`${inputClass} pl-11`}
                  />
                </div>
              </div>
              <div className="mb-[18px]">
                <label htmlFor="telefono_opcional" className={labelClass}>
                  Teléfono
                </label>
                <div className="relative">
                  <Phone className={fieldIconClass} strokeWidth={1.8} />
                  <input
                    id="telefono_opcional"
                    name="telefono_opcional"
                    type="tel"
                    autoComplete="tel"
                    inputMode="numeric"
                    pattern="[0-9]{3} [0-9]{4}|[0-9]{3} [0-9]{3} [0-9]{3}"
                    maxLength={11}
                    title="7 dígitos (fijo, 999 9999) o 9 dígitos (celular, 999 999 999)"
                    placeholder="Ej. 234 5678"
                    onInput={(e) => {
                      e.currentTarget.value = formatPhoneInput(e.currentTarget.value);
                    }}
                    className={`${inputClass} pl-11`}
                  />
                </div>
              </div>
            </div>
            <div className="mb-[18px]">
              <label htmlFor="email" className={labelClass}>
                Correo electrónico <span className="text-orange-ink">*</span>
              </label>
              <div className="relative">
                <Mail className={fieldIconClass} strokeWidth={1.8} />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="nombre@correo.com"
                  className={`${inputClass} pl-11`}
                />
              </div>
            </div>
            <div className="mb-[18px]">
              <label htmlFor="ciudad" className={labelClass}>
                Ciudad <span className="text-orange-ink">*</span>
              </label>
              <div className="relative">
                <MapPin className={fieldIconClass} strokeWidth={1.8} />
                <input
                  id="ciudad"
                  name="ciudad"
                  type="text"
                  required
                  autoComplete="address-level2"
                  placeholder="Ej. Lima"
                  className={`${inputClass} pl-11`}
                />
              </div>
            </div>
        </div>
      </div>

      <div className="mt-1.5 flex flex-col gap-3">
        <button
          type="submit"
          disabled={status === "sending"}
          className={`wipe-btn flex items-center justify-center gap-2.5 rounded-full bg-orange px-8 py-[17px] text-[14.5px] font-bold uppercase tracking-wide text-white shadow-[0_14px_30px_-10px_rgba(255,120,38,0.5)] transition-transform duration-200 [transition-timing-function:cubic-bezier(.16,1,.3,1)] hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 ${
            phase === "exiting" ? "is-wiping" : ""
          }`}
        >
          <span className="wipe-label gap-2.5">
            <ChevronsRight className="h-[19px] w-[19px]" strokeWidth={2.2} />
            {status === "sending" ? "Enviando..." : isLastStep ? "Inscribirse ahora" : "Siguiente"}
          </span>
        </button>

        {stepIndex > 0 && (
          <button
            type="button"
            onClick={goBack}
            className="w-full rounded-full border border-panel-border bg-panel px-8 py-3 text-[13.5px] font-bold text-ink-soft transition-colors hover:bg-panel-strong hover:text-ink"
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
        Al registrarte aceptas que ADLIM Partners use tus datos de contacto.
      </p>
    </form>
  );
}
