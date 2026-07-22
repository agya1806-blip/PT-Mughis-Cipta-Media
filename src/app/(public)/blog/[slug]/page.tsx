import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Breadcrumb from "@/components/ui/Breadcrumb"
import { JsonLd } from "@/components/JsonLd"
import { Calendar, Clock, ArrowLeft } from "lucide-react"

function readingTime(content: string): string {
  const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length
  const min = Math.max(1, Math.round(words / 200))
  return `${min} menit baca`
}

function excerpt(content: string, max = 160): string {
  return content.replace(/<[^>]*>/g, "").substring(0, max)
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await prisma.article.findUnique({ where: { slug } })
  if (!article) return { title: "Artikel Tidak Ditemukan" }
  return {
    title: `${article.title} | Maktabah al-Mughis`,
    description: excerpt(article.content),
    openGraph: {
      title: article.title,
      description: excerpt(article.content),
      ...(article.featuredImage ? { images: [{ url: article.featuredImage, alt: article.title }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: excerpt(article.content),
      ...(article.featuredImage ? { images: [article.featuredImage] } : {}),
    },
    alternates: { canonical: `/blog/${slug}` },
  }
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await prisma.article.findUnique({ where: { slug } })
  if (!article) notFound()

  return (
    <main className="flex-1 bg-cream">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: excerpt(article.content),
          image: article.featuredImage || undefined,
          datePublished: article.createdAt,
          dateModified: article.updatedAt,
          author: {
            "@type": "Organization",
            name: "Maktabah al-Mughis",
          },
        }}
      />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 lg:pt-24 lg:pb-16">
        <Breadcrumb
          items={[
            { label: "Beranda", href: "/" },
            { label: "Media Center", href: "/blog" },
            { label: article.title },
          ]}
        />

        <div className="mt-8 mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-green-dark leading-tight mb-4">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-green/60">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(article.createdAt).toLocaleDateString("id-ID", {
                year: "numeric", month: "long", day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {readingTime(article.content)}
            </span>
          </div>
        </div>

        {article.featuredImage && (
          <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden mb-10 bg-cream">
            <Image
              src={article.featuredImage}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        )}

        <div
          className="prose-article max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <div className="mt-12 pt-8 border-t border-gold/10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-dark transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Media Center
          </Link>
        </div>
      </article>
    </main>
  )
}
