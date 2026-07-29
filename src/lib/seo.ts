export const SITE = {
  name: "PT Mughis Cipta Media",
  legalName: "PT Mughis Cipta Media",
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://mughisciptamedia.com",
  description: "Penerbit, percetakan, dan mitra kreatif untuk mewujudkan karya terbaik Anda. Layanan penerbitan buku, editing, desain, dan distribusi nasional.",
  locale: "id_ID",
  language: "id",
  keywords: [
    "Penerbit Aceh",
    "Percetakan Buku Aceh",
    "Penerbit Buku",
    "Penerbit Kitab",
    "Cetak Buku",
    "Cetak Kitab",
    "Penerbit Buku Islami",
    "Pengajuan ISBN",
    "Pendampingan ISBN",
    "Penerbit Indonesia",
    "PT Mughis Cipta Media",
    "Percetakan Buku",
    "Penerbit Profesional",
    "Penerbit Buku Indonesia",
    "Percetakan Aceh",
  ],
  geo: {
    addressCountry: "ID",
    addressRegion: "Aceh",
    addressLocality: "Samalanga",
    addressSuburb: "Dusun Tanjong Sentosa",
    streetAddress: "Dusun Tanjong Sentosa",
    postalCode: "24252",
  },
  contact: {
    telephone: "+62 852-1770-6587",
    email: "Mughisciptamedia@gmail.com",
    instagram: "https://www.instagram.com/ptmughis",
    facebook: "https://www.facebook.com/ptmughis",
  },
  logo: "/logo-original.png",
  ogImage: "/og-image.jpg",
  foundingDate: "2026-07-18",
  vatID: "1108043110010001",
  taxID: "1108043110010001",
}

export function ogImageUrl(): string {
  return `${SITE.baseUrl}${SITE.ogImage}`
}

export function logoUrl(): string {
  return `${SITE.baseUrl}${SITE.logo}`
}
