import Image from "next/image";
import CloverMark from "./CloverMark";

export default function SiteBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      style={{ background: "var(--page-wash)", backgroundSize: "var(--page-wash-size)" }}
    >
      {/* Congresos/Alianzas — clover watermark, tucked at the title's corner */}
      <CloverMark className="absolute left-[4%] top-[3%] h-[150px] w-[150px] opacity-[0.14] sm:h-[190px] sm:w-[190px]" />

      {/* Salud femenina — flor watermark */}
      <Image
        src="/brand/salud-femenina.png"
        alt=""
        width={324}
        height={327}
        className="absolute right-[-4%] top-[28%] hidden h-[320px] w-[320px] opacity-[0.3] sm:block sm:h-[420px] sm:w-[420px]"
      />
    </div>
  );
}
