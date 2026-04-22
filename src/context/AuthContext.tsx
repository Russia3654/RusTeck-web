"use client";

import { createContext, useCallback, useContext, useState } from "react";

interface AuthContextType {
    accessToken: string | null;
    tenantId: string | null;
    tenantSlug: string | null;
    // todo: recheck for correctness
    modules: string[] | null;
    login: (slug: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [tenantId, setTenantId] = useState<string | null>(null);
    const [tenantSlug, setTenantSlug] = useState<string | null>(null);
    const [modules, setModules] = useState<string[] | null>(null);

    async function login(slug: string, email: string, password: string) {
        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ slug, email, password }),
        });
        if (!res.ok) throw res;
        // todo: recheck for correctness
        const data = await res.json() as { access_token: string; tenant_id: string;  modules: string[]};
        setAccessToken(data.access_token);
        setTenantId(data.tenant_id);
        setTenantSlug(slug);
        // todo: recheck for correctness
        setModules(data.modules);
    }

    async function logout() {
        if (!tenantId) return;
        await fetch("/api/logout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tenant_id: tenantId }),
        });
        setAccessToken(null);
        setTenantId(null);
        setTenantSlug(null);
        // todo: recheck for correctness
        setModules(null);
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
            setTenantId(null);
            return;
        }
        const data = await res.json() as { access_token: string };
        setAccessToken(data.access_token);
    }, [tenantId]);


    return (
        <AuthContext.Provider value={{ accessToken, tenantId, tenantSlug, modules , login, logout, refresh }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
}
