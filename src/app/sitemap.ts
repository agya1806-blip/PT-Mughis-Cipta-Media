import { prisma } from "@/lib/prisma"
import { slugifyAuthor } from "@/lib/authors"

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://mughisciptamedia.com"

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

    { url: `${baseUrl}/penulis`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.6 },
    { url: `${baseUrl}/search`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.4 },
    { url: `${baseUrl}/legal`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${baseUrl}/register`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.4 },
    { url: `${baseUrl}/login`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.4 },

  ]

  try {
    const [books, articles, pages, penulis] = await Promise.all([
      prisma.book.findMany({ select: { slug: true, updatedAt: true } }),
      prisma.article.findMany({ select: { slug: true, updatedAt: true } }),
      prisma.page.findMany({ select: { slug: true, updatedAt: true } }),
      prisma.book.findMany({ select: { author: true }, distinct: ["author"] }),
    ])

    const bookPages = books.map((b) => ({
      url: `${baseUrl}/buku/${b.slug}`,
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

    const authorPages = penulis.map((p) => ({
      url: `${baseUrl}/penulis/${slugifyAuthor(p.author)}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    }))

    return [...staticPages, ...bookPages, ...articlePages, ...customPages, ...authorPages]
  } catch {
    return staticPages
  }
}