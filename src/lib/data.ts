export interface Category {
  id: string
  name: string
  slug: string
}

export interface Book {
  id: string
  slug: string
  title: string
  author: string
  translator: string | null
  publisher: string
  page_count: number
  price: number
  category_id: string
  category_name: string
  cover_image: string | null
  synopsis: string
  preview_pdf_url: string | null
  created_at: string
  stock: number
  weight: number | null
  dimensions: string | null
  language: string | null
  publication_year: number
}

export const categories: Category[] = [
  { id: "1", name: "Aqidah & Tauhid", slug: "aqidah-tauhid" },
  { id: "2", name: "Fiqih & Ibadah", slug: "fiqih-ibadah" },
  { id: "3", name: "Tafsir & Ulumul Qur'an", slug: "tafsir-quran" },
  { id: "4", name: "Hadits & Musthalah", slug: "hadits-musthalah" },
  { id: "5", name: "Tasawuf & Akhlaq", slug: "tasawuf-akhlaq" },
  { id: "6", name: "Sejarah & Biografi", slug: "sejarah-biografi" },
  { id: "7", name: "Bahasa & Sastra Arab", slug: "bahasa-arab" },
  { id: "8", name: "Buku Anak & Keluarga", slug: "buku-anak" },
]

export const books: Book[] = []
