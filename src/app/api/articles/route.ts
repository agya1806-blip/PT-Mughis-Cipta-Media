import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1)
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") ?? "9", 10) || 9))
    const skip = (page - 1) * limit

    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.article.count(),
    ])

    const totalPages = Math.max(1, Math.ceil(total / limit))

    return new Response(JSON.stringify({
      articles,
      total,
      page,
      totalPages,
      limit,
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
      },
    })
  } catch {
    return new Response(JSON.stringify({ articles: [], total: 0, page: 1, totalPages: 1, limit: 9 }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
