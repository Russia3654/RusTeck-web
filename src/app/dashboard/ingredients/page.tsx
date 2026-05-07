"use client";

import { useTenantFetch } from "@/hooks/useTenantFetch";

interface Ingredient {
    id: string;
    name: string;
    unit: string;
    stock_quantity: number;
    cost_per_unit: number;
    stock_status: string;
}

function stockBadge(status: string) {
    switch (status.toLowerCase()) {
        case "low": return "text-red-400 bg-red-950/40 border-red-900/40";
        case "ok": return "text-green-400 bg-green-950/40 border-green-900/40";
        default: return "text-zinc-400 bg-zinc-800/40 border-zinc-700/40";
    }
}

export default function IngredientsPage() {
    const { data: ingredients, loading, error } = useTenantFetch<Ingredient>("ingredients");
    const lowStock = ingredients.filter(i => i.stock_status.toLowerCase() === "low").length;

    return (
        <div className="p-8 space-y-6">
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-xl font-bold text-white">Ingredients</h1>
                    <p className="text-zinc-400 text-sm mt-1">Stock levels and ingredient inventory.</p>
                </div>

                {!loading && lowStock > 0 && (
                    <div className="flex items-center gap-2 bg-red-950/40 border border-red-900/40 rounded-lg px-3 py-2">
                        <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                        <span className="text-red-400 text-sm font-medium">{lowStock} low stock</span>
                    </div>
                )}
            </div>
            {error && (
                <p role="alert" className="text-red-400 text-sm bg-red-950/40 border border-red-900/40 rounded-lg px-4 py-3">{error}</p>
            )}
            <div className="bg-zinc-900/70 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-zinc-800">
                    <h2 className="text-white font-medium text-sm">{loading ? "Loading…" : `${ingredients.length} ingredients`}</h2>
                </div>
                {loading ? (
                    <div className="px-6 py-12 text-center text-zinc-500 text-sm animate-pulse">Loading…</div>
                ) : ingredients.length === 0 ? (
                    <div className="px-6 py-12 text-center text-zinc-500 text-sm">No ingredients yet.</div>
                ) : (
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-zinc-500 text-xs border-b border-zinc-800">
                                <th scope="col" className="text-left px-6 py-3 font-medium">Name</th>
                                <th scope="col" className="text-left px-6 py-3 font-medium">Stock</th>
                                <th scope="col" className="text-left px-6 py-3 font-medium">Unit</th>
                                <th scope="col" className="text-left px-6 py-3 font-medium">Cost / unit</th>
                                <th scope="col" className="text-left px-6 py-3 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ingredients.map((ing, i) => (
                                <tr key={ing.id} className={i % 2 === 0 ? "bg-zinc-900/30" : ""}>
                                    <td className="px-6 py-4 text-white font-medium">{ing.name}</td>
                                    <td className="px-6 py-4 text-zinc-400">{ing.stock_quantity}</td>
                                    <td className="px-6 py-4 text-zinc-400">{ing.unit}</td>
                                    <td className="px-6 py-4 text-zinc-400">€{ing.cost_per_unit.toFixed(2)}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-block border rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${stockBadge(ing.stock_status)}`}>{ing.stock_status}</span>
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