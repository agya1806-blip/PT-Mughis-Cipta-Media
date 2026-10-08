import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mughis Laptop Store — Pusat Laptop Business & Produk Digital Samalanga",
  description: "Pusat Laptop Business Bekas Berkualitas, Lisensi Software & Produk Digital dari Mughis Laptop Store (Owner: Muhammad Aghisna). Alamat: Sangso, Samalanga, Bireuen, Aceh.",
  openGraph: {
    title: "Mughis Laptop Store — Laptop Business & Produk Digital Samalanga",
    description: "Pusat Laptop Business Bekas Berkualitas & Lisensi Software Original dari Mughis Laptop Store (Owner: Muhammad Aghisna). Alamat: Sangso, Samalanga, Bireuen, Aceh.",
    url: "/katalog-laptop",
    siteName: "Mughis Laptop Store",
    locale: "id_ID",
    type: "website",
  },
  alternates: {
    canonical: "/katalog-laptop",
  },
}

export default function LaptopCatalogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ComputerStore",
    "name": "Mughis Laptop Store",
    "image": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80",
    "telephone": "0852-1770-6587",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Sangso",
      "addressLocality": "Samalanga",
      "addressRegion": "Bireuen, Aceh",
      "addressCountry": "ID"
    },
    "priceRange": "Rp 400.000 - Rp 4.500.000",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "08:30",
        "closes": "22:00"
      }
    ]
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </div>
  )
}
