import { type NextRequest } from "next/server";

const API_URL = process.env.RUSTECH_API_URL ?? "";

export async function POST(request: NextRequest) {
    const { tenant_id } = await request.json() as { tenant_id?: string };

    if (!tenant_id) {
        return Response.json({ error: "Missing tenant_id." }, { status: 400 });
    }

    const cookieHeader = request.headers.get("cookie") ?? "";
    await fetch(`${API_URL}/api/v1/auth/tenants/${tenant_id}/logout`, {
        method: "POST",
        headers: { "Cookie": cookieHeader },
    });

    return new Response(null, {
        status: 204,
        headers: {
            "Set-Cookie": "session=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0",
        },
    });
}