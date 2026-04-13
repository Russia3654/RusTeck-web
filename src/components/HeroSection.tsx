import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className='min-h-screen bg-zinc-950 flex items-center justify-center px-6'>
        <div className='max-w-3xl mx-auto text-center'>
            <h1 className='text-5xl font-bold text-white leading-tight mb-6'>Your business, online. Simple.</h1>
            <p className='text-xl text-zinc-400 mb-10 leading-relaxed'>We build and manage your store&apos;s website — orders, products, and customers, all in one place.</p>
            <div className='flex items-center justify-center gap-4'>
                <Link href="/pricing" className='bg-white text-zinc-950 px-6 py-3 rounded-lg font-medium hover:bg-zinc-200 transition-colors'>Get Started</Link>
                <Link href="/login" className='border border-zinc-600 text-zinc-300 px-6 py-3 rounded-lg font-medium hover:border-zinc-400 hover:text-white transition-colors'>Sign in</Link>
            </div>
        </div>
    </section>
  )
}
