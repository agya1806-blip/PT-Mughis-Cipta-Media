import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { prisma } from "@/lib/prisma"
import { slugifyAuthor } from "@/lib/authors"
import { BookDetailClient } from "./BookDetailClient"
import BookCard from "@/components/BookCard"
import Breadcrumb from "@/components/ui/Breadcrumb"
import { JsonLd } from "@/components/JsonLd"
import ShareButton from "@/components/ShareButton"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const book = await prisma.book.findUnique({
    where: { slug },
    include: { category: true, publicationType: true },
  })
  if (!book) return { title: "Buku Tidak Ditemukan" }
  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://mughisciptamedia.com"
  const coverUrl = book.coverImage?.startsWith("http")
    ? book.coverImage
    : book.coverImage && !book.coverImage.startsWith("data:")
      ? `${base}${book.coverImage}`
      : null
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
    alternates: {
      canonical: `/buku/${slug}`,
    },
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
    author: book.author,
    translator: book.translator,
    publisher: book.publisher,
    editor: book.editor,
    layoutBy: book.layoutBy,
    subject: book.subject,
    cityOfPublication: book.cityOfPublication,
    edition: book.edition,
    keywords: book.keywords,
    publisherName: book.publisherName,
    page_count: book.pageCount,
    price: Number(book.price),
    category_id: String(book.categoryId),
    category_name: book.category.name,
    publication_type_name: book.publicationType?.name || null,
    publication_type_icon: book.publicationType?.icon || null,
    publication_type_badge_color: book.publicationType?.badgeColor || null,
    cover_image: book.coverImage ?? "",
    synopsis: book.synopsis,
    preview_pdf_url: book.previewPdfUrl ?? "",
    created_at: book.createdAt.toISOString(),
    stock: book.stock,
    weight: book.weight ?? 0,
    dimensions: book.dimensions ?? "",
    language: book.language ?? "",
    publication_year: book.publicationYear,
    whatsapp: book.whatsapp ?? "",
  }

  return (
    <div className="flex-1 bg-cream">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
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
            image: mapped.cover_image || undefined,
            editor: mapped.editor || undefined,
            keywords: mapped.keywords || undefined,
            edition: mapped.edition || undefined,
          }}
        />
        {mapped.publication_type_name && (
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "CreativeWork",
              name: mapped.title,
              author: mapped.author,
              publisher: mapped.publisherName || mapped.publisher,
              about: mapped.subject || mapped.publication_type_name,
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
          <div className="grid md:grid-cols-3 gap-8 p-8">
            <div className="aspect-[3/4] bg-cream rounded-xl flex items-center justify-center overflow-hidden">
              {mapped.cover_image ? (
                <Image
                  src={mapped.cover_image}
                  alt={mapped.title}
                  width={300}
                  height={400}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center text-green-dark/80 p-8 text-center">
                  <svg className="w-20 h-20 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                  <span className="text-sm font-medium">Sampul Buku</span>
                </div>
              )}
            </div>

            <div className="md:col-span-2 space-y-6">
               <div className="flex items-start justify-between gap-4">
                 <div>
                   <div className="flex flex-wrap gap-2 mb-3">
                    <span className="inline-block text-xs font-medium text-green-dark bg-gold/5 px-3 py-1 rounded-full">
                      {mapped.category_name}
                    </span>
                    {mapped.publication_type_name && (
                      <span
                        className="inline-block text-xs font-medium px-3 py-1 rounded-full"
                        style={{
                          backgroundColor: mapped.publication_type_badge_color ? `${mapped.publication_type_badge_color}20` : "#D3C29720",
                          color: mapped.publication_type_badge_color || "#8B7355",
                        }}
                      >
                        {mapped.publication_type_name}
                      </span>
                    )}
                   </div>
                   <h1 className="text-2xl md:text-3xl font-bold text-green-dark leading-tight">{mapped.title}</h1>
                 </div>
                  <ShareButton
                    url={`/buku/${mapped.slug}`}
                    title={mapped.title}
                    description={mapped.synopsis}
                    image={mapped.cover_image || undefined}
                    className="mt-1"
                  />
               </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-green-dark/80">Penulis</span>
                  <Link
                    href={`/penulis/${slugifyAuthor(mapped.author)}`}
                    className="font-medium text-green-dark mt-0.5 block hover:text-gold transition-colors"
                  >
                    {mapped.author}
                  </Link>
                </div>
                {mapped.translator && (
                  <div>
                    <span className="text-green-dark/80">Penerjemah</span>
                    <p className="font-medium text-green-dark mt-0.5">{mapped.translator}</p>
                  </div>
                )}
                <div>
                  <span className="text-green-dark/80">Penerbit</span>
                  <p className="font-medium text-green-dark mt-0.5">{mapped.publisher}</p>
                </div>
                <div>
                  <span className="text-green-dark/80">Halaman</span>
                  <p className="font-medium text-green-dark mt-0.5">{mapped.page_count} hal</p>
                </div>
                <div>
                  <span className="text-green-dark/80">Tahun</span>
                  <p className="font-medium text-green-dark mt-0.5">{mapped.publication_year}</p>
                </div>
                <div>
                  <span className="text-green-dark/80">Bahasa</span>
                  <p className="font-medium text-green-dark mt-0.5">{mapped.language}</p>
                </div>
                <div>
                  <span className="text-green-dark/80">Dimensi</span>
                  <p className="font-medium text-green-dark mt-0.5">{mapped.dimensions}</p>
                </div>
                <div>
                  <span className="text-green-dark/80">Berat</span>
                  <p className="font-medium text-green-dark mt-0.5">{mapped.weight} gr</p>
                </div>
              </div>

              {(mapped.editor || mapped.layoutBy || mapped.publisherName || mapped.cityOfPublication || mapped.edition || mapped.keywords) && (
                <div className="border-t border-gold/10 pt-4 mt-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-green-dark/70 mb-3">Metadata Terbitan</p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
                    {mapped.publisherName && (
                      <div>
                        <span className="text-green-dark/80 text-xs">Penerbit</span>
                        <p className="font-medium text-green-dark">{mapped.publisherName}</p>
                      </div>
                    )}
                    {mapped.editor ? (
                      <div>
                        <span className="text-green-dark/80 text-xs">Editor</span>
                        <p className="font-medium text-green-dark">{mapped.editor}</p>
                      </div>
                    ) : (
                      <div>
                        <span className="text-green-dark/80 text-xs">Editor</span>
                        <p className="text-green-dark/60 italic">Belum Ditentukan</p>
                      </div>
                    )}
                    {mapped.layoutBy ? (
                      <div>
                        <span className="text-green-dark/80 text-xs">Layout</span>
                        <p className="font-medium text-green-dark">{mapped.layoutBy}</p>
                      </div>
                    ) : (
                      <div>
                        <span className="text-green-dark/80 text-xs">Layout</span>
                        <p className="text-green-dark/60 italic">Belum Ditentukan</p>
                      </div>
                    )}
                    {mapped.cityOfPublication && (
                      <div>
                        <span className="text-green-dark/80 text-xs">Kota Terbit</span>
                        <p className="font-medium text-green-dark">{mapped.cityOfPublication}</p>
                      </div>
                    )}
                    {mapped.edition && (
                      <div>
                        <span className="text-green-dark/80 text-xs">Edisi</span>
                        <p className="font-medium text-green-dark">{mapped.edition}</p>
                      </div>
                    )}
                    {mapped.subject && (
                      <div className="col-span-2">
                        <span className="text-green-dark/80 text-xs">Subjek</span>
                        <p className="font-medium text-green-dark">{mapped.subject}</p>
                      </div>
                    )}
                    {mapped.keywords && (
                      <div className="col-span-2">
                        <span className="text-green-dark/80 text-xs">Kata Kunci</span>
                        <p className="text-green-dark/80 text-xs">{mapped.keywords}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <BookDetailClient book={mapped} />
            </div>
          </div>

          <div className="border-t border-gold/20 p-8">
            <h2 className="text-lg font-semibold text-green-dark mb-3">Sinopsis</h2>
            <p className="text-green/80 leading-relaxed">{mapped.synopsis}</p>
          </div>

          {related.length > 0 && (
            <div className="border-t border-gold/20 p-8">
              <h2 className="text-lg font-semibold text-green-dark mb-6">Buku Terkait</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {related.map((r) => (
                  <BookCard key={r.id} book={r} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
