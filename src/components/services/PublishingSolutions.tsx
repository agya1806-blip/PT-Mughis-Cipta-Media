"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { BookOpen, Printer, FileEdit, Palette, Hash, Truck, ArrowRight } from "lucide-react"
import SolutionCard from "@/components/ui/SolutionCard"

const solutions = [
  {
    icon: <BookOpen className="w-6 h-6 text-gold" />,
    title: "Penerbitan Buku",
    description: "Layanan penerbitan buku profesional dari naskah hingga ISBN. Kami mendampingi penulis dalam setiap tahap penerbitan.",
  },
  {
    icon: <Printer className="w-6 h-6 text-gold" />,
    title: "Percetakan Buku",
    description: "Percetakan buku berkualitas tinggi dengan berbagai pilihan finishing premium dan jumlah cetak yang fleksibel.",
  },
  {
    icon: <FileEdit className="w-6 h-6 text-gold" />,
    title: "Editorial & Layout",
    description: "Layanan editing naskah, proofreading, layout, dan typesetting oleh profesional berpengalaman di bidangnya.",
  },
  {
    icon: <Palette className="w-6 h-6 text-gold" />,
    title: "Desain Cover",
    description: "Desain cover buku eksklusif yang mencerminkan identitas dan nilai dari buku Anda.",
  },
  {
    icon: <Hash className="w-6 h-6 text-gold" />,
    title: "ISBN & Administrasi",
    description: "Bantuan pengurusan ISBN dan administrasi penerbitan secara lengkap dan terpercaya.",
  },
  {
    icon: <Truck className="w-6 h-6 text-gold" />,
    title: "Distribusi Buku",
    description: "Dukungan distribusi buku ke toko buku dan pasar yang lebih luas di seluruh Indonesia.",
  },
]

const staggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.3 },
  },
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
}

export default function PublishingSolutions() {
  return (
    <section className="py-16 sm:py-20 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 mb-6">
            <span className="text-gold text-[11px] font-medium uppercase tracking-[0.1em]">
              Solusi Penerbitan
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white leading-[1.15] tracking-tight text-balance">
            Solusi{" "}
            <span className="bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent">
              Penerbitan Lengkap
            </span>
          </h1>
          <p className="mt-4 text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Solusi lengkap untuk mewujudkan naskah Anda menjadi buku yang diterbitkan secara profesional.
          </p>
        </motion.div>

        <motion.div
          variants={staggerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {solutions.map((solution, index) => (
            <SolutionCard
              key={solution.title}
              icon={solution.icon}
              title={solution.title}
              description={solution.description}
              index={index}
            />
          ))}
        </motion.div>

        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <Link
            href="/kontak"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-gold hover:bg-gold-dark text-white font-semibold rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-gold/25 hover:-translate-y-0.5"
          >
            Konsultasi Gratis
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
