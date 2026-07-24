import PageHero from "@/components/PageHero"
import { AuthorListClient } from "@/components/authors"
import { getAllAuthors } from "@/lib/authors"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Penulis | PT Mughis Cipta Media",
  description: "Daftar penulis yang telah menerbitkan buku bersama PT Mughis Cipta Media",
  alternates: { canonical: "/penulis" },
}

export default async function PenulisPage() {
  const authors = await getAllAuthors()

  return (
    <main className="min-h-screen">
      <PageHero
        title="Para"
        accent="Penulis"
        description="Para penulis yang telah berkarya bersama PT Mughis Cipta Media dalam menerbitkan buku-buku berkualitas."
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Penulis" },
        ]}
        icon="penulis"
      />
      <div className="bg-cream">
        <AuthorListClient authors={authors} />
      </div>
    </main>
  )
}
