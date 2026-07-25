"use client"

import { useCallback } from "react"
import { HeroSection } from "@/components/campaign/HeroSection"
import { TimelineSection } from "@/components/campaign/TimelineSection"
import { WhyTransformSection } from "@/components/campaign/WhyTransformSection"
import { ProgramSection } from "@/components/campaign/ProgramSection"
import { QuotaSection } from "@/components/campaign/QuotaSection"
import { FlowSection } from "@/components/campaign/FlowSection"
import { RequirementsSection } from "@/components/campaign/RequirementsSection"
import { RegistrationForm } from "@/components/campaign/RegistrationForm"
import { FAQSection } from "@/components/campaign/FAQSection"
import { CTASection } from "@/components/campaign/CTASection"
import { CampaignFooter } from "@/components/campaign/CampaignFooter"
import { ToastProvider } from "@/components/campaign/Toast"
import { CampaignStatusProvider } from "@/lib/campaign/useCampaignStatus"

export function TransformasiClient() {
  const scrollToForm = useCallback(() => {
    document.getElementById("daftar")?.scrollIntoView({ behavior: "smooth" })
  }, [])

  return (
    <CampaignStatusProvider>
      <ToastProvider>
        <main className="min-h-screen bg-cream">
          <HeroSection onCtaClick={scrollToForm} />
          <TimelineSection />
          <WhyTransformSection />
          <ProgramSection onCtaClick={scrollToForm} />
          <QuotaSection />
          <FlowSection />
          <RequirementsSection />
          <RegistrationForm />
          <FAQSection />
          <CTASection onCtaClick={scrollToForm} />
          <CampaignFooter />
        </main>
      </ToastProvider>
    </CampaignStatusProvider>
  )
}
