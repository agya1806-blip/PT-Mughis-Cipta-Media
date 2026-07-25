import { prisma } from "@/lib/prisma"
import { JsonLd } from "@/components/JsonLd"
import Breadcrumb from "@/components/ui/Breadcrumb"
import ContactHero from "@/components/contact/ContactHero"
import ContactDetails from "@/components/contact/ContactDetails"
import ContactForm from "@/components/contact/ContactForm"
import ContactFAQ from "@/components/contact/ContactFAQ"
import ContactCTA from "@/components/contact/ContactCTA"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://mughisciptamedia.com"

export async function generateMetadata() {
  return {
    title: "Kontak",
    description: "Hubungi PT Mughis Cipta Media untuk informasi penerbitan, percetakan, dan layanan kreatif lainnya.",
    openGraph: {
      title: "Kontak - PT Mughis Cipta Media",
      description: "Hubungi kami untuk informasi penerbitan dan layanan kreatif.",
      url: `${baseUrl}/kontak`,
    },
    twitter: {
      card: "summary_large_image",
      title: "Kontak - PT Mughis Cipta Media",
      description: "Hubungi kami untuk informasi penerbitan dan layanan kreatif.",
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
          telephone: phone || "+62-857-2345-6789",
          email: email || "admin@pt-mughis-cipta-media.com",
          availableLanguage: ["Indonesian", "English"],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Kontak PT Mughis Cipta Media",
          description: "Hubungi PT Mughis Cipta Media untuk informasi penerbitan, percetakan, dan layanan kreatif.",
          publisher: { "@type": "Organization", name: "PT Mughis Cipta Media" },
          url: `${baseUrl}/kontak`,
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
