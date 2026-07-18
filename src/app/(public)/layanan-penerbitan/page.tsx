import { prisma } from "@/lib/prisma"

export async function generateMetadata() {
  return { title: "Layanan Penerbitan | Maktabah al-Mughis" }
}

export default async function LayananPenerbitanPage() {
  const page = await prisma.page.findUnique({ where: { slug: "layanan-penerbitan" } })

  return (
    <div className="flex-1 bg-zinc-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-zinc-900 mb-8">
          {page?.title || "Layanan Penerbitan"}
        </h1>
        {page ? (
          <div
            className="text-zinc-700 leading-relaxed [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-zinc-900 [&_h2]:mb-4 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_li]:mb-1"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        ) : (
          <div className="bg-white rounded-xl border border-zinc-200 p-8 text-center text-zinc-500">
            <p>Halaman belum diisi. Login sebagai admin untuk menambahkan konten.</p>
          </div>
        )}
      </div>
    </div>
  )
}
