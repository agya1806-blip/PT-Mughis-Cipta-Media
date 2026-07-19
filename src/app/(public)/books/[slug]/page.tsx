"use client"

import Link from "next/link"
import { notFound } from "next/navigation"
import { motion } from "framer-motion"
import { MOTION } from "@/config/design"
import Breadcrumb from "@/components/ui/Breadcrumb"
import Divider from "@/components/ui/Divider"
import BookHero from "@/components/books/BookHero"
import BookInformation from "@/components/books/BookInformation"
import BookSpecification from "@/components/books/BookSpecification"
import BookGallery from "@/components/books/BookGallery"
import BookActionCard from "@/components/books/BookActionCard"
import RelatedBooks from "@/components/books/RelatedBooks"
import { mockBookDetail, mockRelatedBooks } from "@/components/books/book-detail-data"

export default function BookDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const slug = params.slug
  if (slug !== mockBookDetail.slug) {
    notFound()
  }

  const book = mockBookDetail
  const related = mockRelatedBooks

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <BookHero book={book} />

      <div className="container py-12 sm:py-16">
        <Breadcrumb
          items={[
            { label: "Beranda", href: "/" },
            { label: "Katalog", href: "/books" },
            { label: book.title },
          ]}
        />
      </div>

      <Divider className="container" />

      <div className="container py-12 sm:py-16">
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">
          <div className="lg:col-span-2 space-y-16">
            <BookInformation book={book} />
            <BookSpecification book={book} />
            {book.galleryImages.length > 0 && (
              <>
                <Divider />
                <BookGallery images={book.galleryImages} title={book.title} />
              </>
            )}
            {related.length > 0 && (
              <>
                <Divider />
                <RelatedBooks books={related} />
              </>
            )}
          </div>

          <aside className="hidden lg:block">
            <BookActionCard isbn={book.isbn} pages={book.pageCount} publicationYear={book.publicationYear} />
          </aside>
        </div>
      </div>

      <motion.section
        variants={MOTION.fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative py-20 overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(200,169,106,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(200,169,106,0.08),transparent_50%)]" />
        <div className="container relative text-center max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-[1.15]">
            Buku Lainnya dari Maktabah al-Mughis
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Jelajahi koleksi lengkap buku-buku berkualitas yang telah diterbitkan oleh
            Maktabah al-Mughis.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/katalog"
              className="inline-flex items-center gap-2 h-11 px-6 text-sm font-semibold rounded-full bg-gold hover:bg-gold-dark text-white shadow-md hover:shadow-lg hover:shadow-gold/25 transition-all duration-200"
            >
              Jelajahi Katalog
            </Link>
            <Link
              href="/layanan-penerbitan"
              className="inline-flex items-center gap-2 h-11 px-6 text-sm font-semibold rounded-full border border-zinc-600 text-zinc-300 hover:bg-zinc-800 transition-all duration-200"
            >
              Ajukan Penerbitan
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
