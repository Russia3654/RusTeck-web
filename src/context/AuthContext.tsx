"use client";

import { createContext, useContext, useState } from "react";
import { login as authLogin, logout as authLogout, refresh as authRefresh } from "../lib/auth";

interface AuthContextType {
    accessToken: string | null;
    tenantId: number | null; 
    login: (tenantId: number, email: string, password: string) => Promise<void>;
    logout: (tenantId: number) => Promise<void>;
    refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [tenantId, setTenantId] = useState<number | null>(null);

    async function login(tId: number, email: string, password: string) {
        const data = await authLogin(tId, email, password);
        setAccessToken(data.access_token);
        setTenantId(tId);
    }

    async function logout(tId: number) {
        await authLogout(tId);
        setAccessToken(null);
        setTenantId(null);
    }

    async function refresh() {
        if (!tenantId) return;
        const data = await authRefresh(tenantId);
        setAccessToken(data.access_token);
    }

    return (
        <AuthContext.Provider value={{ accessToken, tenantId, login, logout, refresh }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
}
