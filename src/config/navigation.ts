export interface NavLink {
  label: string
  href: string
}

export interface MegaMenuItem {
  label: string
  href: string
  description: string
  icon?: string
}

export interface NavGroup {
  label: string
  href?: string
  children?: MegaMenuItem[]
}

export const mainNav: NavGroup[] = [
  { label: "Beranda", href: "/" },
  { label: "Tentang Kami", href: "/tentang-kami" },
  { label: "Tim Profesional", href: "/tim" },
  {
    label: "Layanan",
    children: [
      { label: "Penerbitan Buku", href: "/layanan-penerbitan#penerbitan", description: "Pendampingan penerbitan buku secara profesional." },
      { label: "Percetakan Buku", href: "/layanan-penerbitan#percetakan", description: "Layanan cetak buku berkualitas tinggi." },
      { label: "Legalitas Buku", href: "/layanan-penerbitan#legalitas", description: "Pendampingan administrasi penerbitan sesuai ketentuan yang berlaku." },
      { label: "Konsultasi", href: "/kontak", description: "Diskusi dan konsultasi bersama tim ahli kami." },
    ],
  },
  { label: "Program Penulis", href: "/penulis" },
  { label: "Artikel", href: "/blog" },
  { label: "Kontak", href: "/kontak" },
]

export const mainNavLinks: NavLink[] = [
  { label: "Beranda", href: "/" },
  { label: "Transformasi", href: "/transformasi" },
  { label: "Tim", href: "/tim" },
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

export const footerNavLinks: NavLink[] = [
  { label: "Beranda", href: "/" },
  { label: "Tentang Kami", href: "/tentang-kami" },
  { label: "Tim Profesional", href: "/tim" },
  { label: "Layanan", href: "/layanan-penerbitan" },
  { label: "Program Penulis", href: "/penulis" },
  { label: "Artikel", href: "/blog" },
  { label: "Kontak", href: "/kontak" },
]
