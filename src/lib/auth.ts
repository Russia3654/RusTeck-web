import { loginTenant, refreshToken, logoutTenant } from "./api";

export interface AuthResponse {
    access_token: string;
    token_type: string;
}

export async function login(tenantId: number, email: string, password: string): Promise<AuthResponse> {
    return await loginTenant(tenantId, email, password);
}

export async function refresh(tenantId: number): Promise<AuthResponse> {
    return await refreshToken(tenantId);
}

export async function logout(tenantId: number): Promise<void> {
    await logoutTenant(tenantId);
}