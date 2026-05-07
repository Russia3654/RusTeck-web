import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
    return (
        <nav aria-label="Main navigation" className='sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800'>
            <div className='max-w-6xl mx-auto px-6 py-4 flex items-center justify-between'>
                <Link href="/">
                    <Image
                        src="/RusTech-Logo.png"
                        alt="RusTech logo"
                        width={160}
                        height={48}
                        className="h-10 w-auto"
                    />
                </Link>
                <div className='flex items-center gap-8'>
                    <Link href="/" className='text-zinc-400 hover:text-white transition-colors text-sm'>Home</Link>
                    <Link href="/pricing" className='text-zinc-400 hover:text-white transition-colors text-sm'>Pricing</Link>
                </div>
                <Link href="/login" className='bg-white text-zinc-950 px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-200 transition-colors'>Sign In</Link>
            </div>
        </nav>
    )
}
