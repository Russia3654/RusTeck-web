"use client"

import { motion } from "framer-motion";
import Link from "next/link";

interface PricingCardProps {
    name: string;
    price: string;
    description: string;
    features: string[];
    highlighted?: boolean;
    cta?: string;
    href?: string;
}

export default function PricingCard({ name, price, description, features, highlighted, cta, href }: PricingCardProps) {
    return (
        <motion.div
            className={`rounded-xl p-8 border ${highlighted ? "border-purple-500 bg-zinc-800" : "border-zinc-800 bg-zinc-900"}`}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            >
            {highlighted && (
                <span className="text-xs font-semibold text-purple-400 uppercase tracking-widest">Popular</span>
            )}
            <h3 className="text-xl font-bold text-white mt-2 mb-1">{name}</h3>
            <div className="text-3xl font-bold text-white mb-3">{price}</div>
            <p className="text-zinc-400 text-sm mb-6">{description}</p>
            <ul className="space-y-2 mb-8">
                {features.map((f) => (
                    <li key={f} className="text-zinc-300 text-sm flex items-center gap-2">
                        <span className="text-purple-400">✓</span> {f}
                    </li>
                ))}
            </ul>
            {cta && href && (
                <Link href={href} className="block w-full py-2 rounded-lg text-sm font-medium bg-linear-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white transition-all text-center">
                    {cta}
                </Link>
            )}
        </motion.div>
    )
}
