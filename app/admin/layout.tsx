"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "@/lib/hooks/useSession";
import Sidebar from "@/components/admin/Sidebar";
import MobileNav from "@/components/admin/MobileNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { session, loading } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname.replace(/\/$/, "") === "/admin/login";

  useEffect(() => {
    if (loading) return;
    if (!session && !isLoginPage) router.replace("/admin/login");
    if (session && isLoginPage) router.replace("/admin");
  }, [loading, session, isLoginPage, router]);

  if (isLoginPage) return <>{children}</>;

  if (loading || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Sidebar />
      <MobileNav />
      <div className="md:pl-[240px]">{children}</div>
    </div>
  );
}
