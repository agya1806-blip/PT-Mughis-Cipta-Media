import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const members = await prisma.teamMember.findMany({
      where: { status: "ACTIVE" },
      orderBy: { displayOrder: "asc" },
    })
    const publicMembers = members.map((m) => ({
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
      displayOrder: m.displayOrder,
    }))
    return NextResponse.json(publicMembers)
  } catch (error) {
    console.error("Team GET error:", error)
    return NextResponse.json({ error: "Gagal memuat data tim" }, { status: 500 })
  }
}
