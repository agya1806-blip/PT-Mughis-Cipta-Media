import type { Metadata } from "next"
import { JsonLd } from "@/components/JsonLd"
import LoadingScreen from "@/components/landing/LoadingScreen"
import HeroSection from "@/components/landing/HeroSection"
import StatsSection from "@/components/landing/StatsSection"
import StorySection from "@/components/landing/StorySection"
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
    "Penerbit buku terpercaya di Indonesia. Layanan penerbitan buku, cetak buku murah, desain cover, editing naskah, dan distribusi nasional. Wujudkan karya Anda bersama PT Mughis Cipta Media.",
  openGraph: {
    title: "Penerbit Buku & Percetakan Profesional – PT Mughis Cipta Media",
    description:
      "Penerbit buku terpercaya di Indonesia. Layanan penerbitan buku, cetak buku murah, dan distribusi nasional.",
    url: baseUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Penerbit Buku & Percetakan Profesional – PT Mughis Cipta Media",
    description:
      "Penerbit buku terpercaya di Indonesia. Layanan penerbitan, cetak buku, editing naskah, dan distribusi nasional.",
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
            "Penerbit buku terpercaya di Indonesia. Layanan penerbitan buku, cetak buku murah, desain cover, editing naskah, dan distribusi nasional.",
          publisher: { "@type": "Organization", name: "PT Mughis Cipta Media" },
          url: baseUrl,
        }}
      />
      <LoadingScreen />
      <HeroSection />
      <StatsSection />
      <StorySection />
      <FeaturedBooks />
      <BookJourneySection />
      <ServicesSection />
      <WhyUsSection />
      <Testimonials />
      <FinalCTA />
    </main>
  )
}
