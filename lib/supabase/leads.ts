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
  telefono: string;
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
>;

export async function insertLead(lead: NewLead) {
  // Sin .select(): anon solo tiene policy de INSERT, no de SELECT — pedir la
  // fila de vuelta (representation) hace que Postgres exija también la
  // policy de SELECT sobre esa fila y falle con 42501 aunque el INSERT en
  // sí sea válido.
  return supabase.from("leads").insert(lead);
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
