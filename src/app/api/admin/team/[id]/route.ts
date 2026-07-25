import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"
import { hashPassword } from "@/lib/team/auth"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser()
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  const { id } = await params
  const idNum = parseInt(id)
  if (isNaN(idNum)) {
    return NextResponse.json({ error: "ID tidak valid" }, { status: 400 })
  }

  const member = await prisma.teamMember.findUnique({ where: { id: idNum } })
  if (!member) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  return NextResponse.json({
    id: member.id,
    name: member.name,
    position: member.position,
    division: member.division,
    role: member.role,
    bio: member.bio,
    photo: member.photo,
    email: member.email,
    whatsapp: member.whatsapp,
    linkedin: member.linkedin,
    facebook: member.facebook,
    instagram: member.instagram,
    website: member.website,
    skills: member.skills,
    quote: member.quote,
    status: member.status,
    displayOrder: member.displayOrder,
  })
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser()
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  const { id } = await params
  const idNum = parseInt(id)
  if (isNaN(idNum)) {
    return NextResponse.json({ error: "ID tidak valid" }, { status: 400 })
  }

  try {
    const body = await request.json()
    const data: Record<string, unknown> = {}

    const editable = [
      "name", "position", "division", "role", "bio", "photo",
      "email", "whatsapp", "linkedin", "facebook", "instagram",
      "website", "skills", "quote", "status", "displayOrder",
    ]

    for (const key of editable) {
      if (body[key] !== undefined) {
        data[key] = body[key] === "" ? null : body[key]
      }
    }

    if (body.password) {
      data.password = await hashPassword(body.password)
    }

    if (body.email) {
      const existing = await prisma.teamMember.findFirst({
        where: { email: body.email, id: { not: idNum } },
      })
      if (existing) {
        return NextResponse.json(
          { error: "Email sudah digunakan oleh anggota lain" },
          { status: 409 }
        )
      }
    }

    const member = await prisma.teamMember.update({
      where: { id: idNum },
      data,
    })

    return NextResponse.json({ id: member.id, name: member.name })
  } catch (error) {
    console.error("Team update error:", error)
    return NextResponse.json(
      { error: "Gagal memperbarui anggota tim" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser()
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  const { id } = await params
  const idNum = parseInt(id)
  if (isNaN(idNum)) {
    return NextResponse.json({ error: "ID tidak valid" }, { status: 400 })
  }

  try {
    const member = await prisma.teamMember.findUnique({ where: { id: idNum } })
    if (!member) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }
    if (member.role === "FOUNDER") {
      return NextResponse.json(
        { error: "Tidak dapat menghapus Founder" },
        { status: 403 }
      )
    }

    await prisma.teamMember.delete({ where: { id: idNum } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: "Gagal menghapus anggota tim" },
      { status: 500 }
    )
  }
}
