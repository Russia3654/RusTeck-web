import { type NextRequest } from "next/server";

const API_URL = process.env.RUSTECH_API_URL ?? "";

export async function POST(request: NextRequest) {
    const { tenant_id } = await request.json() as { tenant_id?: string };

    if (!tenant_id) {
        return Response.json({ error: "Missing tenant_id." }, { status: 400 });
    }

    const cookieHeader = request.headers.get("cookie") ?? "";
    const refreshRes = await fetch(`${API_URL}/api/v1/auth/tenants/${tenant_id}/refresh`, {
        method: "POST",
        headers: { "Cookie": cookieHeader },
    });

    if (!refreshRes.ok) {
        return Response.json({ error: "Session expired. Please log in again." }, { status: refreshRes.status });
    }

    const data = await refreshRes.json() as { access_token: string };

    const responseHeaders = new Headers({ "Content-Type": "application/json" });
    const setCookieHeader = refreshRes.headers.get("set-cookie");
    if (setCookieHeader) {
        responseHeaders.set("Set-Cookie", setCookieHeader);
    }

    return new Response(JSON.stringify({ access_token: data.access_token }), {
        status: 200,
        headers: responseHeaders,
    });
}