import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { CartProvider } from "@/components/CartProvider"
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

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://pt-mughis-cipta-media.vercel.app"),
  title: {
    default: "Maktabah al-Mughis - PT Mughis Cipta Media",
    template: "%s | Maktabah al-Mughis",
  },
  description:
    "Penerbit, percetakan, dan mitra kreatif untuk mewujudkan karya terbaik Anda. Layanan penerbitan buku, editing, desain, ISBN, dan distribusi nasional.",
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Maktabah al-Mughis",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
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
          <CartProvider>
            {children}
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
