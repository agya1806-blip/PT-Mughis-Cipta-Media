import { prisma } from "@/lib/prisma"
import Breadcrumb from "@/components/ui/Breadcrumb"
import { Phone, Mail, MapPin } from "lucide-react"

export async function generateMetadata() {
  return {
    title: "Kontak",
    description: "Hubungi PT Mughis Cipta Media - Maktabah al-Mughis untuk informasi penerbitan, percetakan, dan layanan kreatif lainnya.",
    openGraph: {
      title: "Kontak - Maktabah al-Mughis",
      description: "Hubungi kami untuk informasi penerbitan dan layanan kreatif.",
    },
    twitter: {
      title: "Kontak - Maktabah al-Mughis",
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
  const [phone, email, address, igUrl, fbUrl] = await Promise.all([
    getSetting("contact_phone"),
    getSetting("contact_email"),
    getSetting("address"),
    getSetting("instagram_url"),
    getSetting("facebook_url"),
  ])

  return (
    <div className="flex-1 bg-zinc-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Breadcrumb items={[{ label: "Beranda", href: "/" }, { label: "Kontak" }]} />

        <h1 className="text-3xl font-bold text-zinc-900 mb-8">Kontak</h1>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-zinc-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                </div>
                <h2 className="text-lg font-semibold text-zinc-900">Alamat</h2>
              </div>
              <p className="text-zinc-600">{address || "Belum diisi"}</p>
            </div>

            <div className="bg-white rounded-xl border border-zinc-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-emerald-600" />
                </div>
                <h2 className="text-lg font-semibold text-zinc-900">Kontak</h2>
              </div>
              <div className="space-y-3 text-zinc-600">
                {phone && (
                  <a
                    href={`https://wa.me/${phone}`}
                    target="_blank"
                    className="flex items-center gap-3 text-emerald-600 hover:text-emerald-700 transition-colors font-medium"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{phone}</span>
                  </a>
                )}
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-3 text-emerald-600 hover:text-emerald-700 transition-colors font-medium"
                  >
                    <Mail className="w-4 h-4" />
                    <span>{email}</span>
                  </a>
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-zinc-200 p-6">
              <h2 className="text-lg font-semibold text-zinc-900 mb-4">Media Sosial</h2>
              <div className="space-y-3">
                {igUrl && (
                  <a href={igUrl} target="_blank" className="flex items-center gap-3 text-zinc-600 hover:text-pink-600 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/></svg>
                    <span>Instagram</span>
                  </a>
                )}
                {fbUrl && (
                  <a href={fbUrl} target="_blank" className="flex items-center gap-3 text-zinc-600 hover:text-blue-600 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
                    <span>Facebook</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-zinc-200 p-6">
              <h2 className="text-lg font-semibold text-zinc-900 mb-4">Lokasi</h2>
              <div className="aspect-[4/3] bg-zinc-100 rounded-lg flex items-center justify-center text-zinc-400">
                <div className="text-center p-4">
                  <MapPin className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm">Peta Google Maps</p>
                  <p className="text-xs mt-1">Integrasi peta akan ditambahkan</p>
                </div>
              </div>
            </div>

            {phone && (
              <a
                href={`https://wa.me/${phone}`}
                target="_blank"
                className="block bg-emerald-600 text-white rounded-xl p-6 text-center hover:bg-emerald-700 transition-colors"
              >
                <Phone className="w-6 h-6 mx-auto mb-2" />
                <p className="font-semibold">Hubungi via WhatsApp</p>
                <p className="text-sm text-emerald-100 mt-1">{phone}</p>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
