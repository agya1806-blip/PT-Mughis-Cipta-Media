import type { Metadata } from "next"
import { JsonLd } from "@/components/JsonLd"
import Breadcrumb from "@/components/ui/Breadcrumb"
import { TimClient } from "./TimClient"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://mughisciptamedia.com"

export const metadata: Metadata = {
  title: "Tim Profesional",
  description:
    "PT Mughis Cipta Media memiliki tim profesional yang berdedikasi dalam memberikan pelayanan penerbitan terbaik kepada para penulis Indonesia.",
  openGraph: {
    title: "Tim Profesional - PT Mughis Cipta Media",
    description:
      "Mengenal jajaran pimpinan dan ketua divisi PT Mughis Cipta Media yang berkomitmen menghadirkan pelayanan penerbitan terbaik.",
    url: `${baseUrl}/tim`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Tim Profesional - PT Mughis Cipta Media",
    description:
      "Mengenal jajaran pimpinan dan ketua divisi PT Mughis Cipta Media yang berkomitmen menghadirkan pelayanan penerbitan terbaik.",
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
          name: "Tim Profesional PT Mughis Cipta Media",
          description:
            "Mengenal jajaran pimpinan dan ketua divisi PT Mughis Cipta Media yang berkomitmen menghadirkan pelayanan penerbitan terbaik.",
          publisher: { "@type": "Organization", name: "PT Mughis Cipta Media" },
          url: `${baseUrl}/tim`,
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
