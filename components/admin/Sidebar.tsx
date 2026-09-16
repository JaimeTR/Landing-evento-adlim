"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, UserCircle, Settings, LogOut } from "lucide-react";
import { signOut } from "@/lib/supabase/auth";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/leads", label: "Leads", icon: Users },
  { href: "/admin/profile", label: "Perfil", icon: UserCircle },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const rawPathname = usePathname();
  const pathname = rawPathname.length > 1 ? rawPathname.replace(/\/$/, "") : rawPathname;
  const router = useRouter();

  async function handleLogout() {
    await signOut();
    router.replace("/admin/login");
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[240px] flex-col border-r border-divider bg-[var(--nav-bg)] backdrop-blur-2xl backdrop-saturate-150 md:flex">
      <div className="flex items-center justify-center border-b border-divider px-5 py-6">
        <Image src="/brand/adlim-logo-2024.png" alt="ADLIM" width={3871} height={996} className="h-8 w-auto" />
      </div>

      <nav className="flex-1 space-y-1 px-3 py-5">
        {NAV.map((item) => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors ${
                active
                  ? "bg-gradient-to-r from-accent to-accent-deep text-white shadow-[0_8px_18px_-8px_rgba(28,127,168,0.5)]"
                  : "text-ink-soft hover:bg-panel hover:text-ink"
              }`}
            >
              <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-divider px-3 py-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-ink-soft transition-colors hover:bg-panel hover:text-err"
        >
          <LogOut className="h-[18px] w-[18px]" strokeWidth={2} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
