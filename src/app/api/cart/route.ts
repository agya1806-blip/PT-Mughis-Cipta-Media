import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { bookId } = await req.json() as { bookId: string }
    const book = await prisma.book.findUnique({ where: { id: parseInt(bookId) } })
    if (!book) {
      return Response.json({ error: 'Book not found' }, { status: 404 })
    }
    return Response.json({
      bookId: String(book.id),
      title: book.title,
      price: Number(book.price),
      weight: book.weight,
      coverImage: book.coverImage,
      stock: book.stock,
    })
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 })
  }
}
