import { books as booksData, categories, type Book } from "./data"

export const books = booksData

export interface BooksQuery {
  page?: number
  limit?: number
  category_id?: string
  search?: string
  sort?: "latest" | "price_asc" | "price_desc"
}

export interface BooksResponse {
  books: Book[]
  total: number
  page: number
  total_pages: number
  limit: number
}

export function getBooks(query: BooksQuery): BooksResponse {
  const { page = 1, limit = 12, category_id, search, sort = "latest" } = query
  let filtered = [...books]
  if (category_id) filtered = filtered.filter((b) => b.category_id === category_id)
  if (search) {
    const q = search.toLowerCase()
    filtered = filtered.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        (b.translator && b.translator.toLowerCase().includes(q))
    )
  }
  switch (sort) {
    case "price_asc":
      filtered.sort((a, b) => a.price - b.price)
      break
    case "price_desc":
      filtered.sort((a, b) => b.price - a.price)
      break
    default:
      filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  }
  const total = filtered.length
  const total_pages = Math.max(1, Math.ceil(total / limit))
  const safePage = Math.max(1, Math.min(page, total_pages))
  const start = (safePage - 1) * limit
  const paged = filtered.slice(start, start + limit)
  return { books: paged, total, page: safePage, total_pages, limit }
}

export function getBookById(id: string): Book | null {
  return books.find((b) => b.id === id) ?? null
}

export function getCategories() {
  return categories
}
