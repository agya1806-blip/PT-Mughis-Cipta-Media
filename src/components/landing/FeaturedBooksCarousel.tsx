"use client"
import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ArrowRight, Star, BookOpen } from "lucide-react"
import SectionWrapper from "./SectionWrapper"
import SectionHeader from "./SectionHeader"

interface Book {
  id: string; title: string; author: string; price: number
  cover_image: string; synopsis: string; category_name: string
}
interface Props { books: Book[] }

export function FeaturedBooksCarousel({ books }: Props) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  if (books.length === 0) return null

  const next = () => { setDirection(1); setCurrent((p) => (p + 1) % books.length) }
  const prev = () => { setDirection(-1); setCurrent((p) => (p - 1 + books.length) % books.length) }

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0, scale: 0.95 }),
  }

  const book = books[current]

  return (
    <SectionWrapper>
      <div className="flex items-end justify-between mb-12">
        <SectionHeader
          badge="Katalog"
          title="Buku"
          accent="Unggulan"
          align="left"
          className="mb-0"
        />
        <div className="hidden sm:flex items-center gap-2">
          <button onClick={prev} className="w-10 h-10 rounded-xl border border-gold/20 flex items-center justify-center hover:bg-cream transition-colors">
            <ChevronLeft className="w-4 h-4 text-gold" />
          </button>
          <button onClick={next} className="w-10 h-10 rounded-xl border border-gold/20 flex items-center justify-center hover:bg-cream transition-colors">
            <ChevronRight className="w-4 h-4 text-gold" />
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <div className="relative h-[400px] sm:h-[500px] rounded-2xl overflow-hidden bg-cream">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={book.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="relative w-48 h-64 sm:w-56 sm:h-72">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent rounded-2xl blur-3xl" />
                <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-800 shadow-2xl flex items-center justify-center border border-white/5">
                  <div className="text-center p-4">
                    <div className="w-12 h-12 mx-auto rounded-xl bg-gold/20 flex items-center justify-center mb-3">
                      <BookOpen className="w-6 h-6 text-gold" />
                    </div>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500 line-clamp-3">{book.title}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {books.slice(0, 5).map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-gold" : "bg-zinc-300 dark:bg-zinc-600"}`}
              />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={book.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-medium mb-4">
              {book.category_name}
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-green-dark mb-3">{book.title}</h3>
            <p className="text-zinc-600 mb-2">{book.author}</p>
            <p className="text-zinc-600 text-sm leading-relaxed mb-6 line-clamp-3">{book.synopsis}</p>
            <div className="flex items-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((i) => (<Star key={i} className="w-4 h-4 fill-gold text-gold" />))}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-green-dark">Rp{book.price.toLocaleString("id-ID")}</span>
              <Link href={`/buku/${book.id}`} className="inline-flex items-center gap-2 px-5 py-2.5 bg-green hover:bg-green-dark text-gold text-sm font-medium rounded-full transition-all hover:shadow-lg hover:shadow-green/25">
                Detail <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex sm:hidden items-center justify-center gap-2 mt-6">
        <button onClick={prev} className="w-10 h-10 rounded-xl border border-gold/20 flex items-center justify-center hover:bg-cream transition-colors">
          <ChevronLeft className="w-4 h-4 text-gold" />
        </button>
        <button onClick={next} className="w-10 h-10 rounded-xl border border-gold/20 flex items-center justify-center hover:bg-cream transition-colors">
          <ChevronRight className="w-4 h-4 text-gold" />
        </button>
      </div>
    </SectionWrapper>
  )
}
