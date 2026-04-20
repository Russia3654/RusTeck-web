"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface OrderItem {
    recipe_id: string;
    quantity: number;
}

interface Order {
    id: string;
    customer_name: string;
    status: string;
    delivery_date: string;
    items: OrderItem[];
}

function statusColor(status: string) {
    switch (status.toLowerCase()) {
        case "pending":
            return "text-yellow-400 bg-yellow-950/40 border-yellow-900/40";
        case "confirmed":
            return "text-blue-400 bg-blue-950/40 border-blue-900/40";
        case "completed":
            return "text-green-400 bg-green-950/40 border-green-900/40";
        case "cancelled":
            return "text-red-400 bg-red-950/40 border-red-900/40";
        default:
            return "text-zinc-400 bg-zinc-800/40 border-zinc-700/40";
    }
}

export default function DashboardPage() {
    const { accessToken, tenantId, logout, refresh } = useAuth();
    const router = useRouter();
    
    const [orders, setOrders] = useState<Order[]>([]);
    const [loadingData, setLoadingData] = useState(false);
    const [booting, setBooting] = useState(true);

    useEffect(() => {
        async function boot() {
            if (!accessToken) {
                await refresh();
            }
            setBooting(false);
        }
        boot();
    }, [accessToken, refresh]);

    useEffect(() => {
        if (booting) return;
        if (!accessToken || !tenantId){
            router.replace("/login");
            return;
        }

        async function fetchOrders() {
            setLoadingData(true);
            try {
                const res = await fetch(`/api/orders?tenant_id=${tenantId}`, {
                    headers: { Authorization: ` Bearer ${accessToken}`},
                })
                if (res.status == 401) {router.replace("/login"); return; }
                if (res.ok) setOrders(await res.json() as Order[]);
            } finally {
                setLoadingData(false);
            }
        }

        fetchOrders();
    }, [booting, accessToken, tenantId, router]);

    async function handleLogout() {
        await logout();
        router.replace("/login");
    }

    if (booting) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <p className="text-zinc-400 text-sm animate-pulse">Loading…</p>
            </main>
        );
    }

    const pending   = orders.filter(o => o.status.toLowerCase() === "pending").length;
    const completed = orders.filter(o => o.status.toLowerCase() === "completed").length;

    return (
        <main className="min-h-screen px-6 py-10">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                        <p className="text-zinc-400 text-sm mt-1">Welcome back. Here&apos;s what&apos;s happening.</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="border border-zinc-700 text-zinc-300 px-4 py-2 rounded-lg text-sm hover:border-zinc-500 hover:text-white transition-colors"
                    >
                        Sign out
                    </button>
                </div>

                {/* Stat cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { label: "Total Orders", value: orders.length },
                        { label: "Pending",       value: pending },
                        { label: "Completed",     value: completed },
                    ].map(stat => (
                        <div key={stat.label} className="bg-zinc-900/70 backdrop-blur-sm border border-zinc-800 rounded-xl p-6">
                            <p className="text-zinc-400 text-sm mb-1">{stat.label}</p>
                            <p className="text-3xl font-bold text-white">{loadingData ? "—" : stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Orders table */}
                <div className="bg-zinc-900/70 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-zinc-800">
                        <h2 className="text-white font-semibold">Recent Orders</h2>
                    </div>

                    {loadingData ? (
                        <div className="px-6 py-12 text-center text-zinc-500 text-sm animate-pulse">Loading orders…</div>
                    ) : orders.length === 0 ? (
                        <div className="px-6 py-12 text-center text-zinc-500 text-sm">No orders yet.</div>
                    ) : (
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-zinc-500 text-xs border-b border-zinc-800">
                                    <th className="text-left px-6 py-3 font-medium">Customer</th>
                                    <th className="text-left px-6 py-3 font-medium">Status</th>
                                    <th className="text-left px-6 py-3 font-medium">Delivery</th>
                                    <th className="text-left px-6 py-3 font-medium">Items</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, i) => (
                                    <tr key={order.id} className={i % 2 === 0 ? "bg-zinc-900/30" : ""}>
                                        <td className="px-6 py-4 text-white font-medium">{order.customer_name}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-block border rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-zinc-400">
                                            {new Date(order.delivery_date).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-zinc-400">{order.items.length}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

            </div>
        </main>
    );
}
