import type { Metadata } from "next"
import { JsonLd } from "@/components/JsonLd"
import { SITE } from "@/lib/seo"
import Breadcrumb from "@/components/ui/Breadcrumb"
import { TimClient } from "./TimClient"

export const metadata: Metadata = {
  title: "Tim Profesional | Penerbit & Percetakan Buku Aceh",
  description:
    "PT Mughis Cipta Media memiliki tim profesional yang berdedikasi dalam memberikan pelayanan penerbitan buku, percetakan, dan pendampingan ISBN terbaik kepada para penulis di Aceh dan Indonesia.",
  openGraph: {
    title: "Tim Profesional - PT Mughis Cipta Media | Penerbit Buku Aceh",
    description:
      "Mengenal jajaran pimpinan dan ketua divisi PT Mughis Cipta Media — penerbit dan percetakan buku di Aceh.",
    url: `${SITE.baseUrl}/tim`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Tim Profesional - PT Mughis Cipta Media",
    description:
      "Mengenal jajaran pimpinan dan ketua divisi PT Mughis Cipta Media.",
  },
  alternates: { canonical: "/tim" },
}

export default function TimPage() {
  return (
    <main className="min-h-screen bg-cream">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Tim Profesional PT Mughis Cipta Media — Penerbit & Percetakan Buku Aceh",
          description:
            "Mengenal jajaran pimpinan dan ketua divisi PT Mughis Cipta Media — penerbit buku dan percetakan di Aceh.",
          publisher: { "@type": "Organization", name: SITE.name },
          url: `${SITE.baseUrl}/tim`,
        }}
      />
      <div className="pt-20 md:pt-24 px-6 sm:px-8 lg:px-10 max-w-7xl mx-auto w-full bg-cream">
        <Breadcrumb
          items={[
            { label: "Beranda", href: "/" },
            { label: "Tim Profesional" },
          ]}
        />
      </div>
      <TimClient />
    </main>
  )
}