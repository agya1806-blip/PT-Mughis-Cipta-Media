import type { Metadata } from "next"
import { SITE } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Profil Perusahaan | PT Mughis Cipta Media",
  description:
    "Profil PT Mughis Cipta Media — perusahaan penerbitan buku, percetakan, dan media kreatif di Aceh. Berbadan hukum resmi, melayani penerbitan buku, kitab, dan pendampingan ISBN.",
  openGraph: {
    title: "Profil Perusahaan - PT Mughis Cipta Media | Penerbit & Percetakan Aceh",
    description: "Profil perusahaan penerbitan buku, percetakan, dan media kreatif di Aceh.",
    url: `${SITE.baseUrl}/company`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Profil Perusahaan - PT Mughis Cipta Media",
    description: "Profil perusahaan penerbitan dan media kreatif di Aceh.",
  },
  alternates: { canonical: "/company" },
}

export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  return children
}