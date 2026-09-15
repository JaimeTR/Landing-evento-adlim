"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, Clock, CheckCircle2, CalendarClock } from "lucide-react";
import Header from "@/components/admin/Header";
import StatCard from "@/components/admin/StatCard";
import StatusBadge, { PaymentBadge } from "@/components/admin/StatusBadge";
import { supabase } from "@/lib/supabase/client";
import type { Lead } from "@/lib/supabase/leads";

export default function AdminDashboardPage() {
  const [total, setTotal] = useState<number | null>(null);
  const [pendientes, setPendientes] = useState<number | null>(null);
  const [pagados, setPagados] = useState<number | null>(null);
  const [today, setToday] = useState<number | null>(null);
  const [recent, setRecent] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      const [totalRes, pendientesRes, pagadosRes, todayRes, recentRes] = await Promise.all([
        supabase.from("leads").select("*", { count: "exact", head: true }),
        supabase.from("leads").select("*", { count: "exact", head: true }).eq("estado_pago", "pendiente"),
        supabase.from("leads").select("*", { count: "exact", head: true }).eq("estado_pago", "pagado"),
        supabase
          .from("leads")
          .select("*", { count: "exact", head: true })
          .gte("created_at", startOfDay.toISOString()),
        supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(6),
      ]);

      setTotal(totalRes.count ?? 0);
      setPendientes(pendientesRes.count ?? 0);
      setPagados(pagadosRes.count ?? 0);
      setToday(todayRes.count ?? 0);
      setRecent((recentRes.data as Lead[]) ?? []);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div>
      <Header title="Dashboard" subtitle="Resumen de inscritos — Curso FRAXX, 12 de noviembre" />

      <div className="px-6 py-6">
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total de inscritos" value={total ?? "—"} icon={Users} />
          <StatCard label="Pagos pendientes" value={pendientes ?? "—"} icon={Clock} accent="gold" />
          <StatCard label="Pagos confirmados" value={pagados ?? "—"} icon={CheckCircle2} />
          <StatCard label="Registrados hoy" value={today ?? "—"} icon={CalendarClock} />
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
