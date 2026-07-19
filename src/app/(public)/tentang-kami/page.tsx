import AboutHero from "@/components/about/AboutHero"
import AboutStory from "@/components/about/AboutStory"
import VisionMission from "@/components/about/VisionMission"
import CompanyValues from "@/components/about/CompanyValues"
import Services from "@/components/about/Services"
import WhyUs from "@/components/about/WhyUs"
import Stats from "@/components/about/Stats"
import Timeline from "@/components/about/Timeline"
import AboutCTA from "@/components/about/AboutCTA"

export const metadata = {
  title: "Tentang Kami",
  description:
    "PT Mughis Cipta Media adalah perusahaan penerbitan, percetakan, distribusi buku, dan media kreatif yang berkomitmen menghadirkan karya berkualitas bagi dunia pendidikan dan literasi Indonesia.",
  openGraph: {
    title: "Tentang Kami - Maktabah al-Mughis",
    description:
      "Perusahaan penerbitan dan media kreatif yang berkomitmen membangun peradaban melalui buku dan pengetahuan.",
  },
  twitter: {
    title: "Tentang Kami - Maktabah al-Mughis",
    description:
      "Perusahaan penerbitan dan media kreatif yang berkomitmen membangun peradaban melalui buku dan pengetahuan.",
  },
  alternates: { canonical: "/tentang-kami" },
}

export default function TentangKamiPage() {
  return (
    <main className="min-h-screen">
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
