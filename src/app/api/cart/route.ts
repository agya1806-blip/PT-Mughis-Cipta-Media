import { NextRequest } from 'next/server'
import { books } from '@/lib/data'

export async function GET() {
  return Response.json({ books })
}

export async function POST(req: NextRequest) {
  try {
    const { bookId } = await req.json() as { bookId: string }
    const book = books.find((b) => b.id === bookId)
    if (!book) {
      return Response.json({ error: 'Book not found' }, { status: 404 })
    }
    return Response.json({
      bookId: book.id,
      title: book.title,
      price: book.price,
      weight: book.weight,
      coverImage: book.cover_image,
      stock: book.stock,
    })
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 })
  }
}
