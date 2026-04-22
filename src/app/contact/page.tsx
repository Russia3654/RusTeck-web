"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

const setupOptions = ["", "Starter", "Standard", "Advanced"];
const monthlyOptions = ["", "Basic", "Pro", "Pro Max"];

function ContactForm() {
    const searchParams = useSearchParams();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [setup, setSetup] = useState(searchParams.get("setup") ?? "");
    const [monthly, setMonthly] = useState(searchParams.get("monthly") ?? "");
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const inputClass = "w-full bg-zinc-800/60 border border-zinc-700 text-white placeholder-zinc-500 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors";
    const selectClass = `${inputClass} appearance-none cursor-pointer`;

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        if (!name || !email) {
            setError("Name and email are required.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    email,
                    setup_plan: setup || null,
                    monthly_plan: monthly || null,
                    message: message || null,
                }),
            });
            if (!res.ok) throw new Error();
            setSubmitted(true);
        } catch {
            setError("Something went wrong. Please try again or email us directly.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center px-6 py-16">
            <div className="w-full max-w-lg">
                <div className="bg-zinc-900/70 backdrop-blur-md border border-zinc-800 rounded-2xl p-8">
                    {submitted ? (
                        <div className="text-center py-8">
                            <div className="text-4xl mb-4">✓</div>
                            <h2 className="text-xl font-bold text-white mb-3">We&apos;ll be in touch!</h2>
                            <p className="text-zinc-400 text-sm mb-6">
                                Thanks for reaching out. We&apos;ll contact you at{" "}
                                <span className="text-white">{email}</span> within 1 business day.
                            </p>
                            <Link href="/" className="text-purple-400 hover:text-purple-300 text-sm transition-colors">← Back to home</Link>
                        </div>
                    ) : (
                        <>
                            <div className="text-center mb-8">
                                <h1 className="text-2xl font-bold text-white mb-2">Get in touch</h1>
                                <p className="text-zinc-400 text-sm">We&apos;ll set up your store and get you started.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-1.5">Full name</label>
                                    <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Jane Smith" autoComplete="name" className={inputClass} />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-1.5">Email</label>
                                    <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" className={inputClass} />
                                </div>

                                {/* Two plan dropdowns side by side */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label htmlFor="setup" className="block text-sm font-medium text-zinc-300 mb-1.5">Setup plan</label>
                                        <select id="setup" value={setup} onChange={e => setSetup(e.target.value)} className={selectClass}>
                                            {setupOptions.map(o => (
                                                <option key={o} value={o} className="bg-zinc-900">{o || "None"}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="monthly" className="block text-sm font-medium text-zinc-300 mb-1.5">Monthly plan</label>
                                        <select id="monthly" value={monthly} onChange={e => setMonthly(e.target.value)} className={selectClass}>
                                            {monthlyOptions.map(o => (
                                                <option key={o} value={o} className="bg-zinc-900">{o || "None"}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-zinc-300 mb-1.5">
                                        Message <span className="text-zinc-500">(optional)</span>
                                    </label>
                                    <textarea id="message" rows={3} value={message} onChange={e => setMessage(e.target.value)} placeholder="Tell us about your business…" className={`${inputClass} resize-none`} />
                                </div>

                                {error && (
                                    <p className="text-sm text-red-400">{error}</p>
                                )}
                                <button type="submit" disabled={loading} className="w-full bg-linear-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg py-3 text-sm transition-all">
                                    {loading ? "Sending…" : "Send message"}
                                </button>
                            </form>

                            <div className="mt-6 text-center">
                                <Link href="/pricing" className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">← Back to pricing</Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </main>
    );
}

export default function ContactPage() {
    return (
        <Suspense>
            <ContactForm />
        </Suspense>
    );
}