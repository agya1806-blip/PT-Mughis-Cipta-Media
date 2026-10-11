import { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import { ProductItem, BankAccount } from "@/types/catalog"
import { slugify } from "@/lib/slug"
import PrintableBrosurClient from "./PrintableBrosurClient"

export const revalidate = 3600

const PUBLIC_KEYS = [
  "site_name", "contact_phone", "contact_email", "address", "owner_name",
  "company_tagline", "hero_headline", "hero_subheadline",
  "instagram_url", "bank_accounts_json", "catalog_products_json", "catalog_testimonials_json",
]

export const metadata: Metadata = {
  title: "Brosur Katalog Ready Stock A4 — Mughis Laptop Store",
  description: "Cetak atau simpan PDF brosur daftar laptop business bekas & produk digital ready stock dari Mughis Laptop Store Samalanga.",
}

export default async function BrosurKatalogPage() {
  let products: ProductItem[] = []
  let settings: Record<string, string> = {}

  try {
    const settingsList = await prisma.setting.findMany({
      where: { key: { in: PUBLIC_KEYS } },
    })
    for (const s of settingsList) {
      settings[s.key] = s.value
    }
    if (settings.catalog_products_json) {
      try {
        const parsed = JSON.parse(settings.catalog_products_json)
        products = parsed.map((p: any) => ({
          ...p,
          slug: p.slug || slugify(p.title) || p.id,
          images: p.images && p.images.length > 0 ? p.images : [p.image]
        })).filter((p: ProductItem) => p.stockStatus !== "HIDDEN")
      } catch {}
    }
  } catch (e) {
    console.error("Server fetch error in /katalog-laptop/brosur:", e)
  }

  return (
    <PrintableBrosurClient
      products={products}
      settings={settings}
    />
  )
}
