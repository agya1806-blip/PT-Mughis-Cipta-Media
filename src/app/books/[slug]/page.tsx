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
            <BookActionCard price={book.price} stock={book.stock} />
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
            Tertarik dengan buku ini?
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Dapatkan segera di toko resmi Maktabah al-Mughis dan nikmati pengalaman membaca yang
            berkualitas.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="#"
              className="inline-flex items-center gap-2 h-11 px-6 text-sm font-semibold rounded-full bg-gold hover:bg-gold-dark text-white shadow-md hover:shadow-lg hover:shadow-gold/25 transition-all duration-200"
            >
              Beli Sekarang
            </Link>
            <Link
              href="/books"
              className="inline-flex items-center gap-2 h-11 px-6 text-sm font-semibold rounded-full border border-zinc-600 text-zinc-300 hover:bg-zinc-800 transition-all duration-200"
            >
              Jelajahi Katalog
            </Link>
          </div>
        </div>
      </motion.section>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-700/50 px-4 py-3 flex items-center justify-between shadow-2xl">
        <div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Harga</p>
          <p className="text-lg font-bold text-zinc-900 dark:text-white">
            Rp{book.price.toLocaleString("id-ID")}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 h-10 px-5 text-sm font-semibold rounded-full border border-zinc-200 dark:border-zinc-700/50 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 h-10 px-5 text-sm font-semibold rounded-full bg-gold hover:bg-gold-dark text-white shadow-md transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            Keranjang
          </button>
        </div>
      </div>
    </div>
  )
}
