"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, MessageCircle } from "lucide-react"

function FloatingBook() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-56 h-72 sm:w-72 sm:h-96"
    >
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-full h-full [perspective:1000px]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-gold/5 to-transparent rounded-2xl blur-3xl" />
        <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-green-dark via-green to-green-light dark:from-green-dark dark:via-green dark:to-green-light shadow-2xl overflow-hidden border border-gold/20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(211,194,151,0.15),transparent_50%)]" />
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-gold-light to-gold" />
          <div className="p-6 sm:p-8 flex flex-col h-full">
            <div className="mb-4">
              <div className="flex items-center gap-1">
                <span className="text-gold text-[10px] font-semibold tracking-wider opacity-70">PT</span>
                <span className="text-cream text-xs font-bold opacity-70">Mughis Cipta Media</span>
              </div>
            </div>
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-gold/20 rounded w-3/4" />
              <div className="h-3 bg-gold/20 rounded w-1/2" />
              <div className="h-3 bg-gold/20 rounded w-5/6 mt-4" />
              <div className="h-3 bg-gold/20 rounded w-2/3" />
              <div className="h-3 bg-gold/20 rounded w-4/5 mt-4" />
              <div className="h-3 bg-gold/20 rounded w-1/3" />
            </div>
            <div className="flex items-center gap-2 pt-4 border-t border-gold/20">
              <div className="w-6 h-6 rounded-full bg-gold/30" />
              <div className="h-2 bg-gold/20 rounded w-20" />
            </div>
          </div>
          <motion.div
            animate={{
              background: [
                "radial-gradient(circle at 50% 50%, rgba(211,194,151,0.1), transparent 60%)",
                "radial-gradient(circle at 60% 40%, rgba(211,194,151,0.2), transparent 60%)",
                "radial-gradient(circle at 50% 50%, rgba(211,194,151,0.1), transparent 60%)",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-0 pointer-events-none"
          />
        </div>
      </motion.div>
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-4 left-10 right-10 h-6 bg-gold/10 blur-xl rounded-full"
      />
    </motion.div>
  )
}

function ParticleField() {
  const [particles] = useState(() =>
    Array.from({ length: 20 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 5 + 5,
    }))
  )

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gold/20"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  }

  return (
    <motion.section
      ref={ref}
      style={{ opacity }}
      className="relative min-h-screen flex items-center bg-gradient-to-br from-green via-green-dark to-green overflow-hidden"
    >
      <ParticleField />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(211,194,151,0.12),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(211,194,151,0.08),transparent_50%)]" />

      <div className="container relative z-10 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-xl"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse-glow" />
              <span className="text-gold text-xs sm:text-sm font-medium tracking-wide uppercase">
                Penerbit & Percetakan Profesional
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight"
            >
              Membangun Peradaban
              <br />
              <span className="bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
                Melalui Buku
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 text-lg sm:text-xl text-cream/80 leading-relaxed max-w-lg"
            >
              PT Mughis Cipta Media membantu penulis, institusi, dan organisasi
              menerbitkan karya berkualitas melalui layanan penerbitan,
              percetakan, dan distribusi buku secara profesional.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link
                href="/katalog"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-cream hover:bg-cream/90 text-green font-semibold rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-gold/25 hover:-translate-y-0.5"
              >
                Terbitkan Buku
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/kontak"
                className="inline-flex items-center gap-2 px-8 py-4 border border-cream/30 text-cream font-semibold rounded-full hover:bg-cream/10 transition-all duration-300 hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4" />
                Konsultasi Gratis
              </Link>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-12 flex items-center gap-8 text-sm text-cream/70"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-gold/30 bg-green-dark/80 flex items-center justify-center text-[10px] text-gold/80 font-medium"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <span>Dipercaya <strong className="text-gold/90">100+</strong> penulis & institusi</span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="hidden lg:flex items-center justify-center"
          >
            <FloatingBook />
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-gold"
          />
        </div>
      </motion.div>
    </motion.section>
  )
}
