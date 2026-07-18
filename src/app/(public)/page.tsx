import type { Metadata } from "next"
import LoadingScreen from "@/components/landing/LoadingScreen"
import HeroSection from "@/components/landing/HeroSection"
import StatsSection from "@/components/landing/StatsSection"
import StorySection from "@/components/landing/StorySection"
import TrustMetricsSection from "@/components/landing/TrustMetricsSection"
import BookJourneySection from "@/components/landing/BookJourneySection"
import ServicesSection from "@/components/landing/ServicesSection"
import WhyUsSection from "@/components/landing/WhyUsSection"
import FeaturedBooksSection from "@/components/landing/FeaturedBooksSection"
import TestimonialsSection from "@/components/landing/TestimonialsSection"
import WorkProcessSection from "@/components/landing/WorkProcessSection"
import { PublishingJourneySection } from "@/components/publishing-journey"
import CTASection from "@/components/landing/CTASection"

export const metadata: Metadata = {
  title: "Maktabah al-Mughis - PT Mughis Cipta Media",
  description:
    "Penerbit buku islami berkualitas. Menghadirkan literasi berkualitas melalui Maktabah Al-Mughis - Penerbitan, Percetakan, Distribusi Buku, dan Media Kreatif.",
  openGraph: {
    title: "Maktabah al-Mughis - PT Mughis Cipta Media",
    description:
      "Penerbit buku islami berkualitas. Menghadirkan literasi berkualitas melalui Maktabah Al-Mughis.",
  },
}

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <HeroSection />
      <StatsSection />
      <StorySection />
      <TrustMetricsSection />
      <BookJourneySection />
      <ServicesSection />
      <WhyUsSection />
      <FeaturedBooksSection />
      <TestimonialsSection />
      <PublishingJourneySection />
      <WorkProcessSection />
      <CTASection />
    </>
  )
}
