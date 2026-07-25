import { unstable_cache } from "next/cache"
import { prisma } from "@/lib/prisma"

const getCachedTypes = unstable_cache(
  async () => {
    const types = await prisma.publicationType.findMany({
      where: { status: true },
      orderBy: { sortOrder: "asc" },
    })
    return types.map((t) => ({
      id: String(t.id),
      name: t.name,
      slug: t.slug,
      icon: t.icon,
      badgeColor: t.badgeColor,
    }))
  },
  ["publication-types-public"],
  { revalidate: 600, tags: ["publication-types"] },
)

export async function GET() {
  try {
    const data = await getCachedTypes()
    return Response.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
      },
    })
  } catch {
    return Response.json([], { status: 500 })
  }
}
