"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { MOTION } from "@/config/design"
import BookInfoItem from "./BookInfoItem"
import SectionTitle from "./SectionTitle"
import type { BookDetail } from "./book-detail-data"

interface Props {
  book: BookDetail
}

export default function BookInformation({ book }: Props) {
  return (
    <motion.section
      variants={MOTION.stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid lg:grid-cols-2 gap-10 lg:gap-16"
    >
      <motion.div variants={MOTION.fadeUp} className="space-y-6">
        <SectionTitle title="Informasi Buku" subtitle="Detail lengkap tentang buku ini" />
        <div className="grid grid-cols-2 gap-6">
          <BookInfoItem label="Penulis">
            <Link
              href={`/penulis/${book.authorSlug}`}
              className="text-gold hover:text-gold-dark transition-colors"
            >
              {book.author}
            </Link>
          </BookInfoItem>
          <BookInfoItem label="Penerjemah">
            {book.translator ?? "—"}
          </BookInfoItem>
          <BookInfoItem label="Penerbit">{book.publisher}</BookInfoItem>
          <BookInfoItem label="Edisi">{book.edition}</BookInfoItem>
          <BookInfoItem label="Tahun Terbit">{book.publicationYear}</BookInfoItem>
          {book.series && (
            <BookInfoItem label="Seri">{book.series}</BookInfoItem>
          )}
          <BookInfoItem label="Kategori">
            <Link
              href={`/kategori/${book.categorySlug}`}
              className="text-gold hover:text-gold-dark transition-colors"
            >
              {book.categoryName}
            </Link>
          </BookInfoItem>
        </div>
      </motion.div>

      <motion.div variants={MOTION.fadeUp} className="space-y-6">
        <SectionTitle title="Sinopsis" subtitle="Gambaran isi buku" />
        <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-4">
          {book.synopsis.split("\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </motion.div>
    </motion.section>
  )
}
