import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Breadcrumb from "@/components/ui/Breadcrumb"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = await prisma.page.findUnique({ where: { slug } })
  if (!page) return { title: "Halaman Tidak Ditemukan" }
  return {
    title: `${page.title} | Maktabah al-Mughis`,
    description: page.content.replace(/<[^>]*>/g, "").substring(0, 160),
    alternates: { canonical: `/${slug}` },
  }
}

export default async function PublicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = await prisma.page.findUnique({ where: { slug } })
  if (!page) notFound()

  return (
    <div className="flex-1 bg-cream">
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
