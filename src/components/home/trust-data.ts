import { ShieldCheck, Barcode, UserCheck, Award, Eye, Handshake } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export interface TrustItem {
  icon: LucideIcon
  title: string
  description: string
}

export const trustData: TrustItem[] = [
  {
    icon: ShieldCheck,
    title: "Legalitas Resmi",
    description:
      "PT Mughis Cipta Media merupakan badan usaha yang memiliki legalitas sehingga memberikan kepastian dan kepercayaan dalam setiap kerja sama.",
  },
  {
    icon: Barcode,
    title: "ISBN Resmi",
    description:
      "Membantu pengurusan ISBN melalui Perpustakaan Nasional sesuai ketentuan yang berlaku.",
  },
  {
    icon: UserCheck,
    title: "Pendampingan Profesional",
    description:
      "Tim mendampingi penulis mulai dari naskah, editing, layout hingga buku selesai diterbitkan.",
  },
  {
    icon: Award,
    title: "Kualitas Produksi",
    description:
      "Menggunakan standar percetakan profesional dengan hasil cetak berkualitas tinggi.",
  },
  {
    icon: Eye,
    title: "Proses Transparan",
    description:
      "Setiap tahapan penerbitan dikomunikasikan dengan jelas sehingga penulis mengetahui perkembangan bukunya.",
  },
  {
    icon: Handshake,
    title: "Kemitraan Jangka Panjang",
    description:
      "Tidak hanya menerbitkan buku, tetapi menjadi mitra jangka panjang bagi penulis dan institusi.",
  },
]
