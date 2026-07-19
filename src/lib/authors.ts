import { prisma } from "./prisma"
import { notFound } from "next/navigation"

export interface AuthorSimple {
  name: string
  slug: string
  bookCount: number
  field: string
}

export function slugifyAuthor(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
}

export async function getAllAuthors(): Promise<AuthorSimple[]> {
  const books = await prisma.book.findMany({
    select: { author: true },
  })

  const map = new Map<string, number>()
  for (const b of books) {
    const name = b.author.trim()
    if (!name) continue
    map.set(name, (map.get(name) || 0) + 1)
  }

  return Array.from(map.entries())
    .map(([name, bookCount]) => ({
      name,
      slug: slugifyAuthor(name),
      bookCount,
      field: "Penulis",
    }))
    .sort((a, b) => a.name.localeCompare(b.name))
}

export async function getAuthorBySlug(slug: string) {
  const all = await getAllAuthors()
  const author = all.find((a) => a.slug === slug)
  if (!author) return null
  return author
}

export async function getAuthorBooks(authorName: string) {
  const prismaBooks = await prisma.book.findMany({
    where: { author: authorName },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  })

  return prismaBooks.map((b) => ({
    id: String(b.id),
    title: b.title,
    author: b.author,
    translator: b.translator,
    publisher: b.publisher,
    isbn: b.isbn || "",
    page_count: b.pageCount,
    price: Number(b.price),
    category_id: String(b.categoryId),
    category_name: b.category.name,
    cover_image: b.coverImage,
    synopsis: b.synopsis,
    preview_pdf_url: b.previewPdfUrl,
    created_at: b.createdAt.toISOString(),
    stock: b.stock,
    weight: b.weight || 0,
    dimensions: b.dimensions || "",
    language: b.language || "",
    publication_year: b.publicationYear,
  }))
}
