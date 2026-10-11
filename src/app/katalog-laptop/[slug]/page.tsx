import { Metadata } from "next"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { ProductItem } from "@/types/catalog"
import { slugify } from "@/lib/slug"
import ProductDetailClient from "./ProductDetailClient"

export const revalidate = 60

const PUBLIC_KEYS = [
  "site_name", "contact_phone", "contact_email", "address", "owner_name",
  "company_tagline", "hero_headline", "hero_subheadline",
  "instagram_url", "bank_accounts_json", "catalog_products_json", "catalog_testimonials_json",
]

async function getProductsAndSettings() {
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
        products = parsed.map((p: any) => {
          const productSlug = p.slug || slugify(p.title) || p.id
          return {
            ...p,
            slug: productSlug,
            images: p.images && p.images.length > 0 ? p.images : [p.image],
            rating: p.rating || 5,
            soldCount: p.soldCount || 12,
            originalPriceText: p.originalPriceText || "",
            discountPercent: p.discountPercent || (p.originalPriceText ? 15 : 0)
          }
        })
      } catch {}
    }
  } catch (e) {
    console.error("Server fetch error:", e)
  }

  return { products, settings }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string }
}): Promise<Metadata> {
  const resolvedParams = await params
  const { slug } = resolvedParams
  const { products, settings } = await getProductsAndSettings()

  const product = products.find(
    (p) => p.slug === slug || p.id === slug || slugify(p.title) === slug
  )

  const siteName = settings.site_name || "Mughis Laptop Store"

  if (!product) {
    return {
      title: `Produk Tidak Ditemukan — ${siteName}`,
    }
  }

  return {
    title: `${product.title} — ${siteName}`,
    description: `${product.title} ${product.priceText}. ${product.shortDesc || "Jual Laptop Business Bekas Berkualitas & Produk Digital Garansi Toko Resmi Samalanga."}`,
    openGraph: {
      title: `${product.title} — ${product.priceText}`,
      description: product.shortDesc,
      url: `/katalog-laptop/${product.slug}`,
      siteName: siteName,
      images: [
        {
          url: product.images?.[0] || product.image,
          width: 800,
          height: 1000,
          alt: product.title,
        },
      ],
      locale: "id_ID",
      type: "website",
    },
    alternates: {
      canonical: `/katalog-laptop/${product.slug}`,
    },
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string }
}) {
  const resolvedParams = await params
  const { slug } = resolvedParams
  const { products, settings } = await getProductsAndSettings()

  const product = products.find(
    (p) => p.slug === slug || p.id === slug || slugify(p.title) === slug
  )

  if (!product) {
    notFound()
  }

  return (
    <ProductDetailClient
      product={product}
      allProducts={products}
      settings={settings}
    />
  )
}
