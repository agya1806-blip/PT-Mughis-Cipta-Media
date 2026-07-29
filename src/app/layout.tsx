import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import ThemeProvider from "@/components/ThemeProvider"
import { JsonLd } from "@/components/JsonLd"
import { SITE, logoUrl, ogImageUrl } from "@/lib/seo"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.baseUrl),
  title: {
    default: `${SITE.name} — Penerbit & Percetakan Buku Aceh, Penerbit Kitab, Pendampingan ISBN`,
    template: `%s | ${SITE.name}`,
  },
  description: "PT Mughis Cipta Media — penerbit dan percetakan buku di Aceh. Melayani penerbitan buku, kitab, kitab terjemahan, modul, monograf, prosiding, antologi, novel, cetak buku murah, dan pendampingan ISBN. Percayakan penerbitan buku Anda pada kami.",
  keywords: [
    "Penerbit Aceh",
    "Penerbit Buku Aceh",
    "Penerbit Kitab",
    "Penerbit Buku Islami",
    "Percetakan Buku",
    "Percetakan Buku Aceh",
    "Cetak Buku",
    "Cetak Kitab",
    "Pengajuan ISBN",
    "Pendampingan ISBN",
    "Penerbit Indonesia",
    "PT Mughis Cipta Media",
    "penerbit buku",
    "percetakan buku",
    "penerbit profesional",
    "jasa penerbitan buku",
    "penerbitan buku",
    "cara menerbitkan buku",
    "syarat menerbitkan buku",
    "perusahaan penerbitan buku",
  ],
  openGraph: {
    type: "website",
    locale: SITE.locale,
    siteName: SITE.name,
    title: SITE.name,
    description: "PT Mughis Cipta Media — penerbit dan percetakan buku di Aceh, penerbit kitab, dan pendampingan ISBN profesional.",
    url: SITE.baseUrl,
    images: [{ url: ogImageUrl(), width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: "Penerbit & percetakan buku di Aceh — melayani penerbitan kitab, cetak buku, dan pendampingan ISBN.",
    images: [ogImageUrl()],
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
    canonical: SITE.baseUrl,
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1e5e4a",
}

const addr = {
  "@type": "PostalAddress",
  streetAddress: SITE.geo.streetAddress,
  addressLocality: SITE.geo.addressLocality,
  addressRegion: SITE.geo.addressRegion,
  postalCode: SITE.geo.postalCode,
  addressCountry: SITE.geo.addressCountry,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang={SITE.language}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" sizes="512x512" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" href={SITE.logo} as="image" />
        <link rel="preload" href={SITE.ogImage} as="image" />
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
            name: SITE.name,
            description: "Penerbit, percetakan, dan mitra kreatif untuk mewujudkan karya terbaik Anda. Layanan penerbitan buku, kitab, editing, desain, cetak, dan distribusi nasional.",
            url: SITE.baseUrl,
            logo: logoUrl(),
            foundingDate: SITE.foundingDate,
            legalName: SITE.legalName,
            vatID: SITE.vatID,
            taxID: SITE.taxID,
            sameAs: [
              SITE.contact.instagram,
              SITE.contact.facebook,
            ],
            address: addr,
            contactPoint: [
              {
                "@type": "ContactPoint",
                telephone: SITE.contact.telephone,
                contactType: "customer service",
                availableLanguage: ["Indonesian"],
              },
            ],
            location: {
              "@type": "Place",
              address: addr,
              name: "PT Mughis Cipta Media, Samalanga, Aceh",
            },
          }}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            parentOrganization: {
              "@type": "Organization",
              name: SITE.name,
            },
            name: SITE.name,
            description: "Penerbit, percetakan, dan mitra kreatif — melayani penerbitan buku, kitab, dan pendampingan ISBN.",
            url: SITE.baseUrl,
            logo: logoUrl(),
            image: ogImageUrl(),
            sameAs: [
              SITE.contact.instagram,
              SITE.contact.facebook,
            ],
            address: addr,
            contactPoint: [
              {
                "@type": "ContactPoint",
                telephone: SITE.contact.telephone,
                contactType: "customer service",
                availableLanguage: ["Indonesian"],
              },
            ],
            geo: {
              "@type": "GeoCoordinates",
              latitude: 5.1897,
              longitude: 96.3667,
            },
            openingHours: "Mo-Fr 08:00-17:00",
            priceRange: "Rp",
          }}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: SITE.name,
            url: SITE.baseUrl,
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: `${SITE.baseUrl}/search?q={search_term_string}`,
              },
              "query-input": "required name=search_term_string",
            },
          }}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "ImageObject",
            name: `${SITE.name} Logo`,
            contentUrl: logoUrl(),
            url: logoUrl(),
            description: "Logo PT Mughis Cipta Media — penerbit dan percetakan buku di Aceh.",
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