"use client"

import { usePathname } from "next/navigation"
import Breadcrumb from "@/components/ui/Breadcrumb"

const labelMap: Record<string, string> = {
  "tentang-kami": "Tentang Kami",
  tim: "Tim Profesional",
  "layanan-penerbitan": "Layanan",
  penulis: "Program Penulis",
  blog: "Artikel",
  kontak: "Kontak",
  katalog: "Katalog",
  transformasi: "Transformasi",
  faq: "FAQ",
  company: "Perusahaan",
  legalitas: "Legalitas",
  privacy: "Kebijakan Privasi",
  terms: "Syarat & Ketentuan",
  search: "Pencarian",
  register: "Daftar",
  login: "Masuk",
  buku: "Buku",
}

export default function BreadcrumbWrapper() {
  const pathname = usePathname()
  if (pathname === "/") return null

  const segments = pathname.split("/").filter(Boolean)
  const items: { label: string; href?: string }[] = [{ label: "Beranda", href: "/" }]

  let currentPath = ""
  for (const seg of segments) {
    currentPath += `/${seg}`
    // Check for dynamic routes like [slug]
    const isDynamic = seg.startsWith("[") && seg.endsWith("]")
    if (isDynamic) continue
    const label = labelMap[seg] || seg.charAt(0).toUpperCase() + seg.slice(1)
    const isLast = currentPath === pathname
    items.push(isLast ? { label } : { label, href: currentPath })
  }

  if (items.length <= 1) return null
  return <Breadcrumb items={items} className="pt-24 md:pt-28 px-6 sm:px-8 lg:px-10 max-w-7xl mx-auto w-full" />
}
