import { prisma } from "./prisma"

export async function getBookPrice(bookId: number, isReseller: boolean) {
  const book = await prisma.book.findUnique({ where: { id: bookId } })
  if (!book) return null

  return {
    retailPrice: Number(book.price),
    resellerPrice: book.resellerPrice ? Number(book.resellerPrice) : null,
    finalPrice: isReseller && book.resellerPrice ? Number(book.resellerPrice) : Number(book.price),
  } as { retailPrice: number; resellerPrice: number | null; finalPrice: number }
}

export function calculateSubtotal(
  items: { price: number; quantity: number }[]
): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

export function calculateTotal(subtotal: number, shippingCost: number): number {
  return subtotal + shippingCost
}
