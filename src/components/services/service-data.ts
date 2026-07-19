import { BookOpen, Printer, Hash, Layout, Palette, FileCheck, Clock, Users, Award, HeadphonesIcon, ArrowRight, BookText, Sparkles, Shield, TrendingUp, Globe, CheckCircle, Building2, FileEdit } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export interface ServiceDetail {
  id: string
  icon: LucideIcon
  title: string
  tagline: string
  description: string
  benefits: string[]
  process: { label: string; desc: string }[]
  faq: { q: string; a: string }[]
}

export const services: ServiceDetail[] = [
  {
    id: "penerbitan-buku",
    icon: BookOpen,
    title: "Penerbitan Buku",
    tagline: "Dari naskah menjadi buku berkualitas tinggi",
    description:
      "Layanan penerbitan buku profesional yang mendampingi penulis dari proses pengajuan naskah, editing, layout, desain cover, pengurusan ISBN, hingga produksi dan distribusi. Kami memastikan setiap buku yang terbit memenuhi standar kualitas industri penerbitan nasional.",
    benefits: [
      "Pendampingan penuh dari naskah hingga distribusi",
      "Proses transparan dengan timeline yang jelas",
      "Standar kualitas penerbitan nasional",
      "Jaringan distribusi luas di seluruh Indonesia",
      "Royalti kompetitif dan laporan penjualan transparan",
      "Hak cipta dan legalitas terlindungi",
    ],
    process: [
      { label: "Konsultasi", desc: "Diskusi kebutuhan dan visi buku Anda" },
      { label: "Pengajuan Naskah", desc: "Submit naskah untuk review tim editorial" },
      { label: "Kurasi & Kontrak", desc: "Evaluasi naskah dan penandatanganan kontrak" },
      { label: "Editing", desc: "Penyuntingan substansi, bahasa, dan ejaan" },
      { label: "Layout & Desain", desc: "Tata letak isi dan desain cover profesional" },
      { label: "ISBN", desc: "Pengurusan ISBN Perpustakaan Nasional" },
      { label: "Cetak", desc: "Produksi buku dengan kualitas terbaik" },
      { label: "Distribusi", desc: "Buku siap didistribusikan ke seluruh Indonesia" },
    ],
    faq: [
      { q: "Berapa lama proses penerbitan buku?", a: "Proses penerbitan buku umumnya memakan waktu 2–4 bulan tergantung kompleksitas naskah dan jenis layanan yang dipilih. Tim kami akan memberikan timeline detail di awal kerja sama." },
      { q: "Apakah semua naskah bisa diterbitkan?", a: "Kami menerima berbagai genre buku, termasuk buku pendidikan, keislaman, akademik, fiksi, non-fiksi, dan buku anak. Setiap naskah akan melalui proses kurasi untuk memastikan kualitas dan kesesuaian dengan visi penerbit." },
      { q: "Apa saja yang termasuk dalam biaya penerbitan?", a: "Biaya penerbitan meliputi editing, layout, desain cover, pengurusan ISBN, proofreading, dan cetak. Konsultasikan kebutuhan Anda untuk mendapatkan penawaran yang sesuai." },
    ],
  },
  {
    id: "percetakan-buku",
    icon: Printer,
    title: "Percetakan Buku",
    tagline: "Cetak berkualitas dengan hasil maksimal",
    description:
      "Layanan percetakan buku dengan teknologi modern dan standar kualitas tinggi. Kami melayani cetak buku dengan berbagai ukuran, jenis kertas, dan finishing premium. Dari cetak digital untuk jumlah kecil hingga cetak offset untuk produksi massal.",
    benefits: [
      "Kualitas cetak konsisten dan profesional",
      "Pilihan kertas dan finishing lengkap",
      "Cetak digital (kuantitas kecil) & offset (massal)",
      "Warna akurat dengan proofing sebelum produksi",
      "Waktu produksi tepat sesuai jadwal",
      "Harga kompetitif tanpa mengorbankan kualitas",
    ],
    process: [
      { label: "Konsultasi", desc: "Diskusi spesifikasi buku dan kebutuhan cetak" },
      { label: "Estimasi", desc: "Perhitungan biaya dan waktu produksi" },
      { label: "Proofing", desc: "Review hasil proof sebelum produksi massal" },
      { label: "Produksi", desc: "Proses cetak dengan kontrol kualitas ketat" },
      { label: "Finishing", desc: "Laminasi, jahit, lem, dan potong presisi" },
      { label: "Pengiriman", desc: "Packing aman dan pengiriman ke seluruh Indonesia" },
    ],
    faq: [
      { q: "Berapa minimal cetak buku?", a: "Untuk cetak digital, minimal 1 eksemplar. Untuk cetak offset, minimal 100 eksemplar. Kami fleksibel menyesuaikan kebutuhan Anda." },
      { q: "Jenis kertas apa yang tersedia?", a: "Kami menyediakan berbagai pilihan kertas: HVS 70gr/80gr, Book Paper, Art Paper, dan Matte Paper, dengan berbagai ukuran standar maupun kustom." },
      { q: "Berapa lama proses cetak?", a: "Cetak digital selesai dalam 1–3 hari. Cetak offset memakan waktu 1–2 minggu tergantung jumlah dan kerumitan." },
    ],
  },
  {
    id: "pengurusan-isbn",
    icon: Hash,
    title: "Pengurusan ISBN",
    tagline: "Legalitas buku Anda terjamin",
    description:
      "Layanan pengurusan ISBN (International Standard Book Number) melalui Perpustakaan Nasional RI secara cepat dan resmi. ISBN adalah identitas unik buku Anda yang diperlukan untuk distribusi resmi di toko buku dan platform online.",
    benefits: [
      "Proses cepat dan resmi melalui Perpustakaan Nasional",
      "Barcode otomatis untuk cover belakang buku",
      "Pendaftaran data buku di katalog nasional",
      "Legalitas buku untuk distribusi resmi",
      "Pendampingan administrasi lengkap",
      "Data terintegrasi dengan sistem ISBN nasional",
    ],
    process: [
      { label: "Data Buku", desc: "Lengkapi data buku (judul, penulis, penerbit, dll)" },
      { label: "Pendaftaran", desc: "Kami daftarkan ke Perpustakaan Nasional" },
      { label: "Verifikasi", desc: "Proses verifikasi data oleh tim Perpusnas" },
      { label: "ISBN Terbit", desc: "ISBN dan barcode siap digunakan" },
    ],
    faq: [
      { q: "Apa itu ISBN?", a: "ISBN (International Standard Book Number) adalah nomor identifikasi unik untuk setiap buku yang diterbitkan. Di Indonesia, ISBN dikelola oleh Perpustakaan Nasional RI." },
      { q: "Berapa lama pengurusan ISBN?", a: "Proses pengurusan ISBN umumnya selesai dalam 1–7 hari kerja setelah data lengkap dan benar." },
      { q: "Apakah ISBN diperlukan untuk semua buku?", a: "ISBN sangat disarankan untuk buku yang akan didistribusikan secara resmi di toko buku, perpustakaan, atau platform online. ISBN juga memudahkan katalogisasi dan pelacakan buku." },
    ],
  },
  {
    id: "layout-buku",
    icon: Layout,
    title: "Layout Buku",
    tagline: "Tata letak yang nyaman dibaca",
    description:
      "Layanan layout dan typesetting profesional untuk buku Anda. Tim desainer kami akan menata setiap halaman dengan tipografi yang tepat, hierarki visual yang jelas, dan konsistensi gaya yang indah — memastikan pengalaman membaca yang nyaman dan menyenangkan.",
    benefits: [
      "Tipografi yang elegan dan mudah dibaca",
      "Hierarki visual yang jelas dan konsisten",
      "Penataan gambar, tabel, dan ilustrasi rapi",
      "File siap cetak dengan standar printing house",
      "Revisi tanpa batas hingga Anda puas",
      "Konsultasi desain gratis",
    ],
    process: [
      { label: "Analisis Naskah", desc: "Review struktur dan kebutuhan layout" },
      { label: "Konsep Desain", desc: "Pembuatan template dan konsep tata letak" },
      { label: "Layout", desc: "Penataan isi halaman per halaman" },
      { label: "Review", desc: "Revisi dan penyempurnaan detail" },
      { label: "Final", desc: "Export file siap cetak (print-ready PDF)" },
    ],
    faq: [
      { q: "Apa yang dimaksud dengan layout buku?", a: "Layout buku adalah proses penataan elemen visual dalam setiap halaman buku, termasuk teks, gambar, tabel, header, footer, dan nomor halaman. Layout yang baik membuat buku nyaman dibaca." },
      { q: "Software apa yang digunakan?", a: "Kami menggunakan software desain profesional seperti Adobe InDesign untuk layout buku, memastikan hasil yang presisi dan siap cetak." },
    ],
  },
  {
    id: "desain-cover",
    icon: Palette,
    title: "Desain Cover",
    tagline: "Kesan pertama yang tak terlupakan",
    description:
      "Desain cover buku eksklusif yang mencerminkan esensi isi buku Anda. Tim desainer kami akan menciptakan cover yang menarik, profesional, dan siap bersaing di rak buku. Cover yang bagus adalah investasi pertama untuk kesuksesan buku Anda.",
    benefits: [
      "Desain original dan eksklusif untuk setiap buku",
      "Konsep visual yang mencerminkan isi buku",
      "Cover depan, punggung, dan belakang lengkap",
      "File siap cetak dengan standar percetakan",
      "Revisi hingga sesuai dengan visi Anda",
      "Free mockup 3D untuk preview",
    ],
    process: [
      { label: "Brief", desc: "Diskusi konsep dan referensi desain" },
      { label: "Riset", desc: "Riset tren desain cover dan kompetitor" },
      { label: "Konsep", desc: "Pembuatan 2–3 alternatif konsep cover" },
      { label: "Revisi", desc: "Penyempurnaan berdasarkan feedback" },
      { label: "Final", desc: "Export file siap produksi + mockup 3D" },
    ],
    faq: [
      { q: "Apakah bisa minta revisi cover?", a: "Tentu. Kami menyediakan revisi tanpa batas hingga desain cover sesuai dengan visi Anda. Kepuasan Anda adalah prioritas kami." },
      { q: "Berapa lama proses desain cover?", a: "Proses desain cover umumnya selesai dalam 3–7 hari kerja tergantung kompleksitas desain dan jumlah revisi." },
      { q: "Apa saja yang didapat dalam paket desain cover?", a: "Paket desain cover meliputi desain cover depan, punggung, dan belakang, spine, serta free mockup 3D untuk keperluan promosi." },
    ],
  },
]

