import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { prisma } from "@/lib/prisma"
import { BookDetailClient } from "./BookDetailClient"
import BookCard from "@/components/BookCard"
import Breadcrumb from "@/components/ui/Breadcrumb"
import { JsonLd } from "@/components/JsonLd"
import { BookOpen, User, ArrowRight } from "lucide-react"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const book = await prisma.book.findUnique({
    where: { id: parseInt(id) },
    include: { category: true },
  })
  if (!book) return { title: "Buku Tidak Ditemukan" }
  return {
    title: book.title,
    description: book.synopsis.substring(0, 160),
    openGraph: {
      title: `${book.title} - Maktabah al-Mughis`,
      description: book.synopsis.substring(0, 160),
      images: book.coverImage ? [{ url: book.coverImage, alt: book.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${book.title} - Maktabah al-Mughis`,
      description: book.synopsis.substring(0, 160),
    },
    alternates: {
      canonical: `/buku/${id}`,
    },
  }
}

export default async function BookDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const book = await prisma.book.findUnique({
    where: { id: parseInt(id) },
    include: { category: true },
  })
  if (!book) notFound()

  const relatedBooks = await prisma.book.findMany({
    where: { categoryId: book.categoryId, id: { not: book.id } },
    include: { category: true },
    take: 4,
    orderBy: { createdAt: "desc" },
  })

  const related = relatedBooks.map((b) => ({
    id: String(b.id),
    title: b.title,
    author: b.author,
    translator: b.translator,
    publisher: b.publisher,
    isbn: b.isbn || "",
    page_count: b.pageCount,
    price: Number(b.price),
    category_id: String(b.categoryId),
    category_name: b.category.name,
    cover_image: b.coverImage ?? "",
    synopsis: b.synopsis,
    preview_pdf_url: b.previewPdfUrl ?? "",
    created_at: b.createdAt.toISOString(),
    stock: b.stock,
    weight: b.weight ?? 0,
    dimensions: b.dimensions ?? "",
    language: b.language ?? "",
    publication_year: b.publicationYear,
  }))

  const mapped = {
    id: String(book.id),
    title: book.title,
    author: book.author,
    translator: book.translator,
    publisher: book.publisher,
    isbn: book.isbn || "",
    page_count: book.pageCount,
    price: Number(book.price),
    category_id: String(book.categoryId),
    category_name: book.category.name,
    cover_image: book.coverImage ?? "",
    synopsis: book.synopsis,
    preview_pdf_url: book.previewPdfUrl ?? "",
    created_at: book.createdAt.toISOString(),
    stock: book.stock,
    weight: book.weight ?? 0,
    dimensions: book.dimensions ?? "",
    language: book.language ?? "",
    publication_year: book.publicationYear,
  }

  return (
    <div className="flex-1 bg-zinc-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Book",
            name: mapped.title,
            author: mapped.author,
            translator: mapped.translator || undefined,
            publisher: mapped.publisher,
            isbn: mapped.isbn || undefined,
            numberOfPages: mapped.page_count,
            bookFormat: "Paperback",
            inLanguage: mapped.language,
            description: mapped.synopsis.substring(0, 200),
            image: mapped.cover_image || undefined,
          }}
        />
        <Breadcrumb
          items={[
            { label: "Beranda", href: "/" },
            { label: "Koleksi Buku", href: "/katalog" },
            { label: mapped.title },
          ]}
        />

        <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm">
          <div className="grid md:grid-cols-3 gap-8 p-8">
            <div className="aspect-[3/4] bg-zinc-100 rounded-xl flex items-center justify-center overflow-hidden">
              {mapped.cover_image ? (
                <Image
                  src={mapped.cover_image}
                  alt={mapped.title}
                  width={300}
                  height={400}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center text-zinc-400 p-8 text-center">
                  <BookOpen className="w-20 h-20 mb-3" />
                  <span className="text-sm font-medium">Sampul Buku</span>
                </div>
              )}
            </div>

            <div className="md:col-span-2 space-y-6">
              <div>
                <span className="inline-block text-xs font-medium text-gold bg-gold/5 px-3 py-1 rounded-full mb-3">
                  {mapped.category_name}
                </span>
                <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 leading-tight">{mapped.title}</h1>
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-zinc-500 text-xs">Penulis</span>
                  <Link
                    href={`/penulis/${encodeURIComponent(mapped.author)}`}
                    className="font-medium text-zinc-800 mt-0.5 block hover:text-gold transition-colors"
                  >
                    {mapped.author}
                  </Link>
                </div>
                {mapped.translator && (
                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-zinc-500 text-xs">Penerjemah</span>
                    <p className="font-medium text-zinc-800 mt-0.5">{mapped.translator}</p>
                  </div>
                )}
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-zinc-500 text-xs">Penerbit</span>
                  <p className="font-medium text-zinc-800 mt-0.5">{mapped.publisher}</p>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-zinc-500 text-xs">ISBN</span>
                  <p className="font-medium text-zinc-800 mt-0.5">{mapped.isbn || "\u2014"}</p>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-zinc-500 text-xs">Jumlah Halaman</span>
                  <p className="font-medium text-zinc-800 mt-0.5">{mapped.page_count} hal</p>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-zinc-500 text-xs">Ukuran Buku</span>
                  <p className="font-medium text-zinc-800 mt-0.5">{mapped.dimensions || "\u2014"}</p>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-zinc-500 text-xs">Bahasa</span>
                  <p className="font-medium text-zinc-800 mt-0.5">{mapped.language || "\u2014"}</p>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-zinc-500 text-xs">Tahun Terbit</span>
                  <p className="font-medium text-zinc-800 mt-0.5">{mapped.publication_year || "\u2014"}</p>
                </div>
              </div>

              <BookDetailClient book={mapped} />
            </div>
          </div>

          <div className="border-t border-zinc-200 p-8">
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">Sinopsis</h2>
            <p className="text-zinc-600 leading-relaxed">{mapped.synopsis}</p>
          </div>

          <div className="border-t border-zinc-200 p-8">
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">Tentang Penulis</h2>
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                <User className="w-7 h-7 text-gold" />
              </div>
              <div>
                <p className="font-medium text-zinc-900">{mapped.author}</p>
                <p className="text-sm text-zinc-500 mt-1">
                  Penulis buku <strong>{mapped.title}</strong> yang diterbitkan oleh {mapped.publisher}.
                </p>
                <Link
                  href={`/penulis/${encodeURIComponent(mapped.author)}`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-gold hover:text-gold-dark mt-2 transition-colors"
                >
                  Lihat profil penulis
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <div className="border-t border-zinc-200 p-8">
              <h2 className="text-lg font-semibold text-zinc-900 mb-6">Buku Terkait</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {related.map((r) => (
                  <BookCard key={r.id} book={r} />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-10 bg-gradient-to-r from-gold to-gold-dark rounded-2xl p-8 sm:p-10 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Tertarik Menerbitkan Buku?
          </h2>
          <p className="text-gold/90 mb-6 max-w-xl mx-auto">
            Dapatkan konsultasi gratis dengan tim penerbitan profesional kami. Dari naskah hingga buku siap edar.
          </p>
          <Link
            href="/kontak"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-gold-dark font-bold rounded-full hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            Konsultasi Gratis
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}
