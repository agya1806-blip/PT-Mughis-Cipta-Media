import { prisma } from "@/lib/prisma"
import Breadcrumb from "@/components/ui/Breadcrumb"
import { ContactInfo, ContactForm, MapPlaceholder } from "@/components/contact"
import Link from "next/link"
import { MessageCircle, ArrowRight } from "lucide-react"

export async function generateMetadata() {
  return {
    title: "Kontak",
    description: "Hubungi PT Mughis Cipta Media untuk informasi penerbitan, percetakan, dan layanan kreatif lainnya.",
    openGraph: {
      title: "Kontak - Maktabah al-Mughis",
      description: "Hubungi kami untuk informasi penerbitan dan layanan kreatif.",
    },
    twitter: {
      title: "Kontak - Maktabah al-Mughis",
      description: "Hubungi kami untuk informasi penerbitan dan layanan kreatif.",
    },
    alternates: { canonical: "/contact" },
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

export default async function ContactPage() {
  const [phone, email, address, igUrl, fbUrl] = await Promise.all([
    getSetting("contact_phone"),
    getSetting("contact_email"),
    getSetting("address"),
    getSetting("instagram_url"),
    getSetting("facebook_url"),
  ])

  return (
    <div className="flex-1 bg-zinc-50">
      <section className="relative py-20 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(200,169,106,0.1),transparent_50%)]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Hubungi Kami
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Punya pertanyaan atau ingin memulai proyek? Tim kami siap membantu Anda.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-background rounded-2xl border border-border p-6 sm:p-8 mb-8">
          <Breadcrumb
            items={[
              { label: "Beranda", href: "/" },
              { label: "Kontak" },
            ]}
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-6">
            <ContactInfo
              address={address}
              email={email}
              phone={phone}
              instagramUrl={igUrl}
              facebookUrl={fbUrl}
            />
            <MapPlaceholder />
            {phone && (
              <a
                href={`https://wa.me/${phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gold text-white rounded-xl p-6 text-center hover:bg-gold-dark transition-colors"
              >
                <MessageCircle className="w-6 h-6 mx-auto mb-2" />
                <p className="font-semibold">Hubungi via WhatsApp</p>
                <p className="text-sm text-gold-light mt-1">{phone}</p>
              </a>
            )}
          </div>

          <div className="lg:col-span-3 space-y-6">
            <ContactForm />

            <div className="bg-white rounded-xl border border-zinc-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-zinc-900">Punya pertanyaan lain?</h3>
                  <p className="text-sm text-zinc-500 mt-1">
                    Lihat pertanyaan yang sering diajukan
                  </p>
                </div>
                <Link
                  href="/faq"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 text-gold font-medium rounded-xl hover:bg-gold/20 transition-colors text-sm"
                >
                  FAQ
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
