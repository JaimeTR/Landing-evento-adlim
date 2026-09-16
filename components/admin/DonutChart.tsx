export type DonutSegment = { label: string; value: number; color: string };

export default function DonutChart({
  data,
  size = 150,
  thickness = 20,
  centerLabel,
}: {
  data: DonutSegment[];
  size?: number;
  thickness?: number;
  centerLabel?: string;
}) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="flex flex-wrap items-center gap-5">
      <div className="relative flex-none" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--divider)" strokeWidth={thickness} />
          {total > 0 &&
            data.map((d, i) => {
              if (d.value === 0) return null;
              const fraction = d.value / total;
              const dash = fraction * circumference;
              const strokeDashoffset = -offset;
              offset += dash;
              return (
                <circle
                  key={i}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  stroke={d.color}
                  strokeWidth={thickness}
                  strokeDasharray={`${dash} ${circumference - dash}`}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="butt"
                />
              );
            })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-[24px] font-bold leading-none text-ink">{total}</span>
          {centerLabel && <span className="mt-1 text-[10px] font-semibold uppercase tracking-[.4px] text-ink-faint">{centerLabel}</span>}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2.5">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-2 text-[12.5px]">
            <span className="h-2.5 w-2.5 flex-none rounded-full" style={{ background: d.color }} />
            <span className="text-ink-soft">{d.label}</span>
            <span className="ml-auto font-bold text-ink">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
