import { NextResponse } from "next/server"
import { revalidateTag } from "next/cache"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"

export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }
    const categories = await prisma.category.findMany({ orderBy: { id: "asc" } })
    return NextResponse.json(categories)
  } catch {
    return NextResponse.json({ error: "Gagal memuat" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const user = await getCurrentUser()
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }
  try {
    const body = await request.json()
    if (!body.name || !body.slug) {
      return NextResponse.json({ error: "Nama dan slug wajib diisi" }, { status: 400 })
    }
    const cat = await prisma.category.create({
      data: { name: body.name, slug: body.slug },
    })
    revalidateTag("categories", "max")
    return NextResponse.json(cat, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Gagal membuat kategori" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const user = await getCurrentUser()
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }
  try {
    const body = await request.json()
    if (!body.id) return NextResponse.json({ error: "ID diperlukan" }, { status: 400 })
    const cat = await prisma.category.update({
      where: { id: body.id },
      data: {
        ...(body.name ? { name: body.name } : {}),
        ...(body.slug ? { slug: body.slug } : {}),
      },
    })
    revalidateTag("categories", "max")
    return NextResponse.json(cat)
  } catch {
    return NextResponse.json({ error: "Gagal update" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const user = await getCurrentUser()
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }
  try {
    const body = await request.json()
    if (!body.id) return NextResponse.json({ error: "ID diperlukan" }, { status: 400 })
    await prisma.category.delete({ where: { id: body.id } })
    revalidateTag("categories", "max")
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Gagal hapus" }, { status: 500 })
  }
}
