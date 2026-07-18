import Breadcrumb from "@/components/ui/Breadcrumb"
import BlogHero from "@/components/blog/BlogHero"
import SearchBar from "@/components/blog/SearchBar"
import CategoryFilter from "@/components/blog/CategoryFilter"
import BlogGrid from "@/components/blog/BlogGrid"

export const metadata = {
  title: "Blog",
  description: "Baca artikel dan informasi terbaru seputar dunia penerbitan, literasi, dan kegiatan Maktabah al-Mughis - PT Mughis Cipta Media.",
  openGraph: {
    title: "Blog - Maktabah al-Mughis",
    description: "Artikel dan informasi terbaru seputar penerbitan dan literasi.",
  },
  twitter: {
    title: "Blog - Maktabah al-Mughis",
    description: "Artikel dan informasi terbaru seputar penerbitan dan literasi.",
  },
  alternates: { canonical: "/blog" },
}

export default function BlogPage() {
  return (
    <div className="flex-1">
      <BlogHero />
      <div className="container pb-4">
        <Breadcrumb items={[{ label: "Beranda", href: "/" }, { label: "Blog" }]} />
      </div>
      <div className="container pb-10 space-y-8">
        <SearchBar />
        <CategoryFilter />
      </div>
      <BlogGrid />
    </div>
  )
}
