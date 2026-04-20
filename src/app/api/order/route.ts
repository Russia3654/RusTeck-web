import { NextRequest } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_RUSTECH_API_URL ?? "";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const tenant_id = searchParams.get("tenant_id");
    const authorization = request.headers.get("authorization") ?? "";

    if (!tenant_id) {
        return Response.json({ error: "Missing tenant_id" }, { status: 400 });
    }

    const res = await fetch(
        `${API_URL}/api/v1/tenants/${tenant_id}/orders?limit=20`,
        { headers: { Authorization: authorization } }
    );

    if (!res.ok) {
        return Response.json({ error: "Failed to fetch orders." }, { status: res.status });
    }

    return Response.json(await res.json());
}