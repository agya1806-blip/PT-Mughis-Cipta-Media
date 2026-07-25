import { NextResponse } from "next/server"
import { revalidateTag } from "next/cache"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"

export async function GET() {
  const user = await getCurrentUser()
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  const rows = await prisma.setting.findMany({
    where: { key: { startsWith: "campaign_" } },
  })

  const map: Record<string, string> = {}
  for (const r of rows) map[r.key] = r.value

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
      "campaign_name",
      "campaign_start_date",
      "campaign_end_date",
      "campaign_quota_total",
      "campaign_quota_registered",
      "campaign_active",
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

    revalidateTag("campaign", "max")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Campaign settings update error:", error)
    return NextResponse.json({ error: "Gagal menyimpan pengaturan" }, { status: 500 })
  }
}
