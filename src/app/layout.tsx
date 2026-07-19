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
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://pt-mughis-cipta-media.vercel.app"

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
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
    images: [{ url: `${baseUrl}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: [`${baseUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
  alternates: {
    canonical: baseUrl,
  },
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/manifest.json",
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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-gold focus:text-white focus:rounded-xl focus:text-sm focus:font-medium focus:shadow-lg"
        >
          Langsung ke konten utama
        </a>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "PT Mughis Cipta Media",
            alternateName: "Maktabah al-Mughis",
            description: siteDescription,
            url: baseUrl,
            logo: `${baseUrl}/logo.png`,
            sameAs: [
              "https://www.instagram.com/maktabahmughis",
              "https://www.facebook.com/maktabahmughis",
            ],
          }}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: siteName,
            url: baseUrl,
            description: siteDescription,
            inLanguage: "id",
          }}
        />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
