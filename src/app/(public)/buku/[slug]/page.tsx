import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { prisma } from "@/lib/prisma"
import { slugifyAuthor } from "@/lib/authors"
import { BookDetailClient } from "./BookDetailClient"
import BookCard from "@/components/BookCard"
import Breadcrumb from "@/components/ui/Breadcrumb"
import { JsonLd } from "@/components/JsonLd"

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://mughisciptamedia.com"

function resolveCover(url: string | null) {
  if (!url) return null
  if (url.startsWith("http")) return url
  if (url.startsWith("data:")) return null
  return `${BASE}${url}`
}

function getPubStatusBadge(status: string | null) {
  switch (status) {
    case "available": return { label: "Tersedia", dot: "bg-green-500" }
    case "coming_soon": return { label: "Segera Terbit", dot: "bg-yellow-500" }
    case "sold_out": return { label: "Habis", dot: "bg-red-500" }
    default: return null
  }
}

const metaIcons = {
  isbn: "🔖",
  jenisTerbitan: "📘",
  kategori: "📂",
  subjek: "🏷️",
  bahasa: "🌐",
  kotaTerbit: "📍",
  tahunTerbit: "📅",
  ukuran: "📏",
  jilid: "📚",
  editor: "✍️",
  layout: "🎨",
  edisi: "📖",
} as const

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const book = await prisma.book.findUnique({
    where: { slug },
    include: { category: true, publicationType: true },
  })
  if (!book) return { title: "Buku Tidak Ditemukan" }
  const coverUrl = resolveCover(book.coverImage)
  const typeLabel = book.publicationType?.name || "Buku"
  return {
    title: `${book.title} | ${typeLabel} - PT Mughis Cipta Media`,
    description: `${typeLabel}: ${book.synopsis.substring(0, 155)}`,
    openGraph: {
      title: `${book.title} - ${typeLabel} | PT Mughis Cipta Media`,
      description: `${typeLabel}: ${book.synopsis.substring(0, 155)}`,
      images: coverUrl ? [{ url: coverUrl, alt: book.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${book.title} - ${typeLabel} | PT Mughis Cipta Media`,
      description: `${typeLabel}: ${book.synopsis.substring(0, 155)}`,
      images: coverUrl ? [coverUrl] : undefined,
    },
    alternates: { canonical: `/buku/${slug}` },
  }
}

export default async function BookDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const book = await prisma.book.findUnique({
    where: { slug },
    include: { category: true, publicationType: true },
  })
  if (!book) notFound()

  const relatedBooks = await prisma.book.findMany({
    where: { categoryId: book.categoryId, id: { not: book.id } },
    include: { category: true, publicationType: true },
    take: 4,
    orderBy: { createdAt: "desc" },
  })

  const coverUrl = resolveCover(book.coverImage)
  const typeName = book.publicationType?.name || null
  const typeColor = book.publicationType?.badgeColor || null
  const statusBadge = getPubStatusBadge(book.publicationStatus)

  const related = relatedBooks.map((b) => ({
    id: String(b.id),
    slug: b.slug!,
    title: b.title,
    author: b.author,
    translator: b.translator,
    publisher: b.publisher,
    editor: b.editor,
    layoutBy: b.layoutBy,
    publisherName: b.publisherName,
    page_count: b.pageCount,
    price: Number(b.price),
    category_id: String(b.categoryId),
    category_name: b.category.name,
    publication_type_name: b.publicationType?.name || null,
    publication_type_icon: b.publicationType?.icon || null,
    publication_type_badge_color: b.publicationType?.badgeColor || null,
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
    slug: book.slug,
    title: book.title,
    subtitle: book.subtitle,
    author: book.author,
    penName: book.penName,
    translator: book.translator,
    publisher: book.publisher,
    editor: book.editor,
    layoutBy: book.layoutBy,
    subject: book.subject,
    cityOfPublication: book.cityOfPublication,
    edition: book.edition,
    keywords: book.keywords,
    publisherName: book.publisherName,
    isbn: book.isbn,
    bindingType: book.bindingType,
    publicationStatus: book.publicationStatus,
    page_count: book.pageCount,
    price: Number(book.price),
    category_id: String(book.categoryId),
    category_name: book.category.name,
    publication_type_name: typeName,
    publication_type_icon: book.publicationType?.icon || null,
    publication_type_badge_color: typeColor,
    cover_image: book.coverImage ?? "",
    synopsis: book.synopsis,
    preview_pdf_url: book.previewPdfUrl ?? "",
    created_at: book.createdAt.toISOString(),
    stock: book.stock,
    dimensions: book.dimensions ?? "",
    language: book.language ?? "",
    publication_year: book.publicationYear,
    whatsapp: book.whatsapp ?? "",
    weight: book.weight ?? 0,
  }

  return (
    <div className="flex-1 bg-cream">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Book",
            name: mapped.title,
            author: mapped.author,
            translator: mapped.translator || undefined,
            publisher: mapped.publisherName || mapped.publisher,
            numberOfPages: mapped.page_count,
            bookFormat: "Paperback",
            inLanguage: mapped.language,
            description: mapped.synopsis.substring(0, 200),
            image: coverUrl || undefined,
            editor: mapped.editor || undefined,
            keywords: mapped.keywords || undefined,
            edition: mapped.edition || undefined,
            isbn: mapped.isbn || undefined,
          }}
        />
        {typeName && (
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "CreativeWork",
              name: mapped.title,
              author: mapped.author,
              publisher: mapped.publisherName || mapped.publisher,
              about: mapped.subject || typeName,
              keywords: mapped.keywords || undefined,
              editor: mapped.editor || undefined,
            }}
          />
        )}
        <Breadcrumb
          items={[
            { label: "Beranda", href: "/" },
            { label: "Katalog", href: "/katalog" },
            { label: mapped.title },
          ]}
        />

        <div className="bg-cream rounded-2xl border border-gold/20 overflow-hidden shadow-sm">
          <div className="grid md:grid-cols-3 gap-8 p-6 sm:p-8">
            {/* Cover */}
            <div className="aspect-[3/4] bg-cream rounded-xl flex items-center justify-center overflow-hidden">
              {coverUrl ? (
                <Image src={coverUrl} alt={mapped.title} width={300} height={400} className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center text-green-dark/80 p-8 text-center">
                  <svg className="w-20 h-20 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                  <span className="text-sm font-medium">Sampul Terbitan</span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="md:col-span-2 space-y-6">
              {/* Badges + Title */}
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="inline-block text-xs font-medium text-green-dark bg-gold/5 px-3 py-1 rounded-full">
                    {mapped.category_name}
                  </span>
                  {typeName && (
                    <span
                      className="inline-block text-xs font-medium px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: typeColor ? `${typeColor}20` : "#D3C29720",
                        color: typeColor || "#8B7355",
                      }}
                    >
                      {typeName}
                    </span>
                  )}
                  {statusBadge && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-dark bg-green/5 px-3 py-1 rounded-full border border-green/10">
                      <span className={`w-1.5 h-1.5 rounded-full ${statusBadge.dot}`} />
                      {statusBadge.label}
                    </span>
                  )}
                </div>

                <h1 className="text-2xl md:text-3xl font-bold text-green-dark leading-tight">{mapped.title}</h1>
                {mapped.subtitle && (
                  <p className="text-base text-green-dark/70 mt-1">{mapped.subtitle}</p>
                )}
              </div>

              {/* Author */}
              <div className="flex items-center gap-2">
                <span className="text-green-dark/70 text-sm">oleh</span>
                <Link
                  href={`/penulis/${slugifyAuthor(mapped.author)}`}
                  className="font-semibold text-green-dark hover:text-gold transition-colors"
                >
                  {mapped.author}
                </Link>
                {mapped.penName && (
                  <span className="text-sm text-green-dark/60">({mapped.penName})</span>
                )}
              </div>

              {mapped.translator && (
                <p className="text-sm text-green-dark/70 -mt-3">
                  Penerjemah: <span className="font-medium text-green-dark">{mapped.translator}</span>
                </p>
              )}

              {/* Bibliographic Metadata */}
              <div className="bg-gold/5 rounded-xl border border-gold/10 p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-green-dark/60 mb-3">Metadata Bibliografi</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-5 gap-y-3 text-sm">
                  {mapped.isbn && (
                    <div className="col-span-2 sm:col-span-3">
                      <span className="text-green-dark/60 text-xs">ISBN</span>
                      <p className="font-mono text-sm font-medium text-green-dark tracking-wide">{mapped.isbn}</p>
                    </div>
                  )}
                  {typeName && (
                    <div>
                      <span className="text-green-dark/60 text-xs">Jenis Terbitan</span>
                      <p className="font-medium text-green-dark">{typeName}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-green-dark/60 text-xs">Kategori</span>
                    <p className="font-medium text-green-dark">{mapped.category_name}</p>
                  </div>
                  {mapped.subject && (
                    <div>
                      <span className="text-green-dark/60 text-xs">Subjek</span>
                      <p className="font-medium text-green-dark">{mapped.subject}</p>
                    </div>
                  )}
                  {mapped.language && (
                    <div>
                      <span className="text-green-dark/60 text-xs">Bahasa</span>
                      <p className="font-medium text-green-dark">{mapped.language}</p>
                    </div>
                  )}
                  {mapped.cityOfPublication && (
                    <div>
                      <span className="text-green-dark/60 text-xs">Kota Terbit</span>
                      <p className="font-medium text-green-dark">{mapped.cityOfPublication}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-green-dark/60 text-xs">Tahun Terbit</span>
                    <p className="font-medium text-green-dark">{mapped.publication_year}</p>
                  </div>
                  {mapped.dimensions && (
                    <div>
                      <span className="text-green-dark/60 text-xs">Ukuran</span>
                      <p className="font-medium text-green-dark">{mapped.dimensions}</p>
                    </div>
                  )}
                  {mapped.bindingType && (
                    <div>
                      <span className="text-green-dark/60 text-xs">Jenis Jilid</span>
                      <p className="font-medium text-green-dark">{mapped.bindingType}</p>
                    </div>
                  )}
                  {mapped.page_count > 0 && (
                    <div>
                      <span className="text-green-dark/60 text-xs">Jumlah Halaman</span>
                      <p className="font-medium text-green-dark">{mapped.page_count}</p>
                    </div>
                  )}
                  {mapped.weight > 0 && (
                    <div>
                      <span className="text-green-dark/60 text-xs">Berat</span>
                      <p className="font-medium text-green-dark">{mapped.weight} gr</p>
                    </div>
                  )}
                  {mapped.editor && (
                    <div>
                      <span className="text-green-dark/60 text-xs">Editor</span>
                      <p className="font-medium text-green-dark">{mapped.editor}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-green-dark/60 text-xs">Layout</span>
                    <p className="font-medium text-green-dark">{mapped.layoutBy || "Belum Ditentukan"}</p>
                  </div>
                  {mapped.edition && (
                    <div>
                      <span className="text-green-dark/60 text-xs">Edisi</span>
                      <p className="font-medium text-green-dark">{mapped.edition}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Publisher */}
              <p className="text-sm text-green-dark/70">
                <span className="font-semibold text-green-dark">{mapped.publisherName || mapped.publisher}</span>
              </p>

              {/* Action Buttons */}
              <BookDetailClient book={mapped} />
            </div>
          </div>

          {/* Synopsis */}
          <div className="border-t border-gold/20 p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-green-dark mb-3">Sinopsis</h2>
            <p className="text-green/80 leading-relaxed whitespace-pre-line">{mapped.synopsis}</p>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="border-t border-gold/20 p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-green-dark mb-6">Terbitan Terkait</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {related.map((r) => (
                  <BookCard key={r.id} book={r} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-10 text-center">
          <p className="text-xs text-green-dark/50 leading-relaxed">
            &copy; PT Mughis Cipta Media<br />
            Seluruh hak cipta dilindungi sesuai ketentuan peraturan perundang-undangan yang berlaku.
          </p>
        </div>
      </div>
    </div>
  )
}
