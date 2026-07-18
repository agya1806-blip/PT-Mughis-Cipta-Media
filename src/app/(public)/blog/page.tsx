import Link from "next/link"
import { prisma } from "@/lib/prisma"

export const metadata = { title: "Blog | Maktabah al-Mughis" }

export default async function BlogPage() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="flex-1 bg-zinc-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-zinc-900 mb-8">Blog</h1>
        {articles.length === 0 ? (
          <div className="bg-white rounded-xl border border-zinc-200 p-8 text-center text-zinc-500">
            <p>Belum ada artikel. Kembali lagi nanti.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {articles.map((a) => (
              <Link key={a.id} href={`/blog/${a.slug}`} className="block bg-white rounded-xl border border-zinc-200 p-6 hover:shadow-md transition-shadow">
                <h2 className="text-xl font-semibold text-zinc-900 mb-2">{a.title}</h2>
                <p className="text-sm text-zinc-500">
                  {new Date(a.createdAt).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" })}
                </p>
                <p className="text-zinc-600 mt-3 line-clamp-3">{a.content.replace(/<[^>]*>/g, "").substring(0, 200)}...</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
