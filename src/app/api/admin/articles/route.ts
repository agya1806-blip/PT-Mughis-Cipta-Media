import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"

export async function GET() {
  const user = await getCurrentUser()
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }
  const articles = await prisma.article.findMany({ orderBy: { createdAt: "desc" } })
  return NextResponse.json({ articles })
}

export async function POST(request: Request) {
  const user = await getCurrentUser()
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }
  try {
    const body = await request.json()
    if (!body.title || !body.slug || !body.content) {
      return NextResponse.json({ error: "Title, slug, dan konten wajib diisi" }, { status: 400 })
    }
    const article = await prisma.article.create({
      data: {
        title: body.title,
        slug: body.slug,
        content: body.content,
        featuredImage: body.featuredImage || "",
      },
    })
    return NextResponse.json(article, { status: 201 })
  } catch (e: any) {
    if (e?.code === "P2002") {
      return NextResponse.json({ error: "Slug sudah digunakan" }, { status: 409 })
    }
    return NextResponse.json({ error: "Gagal membuat artikel" }, { status: 500 })
  }
}
