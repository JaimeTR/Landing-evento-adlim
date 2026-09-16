"use client";

import { useCallback, useEffect, useState } from "react";
import { Search, Download, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import Header from "@/components/admin/Header";
import { supabase } from "@/lib/supabase/client";
import {
  deleteLead,
  updateLeadStatus,
  updatePaymentStatus,
  type Lead,
  type LeadStatus,
  type EstadoPago,
} from "@/lib/supabase/leads";

const PAGE_SIZE = 15;
const STATUS_OPTIONS: Array<{ value: LeadStatus | "todos"; label: string }> = [
  { value: "todos", label: "Todos los estados" },
  { value: "nuevo", label: "Nuevo" },
  { value: "contactado", label: "Contactado" },
  { value: "confirmado", label: "Confirmado" },
  { value: "descartado", label: "Descartado" },
];
const PAGO_OPTIONS: Array<{ value: EstadoPago | "todos"; label: string }> = [
  { value: "todos", label: "Todos los pagos" },
  { value: "pendiente", label: "Pago pendiente" },
  { value: "pagado", label: "Pagado" },
];

function toCsv(rows: Lead[]) {
  const headers = [
    "Fecha",
    "Nombres",
    "Apellido",
    "Especialidad",
    "Ciudad",
    "Participación",
    "Usa RF",
    "Teléfono",
    "Email",
    "Estado",
    "Pago",
  ];
  const lines = rows.map((r) =>
    [
      r.created_at,
      r.nombres,
      r.apellido,
      r.especialidad,
      r.pais,
      r.tipo_participacion,
      r.usa_rf ? "Sí" : "No",
      r.telefono,
      r.email,
      r.status,
      r.estado_pago,
    ]
      .map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`)
      .join(",")
  );
  return [headers.join(","), ...lines].join("\n");
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "todos">("todos");
  const [pagoFilter, setPagoFilter] = useState<EstadoPago | "todos">("todos");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    let query = supabase
      .from("leads")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1);

    if (statusFilter !== "todos") query = query.eq("status", statusFilter);
    if (pagoFilter !== "todos") query = query.eq("estado_pago", pagoFilter);
    if (search.trim()) {
      const term = `%${search.trim()}%`;
      query = query.or(
        `nombres.ilike.${term},apellido.ilike.${term},especialidad.ilike.${term},email.ilike.${term},pais.ilike.${term}`
      );
    }

    const { data, count } = await query;
    setLeads((data as Lead[]) ?? []);
    setCount(count ?? 0);
    setLoading(false);
  }, [page, search, statusFilter, pagoFilter]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleStatusChange(id: string, status: LeadStatus) {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    await updateLeadStatus(id, status);
  }

  async function handlePagoChange(id: string, estado_pago: EstadoPago) {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, estado_pago } : l)));
    await updatePaymentStatus(id, estado_pago);
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Borrar este registro? Esta acción no se puede deshacer.")) return;
    setLeads((prev) => prev.filter((l) => l.id !== id));
    await deleteLead(id);
    setCount((c) => c - 1);
  }

  async function handleExport() {
    const { data } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
    const csv = toCsv((data as Lead[]) ?? []);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `inscritos-fraxx-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const totalPages = Math.max(1, Math.ceil(count / PAGE_SIZE));

  return (
    <div>
      <Header title="Leads" subtitle={`${count} inscritos — Curso FRAXX 12 nov.`} />

      <div className="px-6 py-6">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
            <input
              value={search}
              onChange={(e) => {
                setPage(0);
                setSearch(e.target.value);
              }}
              placeholder="Buscar por nombre, especialidad, email o ciudad..."
              className="w-full rounded-xl border border-input-border bg-input-bg py-2.5 pl-10 pr-3.5 text-[13.5px] text-ink transition-colors hover:border-[color-mix(in_srgb,var(--accent)_55%,var(--input-border))] focus:border-accent focus:outline-none"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => {
              setPage(0);
              setStatusFilter(e.target.value as LeadStatus | "todos");
            }}
            className="themed-select rounded-xl border border-input-border bg-input-bg py-2.5 pl-3.5 pr-9 text-[13.5px] font-semibold text-ink transition-colors hover:border-[color-mix(in_srgb,var(--accent)_55%,var(--input-border))] focus:border-accent focus:outline-none"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <select
            value={pagoFilter}
            onChange={(e) => {
              setPage(0);
              setPagoFilter(e.target.value as EstadoPago | "todos");
            }}
            className="themed-select rounded-xl border border-input-border bg-input-bg py-2.5 pl-3.5 pr-9 text-[13.5px] font-semibold text-ink transition-colors hover:border-[color-mix(in_srgb,var(--accent)_55%,var(--input-border))] focus:border-accent focus:outline-none"
          >
            {PAGO_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <button
            onClick={handleExport}
            className="flex items-center gap-2 rounded-xl border border-panel-border bg-panel px-4 py-2.5 text-[13px] font-bold text-ink transition-colors hover:bg-panel-strong"
          >
            <Download className="h-4 w-4" />
            Exportar CSV
          </button>
        </div>

        <div className="panel overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13.5px]">
              <thead>
                <tr className="border-b border-divider text-[11px] font-bold uppercase tracking-[.6px] text-ink-faint">
                  <th className="px-5 py-3">Nombres</th>
                  <th className="px-5 py-3">Especialidad</th>
                  <th className="px-5 py-3">Ciudad</th>
                  <th className="px-5 py-3">Participación</th>
                  <th className="px-5 py-3">Contacto</th>
                  <th className="px-5 py-3">Estado</th>
                  <th className="px-5 py-3">Pago</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={8} className="py-10 text-center text-ink-faint">
                      Cargando...
                    </td>
                  </tr>
                ) : leads.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-10 text-center text-ink-faint">
                      Sin resultados.
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id} className="border-b border-divider last:border-0 hover:bg-panel">
                      <td className="px-5 py-3">
                        <div className="font-semibold text-ink">
                          {lead.nombres} {lead.apellido}
                        </div>
                        <div className="text-[12px] text-ink-faint">{lead.usa_rf ? "Usa RF" : "No usa RF"}</div>
                      </td>
                      <td className="px-5 py-3 text-ink-soft">{lead.especialidad}</td>
                      <td className="px-5 py-3 text-ink-soft">{lead.pais}</td>
                      <td className="px-5 py-3 text-ink-soft">
                        {lead.tipo_participacion === "hands-on" ? "Hands-On" : "Live Observer"}
                      </td>
                      <td className="px-5 py-3">
                        <div className="text-ink-soft">{lead.telefono}</div>
                        <div className="text-[12px] text-ink-faint">{lead.email}</div>
                      </td>
                      <td className="px-5 py-3">
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                          className="themed-select rounded-lg border border-input-border bg-input-bg py-1.5 pl-2.5 pr-7 text-[12px] font-bold text-ink"
                        >
                          <option value="nuevo">Nuevo</option>
                          <option value="contactado">Contactado</option>
                          <option value="confirmado">Confirmado</option>
                          <option value="descartado">Descartado</option>
                        </select>
                      </td>
                      <td className="px-5 py-3">
                        <select
                          value={lead.estado_pago}
                          onChange={(e) => handlePagoChange(lead.id, e.target.value as EstadoPago)}
                          className="themed-select rounded-lg border border-input-border bg-input-bg py-1.5 pl-2.5 pr-7 text-[12px] font-bold text-ink"
                        >
                          <option value="pendiente">Pendiente</option>
                          <option value="pagado">Pagado</option>
                        </select>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <button
                          onClick={() => handleDelete(lead.id)}
                          className="rounded-lg p-1.5 text-ink-faint transition-colors hover:bg-[color-mix(in_srgb,var(--err)_12%,transparent)] hover:text-err"
                          aria-label="Borrar"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-divider px-5 py-3.5">
            <span className="text-[12.5px] text-ink-faint">
              Página {page + 1} de {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-panel-border text-ink disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-panel-border text-ink disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
