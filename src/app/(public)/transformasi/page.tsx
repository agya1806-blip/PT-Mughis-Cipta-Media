import type { Metadata } from "next"
import { TransformasiClient } from "./TransformasiClient"
import Breadcrumb from "@/components/ui/Breadcrumb"
import { JsonLd } from "@/components/JsonLd"
import { SITE } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Program Pendampingan Pengajuan ISBN Gratis | PT Mughis Cipta Media",
  description:
    "PT Mughis Cipta Media membuka Program Apresiasi Penulis — pendampingan administrasi penerbitan, pengajuan ISBN gratis, dan konsultasi penerbitan. Daftar sekarang, kuota terbatas!",
  openGraph: {
    title: "Program Pendampingan Pengajuan ISBN Gratis | PT Mughis Cipta Media",
    description:
      "Program Apresiasi Penulis — pendampingan administrasi penerbitan dan pengajuan ISBN gratis dari PT Mughis Cipta Media. Kuota terbatas.",
    url: `${SITE.baseUrl}/transformasi`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Program Pendampingan Pengajuan ISBN Gratis | PT Mughis Cipta Media",
    description:
      "PT Mughis Cipta Media membuka Program Apresiasi Penulis — pendampingan administrasi penerbitan dan pengajuan ISBN gratis.",
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
          name: "Program Pendampingan Pengajuan ISBN Gratis",
          description: "Program Apresiasi Penulis — pendampingan administrasi penerbitan dan pengajuan ISBN gratis dari PT Mughis Cipta Media.",
          publisher: { "@type": "Organization", name: SITE.name },
          url: `${SITE.baseUrl}/transformasi`,
        }}
      />
    </>
  )
}