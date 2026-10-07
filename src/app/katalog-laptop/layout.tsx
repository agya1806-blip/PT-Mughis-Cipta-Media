import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mughis Laptop Store — Pusat Laptop Business & Produk Digital Samalanga",
  description: "Pusat Laptop Business Bekas Berkualitas, Lisensi Software & Produk Digital dari Mughis Laptop Store (Owner: Muhammad Aghisna). Alamat: Sangso, Samalanga, Bireuen, Aceh.",
}

export default function LaptopCatalogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      {children}
    </div>
  )
}
