import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, slug: true, createdAt: true },
  })
  return NextResponse.json(articles)
}
