import { prisma } from "@/lib/prisma"
import { FeaturedBooksCarousel } from "./FeaturedBooksCarousel"

export default async function FeaturedBooksSection() {
  const books = await prisma.book.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
    take: 8,
  })

  const mapped = books.map((b) => ({
    id: String(b.id),
    title: b.title,
    author: b.author,
    price: Number(b.price),
    cover_image: b.coverImage,
    synopsis: b.synopsis,
    category_name: b.category.name,
  }))

  return <FeaturedBooksCarousel books={mapped} />
}
