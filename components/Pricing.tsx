import ScrollReveal from "./ScrollReveal";

const ROWS = [
  {
    segmento: "Hands-On",
    detalle: "Práctica quirúrgica",
    lanzamiento: "$1,000.00",
    preventa: "$1,150.00",
    regular: "$1,300.00",
    rf: "$1,000.00",
  },
  {
    segmento: "Live Observer",
    detalle: "Transmisión audiovisual",
    lanzamiento: "$280.00",
    preventa: "$300.00",
    regular: "$350.00",
    rf: "$250.00",
  },
];

const NOTES = [
  { label: "Lanzamiento", desc: "hasta el 30 de setiembre" },
  { label: "Preventa", desc: "del 1 al 20 de octubre" },
  { label: "Precio regular", desc: "a partir del 21 de octubre" },
  { label: "Precio especial RF", desc: "válido hasta el día previo al Hands-On, para usuarios de equipos de radiofrecuencia" },
];

export default function Pricing() {
  return (
    <div className="w-full" id="precios">
      <div className="mx-auto max-w-[1120px] px-6">
        <ScrollReveal>
          <div className="mb-8 text-center">
            <h2 className="mb-2 font-display text-[28px] font-bold text-ink sm:text-[32px]">Inversión</h2>
            <p className="text-[14.5px] text-ink-soft">Precio según tu fecha de inscripción.</p>
          </div>

          <div className="panel overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-divider bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] text-[11px] font-bold uppercase tracking-[.6px] text-ink-faint">
                    <th className="px-5 py-4">Segmento</th>
                    <th className="px-5 py-4">Lanzamiento</th>
                    <th className="px-5 py-4">Preventa</th>
                    <th className="px-5 py-4">Precio Regular</th>
                    <th className="px-5 py-4">Especial · Usuarios RF</th>
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((r) => (
                    <tr key={r.segmento} className="border-b border-divider last:border-0">
                      <td className="px-5 py-4">
                        <div className="font-bold text-ink">{r.segmento}</div>
                        <div className="text-[12px] text-ink-faint">{r.detalle}</div>
                      </td>
                      <td className="px-5 py-4 font-semibold text-ink-soft">{r.lanzamiento}</td>
                      <td className="px-5 py-4 font-semibold text-ink-soft">{r.preventa}</td>
                      <td className="px-5 py-4 font-semibold text-ink-soft">{r.regular}</td>
                      <td className="px-5 py-4 font-bold text-gold">{r.rf}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 gap-3 border-t border-divider px-5 py-4 text-[12px] text-ink-faint sm:grid-cols-2">
              {NOTES.map((n) => (
                <div key={n.label}>
                  <span className="font-bold text-ink-soft">{n.label}:</span> {n.desc}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
