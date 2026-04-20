import { type NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_RUSTECH_API_URL ?? "";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const res = await fetch(`${API_URL}/api/v1/contact`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        const data = await res.json().catch(() => null);
        return NextResponse.json(data, { status: res.status });
    } catch {
        return NextResponse.json({ detail: "Failed to reach server." }, { status: 502 });
    }
}