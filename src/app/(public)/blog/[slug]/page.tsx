import Image from "next/image"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Breadcrumb from "@/components/ui/Breadcrumb"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"

function estimateReadingTime(content: string): number {
  const text = content.replace(/<[^>]*>/g, "")
  const words = text.split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

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

  const readingTime = estimateReadingTime(article.content)

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
            { label: "Media Center", href: "/blog" },
            { label: article.title },
          ]}
        />

        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-gold transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Media Center
        </Link>

        <article>
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400 mb-4">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(article.createdAt).toLocaleDateString("id-ID", {
                  year: "numeric", month: "long", day: "numeric",
                })}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {readingTime} menit baca
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 leading-tight">{article.title}</h1>
          </div>
          {article.featuredImage && (
            <div className="relative w-full aspect-[2/1] rounded-xl overflow-hidden mb-8">
              <Image
                src={article.featuredImage}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          )}
          <div
            className="text-zinc-700 leading-relaxed prose prose-zinc max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>

        <div className="mt-12 pt-8 border-t border-zinc-200 text-center">
          <p className="text-zinc-500 text-sm mb-4">Bagikan artikel ini</p>
          <div className="flex justify-center gap-3">
            {["Salin Tautan", "Twitter", "WhatsApp"].map((label) => (
              <span
                key={label}
                className="inline-flex items-center px-4 py-2 rounded-xl bg-white border border-zinc-200 text-xs font-medium text-zinc-600 cursor-pointer hover:border-gold/30 hover:text-gold transition-colors"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
