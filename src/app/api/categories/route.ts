import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    })
    return NextResponse.json({
      categories: categories.map((c) => ({
        id: String(c.id),
        name: c.name,
        slug: c.slug,
      })),
    })
  } catch {
    return NextResponse.json({ categories: [] }, { status: 500 })
  }
}
