import { NextResponse } from "next/server"
import { revalidateTag } from "next/cache"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"
import { slugify } from "@/lib/slug"

export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }
    const types = await prisma.publicationType.findMany({ orderBy: { sortOrder: "asc" } })
    return NextResponse.json(types)
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
    if (!body.name) {
      return NextResponse.json({ error: "Nama jenis terbitan wajib diisi" }, { status: 400 })
    }
    const type = await prisma.publicationType.create({
      data: {
        name: body.name,
        slug: body.slug || slugify(body.name),
        icon: body.icon || null,
        badgeColor: body.badgeColor || null,
        description: body.description || null,
        sortOrder: parseInt(body.sortOrder) || 0,
      },
    })
    revalidateTag("publication-types", "max")
    return NextResponse.json(type, { status: 201 })
  } catch (e) {
    const message = e instanceof Error ? e.message : "Gagal membuat"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const user = await getCurrentUser()
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }
  try {
    const body = await request.json()
    if (!body.id) {
      return NextResponse.json({ error: "ID wajib diisi" }, { status: 400 })
    }
    const type = await prisma.publicationType.update({
      where: { id: parseInt(body.id) },
      data: {
        ...(body.name != null ? { name: body.name, slug: body.slug || slugify(body.name) } : {}),
        ...(body.icon !== undefined ? { icon: body.icon || null } : {}),
        ...(body.badgeColor !== undefined ? { badgeColor: body.badgeColor || null } : {}),
        ...(body.description !== undefined ? { description: body.description || null } : {}),
        ...(body.sortOrder != null ? { sortOrder: parseInt(body.sortOrder) } : {}),
        ...(body.status != null ? { status: body.status } : {}),
      },
    })
    revalidateTag("publication-types", "max")
    return NextResponse.json(type)
  } catch (e) {
    const message = e instanceof Error ? e.message : "Gagal memperbarui"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const user = await getCurrentUser()
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }
  try {
    const { searchParams } = new URL(request.url)
    const id = parseInt(searchParams.get("id") || "")
    if (!id) {
      return NextResponse.json({ error: "ID wajib diisi" }, { status: 400 })
    }
    const used = await prisma.book.count({ where: { publicationTypeId: id } })
    if (used > 0) {
      return NextResponse.json({ error: `Tidak dapat menghapus: masih digunakan oleh ${used} terbitan` }, { status: 400 })
    }
    await prisma.publicationType.delete({ where: { id } })
    revalidateTag("publication-types", "max")
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Gagal menghapus" }, { status: 500 })
  }
}
