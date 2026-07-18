import FAQClient from "./FAQClient"

export const metadata = {
  title: "FAQ",
  description:
    "Pertanyaan yang sering diajukan tentang PT Mughis Cipta Media, layanan penerbitan, percetakan, distribusi buku, dan informasi penting lainnya.",
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
  return <FAQClient />
}
