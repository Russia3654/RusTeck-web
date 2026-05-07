"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

const SIDEBAR_ITEMS = {
    orders: {
        href: "/dashboard/order",
        label: "Orders",
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>,
    },
    recipes: {
        href: "/dashboard/recipe",
        label: "Recipes",
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
    },
    ingredients: {
        href: "/dashboard/ingredients",
        label: "Ingredients",
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15m-7.3-11.896c.251.023.501.05.75.082M19.8 15l-2.516 1.338a3.75 3.75 0 01-3.567 0l-1.463-.778M19.8 15l.734.49A2.25 2.25 0 0121 17.364v.364a2.25 2.25 0 01-2.25 2.25h-13.5A2.25 2.25 0 013 17.728v-.364a2.25 2.25 0 01.966-1.874L4.7 15" /></svg>,
    },
    users: {
        href: "/dashboard/user",
        label: "Users",
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>,
    },
}

type SidebarKey = keyof typeof SIDEBAR_ITEMS;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { accessToken, tenantId, tenantSlug, modules, logout, refresh } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [booting, setBooting] = useState(true);

    useEffect(() => {
        async function boot() {
            if (!accessToken) await refresh();
            setBooting(false);
        }
        boot();
    }, [accessToken, refresh]);

    useEffect(() => {
        if (booting) return;
        if (!accessToken || !tenantId) router.replace("/login");
    }, [booting, accessToken, tenantId, router]);

    async function handleLogout() {
        await logout();
        router.replace("/login");
    }

    if (booting) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
                <p className="text-zinc-400 text-sm animate-pulse">Loading…</p>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-zinc-950 overflow-hidden">
            <aside className="w-60 shrink-0 border-r border-zinc-800 flex flex-col">
                <div className="px-5 py-5 border-b border-zinc-800">
                    <span className="text-white font-bold capitalize">{tenantSlug?.replace(/-/g, " ") ?? "Dashboard"}</span>
                    <p className="text-zinc-500 text-xs mt-0.5">Tenant Dashboard</p>
                </div>
                <nav aria-label="Main navigation" className="flex-1 px-2 py-3 space-y-0.5">
                    {modules?.map((m) => {
                        if (!Object.prototype.hasOwnProperty.call(SIDEBAR_ITEMS, m)) return null;
                        const item = SIDEBAR_ITEMS[m as SidebarKey];
                        if (!item) return null;
                        const active = pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                                    active
                                        ? "bg-purple-600/20 text-purple-300 font-medium"
                                        : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
                                }`}
                            >
                                {item.icon}
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
                <div className="px-2 py-3 border-t border-zinc-800">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"/></svg>
                        Sign out
                    </button>
                </div>
            </aside>
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    )
}