import { prisma } from "@/lib/prisma"
import CatalogLaptopClient from "./CatalogLaptopClient"

export const revalidate = 60

const PUBLIC_KEYS = [
  "site_name", "contact_phone", "contact_email", "address", "owner_name",
  "company_tagline", "hero_headline", "hero_subheadline",
  "instagram_url", "bank_accounts_json", "catalog_products_json",
]

export default async function LaptopCatalogPage() {
  let initialProducts = []
  let initialSettings: Record<string, string> = {}

  try {
    const settingsList = await prisma.setting.findMany({
      where: { key: { in: PUBLIC_KEYS } },
    })
    for (const s of settingsList) {
      initialSettings[s.key] = s.value
    }
    if (initialSettings.catalog_products_json) {
      try {
        const parsed = JSON.parse(initialSettings.catalog_products_json)
        initialProducts = parsed.map((p: any) => ({
          ...p,
          images: p.images && p.images.length > 0 ? p.images : [p.image]
        }))
      } catch {}
    }
  } catch (e) {
    console.error("Server fetch error:", e)
  }

  return (
    <CatalogLaptopClient
      initialProducts={initialProducts}
      initialSettings={initialSettings}
    />
  )
}
