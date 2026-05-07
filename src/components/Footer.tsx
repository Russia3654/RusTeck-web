import Link from 'next/link'

export default function Footer() {
    return (
        <footer className='bg-zinc-950/85 backdrop-blur-sm relative z-10 border-t border-zinc-800 py-12 px-6'>
            <div className='max-w-6xl mx-auto'>
                <div className='flex items-center justify-between mb-8'>
                    <span className='text-white font-bold text-lg'>RusTech</span>
                    <div className='flex items-center gap-6'>
                        <Link href="/" className='text-zinc-400 hover:text-white transition-colors text-sm'>Home</Link>
                        <Link href="/pricing" className='text-zinc-400 hover:text-white transition-colors text-sm'>Pricing</Link>
                        <Link href="/login" className='text-zinc-400 hover:text-white transition-colors text-sm'>Sign In</Link>
                    </div>
                </div>
                <div className='border-t border-zinc-800 pt-8 text-center'>
                    <p className='text-zinc-500 text-sm'>© 2026 RusTech. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
