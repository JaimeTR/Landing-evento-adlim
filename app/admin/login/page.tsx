"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { signIn } from "@/lib/supabase/auth";
import ThemeToggle from "@/components/ThemeToggle";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      setError("Correo o contraseña incorrectos.");
      return;
    }
    router.replace("/admin");
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center px-6 py-10">
      <div className="absolute right-6 top-6">
        <ThemeToggle />
      </div>

      <div className="panel w-full max-w-[420px] px-8 py-11 sm:px-10">
        <div className="mx-auto mb-7 text-center font-display text-[20px] font-bold uppercase tracking-[1px] text-ink">
          ADLIM <span className="text-accent">Partners</span>
        </div>
        <h1 className="mb-1.5 text-center font-display text-[22px] font-bold text-ink">Panel FRAXX</h1>
        <p className="mb-8 text-center text-[13.5px] text-ink-soft">Ingresa con tu cuenta del equipo</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-[12.5px] font-bold text-ink">
              Correo
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" strokeWidth={1.8} />
              <input
                id="email"
                type="email"
                required
                placeholder="tucorreo@adlimpartners.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-input-border bg-input-bg py-[13px] pl-10 pr-3.5 text-[14.5px] text-ink placeholder:text-ink-faint transition-colors hover:border-[color-mix(in_srgb,var(--accent)_55%,var(--input-border))] focus:border-accent focus:outline-none focus:shadow-[0_0_0_4px_color-mix(in_srgb,var(--accent)_16%,transparent)]"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-[12.5px] font-bold text-ink">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" strokeWidth={1.8} />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="Tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-input-border bg-input-bg py-[13px] pl-10 pr-11 text-[14.5px] text-ink placeholder:text-ink-faint transition-colors hover:border-[color-mix(in_srgb,var(--accent)_55%,var(--input-border))] focus:border-accent focus:outline-none focus:shadow-[0_0_0_4px_color-mix(in_srgb,var(--accent)_16%,transparent)]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint transition-colors hover:text-ink"
              >
                {showPassword ? <EyeOff className="h-4 w-4" strokeWidth={1.8} /> : <Eye className="h-4 w-4" strokeWidth={1.8} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="rounded-[10px] border border-[color-mix(in_srgb,var(--err)_35%,transparent)] bg-[color-mix(in_srgb,var(--err)_12%,transparent)] px-3.5 py-2.5 text-[13px] font-semibold text-err">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-[14px] bg-gradient-to-br from-accent to-accent-deep px-6 py-[15px] text-[13.5px] font-bold uppercase tracking-wide text-white shadow-[0_14px_30px_-10px_rgba(28,127,168,0.5)] transition-transform duration-200 [transition-timing-function:cubic-bezier(.16,1,.3,1)] hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <p className="mt-5 text-center text-[12.5px] text-ink-faint">
          ¿Problemas para ingresar u olvidaste tu contraseña?{" "}
          <a
            href="https://wa.me/51914507338"
            target="_blank"
            rel="noopener"
            className="font-semibold text-accent transition-colors hover:text-accent-deep"
          >
            Contactar soporte
          </a>
        </p>

        <p className="mt-4 text-center text-[11px] text-ink-faint">
          Desarrollado por JaimeTR
        </p>
      </div>
    </div>
  );
}
