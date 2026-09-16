"use client";

import { useId } from "react";

export default function CloverMark({ className, color = "var(--amber)" }: { className?: string; color?: string }) {
  const id = `clover-mask-${useId()}`;
  return (
    <svg aria-hidden className={className} viewBox="0 0 100 100">
      <defs>
        <mask id={id} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
          <circle cx="35" cy="35" r="22" fill="white" />
          <circle cx="65" cy="35" r="22" fill="white" />
          <circle cx="35" cy="65" r="22" fill="white" />
          <circle cx="65" cy="65" r="22" fill="white" />
          <rect x="43" y="43" width="14" height="14" fill="black" transform="rotate(45 50 50)" />
        </mask>
      </defs>
      <rect x="0" y="0" width="100" height="100" fill={color} mask={`url(#${id})`} />
    </svg>
  );
}
