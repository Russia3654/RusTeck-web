import { loginTenant, refreshToken, logoutTenant } from "./api";

export interface AuthResponse {
    access_token: string;
    refresh_token: string;
    token_type: string;
}

export async function login(tenantId: string, email: string, password: string): Promise<AuthResponse> {
    return await loginTenant(tenantId, email, password);
}

export async function refresh(tenantId: string): Promise<AuthResponse> {
    return await refreshToken(tenantId);
}
export async function logout(tenantId: string): Promise<void> {
    await logoutTenant(tenantId);
}