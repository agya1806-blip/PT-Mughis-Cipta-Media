import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"

export async function GET() {
  const user = await getCurrentUser()
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  const settings = await prisma.setting.findMany({
    where: {
      key: { startsWith: "team_" },
    },
  })

  const map: Record<string, string> = {}
  for (const s of settings) {
    map[s.key] = s.value
  }

  return NextResponse.json(map)
}

export async function PUT(request: Request) {
  const user = await getCurrentUser()
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  try {
    const body = await request.json()
    const allowedKeys = [
      "team_hero_title",
      "team_hero_subtitle",
    ]

    for (const key of allowedKeys) {
      if (body[key] !== undefined) {
        await prisma.setting.upsert({
          where: { key },
          update: { value: String(body[key]) },
          create: { key, value: String(body[key]) },
        })
      }
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: "Gagal menyimpan pengaturan" },
      { status: 500 }
    )
  }
}
