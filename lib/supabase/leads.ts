import { supabase } from "./client";

export type LeadStatus = "nuevo" | "contactado" | "confirmado" | "descartado";
export type TipoParticipacion = "hands-on" | "live-observer";
export type EstadoPago = "pendiente" | "pagado";

export interface Lead {
  id: string;
  created_at: string;
  nombres: string;
  apellido: string;
  especialidad: string;
  pais: string;
  ciudad?: string | null;
  telefono: string;
  telefono_opcional?: string | null;
  fecha_adquisicion_rf?: string | null;
  email: string;
  tipo_participacion: TipoParticipacion;
  usa_rf: boolean;
  estado_pago: EstadoPago;
  origen: string;
  status: LeadStatus;
}

export type NewLead = Pick<
  Lead,
  "nombres" | "apellido" | "especialidad" | "pais" | "telefono" | "email" | "tipo_participacion" | "usa_rf" | "origen"
> &
  Partial<Pick<Lead, "ciudad" | "telefono_opcional" | "fecha_adquisicion_rf">>;

export async function insertLead(lead: NewLead) {
  // Sin .select(): anon solo tiene policy de INSERT, no de SELECT — pedir la
  // fila de vuelta (representation) hace que Postgres exija también la
  // policy de SELECT sobre esa fila y falle con 42501 aunque el INSERT en
  // sí sea válido.
  const { ciudad, telefono_opcional, fecha_adquisicion_rf, ...base } = lead;
  const extra: Record<string, string> = {};
  if (ciudad) extra.ciudad = ciudad;
  if (telefono_opcional) extra.telefono_opcional = telefono_opcional;
  if (fecha_adquisicion_rf) extra.fecha_adquisicion_rf = fecha_adquisicion_rf;
  const attempt = await supabase.from("leads").insert({ ...base, ...extra });
  if (attempt.error && Object.keys(extra).length > 0) {
    // Si la migración supabase/migration_add_contact_fields.sql aún no se
    // aplicó en Supabase, reintentar sin las columnas nuevas para no perder
    // el registro.
    return supabase.from("leads").insert(base);
  }
  return attempt;
}

export async function listLeads(params: { search?: string; limit?: number; offset?: number } = {}) {
  const { search = "", limit = 25, offset = 0 } = params;
  let query = supabase
    .from("leads")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (search.trim()) {
    const term = `%${search.trim()}%`;
    query = query.or(
      `nombres.ilike.${term},apellido.ilike.${term},especialidad.ilike.${term},email.ilike.${term},pais.ilike.${term}`
    );
  }

  return query;
}

export async function updateLeadStatus(id: string, status: LeadStatus) {
  return supabase.from("leads").update({ status }).eq("id", id).select().single();
}

export async function updatePaymentStatus(id: string, estado_pago: EstadoPago) {
  return supabase.from("leads").update({ estado_pago }).eq("id", id).select().single();
}

export async function deleteLead(id: string) {
  return supabase.from("leads").delete().eq("id", id);
}
