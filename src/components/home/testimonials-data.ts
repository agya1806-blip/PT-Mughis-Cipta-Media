/**
 * Testimonials -- Data klien PT Mughis Cipta Media
 *
 * NOTE: Data berikut adalah placeholder/mock data.
 * Saat data asli dari klien sudah tersedia, cukup ganti array ini
 * tanpa mengubah komponen lain.
 */

export interface Testimonial {
  id: string
  name: string
  role: string
  institution?: string
  content: string
  rating: number
  verified: boolean
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Ahmad Fauzi",
    role: "Penulis",
    institution: "Self Publishing",
    content: "Proses penerbitan sangat mudah dan cepat. Tim Mughis sangat profesional dalam mendampingi penulis pemula seperti saya. Hasil cetakan berkualitas premium.",
    rating: 5,
    verified: true,
  },
  {
    id: "2",
    name: "Dr. Siti Nurhaliza",
    role: "Dosen Universitas",
    institution: "UIN Sunan Kalijaga",
    content: "Kualitas cetakan sangat bagus dan tepat waktu. Saya sudah 3 kali menerbitkan buku di sini dan selalu puas dengan hasilnya.",
    rating: 5,
    verified: true,
  },
  {
    id: "3",
    name: "KH. M. Rizky Pratama",
    role: "Pimpinan Pesantren",
    institution: "Pesantren Al-Hikmah",
    content: "Layanan cetak modul dan buku ajar untuk pesantren kami sangat membantu. Harga bersahabat dengan kualitas terbaik.",
    rating: 5,
    verified: true,
  },
  {
    id: "4",
    name: "Rina Wulandari, S.Pd.",
    role: "Guru SMA",
    institution: "SMA Negeri 1 Surakarta",
    content: "Self publishing di Mughis memberikan saya kebebasan penuh atas buku saya. Tim editing sangat membantu menyempurnakan naskah.",
    rating: 5,
    verified: false,
  },
  {
    id: "5",
    name: "H. Firmansyah",
    role: "Penulis Buku Islami",
    institution: "Komunitas Penulis Masjid",
    content: "Mughis benar-benar membantu mewujudkan impian saya menerbitkan buku. Timnya komunikatif dan hasilnya memuaskan. Sangat direkomendasikan!",
    rating: 5,
    verified: true,
  },
  {
    id: "6",
    name: "Nurul Hidayah, M.Pd.",
    role: "Kepala Sekolah",
    institution: "SDIT Bina Insani",
    content: "Kami mempercayakan cetak buku ajar dan modul pembelajaran kepada Mughis. Kualitas konsisten dan pengiriman selalu tepat waktu. Terima kasih.",
    rating: 4,
    verified: true,
  },
]