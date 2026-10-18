import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { JsonLd } from "@/components/JsonLd"
import { SITE } from "@/lib/seo"
import Breadcrumb from "@/components/ui/Breadcrumb"

// Define a constant for the special homepage slug
const HOMEPAGE_SLUG = "beranda-utama" // You can change this slug as needed

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = await prisma.page.findUnique({ where: { slug } })
  if (!page) return { title: "Halaman Tidak Ditemukan" }
  const desc = page.content.replace(/<[^>]*>/g, "").substring(0, 160)
  return {
    title: `${page.title} | PT Mughis Cipta Media — Penerbit & Percetakan Buku Aceh`,
    description: `${page.title} — ${desc}. PT Mughis Cipta Media, penerbit dan percetakan buku di Aceh.`,
    openGraph: {
      title: `${page.title} - PT Mughis Cipta Media`,
      description: desc,
      url: `${SITE.baseUrl}/${slug}`,
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

  // Determine if this is the special homepage
  const isHomepage = slug === HOMEPAGE_SLUG

  // Prepare breadcrumb items
  const breadcrumbItems = isHomepage
    ? [{ label: "Beranda", href: "/" }]
    : [
        { label: "Beranda", href: "/" },
        { label: page.title },
      ]

  return (
    <div className="flex-1 bg-cream">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `${page.title} - PT Mughis Cipta Media`,
          description: page.content.replace(/<[^>]*>/g, "").substring(0, 160),
          publisher: { "@type": "Organization", name: SITE.name },
          url: `${SITE.baseUrl}/${slug}`,
        }}
      />

      {isHomepage ? (
        <>
          {/* Welcome Banner for Homepage */}
          <div className="bg-green-dark text-cream py-20 text-center">
            <h1 className="text-5xl font-extrabold mb-4">Selamat Datang di PT Mughis Cipta Media</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Penerbit dan Percetakan Buku Terkemuka di Aceh. Kami berkomitmen untuk menyebarkan ilmu dan inspirasi melalui karya-karya berkualitas.
            </p>
          </div>
          {/* Homepage Content */}
          <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
            <Breadcrumb items={breadcrumbItems} />
            <div
              className="prose prose-green max-w-none mt-8"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </main>
        </>
      ) : (
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <Breadcrumb items={breadcrumbItems} />
          <h1 className="text-3xl font-bold text-green-dark mt-6 mb-8">{page.title}</h1>
          <div
            className="prose prose-green max-w-none"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </main>
      )}
    </div>
  )
}
