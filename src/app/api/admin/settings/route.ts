import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const settingsList = await prisma.setting.findMany()
    const map: Record<string, string> = {}
    for (const s of settingsList) {
      map[s.key] = s.value
    }
    return NextResponse.json(map)
  } catch {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    for (const [key, value] of Object.entries(body)) {
      await prisma.setting.upsert({
        where: { key },
        update: { value: String(value ?? "") },
        create: { key, value: String(value ?? "") },
      })
    }
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update settings" }, { status: 500 })
  }
}
