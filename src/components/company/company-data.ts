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
    number: "1234567890123",
    date: "1 Januari 2020",
    description:
      "NIB diterbitkan oleh Pemerintah Indonesia melalui sistem OSS-RBA sebagai bukti legalitas usaha PT Mughis Cipta Media.",
    icon: FileText,
    status: "active",
  },
  {
    id: "akta",
    title: "Akta Pendirian Perusahaan",
    number: "AHU-12345.AH.01.01.TAHUN.2020",
    date: "15 Januari 2020",
    description:
      "Akta pendirian yang disahkan oleh Menteri Hukum dan HAM RI sebagai dasar hukum pendirian perusahaan.",
    icon: Building2,
    status: "active",
  },
  {
    id: "npwp",
    title: "NPWP Perusahaan",
    number: "01.234.567.8-999.000",
    date: "1 Januari 2020",
    description:
      "Nomor Pokok Wajib Pajak (NPWP) perusahaan yang terdaftar di Kantor Pajak, memenuhi kewajiban perpajakan secara rutin.",
    icon: Scale,
    status: "active",
  },
  {
    id: "sku",
    title: "Surat Keterangan Usaha (SKU)",
    number: "SKU-98765/2020",
    date: "20 Januari 2020",
    description:
      "Surat keterangan usaha dari pemerintah daerah setempat sebagai izin operasional perusahaan.",
    icon: Shield,
    status: "active",
  },
  {
    id: "sertifikat",
    title: "Sertifikat Badan Usaha Penerbitan",
    number: "IKAPI-54321/2020",
    date: "1 Februari 2020",
    description:
      "Sertifikat anggota IKAPI (Ikatan Penerbit Indonesia) yang menegaskan status sebagai penerbit resmi dan terdaftar.",
    icon: Award,
    status: "verified",
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
    year: "2020",
    title: "Pendirian Perusahaan",
    description:
      "PT Mughis Cipta Media resmi didirikan dengan akta notaris dan mendapatkan pengesahan dari Kementerian Hukum dan HAM RI.",
    icon: Building2,
  },
  {
    year: "2021",
    title: "Memulai Operasional Penerbitan",
    description:
      "Menerbitkan buku-buku pertama yang mendapat sambutan positif. Fokus pada buku-buku keislaman dan pendidikan berkualitas.",
    icon: BookOpen,
  },
  {
    year: "2022",
    title: "Pengembangan Divisi Percetakan",
    description:
      "Investasi peralatan cetak modern untuk meningkatkan kapasitas produksi dan kualitas hasil cetakan.",
    icon: Shield,
  },
  {
    year: "2023",
    title: "Ekspansi Media Kreatif",
    description:
      "Memperluas layanan ke media kreatif digital dan pengembangan konten multimedia untuk menjangkau audiens yang lebih luas.",
    icon: Award,
  },
  {
    year: "2024",
    title: "Distribusi Nasional & Digital",
    description:
      "Memperkuat jaringan distribusi nasional dan mengoptimalkan platform digital untuk menjangkau pembaca di seluruh Indonesia.",
    icon: FileText,
  },
  {
    year: "2025",
    title: "Target Penerbit Nasional Terdepan",
    description:
      "Terus bertumbuh menjadi penerbit nasional yang berkontribusi dalam meningkatkan literasi dan kualitas pendidikan Indonesia.",
    icon: Scale,
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
  { label: "Penulis Dibantu", value: "100", suffix: "+" },
  { label: "Proyek Selesai", value: "500", suffix: "+" },
  { label: "Buku Diterbitkan", value: "1000", suffix: "+" },
  { label: "Tahun Berpengalaman", value: "5", suffix: "+" },
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
