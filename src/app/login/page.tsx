"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
    const { login } = useAuth();
    const router = useRouter();

    const [slug, setSlug] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        const slugRegex = /^[a-z0-9][a-z0-9-]{0,48}[a-z0-9]$|^[a-z0-9]{2}$/;
        if (!slugRegex.test(slug)) {
            setError("Business ID should only contain lowercase letters, numbers, and hyphens.");
            return;
        }

        if (!email || !password) {
            setError("All fields are required.");
            return;
        }

        setLoading(true);
        try {
            await login(slug, email, password);
            router.push("/dashboard");
        } catch (err: unknown) {
            if (err instanceof Response) {
                if (err.status === 401) setError("Invalid credentials. Please check your details.");
                else if (err.status === 404) setError("Business not found. Check your Business ID.");
                else if (err.status === 429) setError("Too many attempts. Please wait a moment and try again.");
                else setError("Something went wrong. Please try again.");
            } else {
                setError("Could not connect to the server. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center px-6">
            <div className="w-full max-w-md">
                {/* Card */}
                <div className="bg-zinc-900/70 backdrop-blur-md border border-zinc-800 rounded-2xl p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-white mb-2">Sign in to RusTech</h1>
                        <p className="text-zinc-400 text-sm">Enter your tenant ID and account details.</p>
                    </div>

                    <form onSubmit={handleSubmit} noValidate className="space-y-5">
                        {/* Tenant ID */}
                        <div>
                            <label htmlFor="slug" className="block text-sm font-medium text-zinc-300 mb-1.5">
                                Business ID
                            </label>
                            <input
                                id="slug"
                                type="text"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value.toLowerCase())}
                                placeholder="e.g. my-bakery"
                                autoComplete="organization"
                                className="w-full bg-zinc-800/60 border border-zinc-700 text-white placeholder-zinc-500 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-1.5">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                autoComplete="email"
                                className="w-full bg-zinc-800/60 border border-zinc-700 text-white placeholder-zinc-500 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-zinc-300 mb-1.5">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                autoComplete="current-password"
                                className="w-full bg-zinc-800/60 border border-zinc-700 text-white placeholder-zinc-500 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                            />
                        </div>

                        {/* Error message */}
                        {error && (
                            <p className="text-red-400 text-sm bg-red-950/40 border border-red-900/50 rounded-lg px-4 py-3">
                                {error}
                            </p>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-white text-zinc-950 font-medium rounded-lg py-3 text-sm hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Signing in…" : "Sign in"}
                        </button>
                    </form>

                    {/* Footer links */}
                    <div className="mt-6 text-center text-sm text-zinc-500">
                        Don&apos;t have an account?{" "}
                        <Link href="/pricing" className="text-purple-400 hover:text-purple-300 transition-colors">
                            Get started
                        </Link>
                    </div>
                </div>

                {/* Back home */}
                <div className="text-center mt-6">
                    <Link href="/" className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">
                        ← Back to home
                    </Link>
                </div>
            </div>
        </main>
    );
}