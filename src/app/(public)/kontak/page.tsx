import { prisma } from "@/lib/prisma"
import { JsonLd } from "@/components/JsonLd"
import ContactHero from "@/components/contact/ContactHero"
import ContactDetails from "@/components/contact/ContactDetails"
import ContactForm from "@/components/contact/ContactForm"
import ContactFAQ from "@/components/contact/ContactFAQ"
import ContactCTA from "@/components/contact/ContactCTA"

export async function generateMetadata() {
  return {
    title: "Kontak",
    description: "Hubungi PT Mughis Cipta Media untuk informasi penerbitan, percetakan, dan layanan kreatif lainnya.",
    openGraph: {
      title: "Kontak - PT Mughis Cipta Media",
      description: "Hubungi kami untuk informasi penerbitan dan layanan kreatif.",
    },
    twitter: {
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
      <ContactHero />
      <ContactDetails phone={phone} email={email} address={address} />
      <ContactForm />
      <ContactFAQ />
      <ContactCTA phone={phone} />
    </div>
  )
}
