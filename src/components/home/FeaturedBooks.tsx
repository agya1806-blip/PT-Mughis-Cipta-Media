"use client"

import { motion } from "framer-motion"
import { BookOpen } from "lucide-react"
import BookCard from "@/components/ui/BookCard"
import { featuredBooks } from "./books-data"
import { fadeInUp, staggerContainer, staggerItem } from "@/components/landing/types"

export default function FeaturedBooks() {
  return (
    <section className="py-24 sm:py-32 overflow-hidden">
      <div className="container">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-6">
            <BookOpen className="w-3.5 h-3.5 text-gold" />
            <span className="text-gold text-xs font-medium uppercase tracking-wider">
              Katalog Pilihan
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-dark dark:text-cream leading-[1.15] tracking-tight">
            Karya Pilihan{" "}
            <span className="bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent">
              Kami
            </span>
          </h2>
          <p className="mt-4 text-green/80 dark:text-cream/70 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Jelajahi berbagai buku berkualitas yang telah diterbitkan oleh PT Mughis Cipta Media, mulai dari pendidikan, keislaman, referensi akademik, hingga karya inspiratif.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {featuredBooks.map((book) => (
            <motion.div key={book.id} variants={staggerItem}>
              <BookCard book={book} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="/katalog"
            className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-dark transition-colors duration-200 group"
          >
            Lihat Semua Katalog
            <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
