import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"

export async function GET() {
  const user = await getCurrentUser()
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }
  const pages = await prisma.page.findMany({ orderBy: { id: "asc" } })
  return NextResponse.json(pages)
}

export async function POST(request: Request) {
  const user = await getCurrentUser()
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }
  try {
    const body = await request.json()
    if (!body.slug || !body.title) {
      return NextResponse.json({ error: "Slug dan title wajib diisi" }, { status: 400 })
    }
    const page = await prisma.page.create({
      data: {
        slug: body.slug,
        title: body.title,
        content: body.content || "",
      },
    })
    return NextResponse.json(page, { status: 201 })
  } catch (e: unknown) {
    const prismaErr = e as { code?: string }
    if (prismaErr.code === "P2002") {
      return NextResponse.json({ error: "Slug sudah digunakan" }, { status: 409 })
    }
    return NextResponse.json({ error: "Gagal membuat halaman" }, { status: 500 })
  }
}