export interface WhyChooseUsItem {
  icon: LucideIcon
  title: string
  description: string
}

export const whyChooseUs: WhyChooseUsItem[] = [
  {
    icon: Building2,
    title: "Perusahaan Berbadan Hukum",
    description: "PT Mughis Cipta Media adalah perusahaan resmi dengan legalitas lengkap, NIB, dan izin usaha yang terdaftar.",
  },
  {
    icon: Users,
    title: "Tim Profesional & Berpengalaman",
    description: "Didukung oleh tim editor, desainer, dan penerbit yang telah berpengalaman bertahun-tahun di industri penerbitan.",
  },
  {
    icon: Award,
    title: "Standar Kualitas Tinggi",
    description: "Setiap buku melalui proses kurasi dan kontrol kualitas yang ketat untuk menghasilkan karya terbaik.",
  },
  {
    icon: HeadphonesIcon,
    title: "Pendampingan Personal",
    description: "Setiap penulis mendapatkan pendampingan personal dari tim kami di setiap tahap penerbitan.",
  },
  {
    icon: Clock,
    title: "Tepat Waktu",
    description: "Komitmen terhadap timeline produksi yang jelas dan tepat waktu tanpa mengorbankan kualitas.",
  },
  {
    icon: Globe,
    title: "Jaringan Distribusi Luas",
    description: "Buku Anda akan didistribusikan ke toko buku dan platform online di seluruh Indonesia.",
  },
]

export const serviceProcessSteps = [
  { icon: MessageCircle, label: "Konsultasi", desc: "Diskusi kebutuhan dan visi Anda" },
  { icon: FileEdit, label: "Perencanaan", desc: "Penyusunan rencana kerja dan timeline" },
  { icon: Sparkles, label: "Eksekusi", desc: "Pelaksanaan sesuai standar kualitas" },
  { icon: CheckCircle, label: "Deliver", desc: "Serah terima hasil tepat waktu" },
]

import { MessageCircle } from "lucide-react"
