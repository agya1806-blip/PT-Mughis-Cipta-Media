import PageHero from "@/components/PageHero"
import { AuthorListClient } from "@/components/authors"
import { getAllAuthors } from "@/lib/authors"

export const metadata = {
  title: "Penulis | Maktabah al-Mughis",
  description: "Daftar penulis yang telah menerbitkan buku bersama Maktabah al-Mughis",
  alternates: { canonical: "/penulis" },
}

export default async function PenulisPage() {
  const authors = await getAllAuthors()

  return (
    <main className="min-h-screen">
      <PageHero
        title="Para"
        accent="Penulis"
        description="Para penulis yang telah berkarya bersama Maktabah al-Mughis dalam menerbitkan buku-buku berkualitas."
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Penulis" },
        ]}
        icon="penulis"
      />
      <div className="bg-zinc-50">
        <AuthorListClient authors={authors} />
      </div>
    </main>
  )
}
