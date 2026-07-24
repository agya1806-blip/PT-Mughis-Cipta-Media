import { unstable_cache } from "next/cache"
import { prisma } from "@/lib/prisma"

const getCachedCategories = unstable_cache(
  async () => {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    })
    return categories.map((c) => ({
      id: String(c.id),
      name: c.name,
      slug: c.slug,
    }))
  },
  ["api-categories"],
  { revalidate: 600, tags: ["categories"] }
)

export async function GET() {
  try {
    const categories = await getCachedCategories()

    return Response.json({ categories }, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=600, stale-while-revalidate=60",
      },
    })
  } catch {
    return Response.json({ categories: [] }, { status: 500 })
  }
}
