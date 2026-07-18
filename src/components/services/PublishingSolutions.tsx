"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { BookOpen, Printer, FileEdit, Palette, Hash, Truck, ArrowRight } from "lucide-react"
import SolutionCard from "@/components/ui/SolutionCard"

const solutions = [
  {
    icon: <BookOpen className="w-6 h-6 text-gold" />,
    title: "Book Publishing",
    description: "Professional publishing support from manuscript submission to ISBN registration.",
  },
  {
    icon: <Printer className="w-6 h-6 text-gold" />,
    title: "Book Printing",
    description: "High-quality printing with flexible quantities and premium finishing.",
  },
  {
    icon: <FileEdit className="w-6 h-6 text-gold" />,
    title: "Editorial Services",
    description: "Editing, proofreading, layout, and typesetting handled by experienced professionals.",
  },
  {
    icon: <Palette className="w-6 h-6 text-gold" />,
    title: "Cover Design",
    description: "Custom cover design crafted to reflect the identity and value of your book.",
  },
  {
    icon: <Hash className="w-6 h-6 text-gold" />,
    title: "ISBN & Legal Administration",
    description: "Complete assistance with ISBN registration and publishing administration.",
  },
  {
    icon: <Truck className="w-6 h-6 text-gold" />,
    title: "Distribution Support",
    description: "Prepare your book for distribution and wider market reach.",
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
              Publishing Solutions
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white leading-[1.15] tracking-tight text-balance">
            Complete{" "}
            <span className="bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent">
              Publishing Solutions
            </span>
          </h1>
          <p className="mt-4 text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Everything you need to transform your manuscript into a professionally published book.
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
            Let&apos;s Publish Your Book
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
