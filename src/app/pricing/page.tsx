import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import PricingCard from "@/components/PricingCard"
import Link from "next/link"

export default function PricingPage() {
    const setupPlans = [
        { name: "Starter", price: "$200 - $300", description: "1 page (Home + Contact info)", features: ["Home page", "Contact info", "Mobile responsive", "1 revision"], cta: "Get Started", href: "/contact?setup=Starter" },
        { name: "Standard", price: "$400 - $600", description: "2 - 3 pages", features: ["Home, Products, Contact", "Order form", "Mobile responsive", "3 revisions"], highlighted: true, cta: "Get Started", href: "/contact?setup=Standard" },
        { name: "Advanced", price: "$800 - $1200", description: "3+ pages + custom design", features: ["All Standard features", "Custom design", "animations", "Unlimited revisions"], cta: "Get Started", href: "/contact?setup=Advanced" },
    ]
    const monthlyPlans = [
        { name: "Basic", price: "$19/mo", description: "For small businesses", features: ["Hosting & SSL", "Backups", "Up to 3 users", "Email support"], cta: "Choose Basic", href: "/contact?monthly=Basic" },
        { name: "Pro", price: "$49/mo", description: "Most popular choice", features: ["All Basic features", "Analytics", "Up to 10 users", "Priority support"], highlighted: true, cta: "Choose Pro", href: "/contact?monthly=Pro" },
        { name: "Pro Max", price: "$99/mo", description: "For growing businesses", features: ["All Pro features", "Custom domain", "Unlimited users", "Dedicated support", "SLA guarantee"], cta: "Choose Pro Max", href: "/contact?monthly=ProMax" },
    ]
    return (
        <div className="bg-zinc-950 min-h-screen relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.15)_0%,transparent_60%)] pointer-events-none"/>
            <Navbar />
            <main>
                <div className="relative bg-linear-to-b from-purple-950/40 to-transparent pt-24 pb-16 px-6 text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Simple, transparent pricing</h1>
                    <p className="text-zinc-400 text-lg">No hidden fees. No surprises. Cancel anytime.</p>
                </div>
                <div className="max-w-6xl mx-auto px-6 py-16">
                    <h2 className="text-2xl font-bold text-white mb-8 text-center">One-time setup</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                        {setupPlans.map((plan) => (
                            <PricingCard key={plan.name} {...plan} />
                        ))}
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-8 text-center">Monthly plans</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                        {monthlyPlans.map((plan) => (
                            <PricingCard key={plan.name} {...plan} />
                        ))}
                    </div>
                </div>
                <div className="text-center py-16 border-t border-zinc-800">
                    <h2 className="text-2xl font-bold text-white mb-3">Ready to get started?</h2>
                    <p className="text-zinc-400 mb-8">Order your website today or sign in to your existing dashboard.</p>
                    <div className="flex items-center justify-center gap-4">
                        <Link href="/contact" className="bg-linear-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white px-8 py-3 rounded-lg font-medium transition-all">
                            Order a Website
                        </Link>
                        <Link href="/login" className="border border-zinc-600 text-zinc-300 px-8 py-3 rounded-lg font-medium hover:border-zinc-400 hover:text-white transition-colors">
                            Sign In
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
