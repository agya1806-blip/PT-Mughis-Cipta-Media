import type { Manuscript, Activity, Notification, DashboardStats, AuthorProfile } from "@/types/dashboard"

export const mockStats: DashboardStats = {
  totalManuscripts: 12,
  underReview: 3,
  inProgress: 5,
  published: 4,
}

export const mockManuscripts: Manuscript[] = [
  { id: "1", title: "Seni Menulis Fiksi Modern", category: "Fiksi", synopsis: "Panduan menulis fiksi untuk penulis pemula hingga mahir.", author: "Ahmad Rizki", status: "published", createdAt: "2026-06-15", updatedAt: "2026-07-10" },
  { id: "2", title: "Pemasaran Digital untuk Penulis", category: "Non-Fiksi", synopsis: "Strategi pemasaran buku di era digital.", author: "Siti Nurhaliza", status: "editing", createdAt: "2026-06-20", updatedAt: "2026-07-12" },
  { id: "3", title: "Kumpulan Cerpen: Senja di Pelabuhan", category: "Fiksi", synopsis: "Antologi cerita pendek tentang kehidupan pesisir.", author: "Budi Santoso", status: "review", createdAt: "2026-07-01", updatedAt: "2026-07-14" },
  { id: "4", title: "Teknik Menulis Artikel Ilmiah Populer", category: "Edukasi", synopsis: "Cara menyajikan riset ilmiah untuk khalayak umum.", author: "Dr. Dewi Lestari", status: "layout", createdAt: "2026-06-10", updatedAt: "2026-07-08" },
  { id: "5", title: "Bisnis Penerbitan untuk Pemula", category: "Bisnis", synopsis: "Panduan memulai bisnis penerbitan buku.", author: "Ahmad Rizki", status: "draft", createdAt: "2026-07-05", updatedAt: "2026-07-05" },
  { id: "6", title: "Jejak Langkah: Biografi Tokoh Lokal", category: "Biografi", synopsis: "Kisah inspiratif tokoh masyarakat Jawa Barat.", author: "Tim Mughis", status: "submitted", createdAt: "2026-07-08", updatedAt: "2026-07-13" },
  { id: "7", title: "Panduan ISBN untuk Penerbit", category: "Edukasi", synopsis: "Pemahaman lengkap tentang ISBN dan aplikasinya.", author: "Siti Nurhaliza", status: "printing", createdAt: "2026-05-20", updatedAt: "2026-07-11" },
  { id: "8", title: "Menulis Buku Anak: Teori & Praktik", category: "Edukasi", synopsis: "Teknik menulis buku anak yang menarik dan mendidik.", author: "Budi Santoso", status: "editing", createdAt: "2026-06-25", updatedAt: "2026-07-09" },
]

export const mockActivities: Activity[] = [
  { id: "a1", action: "Naskah direview", description: "Seni Menulis Fiksi Modern sedang dalam proses review oleh editor.", timestamp: "2 jam yang lalu", type: "editor" },
  { id: "a2", action: "Revisi selesai", description: "Pemasaran Digital untuk Penulis telah selesai direvisi dan masuk ke tahap layout.", timestamp: "5 jam yang lalu", type: "publishing" },
  { id: "a3", action: "Naskah baru", description: "Jejak Langkah: Biografi Tokoh Lokal berhasil dikirim dan menunggu review.", timestamp: "1 hari yang lalu", type: "system" },
  { id: "a4", action: "Siap cetak", description: "Panduan ISBN untuk Penerbit sudah siap untuk memasuki tahap percetakan.", timestamp: "2 hari yang lalu", type: "publishing" },
  { id: "a5", action: "Komentar editor", description: "Editor memberikan catatan revisi pada naskah Teknik Menulis Artikel Ilmiah Populer.", timestamp: "3 hari yang lalu", type: "editor" },
]

export const mockNotifications: Notification[] = [
  { id: "n1", title: "Naskah telah direview", message: "Editor telah selesai mereview naskah Anda 'Seni Menulis Fiksi Modern'. Silakan cek catatan revisi.", category: "editor", read: false, createdAt: "2 jam yang lalu" },
  { id: "n2", title: "Status naskah diperbarui", message: "Naskah 'Pemasaran Digital untuk Penulis' telah pindah ke tahap Editing.", category: "publishing", read: false, createdAt: "5 jam yang lalu" },
  { id: "n3", title: "Selamat datang di Dashboard Author", message: "Anda sekarang dapat mengelola naskah, melihat progress, dan berkomunikasi dengan editor.", category: "system", read: true, createdAt: "1 hari yang lalu" },
  { id: "n4", title: "Pengingat jadwal", message: "Jadwal konsultasi dengan editor untuk naskah 'Teknik Menulis Artikel Ilmiah Populer' besok pukul 10.00 WIB.", category: "general", read: false, createdAt: "1 hari yang lalu" },
  { id: "n5", title: "Buku terbit!", message: "Selamat! Naskah 'Panduan ISBN untuk Penerbit' Anda telah resmi terbit.", category: "publishing", read: true, createdAt: "3 hari yang lalu" },
  { id: "n6", title: "Pesan dari editor", message: "Editor meminta Anda untuk melengkapi data diri di halaman Profile.", category: "editor", read: true, createdAt: "5 hari yang lalu" },
  { id: "n7", title: "Pembaruan sistem", message: "Dashboard Author telah diperbarui dengan fitur baru. Lihat changelog untuk detail.", category: "system", read: false, createdAt: "1 minggu yang lalu" },
]

export const mockProfile: AuthorProfile = {
  name: "Ahmad Rizki",
  email: "ahmad.rizki@email.com",
  phone: "0812-3456-7890",
  address: "Jl. Merdeka No. 123, Bandung, Jawa Barat",
  bio: "Penulis dan kontributor lepas yang telah menulis lebih dari 50 artikel dan 3 buku. Fokus pada pengembangan diri, literasi, dan dunia penerbitan.",
  memberSince: "Januari 2026",
}

export const statusLabels: Record<string, string> = {
  draft: "Draft",
  submitted: "Submitted",
  review: "Review",
  editing: "Editing",
  layout: "Layout",
  printing: "Printing",
  published: "Published",
}

export const statusColors: Record<string, string> = {
  draft: "bg-zinc-100 text-zinc-600 border-zinc-200",
  submitted: "bg-blue-50 text-blue-600 border-blue-200",
  review: "bg-amber-50 text-amber-600 border-amber-200",
  editing: "bg-violet-50 text-violet-600 border-violet-200",
  layout: "bg-cyan-50 text-cyan-600 border-cyan-200",
  printing: "bg-orange-50 text-orange-600 border-orange-200",
  published: "bg-green-50 text-green-600 border-green-200",
}
