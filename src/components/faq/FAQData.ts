export interface FAQItem {
  q: string
  a: string
}

export interface FAQCategory {
  id: string
  label: string
  icon: string
  items: FAQItem[]
}

export const faqCategories: FAQCategory[] = [
  {
    id: "penerbitan",
    label: "Penerbitan",
    icon: "BookOpen",
    items: [
      { q: "Bagaimana cara menerbitkan buku di Maktabah al-Mughis?", a: "Anda bisa menghubungi kami melalui halaman Kontak atau mengirimkan naskah Anda. Tim kami akan melakukan review dan memberikan proposal penerbitan yang sesuai dengan kebutuhan Anda." },
      { q: "Berapa lama proses penerbitan buku?", a: "Proses penerbitan buku umumnya memakan waktu 2-4 bulan, tergantung pada kompleksitas naskah, kebutuhan editing, desain, dan proses produksi." },
      { q: "Apakah saya bisa self publishing?", a: "Tentu! Kami menyediakan layanan self publishing bagi penulis yang ingin mengontrol penuh proses kreatif dan distribusi buku mereka." },
      { q: "Apakah naskah saya akan diedit?", a: "Ya, setiap naskah yang masuk akan melalui proses editing profesional meliputi editing substansi, bahasa, dan proofreading untuk memastikan kualitas terbaik." },
      { q: "Apakah penulis pemula bisa menerbitkan buku?", a: "Tentu! Kami sangat mendukung penulis pemula. Tim kami akan membimbing Anda dari awal hingga buku terbit, termasuk dalam hal penulisan, penyuntingan, dan desain." },
    ],
  },
  {
    id: "percetakan",
    label: "Percetakan",
    icon: "Printer",
    items: [
      { q: "Jenis cetakan apa saja yang bisa dilakukan?", a: "Kami melayani cetak buku, majalah, jurnal, modul, kalender, brosur, katalog, dan berbagai kebutuhan cetak lainnya dengan kualitas terbaik." },
      { q: "Berapa minimal cetak buku?", a: "Minimal cetak buku adalah 50 eksemplar untuk sistem cetak digital, dan 200 eksemplar untuk cetak offset." },
      { q: "Apa perbedaan cetak digital dan offset?", a: "Cetak digital cocok untuk jumlah sedikit (50-200 eksemplar) dengan harga per buku lebih tinggi. Cetak offset cocok untuk jumlah besar (200+) dengan harga per buku lebih murah dan kualitas lebih konsisten." },
      { q: "Apakah saya bisa memilih jenis kertas?", a: "Ya, kami menyediakan berbagai pilihan jenis kertas sesuai kebutuhan dan anggaran Anda, mulai dari HVS, book paper, art paper, hingga kertas khusus." },
    ],
  },
  {
    id: "isbn",
    label: "ISBN",
    icon: "Hash",
    items: [
      { q: "Apa itu ISBN?", a: "ISBN (International Standard Book Number) adalah kode identifikasi unik untuk setiap buku yang diterbitkan secara internasional. ISBN diperlukan untuk distribusi buku di toko buku dan platform online." },
      { q: "Apakah buku saya akan memiliki ISBN?", a: "Ya, kami mengurus pengajuan ISBN Perpustakaan Nasional RI untuk setiap buku yang kami terbitkan secara mayor." },
      { q: "Berapa lama pengurusan ISBN?", a: "Proses pengurusan ISBN umumnya memakan waktu 3-7 hari kerja setelah pengajuan ke Perpustakaan Nasional." },
      { q: "Apakah self publishing juga bisa mendapatkan ISBN?", a: "Ya, penulis self publishing juga bisa mendapatkan ISBN melalui layanan kami. Biaya pengurusan ISBN akan ditambahkan ke paket layanan yang dipilih." },
    ],
  },
  {
    id: "pembayaran",
    label: "Pembayaran",
    icon: "CreditCard",
    items: [
      { q: "Berapa biaya penerbitan buku?", a: "Biaya penerbitan bervariasi tergantung pada jumlah halaman, ukuran, jenis kertas, jumlah cetak, dan layanan tambahan yang dipilih. Hubungi kami untuk konsultasi gratis dan penawaran harga." },
      { q: "Apakah ada biaya tersembunyi?", a: "Tidak. Kami memberikan rincian biaya yang transparan sejak awal sehingga Anda bisa menyesuaikan dengan budget yang dimiliki." },
      { q: "Metode pembayaran apa yang tersedia?", a: "Kami menerima pembayaran melalui transfer bank (BCA, Mandiri, BRI) dan berbagai metode pembayaran digital." },
      { q: "Apakah bisa mencicil pembayaran?", a: "Ya, untuk paket penerbitan tertentu kami menyediakan opsi pembayaran bertahap sesuai dengan termin yang disepakati dalam kontrak." },
    ],
  },
  {
    id: "pengiriman",
    label: "Pengiriman",
    icon: "Truck",
    items: [
      { q: "Apakah buku saya akan didistribusikan secara nasional?", a: "Ya, kami memiliki jaringan distribusi yang mencakup berbagai kota di Indonesia. Buku Anda akan tersedia di toko buku, platform online, dan pameran." },
      { q: "Berapa lama waktu pengiriman buku?", a: "Waktu pengiriman tergantung pada lokasi tujuan. Untuk wilayah Jawa umumnya 3-7 hari kerja, sedangkan luar Jawa 7-14 hari kerja." },
      { q: "Apakah ada biaya pengiriman?", a: "Biaya pengiriman buku ditanggung oleh pemesan sesuai dengan kesepakatan dalam kontrak. Untuk pemesanan dalam jumlah besar, kami memberikan subsidi ongkos kirim." },
      { q: "Apakah buku bisa dikirim ke luar negeri?", a: "Ya, kami melayani pengiriman ke luar negeri dengan biaya yang disesuaikan dengan tujuan pengiriman." },
    ],
  },
]

export function getAllFAQItems(): FAQItem[] {
  return faqCategories.flatMap((cat) => cat.items)
}
