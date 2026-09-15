import type { LucideIcon } from "lucide-react";

export default function StatCard({
  label,
  value,
  icon: Icon,
  accent = "accent",
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  accent?: "accent" | "gold";
}) {
  return (
    <div className="panel flex items-center gap-4 px-5 py-[22px]">
      <div
        className={`flex h-11 w-11 flex-none items-center justify-center rounded-xl ${
          accent === "gold" ? "bg-[color-mix(in_srgb,var(--gold)_16%,transparent)]" : "bg-[color-mix(in_srgb,var(--accent)_14%,transparent)]"
        }`}
      >
        <Icon className={`h-5 w-5 ${accent === "gold" ? "text-gold" : "text-accent"}`} strokeWidth={2} />
      </div>
      <div>
        <div className="font-display text-[24px] font-bold leading-none text-ink">{value}</div>
        <div className="mt-1.5 text-[12px] font-semibold text-ink-faint">{label}</div>
      </div>
    </div>
  );
}
