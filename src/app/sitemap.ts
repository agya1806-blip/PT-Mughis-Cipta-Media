import { prisma } from "@/lib/prisma"

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://pt-mughis-cipta-media.vercel.app"

  let books: { id: number; updatedAt: Date }[] = []
  let articles: { slug: string; updatedAt: Date }[] = []
  let pages: { slug: string; updatedAt: Date }[] = []
  try {
    ;[books, articles, pages] = await Promise.all([
      prisma.book.findMany({ select: { id: true, updatedAt: true } }),
      prisma.article.findMany({ select: { slug: true, updatedAt: true } }),
      prisma.page.findMany({ select: { slug: true, updatedAt: true } }),
    ])
  } catch {}

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: `${baseUrl}/tentang-kami`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/katalog`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${baseUrl}/layanan-penerbitan`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${baseUrl}/kontak`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
  ]

  const bookPages = books.map((b) => ({
    url: `${baseUrl}/buku/${b.id}`,
    lastModified: b.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }))

  const articlePages = articles.map((a) => ({
    url: `${baseUrl}/blog/${a.slug}`,
    lastModified: a.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }))

  const customPages = pages.map((p) => ({
    url: `${baseUrl}/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }))

  return [...staticPages, ...bookPages, ...articlePages, ...customPages]
}
