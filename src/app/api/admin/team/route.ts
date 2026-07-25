import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"
import { hashPassword } from "@/lib/team/auth"

export async function GET(request: Request) {
  const user = await getCurrentUser()
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status") || undefined

    const where = status ? { status: status as "ACTIVE" | "INACTIVE" } : {}

    const members = await prisma.teamMember.findMany({
      where,
      orderBy: { displayOrder: "asc" },
    })

    return NextResponse.json(members.map((m) => ({
      id: m.id,
      name: m.name,
      position: m.position,
      division: m.division,
      role: m.role,
      bio: m.bio,
      photo: m.photo,
      email: m.email,
      whatsapp: m.whatsapp,
      linkedin: m.linkedin,
      facebook: m.facebook,
      instagram: m.instagram,
      website: m.website,
      skills: m.skills,
      quote: m.quote,
      status: m.status,
      displayOrder: m.displayOrder,
      createdAt: m.createdAt.toISOString(),
      updatedAt: m.updatedAt.toISOString(),
    })))
  } catch {
    return NextResponse.json({ error: "Gagal memuat data tim" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const user = await getCurrentUser()
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  try {
    const body = await request.json()

    if (!body.name || !body.position || !body.division || !body.email || !body.password) {
      return NextResponse.json(
        { error: "Nama, jabatan, divisi, email, dan password wajib diisi" },
        { status: 400 }
      )
    }

    const existing = await prisma.teamMember.findUnique({
      where: { email: body.email },
    })
    if (existing) {
      return NextResponse.json(
        { error: "Email sudah digunakan oleh anggota lain" },
        { status: 409 }
      )
    }

    const hashedPassword = await hashPassword(body.password)

    const member = await prisma.teamMember.create({
      data: {
        name: body.name,
        position: body.position,
        division: body.division,
        role: body.role || "HEAD_OF_DIVISION",
        bio: body.bio || "",
        photo: body.photo || null,
        email: body.email,
        password: hashedPassword,
        whatsapp: body.whatsapp || null,
        linkedin: body.linkedin || null,
        facebook: body.facebook || null,
        instagram: body.instagram || null,
        website: body.website || null,
        skills: body.skills || null,
        quote: body.quote || null,
        displayOrder: body.displayOrder || 0,
      },
    })

    return NextResponse.json(
      { id: member.id, name: member.name, email: member.email },
      { status: 201 }
    )
  } catch (error) {
    console.error("Team create error:", error)
    return NextResponse.json(
      { error: "Gagal menambah anggota tim" },
      { status: 500 }
    )
  }
}
