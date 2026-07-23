export interface NavLink {
  label: string
  href: string
}

export const mainNavLinks: NavLink[] = [
  { label: "Beranda", href: "/" },
  { label: "Tentang", href: "/tentang-kami" },
  { label: "Layanan", href: "/layanan-penerbitan" },
  { label: "Katalog", href: "/katalog" },
  { label: "Penulis", href: "/penulis" },
  { label: "Blog", href: "/blog" },
  { label: "Kontak", href: "/kontak" },
]

export const secondaryNavLinks: NavLink[] = [
  { label: "FAQ", href: "/faq" },
  { label: "Legalitas", href: "/company/legalitas" },
  { label: "Kebijakan Privasi", href: "/privacy" },
  { label: "Syarat & Ketentuan", href: "/terms" },
]
