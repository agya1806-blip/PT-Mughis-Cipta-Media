import type { TimelineEvent, WhyCard, FlowStep, FAQItem, Requirement } from "@/lib/campaign/types"

export const UPLOAD_LIMITS = {
  naskahMaxMB: 1,
  buktiMaxMB: 0.5,
}

export const CAMPAIGN = {
  quota: {
    total: 50,
    registered: 32,
  },
  registrationPrefix: "MCM",
  whatsappAdmin: "6285121576433",
  laptopWhatsapp: "6285121576433",
  instagramUrl: "https://www.instagram.com/percetakanmurah.co?igsh=MWFqdmF3anY2dHFrYw%3D%3D&utm_source=qr",
  founderInstagram: "mhdaghisna_",
}

export const timelineEvents: TimelineEvent[] = [
  { year: "2023", title: "Maktabah Al-Mughis Berdiri", description: "Memulai perjalanan sebagai penerbit buku Islami dan pendidikan." },
  { year: "2024", title: "Dipercaya Banyak Penulis", description: "Melayani puluhan penulis dari berbagai latar belakang." },
  { year: "2025", title: "Transformasi Perusahaan", description: "Proses transformasi menjadi badan usaha resmi." },
  { year: "2026", title: "PT Mughis Cipta Media", description: "Resmi berdiri sebagai badan usaha resmi dengan legalitas lengkap." },
]

export const whyCards: WhyCard[] = [
  { icon: "Building2", title: "Identitas Baru", description: "Bertransformasi dari penerbit indie menjadi perusahaan resmi berbadan hukum PT." },
  { icon: "Shield", title: "Legalitas Lengkap", description: "Memiliki NIB, NPWP, dan izin usaha yang terdaftar resmi di Pemerintah Indonesia." },
  { icon: "TrendingUp", title: "Standar Lebih Tinggi", description: "Menerapkan standar profesional dalam setiap proses penerbitan." },
  { icon: "Zap", title: "Pelayanan Lebih Cepat", description: "Sistem dan tim yang lebih terstruktur untuk pelayanan yang responsif." },
  { icon: "Heart", title: "Komitmen Lebih Besar", description: "Dedikasi penuh terhadap kualitas dan kepuasan penulis." },
  { icon: "Globe", title: "Teknologi Lebih Modern", description: "Platform digital untuk pengajuan naskah, tracking, dan distribusi." },
]

export const flowSteps: FlowStep[] = [
  { number: 1, title: "Daftar", description: "Isi formulir pendaftaran program secara lengkap." },
  { number: 2, title: "Verifikasi", description: "Tim kami akan memverifikasi data dan berkas Anda." },
  { number: 3, title: "Admin Menghubungi", description: "Admin akan menghubungi via WhatsApp untuk konfirmasi." },
  { number: 4, title: "Pengumpulan Dokumen", description: "Lengkapi dokumen yang diperlukan untuk pendampingan." },
  { number: 5, title: "Pendampingan Administrasi", description: "Tim mendampingi proses administrasi penerbitan." },
  { number: 6, title: "Selesai", description: "Buku Anda siap melanjutkan ke tahap penerbitan." },
]

export const requirements: Requirement[] = [
  { label: "Follow Instagram PT Mughis Cipta Media" },
  { label: "Follow Instagram Founder", description: "@mhdaghisna_" },
  { label: "Mempunyai naskah sendiri", description: "Naskah asli karya sendiri" },
  { label: "Bersedia mengikuti ketentuan program" },
]

export const faqItems: FAQItem[] = [
  { q: "Apa itu Program Apresiasi Penulis?", a: "Program Apresiasi Penulis adalah inisiatif PT Mughis Cipta Media dalam rangka transformasi perusahaan, memberikan pendampingan administrasi penerbitan secara gratis sesuai ketentuan yang berlaku." },
  { q: "Siapa yang bisa mengikuti program ini?", a: "Program ini terbuka untuk penulis pemula maupun profesional yang memiliki naskah sendiri dan ingin menerbitkan buku." },
  { q: "Apakah program ini berbayar?", a: "Program ini memberikan pendampingan administrasi penerbitan secara gratis. Ketentuan lebih lanjut akan dijelaskan oleh admin setelah pendaftaran." },
  { q: "Apa saja yang didapatkan peserta?", a: "Peserta mendapatkan pendampingan administrasi penerbitan, konsultasi penerbitan, dan pendampingan proses ISBN sesuai ketentuan Perpustakaan Nasional RI." },
  { q: "Berapa lama proses pendampingan?", a: "Durasi pendampingan tergantung pada kesiapan dokumen dan kompleksitas naskah. Tim kami akan memberikan timeline yang jelas setelah verifikasi." },
  { q: "Apakah naskah saya akan diterbitkan?", a: "Pendampingan administrasi mempersiapkan kelengkapan administrasi penerbitan. Keputusan penerbitan akan melalui proses kurasi sebagaimana ketentuan yang berlaku." },
  { q: "Bagaimana cara mengetahui status pendaftaran?", a: "Setelah mendaftar, Anda akan mendapatkan nomor registrasi. Admin akan menghubungi Anda melalui WhatsApp untuk informasi lebih lanjut." },
  { q: "Apakah ada batas waktu pendaftaran?", a: "Program ini terbatas untuk 50 peserta. Segera daftarkan diri Anda sebelum kuota penuh." },
  { q: "Apa yang dimaksud dengan pendampingan ISBN?", a: "Kami membantu proses pengajuan ISBN ke Perpustakaan Nasional RI sesuai ketentuan yang berlaku. ISBN diterbitkan oleh Perpustakaan Nasional." },
  { q: "Bagaimana cara menghubungi tim jika ada pertanyaan?", a: "Anda dapat menghubungi kami melalui WhatsApp di nomor yang tersedia di halaman ini atau melalui email resmi PT Mughis Cipta Media." },
]

export const KATEGORI_BUKU = [
  "Agama & Spiritualitas",
  " Pendidikan",
  "Fiksi",
  "Non-Fiksi",
  "Anak & Remaja",
  "Akademik & Ilmiah",
  "Bisnis & Ekonomi",
  "Pengembangan Diri",
  "Sejarah & Budaya",
  "Teknologi & Sains",
  "Sastra",
  "Lainnya",
]

export const STATUS_NASKAH_OPTIONS = [
  { value: "belum_selesai", label: "Belum selesai" },
  { value: "sedang_ditulis", label: "Sedang ditulis" },
  { value: "sudah_selesai", label: "Sudah selesai" },
]
