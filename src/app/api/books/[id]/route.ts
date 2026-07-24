import { prisma } from "@/lib/prisma"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const book = await prisma.book.findUnique({
      where: { id: parseInt(id) },
      include: { category: true },
    })

    if (!book) {
      return Response.json({ error: "Book not found" }, { status: 404 })
    }

    const mapped = {
      id: String(book.id),
      slug: book.slug,
      title: book.title,
      author: book.author,
      translator: book.translator,
      publisher: book.publisher,
      page_count: book.pageCount,
      price: Number(book.price),
      category_id: String(book.categoryId),
      category_name: book.category.name,
      cover_image: book.coverImage,
      synopsis: book.synopsis,
      preview_pdf_url: book.previewPdfUrl,
      created_at: book.createdAt.toISOString(),
      stock: book.stock,
      weight: book.weight,
      dimensions: book.dimensions,
      language: book.language,
      publication_year: book.publicationYear,
    }

    return Response.json({ book: mapped })
  } catch {
    return Response.json({ error: "Book not found" }, { status: 404 })
  }
}
