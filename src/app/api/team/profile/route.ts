import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentTeamMember } from "@/lib/team/auth"

export async function GET() {
  const member = await getCurrentTeamMember()
  if (!member) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
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
  })
}

export async function PUT(request: Request) {
  const member = await getCurrentTeamMember()
  if (!member) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const allowed = [
      "bio", "photo", "skills", "whatsapp", "email",
      "linkedin", "facebook", "instagram", "website", "quote",
    ]

    const data: Record<string, unknown> = {}
    for (const key of allowed) {
      if (body[key] !== undefined) {
        data[key] = body[key] === "" ? null : body[key]
      }
    }

    if (body.email && body.email !== member.email) {
      const existing = await prisma.teamMember.findUnique({
        where: { email: body.email },
      })
      if (existing) {
        return NextResponse.json(
          { error: "Email sudah digunakan" },
          { status: 409 }
        )
      }
    }

    const updated = await prisma.teamMember.update({
      where: { id: member.id },
      data,
    })

    return NextResponse.json({
      id: updated.id,
      name: updated.name,
      position: updated.position,
      division: updated.division,
      role: updated.role,
      bio: updated.bio,
      photo: updated.photo,
      email: updated.email,
      whatsapp: updated.whatsapp,
      linkedin: updated.linkedin,
      facebook: updated.facebook,
      instagram: updated.instagram,
      website: updated.website,
      skills: updated.skills,
      quote: updated.quote,
    })
  } catch (error) {
    console.error("Team profile update error:", error)
    return NextResponse.json(
      { error: "Gagal memperbarui profil" },
      { status: 500 }
    )
  }
}
