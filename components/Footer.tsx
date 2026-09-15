import { MessageCircle, MapPin } from "lucide-react";

const linkClass =
  "flex items-center gap-2 text-[13px] font-semibold text-ink-soft transition-colors hover:text-accent";

export default function Footer() {
  return (
    <footer className="border-t border-divider bg-[var(--nav-bg)] backdrop-blur-2xl backdrop-saturate-150 py-6">
      <div className="mx-auto flex max-w-[1120px] flex-col items-center gap-4 px-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex flex-col items-center gap-2.5 sm:flex-row">
          <span className="font-display text-[15px] font-bold uppercase tracking-[1px] text-ink">
            ADLIM <span className="text-accent">Partners</span>
          </span>
          <span className="text-[12.5px] font-semibold text-ink-faint">
            Cirugía Estética Genital Femenina · Sistema FRAXX
          </span>
        </div>

        <div className="flex flex-col items-center gap-x-6 gap-y-2 sm:flex-row sm:flex-wrap">
          <span className={linkClass}>
            <MapPin className="h-4 w-4 text-accent" strokeWidth={1.8} />
            Lima - Perú
          </span>
          <a href="https://wa.me/51914507338" target="_blank" rel="noopener" className={linkClass}>
            <MessageCircle className="h-4 w-4 text-accent" strokeWidth={1.8} />
            914 507 338
          </a>
          <a href="https://wa.me/51971165129" target="_blank" rel="noopener" className={linkClass}>
            <MessageCircle className="h-4 w-4 text-accent" strokeWidth={1.8} />
            971 165 129
          </a>
        </div>
      </div>
    </footer>
  );
}
