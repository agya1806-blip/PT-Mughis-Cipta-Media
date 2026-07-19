import Image from "next/image"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Breadcrumb from "@/components/ui/Breadcrumb"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await prisma.article.findUnique({ where: { slug } })
  if (!article) return { title: "Artikel Tidak Ditemukan" }
  return {
    title: `${article.title} | Maktabah al-Mughis`,
    description: article.content.replace(/<[^>]*>/g, "").substring(0, 160),
    openGraph: {
      title: article.title,
      description: article.content.replace(/<[^>]*>/g, "").substring(0, 160),
      ...(article.featuredImage ? { images: [{ url: article.featuredImage }] } : {}),
    },
  }
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await prisma.article.findUnique({ where: { slug } })
  if (!article) notFound()

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    datePublished: article.createdAt.toISOString(),
    dateModified: article.updatedAt.toISOString(),
    ...(article.featuredImage ? { image: article.featuredImage } : {}),
  }

  return (
    <div className="flex-1 bg-zinc-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Breadcrumb
          items={[
            { label: "Beranda", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: article.title },
          ]}
        />

        <article>
          <h1 className="text-3xl font-bold text-zinc-900 mb-3">{article.title}</h1>
          <p className="text-sm text-zinc-500 mb-8">
            {new Date(article.createdAt).toLocaleDateString("id-ID", {
              year: "numeric", month: "long", day: "numeric",
            })}
          </p>
          {article.featuredImage && (
            <Image
              src={article.featuredImage}
              alt={article.title}
              width={768}
              height={384}
              className="w-full rounded-xl mb-8 object-cover max-h-96"
            />
          )}
          {article.content ? (
            <div
              className="text-zinc-700 leading-relaxed prose prose-zinc max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          ) : article.fileUrl ? (
            <div className="bg-white rounded-xl border border-zinc-200 p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-zinc-800 mb-2">Dokumen Artikel</h2>
              <p className="text-sm text-zinc-500 mb-6">Artikel ini tersedia dalam format dokumen.</p>
              <a
                href={article.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold text-white font-medium hover:bg-gold-dark transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Download / Lihat File
              </a>
            </div>
          ) : null}
        </article>
      </div>
    </div>
  )
}
