import { ArrowRight, CheckCircle, ChevronRight } from "lucide-react"
import Breadcrumb from "@/components/ui/Breadcrumb"
import { services, whyChooseUs } from "@/components/services/service-data"

export async function generateMetadata() {
  return {
    title: "Layanan Penerbitan",
    description: "PT Mughis Cipta Media menyediakan layanan penerbitan buku, percetakan, pengurusan ISBN, layout, dan desain cover profesional.",
    openGraph: {
      title: "Layanan Penerbitan - Maktabah al-Mughis",
      description: "Layanan penerbitan buku profesional dari Maktabah al-Mughis.",
    },
    twitter: {
      title: "Layanan Penerbitan - Maktabah al-Mughis",
      description: "Layanan penerbitan buku profesional dari Maktabah al-Mughis.",
    },
    alternates: { canonical: "/layanan-penerbitan" },
  }
}

function ServiceHero() {
  return (
    <section className="relative bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 25% 25%, #d4a853 0%, transparent 50%), radial-gradient(circle at 75% 75%, #d4a853 0%, transparent 50%)" }} />
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 py-20 sm:py-28 lg:py-36">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/30 mb-6">
            <span className="text-gold text-[11px] font-medium uppercase tracking-[0.1em]">Layanan Profesional</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight text-balance">
            Solusi{" "}
            <span className="bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">
              Penerbitan Lengkap
            </span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed">
            Dari naskah hingga buku tersedia di toko buku. Kami mendampingi Anda di setiap tahap penerbitan dengan layanan profesional dan berkualitas tinggi.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <a href="/kontak" className="group inline-flex items-center gap-2 px-6 py-3 bg-gold hover:bg-gold-dark text-white font-semibold rounded-full transition-all">
              Konsultasi Gratis
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#layanan" className="group inline-flex items-center gap-2 px-6 py-3 border border-zinc-600 text-zinc-300 hover:text-white hover:border-zinc-500 font-medium rounded-full transition-all">
              Lihat Layanan
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function ServiceDetail({ service, index }: { service: (typeof services)[0]; index: number }) {
  const Icon = service.icon
  const isEven = index % 2 === 0
  return (
    <section id={`service-${service.id}`} className={isEven ? "" : "bg-zinc-50"}>
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 py-16 sm:py-20 lg:py-24">
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-start ${isEven ? "" : ""}`}>
          <div className={isEven ? "" : "lg:order-2"}>
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center">
                <Icon className="w-6 h-6 text-gold" />
              </div>
              <span className="text-xs font-medium text-gold uppercase tracking-wider">{String(index + 1).padStart(2, "0")}</span>
            </div>
            <h2 className="text-3xl font-bold text-zinc-900 mb-2">{service.title}</h2>
            <p className="text-lg text-gold-dark font-medium mb-4">{service.tagline}</p>
            <p className="text-zinc-600 leading-relaxed mb-6">{service.description}</p>
            <div className="space-y-3 mb-8">
              {service.benefits.map((b) => (
                <div key={b} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <span className="text-zinc-700 text-sm">{b}</span>
                </div>
              ))}
            </div>
            <a href="/kontak" className="group inline-flex items-center gap-2 px-6 py-3 bg-gold hover:bg-gold-dark text-white font-semibold rounded-full transition-all">
              Konsultasi Gratis
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          <div className={isEven ? "" : "lg:order-1"}>
            <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 shadow-sm">
              <h3 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider mb-6">Alur Proses</h3>
              <div className="space-y-0">
                {service.process.map((step, i) => (
                  <div key={step.label} className="flex gap-4 pb-6 relative">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-gold/10 text-gold text-xs font-bold flex items-center justify-center shrink-0">
                        {i + 1}
                      </div>
                      {i < service.process.length - 1 && <div className="w-px flex-1 bg-zinc-200 mt-1" />}
                    </div>
                    <div>
                      <h4 className="font-medium text-zinc-900 text-sm">{step.label}</h4>
                      <p className="text-xs text-zinc-500 mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function WhyChooseUs() {
  return (
    <section className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 py-20 sm:py-28">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/30 mb-6">
            <span className="text-gold text-[11px] font-medium uppercase tracking-[0.1em]">Mengapa Memilih Kami</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Mengapa Memilih{" "}
            <span className="bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">
              PT Mughis Cipta Media
            </span>
          </h2>
          <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
            Kami berkomitmen memberikan layanan penerbitan terbaik untuk setiap karya yang dipercayakan kepada kami.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChooseUs.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-gold/15 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-gold-light" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ServiceFAQ() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-10 py-20 sm:py-28">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 mb-6">
            <span className="text-gold text-[11px] font-medium uppercase tracking-[0.1em]">Tanya Jawab</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900">
            Pertanyaan yang Sering Diajukan
          </h2>
        </div>
        <div className="space-y-4">
          {services.flatMap((service) =>
            service.faq.map((faq) => (
              <details key={faq.q} className="group bg-zinc-50 rounded-2xl border border-zinc-200 overflow-hidden">
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer text-sm font-medium text-zinc-900 group-open:bg-gold/5 hover:bg-zinc-100/50 transition-colors list-none">
                  {faq.q}
                  <ChevronRight className="w-4 h-4 text-zinc-400 group-open:rotate-90 transition-transform shrink-0" />
                </summary>
                <div className="px-6 pb-4 pt-2">
                  <p className="text-sm text-zinc-600 leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

function ServiceCTA() {
  return (
    <section className="bg-gradient-to-r from-gold to-gold-dark">
      <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-10 py-20 sm:py-24 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Siap Menerbitkan Buku?
        </h2>
        <p className="text-gold/90 text-lg mb-8 max-w-2xl mx-auto">
          Konsultasikan kebutuhan penerbitan Anda dengan tim kami secara gratis. Tidak ada kewajiban, hanya solusi.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/kontak" className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-gold-dark font-bold rounded-full hover:shadow-xl hover:-translate-y-0.5 transition-all">
            Konsultasi Gratis
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="/katalog" className="group inline-flex items-center gap-2 px-8 py-4 border-2 border-white/40 text-white font-semibold rounded-full hover:bg-white/10 transition-all">
            Jelajahi Koleksi Buku
          </a>
        </div>
      </div>
    </section>
  )
}

export default function LayananPenerbitanPage() {
  return (
    <div className="flex-1">
      <ServiceHero />
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 pt-6">
        <Breadcrumb
          items={[
            { label: "Beranda", href: "/" },
            { label: "Layanan Penerbitan" },
          ]}
        />
      </div>
      <div id="layanan">
        {services.map((service, i) => (
          <ServiceDetail key={service.id} service={service} index={i} />
        ))}
      </div>
      <WhyChooseUs />
      <ServiceFAQ />
      <ServiceCTA />
    </div>
  )
}
