import { type NextRequest } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_RUSTECH_API_URL ?? "";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { slug, email, password } = body as { slug?: string; email?: string; password?: string };

    if (!slug || !email || !password) {
        return Response.json({ error: "Missing required fields." }, { status: 400 });
    }

    const slugRes = await fetch(`${API_URL}/api/v1/auth/tenants/by-slug/${encodeURIComponent(slug)}`);
    if (!slugRes.ok) {
        return Response.json(
            { error: slugRes.status === 404 ? "Business not found." : "Could not resolve tenant." },
            { status: slugRes.status }
        );
    }
    const { tenant_id } = await slugRes.json() as { tenant_id: string };

    const loginRes = await fetch(`${API_URL}/api/v1/auth/tenants/${tenant_id}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!loginRes.ok) {
        return Response.json(
            { error: loginRes.status === 401 ? "Invalid credentials. Please check your details." : "Login failed. Please try again." },
            { status: loginRes.status }
        );
    }

    const data = await loginRes.json() as { access_token: string; token_type: string };

    const responseHeaders = new Headers({"Content-Type": "application/json" });
    const setCookieHeader = loginRes.headers.get("Set-Cookie");
    if (setCookieHeader) {
        responseHeaders.set("Set-Cookie", setCookieHeader);
    }

    return new Response(
        JSON.stringify({ access_token: data.access_token, tenant_id, token_type: data.token_type }),
        { status: 200, headers: responseHeaders }
    );
}