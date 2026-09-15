import type { LeadStatus, EstadoPago } from "@/lib/supabase/leads";

const STYLES: Record<LeadStatus, string> = {
  nuevo: "bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] text-accent-deep border-[color-mix(in_srgb,var(--accent)_30%,transparent)]",
  contactado: "bg-[color-mix(in_srgb,var(--gold)_16%,transparent)] text-gold border-[color-mix(in_srgb,var(--gold)_35%,transparent)]",
  confirmado: "bg-[color-mix(in_srgb,var(--ok)_14%,transparent)] text-ok border-[color-mix(in_srgb,var(--ok)_32%,transparent)]",
  descartado: "bg-[color-mix(in_srgb,var(--err)_12%,transparent)] text-err border-[color-mix(in_srgb,var(--err)_30%,transparent)]",
};

const LABELS: Record<LeadStatus, string> = {
  nuevo: "Nuevo",
  contactado: "Contactado",
  confirmado: "Confirmado",
  descartado: "Descartado",
};

export default function StatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-bold ${STYLES[status]}`}
    >
      {LABELS[status]}
    </span>
  );
}

const PAGO_STYLES: Record<EstadoPago, string> = {
  pendiente: "bg-[color-mix(in_srgb,var(--gold)_16%,transparent)] text-gold border-[color-mix(in_srgb,var(--gold)_35%,transparent)]",
  pagado: "bg-[color-mix(in_srgb,var(--ok)_14%,transparent)] text-ok border-[color-mix(in_srgb,var(--ok)_32%,transparent)]",
};

const PAGO_LABELS: Record<EstadoPago, string> = {
  pendiente: "Pago pendiente",
  pagado: "Pagado",
};

export function PaymentBadge({ estado }: { estado: EstadoPago }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-bold ${PAGO_STYLES[estado]}`}
    >
      {PAGO_LABELS[estado]}
    </span>
  );
}
