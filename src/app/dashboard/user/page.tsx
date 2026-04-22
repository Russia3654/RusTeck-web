"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
    id: string;
    email: string;
    full_name: string;
    role: string;
}

function roleBadge(role: string) {
    switch (role.toLowerCase()) {
        case "admin":   return "text-purple-400 bg-purple-950/40 border-purple-900/40";
        case "manager": return "text-blue-400 bg-blue-950/40 border-blue-900/40";
        default:        return "text-zinc-400 bg-zinc-800/40 border-zinc-700/40";
    }
}

export default function UsersPage() {
    const { accessToken, tenantId } = useAuth();
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!accessToken || !tenantId) return;
        async function load() {
            setLoading(true);
            try {
                const res = await fetch(`/backend/api/v1/tenants/${tenantId}/users`, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                if (res.status === 401) { router.replace("/login"); return; }
                if (res.ok) setUsers(await res.json() as User[]);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [accessToken, tenantId, router]);

    return (
        <div className="p-8 space-y-6">
            <div>
                <h1 className="text-xl font-bold text-white">Users</h1>
                <p className="text-zinc-400 text-sm mt-1">Staff accounts with access to this dashboard.</p>
            </div>
            <div className="bg-zinc-900/70 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-zinc-800">
                    <h2 className="text-white font-medium text-sm">{loading ? "Loading…" : `${users.length} users`}</h2>
                </div>
                {loading ? (
                    <div className="px-6 py-12 text-center text-zinc-500 text-sm animate-pulse">Loading…</div>
                ) : users.length === 0 ? (
                    <div className="px-6 py-12 text-center text-zinc-500 text-sm">No users yet.</div>
                ) : (
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-zinc-500 text-xs border-b border-zinc-800">
                                <th className="text-left px-6 py-3 font-medium">Name</th>
                                <th className="text-left px-6 py-3 font-medium">Email</th>
                                <th className="text-left px-6 py-3 font-medium">Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, i) => (
                                <tr key={user.id} className={i % 2 === 0 ? "bg-zinc-900/30" : ""}>
                                    <td className="px-6 py-4 text-white font-medium">{user.full_name}</td>
                                    <td className="px-6 py-4 text-zinc-400">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-block border rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${roleBadge(user.role)}`}>{user.role}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}