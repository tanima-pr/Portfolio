'use client'

import React, { useEffect, useState } from 'react'
import Magnet from './Magnet'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Work', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'py-4' : 'py-8'}`}>
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">

        {/* Logo */}
        <a
          href="#home"
          className="text-lg font-black tracking-tighter text-white uppercase relative overflow-hidden"
        >
          TG
        </a>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-[10px] font-semibold tracking-[0.25em] uppercase text-white/40 hover:text-white transition-colors duration-300"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* CTA */}
        <Magnet strength={5}>
          <a
            href="mailto:Tanimagargt.g@gmail.com"
            className="px-5 py-2 border border-white/15 rounded-full text-[10px] font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all duration-300"
          >
            Hire Me
          </a>
        </Magnet>
      </div>

      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 -z-10 bg-[#0C0C0C]/80 backdrop-blur-xl border-b border-white/5"
          />
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
