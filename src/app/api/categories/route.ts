import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    })
    return new Response(JSON.stringify({
      categories: categories.map((c) => ({
        id: String(c.id),
        name: c.name,
        slug: c.slug,
      })),
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
      },
    })
  } catch {
    return NextResponse.json({ categories: [] }, { status: 500 })
  }
}
