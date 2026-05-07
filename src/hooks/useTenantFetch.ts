"use client"

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export function useTenantFetch<T>(path: string) {
    const { accessToken, tenantId } = useAuth();
    const router = useRouter();
    const [data , setData] = useState<T[]>([]);
    const [loading,setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const load = useCallback(async (signal: AbortSignal) => {
        if (!accessToken || !tenantId)  return;
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`/backend/api/v1/tenants/${tenantId}/${path}`,{
                headers: { Authorization: `Bearer ${accessToken}` },
                signal,
            });
            if (res.status === 401) { router.replace("/login"); return; }
            if (!res.ok) { setError("Failed to load data. Please try again."); return; }
            setData(await res.json() as T[]);
        } catch (e) {
            if ((e as Error).name !== "AbortError") setError("Failed to load data. Please try again.");
        } finally {
            setLoading(false);
        }
    }, [accessToken, tenantId, path, router]);

    useEffect(() => {
        const controller = new AbortController();
        load(controller.signal);
        return () => controller.abort();
    }, [load]);

    return { data, loading, error};
}