export default function FeaturesSection() {
    const features = [
        {
            icon: "🛒",
            title: "Order Management",
            description: "Track and manage every customer order in real time, from placement to delivery."
        },
        {
            icon: "📦",
            title: "Product Catalog",
            description: "Add, edit, and organize your products with ease. No technical knowledge required."
        },
        {
            icon: "📊",
            title: "Simple Dashboard",
            description: "Everything you need to run your business, presented clearly in one place."
        },
    ]
    return (
        <section className='bg-zinc-900 py-24 px-6'>
            <div className='max-w-6xl mx-auto text-center mb-16'>
                <h2 className='text-3xl font-bold text-white mb-4'>Everything your business needs</h2>
                <p className='text-zinc-400 text-lg'>Built to help you focus on what matters — your customers.</p>
                <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8'>
                    {features.map((feature) => (
                        <div key={feature.title} className='bg-zinc-800 rounded-xl p-8'>
                            <div className='text-4xl mb-4'>{feature.icon}</div>
                            <h3 className='text-xl font-semibold text-white mb-3'>{feature.title}</h3>
                            <p className='text-zinc-400 leading-relaxed'>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
