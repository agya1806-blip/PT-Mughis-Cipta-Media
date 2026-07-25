import type { Metadata } from "next"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://mughisciptamedia.com"

export const metadata: Metadata = {
  title: "Profil Perusahaan",
  description:
    "Profil PT Mughis Cipta Media — perusahaan penerbitan, percetakan, dan media kreatif yang berkomitmen pada kualitas dan integritas.",
  openGraph: {
    title: "Profil Perusahaan - PT Mughis Cipta Media",
    description: "Profil perusahaan penerbitan dan media kreatif terpercaya di Indonesia.",
    url: `${baseUrl}/company`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Profil Perusahaan - PT Mughis Cipta Media",
    description: "Profil perusahaan penerbitan dan media kreatif terpercaya di Indonesia.",
  },
  alternates: { canonical: "/company" },
}

export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  return children
}
