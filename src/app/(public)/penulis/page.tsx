import Link from "next/link"
import { prisma } from "@/lib/prisma"
import Breadcrumb from "@/components/ui/Breadcrumb"
import { EmptyState } from "@/components/ui"

export const metadata = {
  title: "Penulis | Maktabah al-Mughis",
  description: "Daftar penulis yang telah menerbitkan buku bersama Maktabah al-Mughis",
}

export default async function PenulisPage() {
  const books = await prisma.book.findMany({
    select: { author: true },
    distinct: ["author"],
    orderBy: { author: "asc" },
  })

  const authors = books.map((b) => b.author).filter(Boolean)

  return (
    <div className="flex-1 bg-zinc-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Breadcrumb items={[{ label: "Beranda", href: "/" }, { label: "Penulis" }]} />

        <h1 className="text-3xl font-bold text-zinc-900 mb-2">Penulis</h1>
        <p className="text-zinc-500 mb-10">
          Para penulis yang telah berkarya bersama Maktabah al-Mughis
        </p>

        {authors.length === 0 ? (
          <EmptyState title="Belum ada penulis" description="Daftar penulis akan segera hadir." />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {authors.map((author) => (
              <Link
                key={author}
                href={`/penulis/${encodeURIComponent(author)}`}
                className="bg-white rounded-xl border border-zinc-200 p-5 hover:shadow-md hover:border-emerald-200 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-lg shrink-0">
                    {author.charAt(0)}
                  </div>
                  <div>
                    <h2 className="font-semibold text-zinc-800">{author}</h2>
                    <p className="text-xs text-zinc-400">Penulis</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
