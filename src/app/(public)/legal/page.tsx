import { Building2, BookOpen, Shield, Mail, Phone, MapPin, FileText } from "lucide-react"
import Breadcrumb from "@/components/ui/Breadcrumb"

export const metadata = {
  title: "Legalitas Perusahaan",
  description: "Informasi legal dan profil resmi PT Mughis Cipta Media, perusahaan penerbitan buku yang berbadan hukum.",
  openGraph: {
    title: "Legalitas Perusahaan - PT Mughis Cipta Media",
    description: "Informasi legal resmi perusahaan penerbitan buku.",
  },
  alternates: { canonical: "/legal" },
}

const infoItems = [
  {
    icon: Building2,
    label: "Nama Badan Usaha",
    value: "PT Mughis Cipta Media",
  },
  {
    icon: FileText,
    label: "Status",
    value: "PT Perorangan",
  },
  {
    icon: BookOpen,
    label: "Bidang Usaha Utama",
    value: "KBLI 58110 – Penerbitan Buku",
  },
  {
    icon: Shield,
    label: "Kegiatan Usaha",
    value: "Penerbitan dan percetakan buku",
  },
]

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: "admin@pt-mughis-cipta-media.com",
    href: "mailto:admin@pt-mughis-cipta-media.com",
  },
  {
    icon: Phone,
    label: "WhatsApp",
    value: "+62 812-3456-7890",
    href: "https://wa.me/6281234567890",
  },
  {
    icon: MapPin,
    label: "Alamat",
    value: "Perumahan Bumi Asri, Jl. Bawang No. 12, Bandung, Jawa Barat",
  },
]

export default function LegalPage() {
  return (
    <div className="flex-1 bg-zinc-50">
      <section className="relative py-20 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(200,169,106,0.08),transparent_50%)]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: "Beranda", href: "/" },
                { label: "Legalitas" },
              ]}
              className="[&_a]:text-zinc-400 [&_a:hover]:text-white [&_span]:text-white [&_svg]:text-zinc-500"
            />
          </div>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-medium uppercase tracking-wider mb-6">
              Legalitas Perusahaan
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Informasi{" "}
              <span className="bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent">Legal</span>
            </h1>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              PT Mughis Cipta Media adalah perusahaan penerbitan buku yang berbadan hukum resmi dan terdaftar.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm">
          <div className="p-8 sm:p-10">
            <h2 className="text-2xl font-bold text-zinc-900 mb-8">Identitas Perusahaan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {infoItems.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="flex items-start gap-4 p-4 rounded-xl bg-zinc-50 border border-zinc-100">
                    <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">{item.label}</p>
                      <p className="text-sm font-semibold text-zinc-800 mt-0.5">{item.value}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm mt-8">
          <div className="p-8 sm:p-10">
            <h2 className="text-2xl font-bold text-zinc-900 mb-4">Komitmen Kualitas</h2>
            <p className="text-zinc-600 leading-relaxed mb-6">
              PT Mughis Cipta Media berkomitmen untuk menerbitkan buku-buku berkualitas tinggi yang 
              bermanfaat bagi masyarakat. Setiap naskah melalui proses kurasi, editing, dan kontrol 
              kualitas yang ketat sebelum diproduksi. Kami menjunjung tinggi standar profesionalisme 
              dalam setiap aspek penerbitan, dari desain hingga distribusi.
            </p>
            <p className="text-zinc-600 leading-relaxed">
              Sebagai perusahaan penerbit yang terdaftar, kami siap bekerja sama dengan penulis, 
              akademisi, dan institusi untuk mewujudkan karya tulis berkualitas yang siap 
              didistribusikan secara nasional.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm mt-8">
          <div className="p-8 sm:p-10">
            <h2 className="text-2xl font-bold text-zinc-900 mb-8">Kontak Resmi</h2>
            <div className="space-y-4">
              {contactItems.map((item) => {
                const Icon = item.icon
                const content = (
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-zinc-50 border border-zinc-100 hover:border-gold/20 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">{item.label}</p>
                      <p className="text-sm font-semibold text-zinc-800 mt-0.5">{item.value}</p>
                    </div>
                  </div>
                )
                return item.href ? (
                  <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                    {content}
                  </a>
                ) : (
                  <div key={item.label}>{content}</div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
