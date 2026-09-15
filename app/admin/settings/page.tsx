"use client";

import { CheckCircle2, XCircle, Mail, Database, CalendarDays } from "lucide-react";
import Header from "@/components/admin/Header";
import { isSupabaseConfigured } from "@/lib/supabase/client";

export default function SettingsPage() {
  return (
    <div>
      <Header title="Settings" subtitle="Configuración del evento y conexiones" />

      <div className="max-w-[640px] space-y-6 px-6 py-6">
        <div className="panel px-6 py-6">
          <div className="mb-4 flex items-center gap-2.5">
            <Database className="h-5 w-5 text-accent" />
            <h2 className="font-display text-[15px] font-bold text-ink">Conexión a Supabase</h2>
          </div>
          <div className="flex items-center gap-2.5 text-[13.5px]">
            {isSupabaseConfigured ? (
              <>
                <CheckCircle2 className="h-[18px] w-[18px] text-ok" />
                <span className="text-ink-soft">Configurado — leyendo de la tabla <code className="rounded bg-panel px-1.5 py-0.5">leads</code>.</span>
              </>
            ) : (
              <>
                <XCircle className="h-[18px] w-[18px] text-err" />
                <span className="text-ink-soft">
                  Falta configurar <code className="rounded bg-panel px-1.5 py-0.5">NEXT_PUBLIC_SUPABASE_URL</code> y{" "}
                  <code className="rounded bg-panel px-1.5 py-0.5">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>.
                </span>
              </>
            )}
          </div>
        </div>

        <div className="panel px-6 py-6">
          <div className="mb-4 flex items-center gap-2.5">
            <Mail className="h-5 w-5 text-accent" />
            <h2 className="font-display text-[15px] font-bold text-ink">Confirmación de pago por WhatsApp</h2>
          </div>
          <p className="text-[13.5px] leading-6 text-ink-soft">
            Al inscribirse, el formulario abre WhatsApp con los datos del participante hacia el número de
            contacto para que coordine su pago. El equipo verifica el pago manualmente y luego actualiza el
            campo <code className="rounded bg-panel px-1.5 py-0.5">Pago</code> de cada registro en{" "}
            <code className="rounded bg-panel px-1.5 py-0.5">Leads</code>.
          </p>
        </div>

        <div className="panel px-6 py-6">
          <div className="mb-4 flex items-center gap-2.5">
            <CalendarDays className="h-5 w-5 text-accent" />
            <h2 className="font-display text-[15px] font-bold text-ink">Datos del curso</h2>
          </div>
          <dl className="grid grid-cols-2 gap-y-3 text-[13.5px]">
            <dt className="text-ink-faint">Curso</dt>
            <dd className="font-semibold text-ink">Cirugía Estética Genital Femenina · Sistema FRAXX</dd>
            <dt className="text-ink-faint">Instructor</dt>
            <dd className="font-semibold text-ink">Dr. Marco Gaxiola C.</dd>
            <dt className="text-ink-faint">Fecha</dt>
            <dd className="font-semibold text-ink">Jueves 12 de noviembre, 2026</dd>
            <dt className="text-ink-faint">Lugar</dt>
            <dd className="font-semibold text-ink">Lima, Perú</dd>
            <dt className="text-ink-faint">WhatsApp</dt>
            <dd className="font-semibold text-ink">914 507 338 / 971 165 129</dd>
          </dl>
          <p className="mt-4 text-[12px] text-ink-faint">
            Referencia interna — la landing pública muestra esta información en la sección de Hero y agenda.
          </p>
        </div>
      </div>
    </div>
  );
}
