import { prisma } from "@/lib/prisma"
import { JsonLd } from "@/components/JsonLd"
import { SITE } from "@/lib/seo"
import Breadcrumb from "@/components/ui/Breadcrumb"
import ContactHero from "@/components/contact/ContactHero"
import ContactDetails from "@/components/contact/ContactDetails"
import ContactForm from "@/components/contact/ContactForm"
import ContactFAQ from "@/components/contact/ContactFAQ"
import ContactCTA from "@/components/contact/ContactCTA"

export async function generateMetadata() {
  return {
    title: "Hubungi PT Mughis Cipta Media | Penerbit & Percetakan Buku Aceh",
    description: "Hubungi PT Mughis Cipta Media untuk konsultasi penerbitan buku, percetakan, pendampingan ISBN, dan layanan kreatif. Penerbit dan percetakan buku di Aceh — Samalanga, Bireuen.",
    openGraph: {
      title: "Hubungi PT Mughis Cipta Media | Penerbit Buku & Percetakan Aceh",
      description: "Konsultasi penerbitan buku, percetakan, dan pendampingan ISBN. PT Mughis Cipta Media — penerbit di Aceh.",
      url: `${SITE.baseUrl}/kontak`,
    },
    twitter: {
      card: "summary_large_image",
      title: "Hubungi PT Mughis Cipta Media | Penerbit & Percetakan Aceh",
      description: "Hubungi kami untuk informasi penerbitan dan percetakan buku.",
    },
    alternates: { canonical: "/kontak" },
  }
}

async function getSetting(key: string): Promise<string> {
  try {
    const s = await prisma.setting.findUnique({ where: { key } })
    return s?.value || ""
  } catch {
    return ""
  }
}

export default async function KontakPage() {
  const [phone, email, address] = await Promise.all([
    getSetting("contact_phone"),
    getSetting("contact_email"),
    getSetting("address"),
  ])

  return (
    <div className="flex-1">
      <Breadcrumb
        items={[
          { label: "Beranda", href: "/" },
          { label: "Kontak" },
        ]}
        className="pt-24 md:pt-28 px-6 sm:px-8 lg:px-10 max-w-7xl mx-auto w-full"
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPoint",
          contactType: "customer service",
          telephone: phone || SITE.contact.telephone,
          email: email || SITE.contact.email,
          availableLanguage: ["Indonesian", "English"],
          areaServed: "ID",
          contactOption: "TollFree",
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Hubungi PT Mughis Cipta Media — Penerbit & Percetakan Buku Aceh",
          description: "Hubungi PT Mughis Cipta Media untuk informasi penerbitan buku, percetakan, dan pendampingan ISBN.",
          publisher: { "@type": "Organization", name: SITE.name },
          url: `${SITE.baseUrl}/kontak`,
        }}
      />
      <ContactHero />
      <ContactDetails phone={phone} email={email} address={address} />
      <ContactForm />
      <ContactFAQ />
      <ContactCTA phone={phone} />
    </div>
  )
}