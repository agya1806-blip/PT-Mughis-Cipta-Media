export interface FooterLink {
  label: string
  href: string
}

export interface FooterColumn {
  title: string
  links: FooterLink[]
}

export interface SocialLink {
  name: string
  href: string
  label: string
}

export interface CompanyInfo {
  name: string
  tagline: string
  address: string
  email: string
  whatsapp: string
  whatsappNumber: string
}

export interface FooterData {
  company: CompanyInfo
  columns: FooterColumn[]
  social: SocialLink[]
  badges: string[]
  copyright: string
}

export const footerData: FooterData = {
  company: {
    name: "PT Mughis Cipta Media",
    tagline: "Mitra kreatif dalam penerbitan dan percetakan buku Islami sejak 2024.",
    address: "Perumahan Bumi Asri, Jl. Bawang No. 12, Bandung, Jawa Barat",
    email: "admin@pt-mughis-cipta-media.com",
    whatsapp: "+62 812-3456-7890",
    whatsappNumber: "6281234567890",
  },
  columns: [
    {
      title: "Perusahaan",
      links: [
        { label: "Tentang Kami", href: "/tentang-kami" },
        { label: "Layanan", href: "/layanan-penerbitan" },
        { label: "Katalog Buku", href: "/katalog" },
        { label: "Blog", href: "/blog" },
        { label: "Hubungi Kami", href: "/kontak" },
      ],
    },
    {
      title: "Layanan",
      links: [
        { label: "Penerbitan Buku", href: "/layanan-penerbitan" },
        { label: "Percetakan Buku", href: "/layanan-penerbitan" },
        { label: "ISBN", href: "/layanan-penerbitan" },
        { label: "Layout Buku", href: "/layanan-penerbitan" },
        { label: "Desain Cover", href: "/layanan-penerbitan" },
      ],
    },
    {
      title: "Bantuan",
      links: [
        { label: "FAQ", href: "/faq" },
        { label: "Kebijakan Privasi", href: "/privacy" },
        { label: "Syarat & Ketentuan", href: "/terms" },
        { label: "Hubungi Kami", href: "/kontak" },
      ],
    },
  ],
  social: [
    { name: "Instagram", href: "https://instagram.com/ptmughis", label: "Instagram" },
    { name: "Facebook", href: "https://facebook.com/ptmughis", label: "Facebook" },
    { name: "TikTok", href: "https://tiktok.com/@ptmughis", label: "TikTok" },
    { name: "YouTube", href: "https://youtube.com/@ptmughis", label: "YouTube" },
    { name: "LinkedIn", href: "https://linkedin.com/company/ptmughis", label: "LinkedIn" },
  ],
  badges: ["NIB Ready", "PT Ready", "ISBN Ready"],
  copyright: "© 2026 PT Mughis Cipta Media. Seluruh Hak Cipta Dilindungi.",
}
