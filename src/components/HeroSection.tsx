"use client"

import Link from 'next/link'
import CircuitBackground from './CircuitBackground'
import { motion } from "framer-motion"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-zinc-950 flex items-center justify-center px-6">
      <CircuitBackground />
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.h1
          className='text-5xl font-bold text-white leading-tight mb-6'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >Your business, online. Simple.</motion.h1>
        <motion.p
          className='text-xl text-zinc-400 mb-10 leading-relaxed'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >We build and manage your store&apos;s website — orders, products, and customers, all in one place.</motion.p>
        <motion.div
          className='flex items-center justify-center gap-4'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}>
          <Link href="/pricing" className='bg-white text-zinc-950 px-6 py-3 rounded-lg font-medium hover:bg-zinc-200 transition-colors'>Get Started</Link>
          <Link href="/login" className='border border-zinc-600 text-zinc-300 px-6 py-3 rounded-lg font-medium hover:border-zinc-400 hover:text-white transition-colors'>Sign in</Link>
        </motion.div>
      </div>
    </section>
  )
}
