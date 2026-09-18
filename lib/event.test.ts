import { describe, expect, it } from "vitest";
import { buildWhatsappMessage, getVigenteLabel } from "./event";

describe("getVigenteLabel", () => {
  it("rige Lanzamiento hasta el 30 de setiembre", () => {
    expect(getVigenteLabel(new Date(2026, 8, 18))).toBe("Lanzamiento");
    expect(getVigenteLabel(new Date(2026, 8, 30, 23, 59, 59))).toBe("Lanzamiento");
  });

  it("rige Preventa del 1 al 20 de octubre", () => {
    expect(getVigenteLabel(new Date(2026, 9, 1))).toBe("Preventa");
    expect(getVigenteLabel(new Date(2026, 9, 20, 23, 59, 59))).toBe("Preventa");
  });

  it("rige Precio regular desde el 21 de octubre", () => {
    expect(getVigenteLabel(new Date(2026, 9, 21))).toBe("Precio regular");
    expect(getVigenteLabel(new Date(2026, 10, 12))).toBe("Precio regular");
  });
});

describe("buildWhatsappMessage", () => {
  const base = {
    nombres: "María",
    apellido: "Fernández",
    especialidad: "Ginecología y Obstetricia",
    tipoParticipacion: "hands-on" as const,
    usaRf: false,
    fechaAdquisicionRf: "",
    whatsapp: "987654321",
    telefonoOpcional: "",
    email: "maria@correo.com",
    ciudad: "Lima",
  };

  it("incluye los datos y omite opcionales vacíos", () => {
    const msg = buildWhatsappMessage(base);
    expect(msg).toContain("María Fernández");
    expect(msg).toContain("Hands-On (práctica quirúrgica)");
    expect(msg).toContain("WhatsApp: 987654321");
    expect(msg).not.toContain("Teléfono:");
    expect(msg).not.toContain("Fecha de adquisición");
  });

  it("incluye fecha RF y teléfono solo cuando corresponde", () => {
    const msg = buildWhatsappMessage({
      ...base,
      usaRf: true,
      fechaAdquisicionRf: "2024-05-01",
      telefonoOpcional: "012345678",
    });
    expect(msg).toContain("Sí");
    expect(msg).toContain("Fecha de adquisición del equipo: 2024-05-01");
    expect(msg).toContain("Teléfono: 012345678");
  });
});
