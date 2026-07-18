import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Keranjang Belanja | Maktabah al-Mughis",
  description: "Lihat dan kelola buku-buku pilihan Anda di keranjang belanja.",
}

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return children
}
