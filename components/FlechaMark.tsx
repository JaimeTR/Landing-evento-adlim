import Image from "next/image";

export default function FlechaMark({ className }: { className?: string }) {
  return <Image src="/brand/flecha.png" alt="" width={159} height={180} className={className} />;
}
