import { authors } from "@/data/authors"
import { AuthorListClient } from "@/components/authors"

export const metadata = {
  title: "Penulis | Maktabah al-Mughis",
  description: "Daftar penulis yang telah menerbitkan buku bersama Maktabah al-Mughis",
}

export default function PenulisPage() {
  return <AuthorListClient authors={authors} />
}
