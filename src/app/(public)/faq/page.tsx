import Breadcrumb from "@/components/ui/Breadcrumb"
import { JsonLd } from "@/components/JsonLd"
import { getAllFAQItems } from "@/components/faq"
import FAQClient from "./FAQClient"

export const metadata = {
  title: "FAQ",
  description:
    "Pertanyaan yang sering diajukan tentang PT Mughis Cipta Media, layanan penerbitan, percetakan, ISBN, pembayaran, pengiriman, dan informasi penting lainnya.",
  openGraph: {
    title: "FAQ - Maktabah al-Mughis",
    description: "Pertanyaan yang sering diajukan seputar layanan Maktabah al-Mughis.",
  },
  twitter: {
    title: "FAQ - Maktabah al-Mughis",
    description: "Pertanyaan yang sering diajukan seputar layanan Maktabah al-Mughis.",
  },
  alternates: { canonical: "/faq" },
}

export default function FAQPage() {
  const allItems = getAllFAQItems()
  return (
    <main className="flex-1 bg-cream">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: allItems.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.a,
            },
          })),
        }}
      />
      <section className="relative pt-24 pb-20 bg-gradient-to-br from-green via-green-dark to-green overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(211,194,151,0.08),transparent_50%)]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: "Beranda", href: "/" },
                { label: "FAQ" },
              ]}
              className="[&_a]:text-cream/70 [&_a:hover]:text-cream [&_span]:text-cream [&_svg]:text-cream/50"
            />
          </div>
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-cream mb-4">FAQ</h1>
            <p className="text-cream/70 text-lg">
              Pertanyaan yang sering diajukan
            </p>
          </div>
        </div>
      </section>
      <FAQClient />
    </main>
  )
}
