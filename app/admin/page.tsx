"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, Clock, CheckCircle2, CalendarClock } from "lucide-react";
import Header from "@/components/admin/Header";
import StatCard from "@/components/admin/StatCard";
import StatusBadge, { PaymentBadge } from "@/components/admin/StatusBadge";
import DonutChart from "@/components/admin/DonutChart";
import { supabase } from "@/lib/supabase/client";
import type { Lead, LeadStatus } from "@/lib/supabase/leads";

type LeadSummary = Pick<Lead, "tipo_participacion" | "estado_pago" | "status" | "created_at">;

export default function AdminDashboardPage() {
  const [summary, setSummary] = useState<LeadSummary[]>([]);
  const [recent, setRecent] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const [summaryRes, recentRes] = await Promise.all([
        supabase.from("leads").select("tipo_participacion, estado_pago, status, created_at"),
        supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(6),
      ]);

      setSummary((summaryRes.data as LeadSummary[]) ?? []);
      setRecent((recentRes.data as Lead[]) ?? []);
      setLoading(false);
    }
    load();
  }, []);

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const total = summary.length;
  const pendientes = summary.filter((l) => l.estado_pago === "pendiente").length;
  const pagados = summary.filter((l) => l.estado_pago === "pagado").length;
  const today = summary.filter((l) => new Date(l.created_at) >= startOfDay).length;

  const handsOn = summary.filter((l) => l.tipo_participacion === "hands-on").length;
  const liveObserver = summary.filter((l) => l.tipo_participacion === "live-observer").length;

  const STATUS_COLORS: Record<LeadStatus, string> = {
    nuevo: "var(--accent)",
    contactado: "var(--gold)",
    confirmado: "var(--ok)",
    descartado: "var(--err)",
  };
  const STATUS_LABELS: Record<LeadStatus, string> = {
    nuevo: "Nuevo",
    contactado: "Contactado",
    confirmado: "Confirmado",
    descartado: "Descartado",
  };
  const statusData = (Object.keys(STATUS_LABELS) as LeadStatus[]).map((s) => ({
    label: STATUS_LABELS[s],
    value: summary.filter((l) => l.status === s).length,
    color: STATUS_COLORS[s],
  }));

  return (
    <div>
      <Header title="Dashboard" subtitle="Resumen de inscritos — Curso FRAXX, 12 de noviembre" />

      <div className="px-6 py-6">
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total de inscritos" value={loading ? "—" : total} icon={Users} />
          <StatCard label="Pagos pendientes" value={loading ? "—" : pendientes} icon={Clock} accent="gold" />
          <StatCard label="Pagos confirmados" value={loading ? "—" : pagados} icon={CheckCircle2} />
          <StatCard label="Registrados hoy" value={loading ? "—" : today} icon={CalendarClock} />
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="panel px-6 py-6">
            <h2 className="mb-5 font-display text-[15px] font-bold text-ink">Tipo de participación</h2>
            <DonutChart
              centerLabel="inscritos"
              data={[
                { label: "Hands-On", value: handsOn, color: "var(--accent)" },
                { label: "Live Observer", value: liveObserver, color: "var(--gold)" },
              ]}
            />
          </div>

          <div className="panel px-6 py-6">
            <h2 className="mb-5 font-display text-[15px] font-bold text-ink">Estado de pago</h2>
            <DonutChart
              centerLabel="inscritos"
              data={[
                { label: "Pendiente", value: pendientes, color: "var(--gold)" },
                { label: "Pagado", value: pagados, color: "var(--ok)" },
              ]}
            />
          </div>

          <div className="panel px-6 py-6">
            <h2 className="mb-5 font-display text-[15px] font-bold text-ink">Seguimiento</h2>
            <DonutChart centerLabel="inscritos" data={statusData} />
          </div>
        </div>

        <div className="panel px-6 py-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-[16px] font-bold text-ink">Últimos registros</h2>
            <Link href="/admin/leads" className="text-[13px] font-bold text-accent hover:underline">
              Ver todos →
            </Link>
          </div>

          {loading ? (
            <p className="py-8 text-center text-sm text-ink-faint">Cargando...</p>
          ) : recent.length === 0 ? (
            <p className="py-8 text-center text-sm text-ink-faint">Aún no hay registros.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-divider text-[11px] font-bold uppercase tracking-[.8px] text-ink-faint">
                    <th className="pb-2.5 pr-4">Nombre</th>
                    <th className="pb-2.5 pr-4">Especialidad</th>
                    <th className="pb-2.5 pr-4">Participación</th>
                    <th className="pb-2.5 pr-4">Estado</th>
                    <th className="pb-2.5 pr-4">Pago</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((lead) => (
                    <tr key={lead.id} className="border-b border-divider last:border-0">
                      <td className="py-3 pr-4 font-semibold text-ink">
                        {lead.nombres} {lead.apellido}
                      </td>
                      <td className="py-3 pr-4 text-ink-soft">{lead.especialidad}</td>
                      <td className="py-3 pr-4 text-ink-soft">
                        {lead.tipo_participacion === "hands-on" ? "Hands-On" : "Live Observer"}
                      </td>
                      <td className="py-3 pr-4">
                        <StatusBadge status={lead.status} />
                      </td>
                      <td className="py-3 pr-4">
                        <PaymentBadge estado={lead.estado_pago} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
