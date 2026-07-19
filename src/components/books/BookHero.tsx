"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { BookOpen, Eye, BookText } from "lucide-react"
import Badge from "@/components/ui/Badge"
import Button from "@/components/ui/Button"
import BookBadge from "@/components/ui/BookBadge"
import RatingStars from "@/components/ui/RatingStars"
import { MOTION } from "@/config/design"
import type { BookDetail } from "./book-detail-data"

interface Props {
  book: BookDetail
}

export default function BookHero({ book }: Props) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(200,169,106,0.08),transparent_60%)]" />
      <div className="container relative py-12 sm:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <motion.div
            variants={MOTION.scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0 w-full rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/50 shadow-2xl"
          >
            {book.coverImage ? (
              <Image
                src={book.coverImage}
                alt={book.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-500 p-8 text-center">
                <BookOpen className="w-16 h-16 mb-3" />
                <span className="text-sm font-medium">{book.title}</span>
              </div>
            )}
            {book.badge && (
              <div className="absolute top-4 left-4 z-10">
                <BookBadge variant={book.badge} />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
          </motion.div>

          <motion.div
            variants={MOTION.fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="gold">{book.categoryName}</Badge>
                {book.publicationYear && (
                  <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
                    {book.publicationYear}
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white leading-[1.15] tracking-tight text-balance">
                {book.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                  <span className="text-zinc-500 dark:text-zinc-400">Penulis:</span>
                  <Link
                    href={`/penulis/${book.authorSlug}`}
                    className="font-medium text-zinc-900 dark:text-white hover:text-gold transition-colors"
                  >
                    {book.author}
                  </Link>
                </div>
                {book.series && (
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                    <span className="text-zinc-500 dark:text-zinc-400">{book.series}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">
                <RatingStars rating={Math.round(book.rating)} size="sm" />
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {book.rating}
                </span>
                <span className="text-sm text-zinc-400 dark:text-zinc-500">
                  ({book.reviewCount} ulasan)
                </span>
              </div>
            </div>

            <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400 line-clamp-4">
              {book.synopsis}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button variant="outline" size="default">
                <Eye className="w-4 h-4" />
                Pratinjau
              </Button>
              <Button variant="primary" size="default">
                <BookText className="w-4 h-4" />
                Info Lengkap
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
