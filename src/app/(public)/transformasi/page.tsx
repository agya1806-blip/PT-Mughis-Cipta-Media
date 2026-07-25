import type { Metadata } from "next"
import { TransformasiClient } from "./TransformasiClient"
import { JsonLd } from "@/components/JsonLd"

export const metadata: Metadata = {
  title: "Transformasi & Program Apresiasi Penulis | PT Mughis Cipta Media",
  description:
    "PT Mughis Cipta Media mengumumkan transformasi perusahaan dan membuka Program Apresiasi Penulis. Daftar sekarang untuk pendampingan administrasi penerbitan.",
  openGraph: {
    title: "Transformasi & Program Apresiasi Penulis | PT Mughis Cipta Media",
    description:
      "PT Mughis Cipta Media mengumumkan transformasi perusahaan dan membuka Program Apresiasi Penulis.",
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
      <TransformasiClient />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Transformasi & Program Apresiasi Penulis",
          description: "PT Mughis Cipta Media mengumumkan transformasi perusahaan dan membuka Program Apresiasi Penulis.",
          publisher: { "@type": "Organization", name: "PT Mughis Cipta Media" },
        }}
      />
    </>
  )
}
