import { notFound } from "next/navigation"
import Link from "next/link"
import { prisma } from "@/lib/prisma"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await prisma.article.findUnique({ where: { slug } })
  if (!article) return { title: "Artikel Tidak Ditemukan" }
  return { title: `${article.title} | Maktabah al-Mughis` }
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await prisma.article.findUnique({ where: { slug } })
  if (!article) notFound()

  return (
    <div className="flex-1 bg-zinc-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-6">
          <Link href="/" className="hover:text-zinc-900">Beranda</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-zinc-900">Blog</Link>
          <span>/</span>
          <span className="text-zinc-900 truncate">{article.title}</span>
        </nav>

        <article>
          <h1 className="text-3xl font-bold text-zinc-900 mb-3">{article.title}</h1>
          <p className="text-sm text-zinc-500 mb-8">
            {new Date(article.createdAt).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" })}
          </p>
          {article.featuredImage && (
            <img src={article.featuredImage} alt={article.title} className="w-full rounded-xl mb-8 object-cover max-h-96" />
          )}
          <div
            className="text-zinc-700 leading-relaxed [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-zinc-900 [&_h2]:mt-8 [&_h2]:mb-4 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_img]:rounded-lg [&_img]:my-4 [&_img]:max-w-full"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>
      </div>
    </div>
  )
}
