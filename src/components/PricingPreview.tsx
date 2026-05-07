import Link from 'next/link'
export default function PricingPreview() {
    const features = [
        {name: "Basic", price: "19$/mo", description: "Hosting, SSL, backups, up to 5 users" },
        {name: "Pro", price: "49$/mo", description: "All Basic features, plus analytics and priority support" },
        {name: "Pro Max", price: "99$/mo", description: "All Pro features, plus custom domain" },
    ]
    return (
        <section aria-label="Pricing" className='bg-zinc-950/70 backdrop-blur-sm relative z-10 py-24 px-6'>
            <div className='max-w-6xl mx-auto text-center mb-16'>
                <h2 className='text-3xl font-bold text-white mb-4'>Simple, transparent pricing</h2>
                <p className='text-zinc-400 text-lg'>No hidden fees. Cancel anytime.</p>
            </div>
            <div className='max-w-4xl mx-auto mb-16'>
                <h3 className='text-xl font-semibold text-white mb-6 text-center'>Monthly plans</h3>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
                    {features.map((feature) => (
                        <div key={feature.name} className='bg-zinc-900/70 border border-zinc-800 rounded-xl p-8 text-center'>
                            <h4 className='text-lg font-semibold text-white mb-2'>{feature.name}</h4>
                            <p className='text-2xl font-bold text-white mb-3'>{feature.price}</p>
                            <p className='text-zinc-400 text-sm'>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className='text-center mt-4'>
                <Link href="/pricing" className='text-zinc-400 hover:text-white transition-colors text-sm underline'>See full pricing</Link>
            </div>
        </section>
    )
}
