import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

const PUBLIC_KEYS = new Set([
  "site_name", "contact_phone", "contact_email", "address", "owner_name",
  "company_tagline", "hero_headline", "hero_subheadline",
  "instagram_url", "facebook_url", "bank_accounts_json", "catalog_products_json",
  "legal_nib", "legal_npwp", "legal_ikapi",
  "legal_nib_date", "legal_npwp_date", "legal_ikapi_date",
])

export async function GET() {
  try {
    const settingsList = await prisma.setting.findMany({
      where: { key: { in: Array.from(PUBLIC_KEYS) } },
    })
    const map: Record<string, string> = {}
    for (const s of settingsList) {
      map[s.key] = s.value
    }
    return NextResponse.json(map)
  } catch {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
  }
}
