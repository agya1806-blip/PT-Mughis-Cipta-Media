import Breadcrumb from "@/components/ui/Breadcrumb"
import { JsonLd } from "@/components/JsonLd"
import AboutHero from "@/components/about/AboutHero"
import AboutStory from "@/components/about/AboutStory"
import VisionMission from "@/components/about/VisionMission"
import CompanyValues from "@/components/about/CompanyValues"
import Services from "@/components/about/Services"
import WhyUs from "@/components/about/WhyUs"
import Stats from "@/components/about/Stats"
import Timeline from "@/components/about/Timeline"
import AboutCTA from "@/components/about/AboutCTA"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://mughisciptamedia.com"

export const metadata = {
  title: "Tentang Kami",
  description:
    "PT Mughis Cipta Media adalah perusahaan penerbitan, percetakan, distribusi buku, dan media kreatif yang berkomitmen menghadirkan karya berkualitas bagi dunia pendidikan dan literasi Indonesia.",
  openGraph: {
    title: "Tentang Kami - PT Mughis Cipta Media",
    description:
      "Perusahaan penerbitan dan media kreatif yang berkomitmen membangun peradaban melalui buku dan pengetahuan.",
    url: `${baseUrl}/tentang-kami`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Tentang Kami - PT Mughis Cipta Media",
    description:
      "Perusahaan penerbitan dan media kreatif yang berkomitmen membangun peradaban melalui buku dan pengetahuan.",
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
          name: "Tentang PT Mughis Cipta Media",
          description:
            "Perusahaan penerbitan dan media kreatif yang berkomitmen membangun peradaban melalui buku dan pengetahuan.",
          publisher: { "@type": "Organization", name: "PT Mughis Cipta Media" },
          url: `${baseUrl}/tentang-kami`,
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
      <Services />
      <WhyUs />
      <Stats />
      <Timeline />
      <AboutCTA />
    </main>
  )
}
