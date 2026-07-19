import PageHero from "@/components/PageHero"
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
    <main className="min-h-screen">
      <PageHero
        title="Layanan"
        accent="Penerbitan"
        description="Solusi lengkap untuk mewujudkan naskah Anda menjadi buku yang diterbitkan secara profesional."
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Layanan Penerbitan" },
        ]}
        icon="layanan"
      />
      <PublishingSolutions />
    </main>
  )
}
