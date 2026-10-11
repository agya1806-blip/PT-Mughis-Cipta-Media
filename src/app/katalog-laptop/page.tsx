import { prisma } from "@/lib/prisma"
import { ProductItem } from "@/types/catalog"
import { slugify } from "@/lib/slug"
import CatalogLaptopClient from "./CatalogLaptopClient"

export const revalidate = 3600

const PUBLIC_KEYS = [
  "site_name", "contact_phone", "contact_email", "address", "owner_name",
  "company_tagline", "hero_headline", "hero_subheadline",
  "instagram_url", "bank_accounts_json", "catalog_products_json", "catalog_testimonials_json",
]

export default async function LaptopCatalogPage() {
  let initialProducts: ProductItem[] = []
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
          slug: p.slug || slugify(p.title) || p.id,
          images: p.images && p.images.length > 0 ? p.images : [p.image]
        }))
      } catch {}
    }
  } catch (e) {
    console.error("Server fetch error in /katalog-laptop:", e)
  }

  return (
    <CatalogLaptopClient
      initialProducts={initialProducts}
      initialSettings={initialSettings}
    />
  )
}
