import { NextRequest } from "next/server"
import { unstable_cache } from "next/cache"
import { prisma } from "@/lib/prisma"

const getCachedArticles = unstable_cache(
  async (page: string, limit: string) => {
    const p = Math.max(1, parseInt(page, 10) || 1)
    const l = Math.min(50, Math.max(1, parseInt(limit, 10) || 9))
    const skip = (p - 1) * l

    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        orderBy: { createdAt: "desc" },
        skip,
        take: l,
      }),
      prisma.article.count(),
    ])

    const totalPages = Math.max(1, Math.ceil(total / l))

    return { articles, total, page: p, totalPages, limit: l }
  },
  ["api-articles"],
  { revalidate: 600, tags: ["articles"] }
)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const page = searchParams.get("page") ?? "1"
    const limit = searchParams.get("limit") ?? "9"

    const data = await getCachedArticles(page, limit)

    return Response.json(data, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
      },
    })
  } catch {
    return Response.json({ articles: [], total: 0, page: 1, totalPages: 1, limit: 9 }, { status: 500 })
  }
}
