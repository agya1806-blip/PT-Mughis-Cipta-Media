import LoadingScreen from "@/components/landing/LoadingScreen"
import HeroSection from "@/components/landing/HeroSection"
import StatsSection from "@/components/landing/StatsSection"
import StorySection from "@/components/landing/StorySection"
import BookJourneySection from "@/components/landing/BookJourneySection"
import ServicesSection from "@/components/landing/ServicesSection"
import WhyUsSection from "@/components/landing/WhyUsSection"
import FeaturedBooksSection from "@/components/landing/FeaturedBooksSection"
import TestimonialsSection from "@/components/landing/TestimonialsSection"
import WorkProcessSection from "@/components/landing/WorkProcessSection"
import CTASection from "@/components/landing/CTASection"

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <HeroSection />
      <StatsSection />
      <StorySection />
      <BookJourneySection />
      <ServicesSection />
      <WhyUsSection />
      <FeaturedBooksSection />
      <TestimonialsSection />
      <WorkProcessSection />
      <CTASection />
    </>
  )
}
