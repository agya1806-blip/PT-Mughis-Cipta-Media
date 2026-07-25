import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { JsonLd } from "@/components/JsonLd"
import Breadcrumb from "@/components/ui/Breadcrumb"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://mughisciptamedia.com"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = await prisma.page.findUnique({ where: { slug } })
  if (!page) return { title: "Halaman Tidak Ditemukan" }
  const desc = page.content.replace(/<[^>]*>/g, "").substring(0, 160)
  return {
    title: `${page.title} | PT Mughis Cipta Media`,
    description: desc,
    openGraph: {
      title: `${page.title} - PT Mughis Cipta Media`,
      description: desc,
      url: `${baseUrl}/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${page.title} - PT Mughis Cipta Media`,
      description: desc,
    },
    alternates: { canonical: `/${slug}` },
  }
}

export default async function PublicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = await prisma.page.findUnique({ where: { slug } })
  if (!page) notFound()

  return (
    <div className="flex-1 bg-cream">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `${page.title} - PT Mughis Cipta Media`,
          description: page.content.replace(/<[^>]*>/g, "").substring(0, 160),
          publisher: { "@type": "Organization", name: "PT Mughis Cipta Media" },
          url: `${baseUrl}/${slug}`,
        }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <Breadcrumb
          items={[
            { label: "Beranda", href: "/" },
            { label: page.title },
          ]}
        />
        <h1 className="text-3xl font-bold text-green-dark mt-6 mb-8">{page.title}</h1>
        <div
          className="prose prose-green max-w-none"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </div>
    </div>
  )
}
