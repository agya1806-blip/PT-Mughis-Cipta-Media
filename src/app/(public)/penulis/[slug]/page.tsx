import { notFound } from "next/navigation"
import Link from "next/link"
import { authors } from "@/data/authors"
import { books } from "@/lib/data"
import { AuthorProfile, AuthorBooks } from "@/components/authors"
import Breadcrumb from "@/components/ui/Breadcrumb"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const author = authors.find((a) => a.slug === slug)
  if (!author) return { title: "Penulis Tidak Ditemukan" }
  return {
    title: `${author.name} | Penulis | Maktabah al-Mughis`,
    description: author.bio.substring(0, 160),
  }
}

export default async function PenulisDetailPage({ params }: Props) {
  const { slug } = await params
  const author = authors.find((a) => a.slug === slug)
  if (!author) notFound()

  const authorBooks = books.filter((b) => author.bookIds.includes(b.id))

  return (
    <div className="flex-1 bg-zinc-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Breadcrumb
          items={[
            { label: "Beranda", href: "/" },
            { label: "Penulis", href: "/penulis" },
            { label: author.name },
          ]}
        />

        <AuthorProfile author={author} bookCount={authorBooks.length} />

        <div className="mt-12">
          <AuthorBooks books={authorBooks} />
        </div>

        <div className="mt-10">
          <Link
            href="/penulis"
            className="text-sm text-gold hover:text-gold-dark transition-colors"
          >
            &larr; Semua Penulis
          </Link>
        </div>
      </div>
    </div>
  )
}
