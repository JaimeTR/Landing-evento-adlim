"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, UserCircle, Settings } from "lucide-react";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/leads", label: "Leads", icon: Users },
  { href: "/admin/profile", label: "Perfil", icon: UserCircle },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function MobileNav() {
  const rawPathname = usePathname();
  const pathname = rawPathname.length > 1 ? rawPathname.replace(/\/$/, "") : rawPathname;

  return (
    <nav className="sticky top-0 z-30 flex gap-1.5 overflow-x-auto border-b border-divider bg-[var(--nav-bg)] px-3 py-2.5 backdrop-blur-xl md:hidden">
      {NAV.map((item) => {
        const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-none items-center gap-1.5 rounded-lg px-3 py-2 text-[12.5px] font-bold whitespace-nowrap ${
              active ? "bg-gradient-to-r from-accent to-accent-deep text-white" : "text-ink-soft"
            }`}
          >
            <Icon className="h-4 w-4" strokeWidth={2} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
