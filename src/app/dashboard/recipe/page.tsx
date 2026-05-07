"use client";

import { useTenantFetch } from "@/hooks/useTenantFetch";

interface Recipe {
    id: string;
    name: string;
    description: string;
    batch_size: number;
    ingredients: unknown[];
}

export default function RecipesPage() {
    const { data: recipes, loading, error } = useTenantFetch<Recipe>("recipes");

    return (
        <div className="p-8 space-y-6">
            <div>
                <h1 className="text-xl font-bold text-white">Recipes</h1>
                <p className="text-zinc-400 text-sm mt-1">Your product recipes and batch configurations.</p>
            </div>
            {error && (
                <p role="alert" className="text-red-400 text-sm bg-red-950/40 border border-red-900/40 rounded-lg px-4 py-3">{error}</p>
            )}
            <div className="bg-zinc-900/70 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-zinc-800">
                    <h2 className="text-white font-medium text-sm">{loading ? "Loading…" : `${recipes.length} recipes`}</h2>
                </div>
                {loading ? (
                    <div className="px-6 py-12 text-center text-zinc-500 text-sm animate-pulse">Loading…</div>
                ) : recipes.length === 0 ? (
                    <div className="px-6 py-12 text-center text-zinc-500 text-sm">No recipes yet.</div>
                ) : (
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-zinc-500 text-xs border-b border-zinc-800">
                                <th scope="col" className="text-left px-6 py-3 font-medium">Name</th>
                                <th scope="col" className="text-left px-6 py-3 font-medium">Description</th>
                                <th scope="col" className="text-left px-6 py-3 font-medium">Batch size</th>
                                <th scope="col" className="text-left px-6 py-3 font-medium">Ingredients</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recipes.map((recipe, i) => (
                                <tr key={recipe.id} className={i % 2 === 0 ? "bg-zinc-900/30" : ""}>
                                    <td className="px-6 py-4 text-white font-medium">{recipe.name}</td>
                                    <td className="px-6 py-4 text-zinc-400 max-w-xs truncate">{recipe.description || <span className="text-zinc-600">—</span>}</td>
                                    <td className="px-6 py-4 text-zinc-400">{recipe.batch_size}</td>
                                    <td className="px-6 py-4 text-zinc-400">{recipe.ingredients.length}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}