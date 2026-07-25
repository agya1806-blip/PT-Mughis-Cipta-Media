import { NextResponse } from "next/server"
import { getCampaignSettings } from "@/lib/campaign/settings"

export async function GET() {
  try {
    const settings = await getCampaignSettings()
    return NextResponse.json(settings)
  } catch (error) {
    console.error("Campaign status error:", error)
    return NextResponse.json({ error: "Gagal memuat status campaign" }, { status: 500 })
  }
}
