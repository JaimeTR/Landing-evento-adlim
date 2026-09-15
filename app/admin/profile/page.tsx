"use client";

import { useState, type FormEvent } from "react";
import { UserCircle } from "lucide-react";
import Header from "@/components/admin/Header";
import { useSession } from "@/lib/hooks/useSession";
import { updatePassword } from "@/lib/supabase/auth";

export default function ProfilePage() {
  const { session } = useSession();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (password.length < 8) {
      setStatus("error");
      setMessage("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    if (password !== confirm) {
      setStatus("error");
      setMessage("Las contraseñas no coinciden.");
      return;
    }
    setStatus("saving");
    const { error } = await updatePassword(password);
    if (error) {
      setStatus("error");
      setMessage(error.message);
      return;
    }
    setStatus("ok");
    setMessage("Contraseña actualizada.");
    setPassword("");
    setConfirm("");
  }

  return (
    <div>
      <Header title="Perfil" subtitle="Tu cuenta de acceso al panel" />

      <div className="max-w-[560px] px-6 py-6">
        <div className="panel mb-6 flex items-center gap-4 px-6 py-6">
          <div className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-deep">
            <UserCircle className="h-8 w-8 text-white" strokeWidth={1.6} />
          </div>
          <div>
            <div className="font-display text-[16px] font-bold text-ink">{session?.user.email}</div>
            <div className="mt-0.5 text-[12.5px] text-ink-faint">Equipo FP Tecnologi &amp; System</div>
          </div>
        </div>

        <div className="panel px-6 py-6">
          <h2 className="mb-1 font-display text-[15px] font-bold text-ink">Cambiar contraseña</h2>
          <p className="mb-5 text-[12.5px] text-ink-faint">Mínimo 8 caracteres.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="mb-1.5 block text-[12.5px] font-bold text-ink">
                Nueva contraseña
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-input-border bg-input-bg px-3.5 py-[13px] text-[14.5px] text-ink transition-colors hover:border-[color-mix(in_srgb,var(--accent)_55%,var(--input-border))] focus:border-accent focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="confirm" className="mb-1.5 block text-[12.5px] font-bold text-ink">
                Confirmar contraseña
              </label>
              <input
                id="confirm"
                type="password"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full rounded-xl border border-input-border bg-input-bg px-3.5 py-[13px] text-[14.5px] text-ink transition-colors hover:border-[color-mix(in_srgb,var(--accent)_55%,var(--input-border))] focus:border-accent focus:outline-none"
              />
            </div>

            {message && (
              <div
                className={`rounded-[10px] border px-3.5 py-2.5 text-[13px] font-semibold ${
                  status === "error"
                    ? "border-[color-mix(in_srgb,var(--err)_35%,transparent)] bg-[color-mix(in_srgb,var(--err)_12%,transparent)] text-err"
                    : "border-[color-mix(in_srgb,var(--ok)_35%,transparent)] bg-[color-mix(in_srgb,var(--ok)_12%,transparent)] text-ok"
                }`}
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "saving"}
              className="rounded-[14px] bg-gradient-to-br from-accent to-accent-deep px-6 py-3 text-sm font-bold text-white shadow-[0_10px_22px_-8px_rgba(28,127,168,0.5)] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
            >
              {status === "saving" ? "Guardando..." : "Guardar cambios"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
