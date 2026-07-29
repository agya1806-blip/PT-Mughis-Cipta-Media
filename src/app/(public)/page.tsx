import type { Metadata } from "next"
import { JsonLd } from "@/components/JsonLd"
import { SITE } from "@/lib/seo"
import LoadingScreen from "@/components/landing/LoadingScreen"
import HeroSection from "@/components/landing/HeroSection"
import StatsSection from "@/components/landing/StatsSection"
import StorySection from "@/components/landing/StorySection"
import PublicationScopeSection from "@/components/landing/PublicationScopeSection"
import FeaturedBooks from "@/components/home/FeaturedBooks"
import BookJourneySection from "@/components/landing/BookJourneySection"
import ServicesSection from "@/components/landing/ServicesSection"
import WhyUsSection from "@/components/landing/WhyUsSection"
import Testimonials from "@/components/home/Testimonials"
import FinalCTA from "@/components/home/FinalCTA"

export const metadata: Metadata = {
  title: "PT Mughis Cipta Media | Penerbit & Percetakan Buku Aceh",
  description:
    "PT Mughis Cipta Media — penerbit dan percetakan buku di Aceh. Melayani penerbitan kitab, kitab terjemahan, modul, monograf, prosiding, antologi, novel, cetak buku murah, pendampingan ISBN. Percayakan penerbitan buku Anda pada penerbit profesional Indonesia.",
  openGraph: {
    title: "PT Mughis Cipta Media | Penerbit & Percetakan Buku Aceh, Penerbit Kitab",
    description:
      "Penerbit dan percetakan buku di Aceh — melayani penerbitan kitab, kitab terjemahan, monograf, prosiding, antologi, cetak buku murah, dan pendampingan ISBN. Penerbit profesional Indonesia.",
    url: SITE.baseUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "PT Mughis Cipta Media | Penerbit & Percetakan Buku Aceh",
    description:
      "Penerbit buku, kitab, modul, monograf, prosiding, antologi, dan cetak buku. PT Mughis Cipta Media — penerbit Indonesia terpercaya di Aceh.",
  },
  alternates: { canonical: "/" },
}

export default function Home() {
  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "PT Mughis Cipta Media | Penerbit & Percetakan Buku Aceh",
          description:
            "Penerbit dan percetakan buku di Aceh. Melayani penerbitan kitab, kitab terjemahan, modul, monograf, prosiding, antologi, cetak buku murah, dan pendampingan ISBN.",
          publisher: { "@type": "Organization", name: SITE.name },
          url: SITE.baseUrl,
        }}
      />
      <LoadingScreen />
      <HeroSection />
      <StatsSection />
      <StorySection />
      <PublicationScopeSection />
      <FeaturedBooks />
      <BookJourneySection />
      <ServicesSection />
      <WhyUsSection />
      <Testimonials />
      <FinalCTA />
    </main>
  )
}