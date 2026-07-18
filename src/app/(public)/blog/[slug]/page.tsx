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
            <img
              src={article.featuredImage}
              alt={article.title}
              className="w-full rounded-xl mb-8 object-cover max-h-96"
            />
          )}
          <div
            className="text-zinc-700 leading-relaxed prose prose-zinc max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>
      </div>
    </div>
  )
}
