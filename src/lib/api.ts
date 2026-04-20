const BASE_URL = process.env.NEXT_PUBLIC_RUSTECH_API_URL ?? "";
async function apiFetch(path: string, options?: RequestInit) {
    const response = await fetch(BASE_URL + path, {
        headers: {
            'Content-Type': 'application/json',
        },
        ...options,
    });
    if (!response.ok) {
        throw response;
    }
    return response.json();
}

export function loginTenant(tenantId: string, email: string, password: string) {
    const credentials = { email, password };
    return apiFetch(`/api/v1/auth/tenants/${tenantId}/login`, {
        method: 'POST',
        body: JSON.stringify(credentials),
        credentials: "include",
    })
}

export function refreshToken(tenantId: string) {
    return apiFetch(`/api/v1/auth/tenants/${tenantId}/refresh`, {
        method: 'POST',
        credentials: "include",
    })
}

export function logoutTenant(tenantId: string) {
    return apiFetch(`/api/v1/auth/tenants/${tenantId}/logout`, {
        method: 'POST',
        credentials: "include",
    })
}