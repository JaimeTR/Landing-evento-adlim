import Image from "next/image";
import { MapPin, Navigation } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { VENUE } from "@/lib/event";

export default function Venue() {
  return (
    <div className="w-full" id="sede">
      <div className="mx-auto max-w-[900px] px-6">
        <ScrollReveal>
          <div className="mb-10 text-center">
            <div className="mb-3 flex items-center justify-center gap-3">
              <h2 className="font-display text-[42px] font-bold tracking-[0.02em] text-ink sm:text-[50px]">Sede</h2>
              <MapPin className="h-8 w-8 text-orange" strokeWidth={2.2} />
            </div>
            <p className="text-[14.5px] text-ink-soft">Donde se realizará el Hands-On.</p>
          </div>

          <div className="panel flex flex-col items-center gap-6 px-6 py-8 text-center sm:flex-row sm:gap-10 sm:px-10 sm:text-left">
            <div className="flex w-full max-w-[300px] flex-none justify-center rounded-2xl bg-white px-6 py-5 shadow-[0_4px_16px_rgba(0,0,0,0.06)] sm:w-[280px]">
              <Image src="/brand/nacer-logo.png" alt="Nacer, Centro de Reproducción Humana de Lima" width={1811} height={734} className="h-auto w-full" />
            </div>
            <div className="flex flex-col items-center gap-2 sm:items-start">
              <h3 className="font-display text-[22px] font-bold leading-tight text-ink">{VENUE.name}</h3>
              <p className="text-[14.5px] leading-[23px] text-ink-soft">
                <b className="text-ink">{VENUE.building}</b>
                <br />
                {VENUE.address}
              </p>
              <a
                href={VENUE.mapsUrl}
                target="_blank"
                rel="noopener"
                className="mt-2 inline-flex items-center gap-2 rounded-full bg-orange px-6 py-3 text-[14px] font-bold text-white transition-transform hover:scale-[1.02]"
              >
                <Navigation className="h-4 w-4" strokeWidth={2.2} />
                Cómo llegar
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
