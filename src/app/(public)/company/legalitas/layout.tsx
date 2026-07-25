import type { Metadata } from "next"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://mughisciptamedia.com"

export const metadata: Metadata = {
  title: "Legalitas Perusahaan",
  description:
    "Informasi legalitas PT Mughis Cipta Media termasuk NIB, NPWP, dan dokumen resmi perusahaan.",
  openGraph: {
    title: "Legalitas Perusahaan - PT Mughis Cipta Media",
    description: "Informasi legalitas resmi PT Mughis Cipta Media.",
    url: `${baseUrl}/company/legalitas`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Legalitas Perusahaan - PT Mughis Cipta Media",
    description: "Informasi legalitas resmi PT Mughis Cipta Media.",
  },
  alternates: { canonical: "/company/legalitas" },
}

export default function LegalitasLayout({ children }: { children: React.ReactNode }) {
  return children
}
