import type { Metadata } from "next"
import { JsonLd } from "@/components/JsonLd"
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

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://mughisciptamedia.com"

export const metadata: Metadata = {
  title: "Penerbit Buku & Percetakan Profesional – PT Mughis Cipta Media",
  description:
    "Penerbit buku, kitab, modul, buku ajar, monograf, prosiding, antologi, novel, dan berbagai jenis terbitan lainnya. PT Mughis Cipta Media adalah perusahaan penerbit profesional di Indonesia yang melayani penerbitan buku hingga kitab terjemahan dengan standar nasional.",
  openGraph: {
    title: "Penerbit Buku & Percetakan Profesional – PT Mughis Cipta Media",
    description:
      "Penerbit buku, kitab, modul, buku ajar, monograf, prosiding, antologi, dan novel. Perusahaan penerbit profesional di Indonesia yang melayani berbagai jenis terbitan berkualitas.",
    url: baseUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Penerbit Buku & Percetakan Profesional – PT Mughis Cipta Media",
    description:
      "Penerbit buku, kitab, modul, buku ajar, monograf, prosiding, antologi, novel, dan berbagai jenis terbitan lainnya. PT Mughis Cipta Media — penerbit Indonesia terpercaya.",
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
          name: "Penerbit Buku & Percetakan Profesional – PT Mughis Cipta Media",
          description:
            "Penerbit buku, kitab, modul, buku ajar, monograf, prosiding, antologi, novel, dan berbagai jenis terbitan lainnya. Perusahaan penerbit profesional di Indonesia.",
          publisher: { "@type": "Organization", name: "PT Mughis Cipta Media" },
          url: baseUrl,
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
