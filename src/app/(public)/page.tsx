import type { Metadata } from "next"
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

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://pt-mughis-cipta-media.vercel.app"

export const metadata: Metadata = {
  title: "Penerbit Buku & Percetakan Profesional – Maktabah al-Mughis",
  description:
    "Penerbit buku terpercaya di Indonesia. Layanan penerbitan buku, cetak buku murah, desain cover, editing naskah, pengurusan ISBN, dan distribusi nasional. Wujudkan karya Anda bersama Maktabah al-Mughis, penerbit buku islami dan umum.",
  openGraph: {
    title: "Penerbit Buku & Percetakan Profesional – Maktabah al-Mughis",
    description:
      "Penerbit buku terpercaya di Indonesia. Layanan penerbitan buku, cetak buku murah, dan distribusi nasional.",
    images: [{ url: `${baseUrl}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Penerbit Buku & Percetakan Profesional – Maktabah al-Mughis",
    description:
      "Penerbit buku terpercaya di Indonesia. Layanan penerbitan buku, cetak buku murah, dan distribusi nasional.",
  },
  alternates: {
    canonical: baseUrl,
  },
}

export default function Home() {
  return (
    <>
      <h1 className="sr-only">Maktabah al-Mughis – Penerbit Buku & Percetakan Profesional</h1>
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
    </>
  )
}
