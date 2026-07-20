"use client"

import { Shield, FileText, Building2, BookOpen, Scale, Stamp, Award, CheckCircle } from "lucide-react"

export interface LegalDocument {
  id: string
  title: string
  number: string
  date: string
  description: string
  icon: typeof Shield
  status: "active" | "verified"
}

export const legalDocuments: LegalDocument[] = [
  {
    id: "nib",
    title: "Nomor Induk Berusaha (NIB)",
    number: "1807260050954",
    date: "18 Juli 2026",
    description:
      "NIB diterbitkan oleh Pemerintah Indonesia melalui sistem OSS-RBA sebagai bukti legalitas usaha PT Mughis Cipta Media.",
    icon: FileText,
    status: "active",
  },
  {
    id: "spp",
    title: "Status PT Perorangan",
    number: "1807260050954",
    date: "18 Juli 2026",
    description:
      "PT Perorangan (PT Perseorangan) — didirikan berdasarkan NIB yang diterbitkan melalui sistem OSS-RBA, tanpa akta notaris sesuai UU Cipta Kerja.",
    icon: Building2,
    status: "active",
  },
  {
    id: "npwp",
    title: "NPWP Perusahaan",
    number: "1000 0000 1042 6923",
    date: "18 Juli 2026",
    description:
      "Nomor Pokok Wajib Pajak (NPWP) perusahaan yang terdaftar di Direktorat Jenderal Pajak (DJP).",
    icon: Scale,
    status: "active",
  },
  {
    id: "sku",
    title: "Izin Usaha",
    number: "1807260050954",
    date: "18 Juli 2026",
    description:
      "NIB berlaku sebagai izin usaha (setara SKU) berdasarkan Peraturan Pemerintah. Tidak diperlukan SKU terpisah untuk PT Perorangan.",
    icon: Shield,
    status: "active",
  },
  {
    id: "sertifikat",
    title: "Anggota IKAPI (Dalam Proses)",
    number: "-",
    date: "-",
    description:
      "Pendaftaran anggota IKAPI (Ikatan Penerbit Indonesia) sedang dalam proses pengajuan setelah NIB dan NPWP terbit.",
    icon: Award,
    status: "active",
  },
]

export interface CompanyValue {
  icon: typeof Shield
  title: string
  description: string
}

export const companyValues: CompanyValue[] = [
  {
    icon: Shield,
    title: "Integritas",
    description:
      "Kejujuran, etika, dan tanggung jawab dalam setiap aspek bisnis. Kepercayaan adalah fondasi utama hubungan kami dengan penulis dan mitra.",
  },
  {
    icon: Building2,
    title: "Profesionalisme",
    description:
      "Standar profesional tertinggi dalam setiap proyek, ditangani dengan kompetensi, ketepatan, dan dedikasi penuh.",
  },
  {
    icon: BookOpen,
    title: "Inovasi",
    description:
      "Inovasi berkelanjutan dalam teknologi penerbitan, desain, dan distribusi untuk solusi terbaik yang relevan dengan zaman.",
  },
  {
    icon: Stamp,
    title: "Kualitas",
    description:
      "Setiap buku melalui proses kurasi, editing, dan produksi yang ketat. Tidak ada kompromi dalam kualitas.",
  },
  {
    icon: Award,
    title: "Kolaborasi",
    description:
      "Sinergi dengan penulis, penerbit lain, institusi, dan masyarakat untuk menciptakan dampak literasi yang lebih luas.",
  },
  {
    icon: CheckCircle,
    title: "Pelayanan Terbaik",
    description:
      "Kepuasan penulis dan mitra adalah prioritas. Pendampingan penuh, komunikasi terbuka, dan solusi sesuai kebutuhan.",
  },
]

export interface Milestone {
  year: string
  title: string
  description: string
  icon: typeof Shield
}

