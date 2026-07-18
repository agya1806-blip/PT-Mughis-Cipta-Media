import type { Metadata } from "next"
import LoadingScreen from "@/components/landing/LoadingScreen"
import HeroSection from "@/components/landing/HeroSection"
import StatsSection from "@/components/landing/StatsSection"
import StorySection from "@/components/landing/StorySection"
import TrustMetricsSection from "@/components/landing/TrustMetricsSection"
import FeaturedBooks from "@/components/home/FeaturedBooks"
import BookJourneySection from "@/components/landing/BookJourneySection"
import ServicesSection from "@/components/landing/ServicesSection"
import WhyUsSection from "@/components/landing/WhyUsSection"
import TestimonialsSection from "@/components/landing/TestimonialsSection"
import WorkProcessSection from "@/components/landing/WorkProcessSection"
import { PublishingJourneySection } from "@/components/publishing-journey"
import CTASection from "@/components/landing/CTASection"
import FinalCTA from "@/components/home/FinalCTA"

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
      <FeaturedBooks />
      <BookJourneySection />
      <ServicesSection />
      <WhyUsSection />
      <TestimonialsSection />
      <PublishingJourneySection />
      <WorkProcessSection />
      <CTASection />
      <FinalCTA />
    </>
  )
}
