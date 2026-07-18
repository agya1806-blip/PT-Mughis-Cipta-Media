import Breadcrumb from "@/components/ui/Breadcrumb"
import PublishingSolutions from "@/components/services/PublishingSolutions"

export async function generateMetadata() {
  return {
    title: "Layanan Penerbitan",
    description: "PT Mughis Cipta Media menyediakan layanan penerbitan buku, editing, desain, layout, ISBN, percetakan, dan distribusi nasional untuk penulis dan penerbit.",
    openGraph: {
      title: "Layanan Penerbitan - Maktabah al-Mughis",
      description: "Layanan penerbitan buku profesional dari Maktabah al-Mughis.",
    },
    twitter: {
      title: "Layanan Penerbitan - Maktabah al-Mughis",
      description: "Layanan penerbitan buku profesional dari Maktabah al-Mughis.",
    },
    alternates: { canonical: "/layanan-penerbitan" },
  }
}

export default function LayananPenerbitanPage() {
  return (
    <div className="flex-1 bg-zinc-50">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 pt-8 sm:pt-10">
        <Breadcrumb
          items={[
            { label: "Beranda", href: "/" },
            { label: "Layanan Penerbitan" },
          ]}
        />
      </div>
      <PublishingSolutions />
    </div>
  )
}
