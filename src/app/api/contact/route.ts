import { type NextRequest, NextResponse } from "next/server";

const API_URL = process.env.RUSTECH_API_URL ?? "";

export async function POST(request: NextRequest) {
    try {
        const raw = await request.json() as Record<string, unknown>;
        const body = {
            name: raw.name,
            email: raw.email,
            setup_plan: raw.setup_plan ?? null,
            monthly_plan: raw.monthly_plan ?? null,
            message: raw.message,
        };
        const res = await fetch(`${API_URL}/api/v1/contact`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        if (!res.ok) return NextResponse.json({ detail: "Unable to send message." }, { status: 500 });
        return NextResponse.json({ ok: true });
    } catch {
        return NextResponse.json({ detail: "Failed to reach server." }, { status: 502 });
    }
}