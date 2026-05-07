"use client";

import { createContext, useCallback, useContext, useState } from "react";

interface AuthContextType {
    accessToken: string | null;
    tenantId: string | null;
    tenantSlug: string | null;
    modules: string[] | null;
    login: (slug: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [accessToken, setAccessToken] = useState<string | null>(() =>
    typeof window !== "undefined" ? sessionStorage.getItem("accessToken") : null
);
    const [tenantId, setTenantId] = useState<string | null>(() =>
        typeof window !== "undefined" ? sessionStorage.getItem("tenantId") : null
    );
    const [tenantSlug, setTenantSlug] = useState<string | null>(() =>
        typeof window !== "undefined" ? sessionStorage.getItem("tenantSlug") : null
    );
    const [modules, setModules] = useState<string[] | null>(() => {
        if (typeof window === "undefined") return null;
        const raw = sessionStorage.getItem("modules");
        return raw ? JSON.parse(raw) as string[] : null;
    });

    async function login(slug: string, email: string, password: string) {
        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ slug, email, password }),
        });
        if (!res.ok) throw res;

        const data = await res.json() as { access_token: string; tenant_id: string; modules: string[] };
        setAccessToken(data.access_token);
        sessionStorage.setItem("accessToken", data.access_token);
        setTenantId(data.tenant_id);
        setTenantSlug(slug);

        setModules(data.modules);
        sessionStorage.setItem("tenantId", data.tenant_id);
        sessionStorage.setItem("tenantSlug", slug);
        sessionStorage.setItem("modules", JSON.stringify(data.modules));
    }

    async function logout() {
        if (!tenantId) return;
        await fetch("/api/logout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tenant_id: tenantId }),
        });
        setAccessToken(null);
        sessionStorage.removeItem("accessToken");
        setTenantId(null);
        setTenantSlug(null);

        setModules(null);
        sessionStorage.removeItem("tenantId");
        sessionStorage.removeItem("tenantSlug");
        sessionStorage.removeItem("modules");
    }


    const refresh = useCallback(async () => {
        if (!tenantId) return;
        const res = await fetch("/api/refresh", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tenant_id: tenantId }),
        });
        if (!res.ok) {
            setAccessToken(null);
            sessionStorage.removeItem("accessToken");
            setTenantId(null);
            sessionStorage.removeItem("tenantId");
            sessionStorage.removeItem("tenantSlug");
            sessionStorage.removeItem("modules");
            return;
        }
        const data = await res.json() as { access_token: string };
        setAccessToken(data.access_token);
    }, [tenantId]);


    return (
        <AuthContext.Provider value={{ accessToken, tenantId, tenantSlug, modules, login, logout, refresh }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
}
