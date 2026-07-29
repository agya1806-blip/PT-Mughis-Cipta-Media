import { JsonLd } from "@/components/JsonLd"
import { SITE } from "@/lib/seo"
import PageHero from "@/components/PageHero"
import { services, whyChooseUs } from "@/components/services/service-data"
import ServiceHero from "./ServiceHero"
import ServiceProcess from "./ServiceProcess"
import ServiceBenefits from "./ServiceBenefits"
import ServiceFAQ from "./ServiceFAQ"
import WhyChooseUsSection from "./WhyChooseUsSection"
import ServiceCTA from "./ServiceCTA"

export async function generateMetadata() {
  return {
    title: "Layanan Penerbitan & Percetakan Buku | PT Mughis Cipta Media",
    description:
      "PT Mughis Cipta Media menyediakan layanan penerbitan buku, percetakan buku, layout, desain cover, editing naskah, pendampingan ISBN, dan distribusi nasional. Solusi lengkap penerbitan di Aceh.",
    openGraph: {
      title: "Layanan Penerbitan & Percetakan Buku Profesional | PT Mughis Cipta Media",
      description: "Solusi lengkap penerbitan buku, percetakan, layout, desain cover, editing naskah, dan pendampingan ISBN.",
      url: `${SITE.baseUrl}/layanan-penerbitan`,
    },
    twitter: {
      card: "summary_large_image",
      title: "Layanan Penerbitan & Percetakan Buku | PT Mughis Cipta Media",
      description: "Solusi lengkap penerbitan buku, percetakan, dan pendampingan ISBN.",
    },
    alternates: { canonical: "/layanan-penerbitan" },
  }
}

export default function LayananPenerbitanPage() {
  return (
    <main className="min-h-screen">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Layanan Penerbitan & Percetakan Buku PT Mughis Cipta Media",
          description: "Solusi lengkap penerbitan buku, percetakan, dan pendampingan ISBN dari PT Mughis Cipta Media.",
          publisher: { "@type": "Organization", name: SITE.name },
          url: `${SITE.baseUrl}/layanan-penerbitan`,
          mainEntity: services.map((s) => ({
            "@type": "Service",
            name: s.title,
            description: s.description,
            provider: { "@type": "Organization", name: SITE.name },
          })),
        }}
      />
      <PageHero
        title="Layanan"
        accent="Penerbitan"
        description="Solusi lengkap untuk mewujudkan naskah Anda menjadi buku berkualitas tinggi."
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Layanan Penerbitan" },
        ]}
        icon="layanan"
      />

      {services.map((service, i) => {
        const Icon = service.icon
        return (
          <section key={service.id} id={service.id} className={i % 2 === 0 ? "bg-cream" : "bg-cream"}>
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-20 lg:py-28">
              <ServiceHero
                icon={<Icon className="w-8 h-8 text-gold" />}
                title={service.title}
                tagline={service.tagline}
                description={service.description}
                index={i}
              />
              <ServiceProcess process={service.process} />
              <ServiceBenefits benefits={service.benefits} />
              <ServiceFAQ faq={service.faq} />
            </div>
          </section>
        )
      })}

      <section className="bg-gradient-to-br from-green via-green-dark to-green py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <WhyChooseUsSection
            items={whyChooseUs.map((w) => {
              const Icon = w.icon
              return { icon: <Icon className="w-6 h-6 text-gold" />, title: w.title, description: w.description }
            })}
          />
        </div>
      </section>

      <ServiceCTA />
    </main>
  )
}