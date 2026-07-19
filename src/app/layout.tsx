import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import ThemeProvider from "@/components/ThemeProvider"
import { JsonLd } from "@/components/JsonLd"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const siteName = "Maktabah al-Mughis – PT Mughis Cipta Media"
const siteDescription =
  "Penerbit buku resmi dan percetakan profesional di Indonesia. Layanan penerbitan buku, cetak buku murah, desain cover, editing naskah, pengurusan ISBN, dan distribusi nasional. Percayakan penerbitan buku Anda pada Maktabah al-Mughis."

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://pt-mughis-cipta-media.vercel.app"),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "penerbit buku",
    "percetakan buku",
    "penerbit buku islami",
    "cetak buku murah",
    "penerbit buku Indonesia",
    "Maktabah al-Mughis",
    "PT Mughis Cipta Media",
    "jasa penerbitan buku",
    "ISBN buku",
    "distribusi buku nasional",
  ],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Maktabah al-Mughis",
    title: siteName,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "PT Mughis Cipta Media",
            alternateName: "Maktabah al-Mughis",
            description:
              "Penerbit, percetakan, dan mitra kreatif untuk mewujudkan karya terbaik Anda. Layanan penerbitan buku, editing, desain, ISBN, dan distribusi nasional.",
            url: process.env.NEXT_PUBLIC_BASE_URL || "https://pt-mughis-cipta-media.vercel.app",
            logo: `${process.env.NEXT_PUBLIC_BASE_URL || "https://pt-mughis-cipta-media.vercel.app"}/logo.png`,
            sameAs: [
              "https://www.instagram.com/maktabahmughis",
              "https://www.facebook.com/maktabahmughis",
            ],
          }}
        />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
