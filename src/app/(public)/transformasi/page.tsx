import type { Metadata } from "next"
import { TransformasiClient } from "./TransformasiClient"
import Breadcrumb from "@/components/ui/Breadcrumb"
import { JsonLd } from "@/components/JsonLd"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://mughisciptamedia.com"

export const metadata: Metadata = {
  title: "Transformasi & Program Apresiasi Penulis | PT Mughis Cipta Media",
  description:
    "PT Mughis Cipta Media mengumumkan transformasi perusahaan dan membuka Program Apresiasi Penulis. Daftar sekarang untuk pendampingan administrasi penerbitan.",
  openGraph: {
    title: "Transformasi & Program Apresiasi Penulis | PT Mughis Cipta Media",
    description:
      "PT Mughis Cipta Media mengumumkan transformasi perusahaan dan membuka Program Apresiasi Penulis.",
    url: `${baseUrl}/transformasi`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Transformasi & Program Apresiasi Penulis | PT Mughis Cipta Media",
    description:
      "PT Mughis Cipta Media mengumumkan transformasi perusahaan dan membuka Program Apresiasi Penulis.",
  },
  alternates: { canonical: "/transformasi" },
}

export default function TransformasiPage() {
  return (
    <>
      <div className="pt-20 md:pt-24 px-6 sm:px-8 lg:px-10 max-w-7xl mx-auto w-full bg-cream">
        <Breadcrumb
          items={[
            { label: "Beranda", href: "/" },
            { label: "Transformasi" },
          ]}
        />
      </div>
      <TransformasiClient />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Transformasi & Program Apresiasi Penulis",
          description: "PT Mughis Cipta Media mengumumkan transformasi perusahaan dan membuka Program Apresiasi Penulis.",
          publisher: { "@type": "Organization", name: "PT Mughis Cipta Media" },
          url: `${baseUrl}/transformasi`,
        }}
      />
    </>
  )
}