export const milestones: Milestone[] = [
  {
    year: "2026",
    title: "Pendirian PT Perorangan",
    description:
      "PT Mughis Cipta Media resmi berdiri sebagai PT Perorangan dengan NIB 1807260050954 yang diterbitkan melalui sistem OSS-RBA Pemerintah Indonesia.",
    icon: Building2,
  },
  {
    year: "2026",
    title: "Membangun Platform Digital",
    description:
      "Meluncurkan website Maktabah al-Mughis sebagai platform penerbitan dan distribusi buku Islami berkualitas.",
    icon: Award,
  },
]

export interface FAQItem {
  q: string
  a: string
}

export const companyFAQ: { category: string; items: FAQItem[] }[] = [
  {
    category: "Perusahaan",
    items: [
      {
        q: "Apa itu PT Mughis Cipta Media?",
        a: "PT Mughis Cipta Media adalah perusahaan yang bergerak di bidang penerbitan, percetakan, distribusi buku, dan media kreatif. Kami berkomitmen menghadirkan karya berkualitas bagi dunia pendidikan dan literasi Indonesia melalui brand Maktabah al-Mughis.",
      },
      {
        q: "Kapan PT Mughis Cipta Media didirikan?",
        a: "Perusahaan didirikan pada tahun 2020 dan telah melalui berbagai tahap perkembangan hingga menjadi penerbit terpercaya di Indonesia.",
      },
      {
        q: "Apakah PT Mughis Cipta Media memiliki legalitas resmi?",
        a: "Ya, perusahaan memiliki legalitas lengkap termasuk NIB, Akta Pendirian, NPWP, SKU, dan sertifikat anggota IKAPI. Semua dokumen legal dapat diakses pada halaman Legalitas Perusahaan.",
      },
    ],
  },
  {
    category: "Penerbitan",
    items: [
      {
        q: "Bagaimana cara menerbitkan buku di Maktabah al-Mughis?",
        a: "Anda dapat menghubungi kami melalui halaman Kontak atau mengirimkan naskah langsung. Tim kami akan melakukan review dan memberikan proposal penerbitan yang sesuai dengan kebutuhan Anda.",
      },
      {
        q: "Apakah penulis pemula bisa menerbitkan buku?",
        a: "Tentu! Kami sangat mendukung penulis pemula. Tim kami akan membimbing Anda dari awal hingga buku terbit, termasuk dalam hal penulisan, penyuntingan, dan desain.",
      },
    ],
  },
  {
    category: "Layanan & Distribusi",
    items: [
      {
        q: "Apa saja layanan yang ditawarkan?",
        a: "Kami menawarkan layanan penerbitan (mayor dan self publishing), percetakan (digital dan offset), editing dan proofreading, desain dan layout, ISBN, distribusi nasional, serta media kreatif digital.",
      },
      {
        q: "Apakah buku didistribusikan secara nasional?",
        a: "Ya, kami memiliki jaringan distribusi yang mencakup berbagai kota di Indonesia. Buku tersedia di toko buku, platform online, dan pameran.",
      },
    ],
  },
]

export interface Stat {
  label: string
  value: string
  suffix?: string
}

export const companyStats: Stat[] = [
  { label: "Penulis Dibantu", value: "1", suffix: "" },
  { label: "Proyek Selesai", value: "1", suffix: "" },
  { label: "Buku Diterbitkan", value: "0", suffix: "" },
  { label: "Tahun Berdiri", value: "2026", suffix: "" },
]

export const whyUs: string[] = [
  "Badan usaha resmi dengan legalitas lengkap dan terpercaya",
  "Proses penerbitan yang profesional dan transparan",
  "Harga kompetitif dengan kualitas terbaik",
  "Kualitas cetak terbaik dengan teknologi modern",
  "Pengerjaan tepat waktu sesuai jadwal yang disepakati",
  "Tim berpengalaman di industri penerbitan dan percetakan",
  "Konsultasi gratis sebelum memulai proyek",
  "Mendukung penulis pemula maupun profesional",
  "Layanan tersedia untuk seluruh wilayah Indonesia",
  "Pendampingan penuh dari naskah hingga distribusi",
]
