import Link from "next/link";
import { Compass } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center px-6 py-10">
      <div className="absolute right-6 top-6">
        <ThemeToggle />
      </div>

      <div className="panel w-full max-w-[420px] px-8 py-11 text-center sm:px-10">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-2 shadow-[0_12px_26px_-8px_rgba(28,127,168,0.5)]">
          <Compass className="h-7 w-7 text-white" strokeWidth={2} />
        </div>

        <h1 className="mb-1.5 font-display text-[42px] font-bold leading-none text-ink">404</h1>
        <p className="mb-1.5 font-display text-[20px] font-bold text-ink">Página no encontrada</p>
        <p className="mb-8 text-[13.5px] leading-[22px] text-ink-soft">
          El enlace que seguiste no existe o fue movido. Vuelve al registro del curso FRAXX.
        </p>

        <Link
          href="/"
          className="inline-flex w-full items-center justify-center rounded-[14px] bg-gradient-to-br from-accent to-accent-deep px-6 py-[15px] text-[13.5px] font-bold uppercase tracking-wide text-white shadow-[0_14px_30px_-10px_rgba(28,127,168,0.5)] transition-transform duration-200 [transition-timing-function:cubic-bezier(.16,1,.3,1)] hover:-translate-y-0.5"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
