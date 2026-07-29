import Breadcrumb from "@/components/ui/Breadcrumb"
import { JsonLd } from "@/components/JsonLd"
import { SITE } from "@/lib/seo"
import AboutHero from "@/components/about/AboutHero"
import AboutStory from "@/components/about/AboutStory"
import VisionMission from "@/components/about/VisionMission"
import CompanyValues from "@/components/about/CompanyValues"
import PublicationScope from "@/components/about/PublicationScope"
import Services from "@/components/about/Services"
import WhyUs from "@/components/about/WhyUs"
import Stats from "@/components/about/Stats"
import Timeline from "@/components/about/Timeline"
import AboutCTA from "@/components/about/AboutCTA"

export const metadata = {
  title: "Tentang PT Mughis Cipta Media | Penerbit Buku, Kitab & Percetakan",
  description:
    "PT Mughis Cipta Media adalah perusahaan penerbit dan percetakan di Aceh yang melayani penerbitan buku, kitab, kitab terjemahan, modul, buku ajar, monograf, prosiding, antologi, novel, dan berbagai jenis karya tulis lainnya. Berbadan hukum resmi Indonesia.",
  openGraph: {
    title: "Tentang PT Mughis Cipta Media | Penerbit Buku, Percetakan & Penerbit Kitab di Aceh",
    description:
      "Perusahaan penerbit dan percetakan buku di Aceh — melayani penerbitan kitab, modul, monograf, prosiding, antologi, cetak buku, dan pendampingan ISBN.",
    url: `${SITE.baseUrl}/tentang-kami`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Tentang PT Mughis Cipta Media | Penerbit & Percetakan Buku Aceh",
    description:
      "Penerbit buku, kitab, modul, buku ajar, monograf, prosiding, antologi, novel, dan cetak buku. PT Mughis Cipta Media — penerbit Indonesia terpercaya di Aceh.",
  },
  alternates: { canonical: "/tentang-kami" },
}

export default function TentangKamiPage() {
  return (
    <main className="min-h-screen">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "Tentang PT Mughis Cipta Media — Penerbit & Percetakan Buku Aceh",
          description:
            "Perusahaan penerbitan dan media kreatif di Aceh — melayani penerbitan buku, kitab, cetak buku, dan pendampingan ISBN.",
          publisher: { "@type": "Organization", name: SITE.name },
          url: `${SITE.baseUrl}/tentang-kami`,
        }}
      />
      <div className="pt-20 md:pt-24 px-6 sm:px-8 lg:px-10 max-w-7xl mx-auto w-full">
        <Breadcrumb
          items={[
            { label: "Beranda", href: "/" },
            { label: "Tentang Kami" },
          ]}
        />
      </div>
      <AboutHero />
      <AboutStory />
      <VisionMission />
      <CompanyValues />
      <PublicationScope />
      <Services />
      <WhyUs />
      <Stats />
      <Timeline />
      <AboutCTA />
    </main>
  )
}