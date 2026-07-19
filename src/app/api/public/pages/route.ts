import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get("slug")
  if (slug) {
    const page = await prisma.page.findUnique({ where: { slug } })
    if (!page) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json(page)
  }
  const pages = await prisma.page.findMany({ orderBy: { id: "asc" } })
  return NextResponse.json(pages)
}
