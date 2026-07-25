import type { Metadata, Viewport } from "next"
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

const siteName = "PT Mughis Cipta Media"
const siteDescription =
  "Penerbit buku resmi dan percetakan profesional di Indonesia. Layanan penerbitan buku, cetak buku murah, desain cover, editing naskah, dan distribusi nasional. Percayakan penerbitan buku Anda pada PT Mughis Cipta Media."
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://mughisciptamedia.com"
const ogImageUrl = `${baseUrl}/og-image.jpg`

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${siteName} — Penerbit Buku & Percetakan Profesional Indonesia`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "penerbit buku",
    "percetakan buku",
    "penerbit buku islami",
    "cetak buku murah",
    "penerbit buku Indonesia",
    "PT Mughis Cipta Media",
    "jasa penerbitan buku",
    "distribusi buku nasional",
    "penerbit profesional",
    "penerbit Aceh",
    "penerbit buku pendidikan",
    "penerbit novel",
    "penerbit buku puisi",
    "penerbit buku anak",
    "penerbit buku umum",
    "editing buku",
    "layout buku",
    "jasa editing buku",
    "ISBN Indonesia",
    "penerbitan buku",
    "cara menerbitkan buku",
    "syarat menerbitkan buku",
    "perusahaan penerbitan buku",
  ],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "PT Mughis Cipta Media",
    title: siteName,
    description: siteDescription,
    url: baseUrl,
    images: [{ url: ogImageUrl, width: 1200, height: 630, alt: siteName }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: [ogImageUrl],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.png",
    apple: "/logo-original.png",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
  alternates: {
    canonical: baseUrl,
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1e5e4a",
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
        <link rel="icon" type="image/png" href="/favicon.png" sizes="512x512" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" href="/logo-original.png" as="image" />
        <link rel="preload" href="/og-image.jpg" as="image" />
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
            description:
              "Penerbit, percetakan, dan mitra kreatif untuk mewujudkan karya terbaik Anda. Layanan penerbitan buku, editing, desain, dan distribusi nasional.",
            url: baseUrl,
            logo: `${baseUrl}/logo-original.png`,
            foundingDate: "2026-07-18",
            legalName: "PT Mughis Cipta Media",
            vatID: "1108043110010001",
            taxID: "1108043110010001",
            sameAs: [
              "https://www.instagram.com/ptmughis",
              "https://www.facebook.com/ptmughis",
            ],
            address: {
              "@type": "PostalAddress",
              addressCountry: "ID",
              addressRegion: "Aceh",
            },
            contactPoint: [
              {
                "@type": "ContactPoint",
                telephone: "+62-857-2345-6789",
                contactType: "customer service",
                availableLanguage: ["Indonesian"],
              },
            ],
          }}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            parentOrganization: {
              "@type": "Organization",
              name: "PT Mughis Cipta Media",
            },
            name: "PT Mughis Cipta Media",
            description: siteDescription,
            url: baseUrl,
            logo: `${baseUrl}/logo-original.png`,
            image: ogImageUrl,
            sameAs: [
              "https://www.instagram.com/ptmughis",
              "https://www.facebook.com/ptmughis",
            ],
            address: {
              "@type": "PostalAddress",
              addressCountry: "ID",
              addressRegion: "Aceh",
            },
            contactPoint: [
              {
                "@type": "ContactPoint",
                telephone: "+62-857-2345-6789",
                contactType: "customer service",
                availableLanguage: ["Indonesian"],
              },
            ],
          }}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "PT Mughis Cipta Media",
            url: baseUrl,
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: `${baseUrl}/search?q={search_term_string}`,
              },
              "query-input": "required name=search_term_string",
            },
          }}
        />
        {process.env.NEXT_PUBLIC_GA_ID ? (
          <>
            <script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              async
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        ) : null}
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
