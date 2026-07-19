"use client"

import { BookOpen, Layers, Ruler, Globe, BookMarked, Users } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export interface BookDetail {
  slug: string
  title: string
  author: string
  authorSlug: string
  translator: string | null
  publisher: string
  isbn: string
  pageCount: number
  price: number
  categoryName: string
  categorySlug: string
  coverImage: string
  synopsis: string
  previewPdfUrl: string | null
  stock: number
  weight: number
  dimensions: string
  language: string
  publicationYear: number
  edition: string
  series: string | null
  rating: number
  reviewCount: number
  badge: "best-seller" | "new" | "featured" | null
  galleryImages: string[]
  authorBio: string
  authorPhoto: string | null
}

export interface RelatedBook {
  id: string
  slug: string
  title: string
  author: string
  price: number
  coverImage: string | null
  synopsis: string | null
  categoryName: string | null
  publicationYear: number | null
  badge: "best-seller" | "new" | "featured" | null
}

export interface SpecItem {
  label: string
  value: string
  icon: LucideIcon
}

export const mockBookDetail: BookDetail = {
  slug: "mukhtashar-shahih-al-bukhari",
  title: "Mukhtashar Shahih al-Bukhari",
  author: "Imam al-Bukhari",
  authorSlug: "imam-al-bukhari",
  translator: "M. Nashiruddin al-Albani",
  publisher: "Maktabah al-Mughis",
  isbn: "978-602-XXXX-01-1",
  pageCount: 720,
  price: 145000,
  categoryName: "Hadits & Musthalah",
  categorySlug: "hadits-musthalah",
  coverImage: "/images/books/bukhari.jpg",
  synopsis:
    "Ringkasan Shahih al-Bukhari yang memuat hadits-hadits pilihan untuk memudahkan kaum muslimin dalam mempelajari sunnah Nabi. Disusun dengan sistematika yang rapi dan dilengkapi takhrij singkat. Kitab ini merupakan karya monumental yang menjadi rujukan utama umat Islam dalam memahami hadits-hadits shahih. Setiap hadits yang termuat telah melalui proses seleksi ketat sesuai metodologi para ulama hadits.",
  previewPdfUrl: "/preview/mukhtashar-bukhari.pdf",
  stock: 50,
  weight: 850,
  dimensions: "17 x 24 cm",
  language: "Indonesia",
  publicationYear: 2025,
  edition: "Edisi Kedua, Cetakan ke-3",
  series: "Seri Hadits Inti",
  rating: 4.8,
  reviewCount: 124,
  badge: "best-seller",
  galleryImages: [
    "/images/books/bukhari.jpg",
    "/images/books/bukhari-2.jpg",
    "/images/books/bukhari-3.jpg",
  ],
  authorBio:
    "Imam al-Bukhari (194–256 H) adalah seorang ulama hadits terkemuka yang dikenal dengan kitab Shahih al-Bukhari, salah satu kitab hadits paling otentik dalam Islam. Beliau menghabiskan hidupnya untuk mengumpulkan dan memverifikasi hadits-hadits Nabi shallallahu 'alaihi wa sallam.",
  authorPhoto: null,
}

export const mockRelatedBooks: RelatedBook[] = [
  {
    id: "bk-005",
    slug: "al-wafi-syarah-hadits-arbain",
    title: "Al-Wafi: Syarah Hadits Arba'in",
    author: "Syaikh Musthafa al-'Adawi",
    price: 99000,
    coverImage: "/images/books/al-wafi.jpg",
    synopsis: "Syarah lengkap 42 hadits inti dalam agama Islam.",
    categoryName: "Hadits & Musthalah",
    publicationYear: 2025,
    badge: "featured",
  },
  {
    id: "bk-013",
    slug: "jami-al-ulum-wa-al-hikam",
    title: "Jami' al-'Ulum wa al-Hikam",
    author: "Ibnu Rajab al-Hanbali",
    price: 155000,
    coverImage: "/images/books/jami-ulum.jpg",
    synopsis: "Syarah 50 hadits inti yang mencakup seluruh ajaran Islam.",
    categoryName: "Hadits & Musthalah",
    publicationYear: 2025,
    badge: null,
  },
  {
    id: "bk-020",
    slug: "pendidikan-anak-dalam-islam",
    title: "Pendidikan Anak dalam Islam",
    author: "Syaikh Abdullah Nashih 'Ulwan",
    price: 130000,
    coverImage: "/images/books/pendidikan-anak.jpg",
    synopsis: "Panduan komprehensif dalam mendidik anak sesuai tuntunan Islam.",
    categoryName: "Buku Anak & Keluarga",
    publicationYear: 2025,
    badge: null,
  },
  {
    id: "bk-010",
    slug: "al-qawaid-al-fiqhiyyah",
    title: "Al-Qawa'id al-Fiqhiyyah",
    author: "Syaikh Abdul Majid Turkmani",
    price: 95000,
    coverImage: "/images/books/qawaid-fiqhiyyah.jpg",
    synopsis: "Kumpulan kaidah-kaidah fiqih yang memudahkan dalam memahami hukum-hukum Islam.",
    categoryName: "Fiqih & Ibadah",
    publicationYear: 2025,
    badge: null,
  },
]

export function getSpecItems(book: BookDetail): SpecItem[] {
  return [
    { label: "ISBN", value: book.isbn, icon: BookMarked },
    { label: "Halaman", value: `${book.pageCount} hal`, icon: BookOpen },
    { label: "Dimensi", value: book.dimensions, icon: Ruler },
    { label: "Berat", value: `${book.weight} gr`, icon: Layers },
    { label: "Bahasa", value: book.language, icon: Globe },
    { label: "Kategori", value: book.categoryName, icon: Users },
  ]
}
