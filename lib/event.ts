import type { TipoParticipacion } from "./supabase/leads";

// Etiqueta del tramo de precio vigente según fecha de inscripción:
// Lanzamiento hasta el 30 de setiembre, Preventa del 1 al 20 de octubre,
// Precio regular desde el 21 de octubre. Mismas fechas que NOTES en Pricing.
export function getVigenteLabel(now: Date = new Date()): string {
  const y = now.getFullYear();
  if (now <= new Date(y, 8, 30, 23, 59, 59)) return "Lanzamiento";
  if (now <= new Date(y, 9, 20, 23, 59, 59)) return "Preventa";
  return "Precio regular";
}

export const VENUE = {
  name: "Nacer · Centro de Reproducción Humana de Lima",
  building: "Centro Empresarial Platino",
  address: "Av. Ricardo Palma 341, Miraflores 15074",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Centro Empresarial Platino, Av. Ricardo Palma 341, Miraflores 15074"),
};

export interface WhatsappPayload {
  nombres: string;
  apellido: string;
  especialidad: string;
  tipoParticipacion: TipoParticipacion;
  usaRf: boolean;
  fechaAdquisicionRf: string;
  whatsapp: string;
  telefonoOpcional: string;
  email: string;
  ciudad: string;
}

export function buildWhatsappMessage(data: WhatsappPayload): string {
  const tipoLabel =
    data.tipoParticipacion === "hands-on"
      ? "Hands-On (práctica quirúrgica)"
      : "Live Observer (transmisión audiovisual)";
  const lines = [
    `Hola, soy *${data.nombres} ${data.apellido}* y quiero inscribirme al curso *Técnicas Avanzadas de Cirugía Estética Genital Femenina - Sistema FRAXX* (12 nov., Lima - Perú).`,
    "",
    `Especialidad: ${data.especialidad}`,
    `Tipo de participación: ${tipoLabel}`,
    `¿Tiene equipo de radiofrecuencia Loktal?: ${data.usaRf ? "Sí" : "No"}`,
    ...(data.usaRf && data.fechaAdquisicionRf
      ? [`Fecha de adquisición del equipo: ${data.fechaAdquisicionRf}`]
      : []),
    `WhatsApp: ${data.whatsapp}`,
    ...(data.telefonoOpcional ? [`Teléfono: ${data.telefonoOpcional}`] : []),
    `Email: ${data.email}`,
    `Ciudad: ${data.ciudad}`,
    "",
    "Quedo atento(a) a las indicaciones para procesar mi pago.",
  ];
  return lines.join("\n");
}
