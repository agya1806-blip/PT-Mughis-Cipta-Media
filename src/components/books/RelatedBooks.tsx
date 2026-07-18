"use client"

import { motion } from "framer-motion"
import { MOTION } from "@/config/design"
import SectionTitle from "./SectionTitle"
import BookCard from "@/components/ui/BookCard"
import type { RelatedBook } from "./book-detail-data"

interface Props {
  books: RelatedBook[]
}

export default function RelatedBooks({ books }: Props) {
  if (!books.length) return null

  const mapped = books.map((b) => ({
    id: b.id,
    title: b.title,
    author: b.author,
    price: b.price,
    cover_image: b.coverImage,
    synopsis: b.synopsis,
    category_name: b.categoryName,
    publication_year: b.publicationYear,
    badge: b.badge,
  }))

  return (
    <section className="space-y-8">
      <SectionTitle
        title="Buku Terkait"
        subtitle="Rekomendasi buku lainnya yang mungkin Anda minati"
      />
      <motion.div
        variants={MOTION.stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {mapped.map((b) => (
          <motion.div key={b.id} variants={MOTION.fadeUp}>
            <BookCard book={b} href={`/buku/${b.id}`} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
