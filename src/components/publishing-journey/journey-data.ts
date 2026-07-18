import { MessageCircle, FileText, FileEdit, Palette, Hash, Printer } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export interface JourneyStepData {
  id: number
  title: string
  description: string
  icon: LucideIcon
}

export const journeySteps: JourneyStepData[] = [
  {
    id: 1,
    title: "Konsultasi",
    description: "Diskusi naskah, tujuan penerbitan, dan rekomendasi layanan yang sesuai dengan kebutuhan Anda.",
    icon: MessageCircle,
  },
  {
    id: 2,
    title: "Review Naskah",
    description: "Evaluasi awal untuk memastikan naskah siap memasuki tahap produksi secara profesional.",
    icon: FileText,
  },
  {
    id: 3,
    title: "Editing & Layout",
    description: "Penyuntingan profesional, typesetting, dan tata letak interior yang rapi dan enak dibaca.",
    icon: FileEdit,
  },
  {
    id: 4,
    title: "Desain Sampul",
    description: "Membuat sampul premium yang mencerminkan identitas dan isi buku secara visual.",
    icon: Palette,
  },
  {
    id: 5,
    title: "Registrasi ISBN",
    description: "Pengurusan ISBN resmi dan administrasi penerbitan secara lengkap dan terpercaya.",
    icon: Hash,
  },
  {
    id: 6,
    title: "Cetak & Distribusi",
    description: "Percetakan berkualitas tinggi dan persiapan distribusi nasional untuk buku Anda.",
    icon: Printer,
  },
]
