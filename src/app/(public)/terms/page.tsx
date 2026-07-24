import { Scale } from "lucide-react"
import { LegalLayout, LegalSection } from "@/components/legal"

export const metadata = {
  title: "Syarat & Ketentuan",
  description: "Syarat dan ketentuan penggunaan website dan layanan PT Mughis Cipta Media.",
  openGraph: {
    title: "Syarat & Ketentuan - PT Mughis Cipta Media",
    description: "Syarat dan ketentuan penggunaan layanan PT Mughis Cipta Media.",
  },
  twitter: {
    title: "Syarat & Ketentuan - PT Mughis Cipta Media",
    description: "Syarat dan ketentuan penggunaan layanan PT Mughis Cipta Media.",
  },
  alternates: { canonical: "/terms" },
}

export default function TermsPage() {
  return (
    <LegalLayout
      icon={Scale}
      iconBg="bg-gold/10"
      iconColor="text-gold"
      title="Syarat & Ketentuan"
      subtitle="PT Mughis Cipta Media"
      lastUpdated="Juli 2026"
    >
      <LegalSection title="1. Penerimaan Ketentuan">
        <p>Dengan mengakses dan menggunakan website ini, Anda menyetujui syarat dan ketentuan yang berlaku. Jika Anda tidak setuju dengan sebagian atau seluruh ketentuan ini, harap tidak menggunakan layanan kami.</p>
      </LegalSection>

      <LegalSection title="2. Layanan">
        <p>PT Mughis Cipta Media menyediakan layanan penerbitan, percetakan, distribusi buku, dan media kreatif sesuai dengan kesepakatan yang tertuang dalam kontrak antara kedua belah pihak. Ruang lingkup, biaya, dan jadwal pelaksanaan akan diatur dalam dokumen kontrak terpisah.</p>
      </LegalSection>

      <LegalSection title="3. Hak Kekayaan Intelektual">
        <p>Seluruh konten yang terdapat di website ini, termasuk teks, gambar, logo, dan elemen desain, dilindungi oleh hak cipta dan hak kekayaan intelektual lainnya. Dilarang menggunakan, mereproduksi, atau mendistribusikan konten tanpa izin tertulis dari PT Mughis Cipta Media.</p>
      </LegalSection>

      <LegalSection title="4. Naskah dan Konten Pengguna">
        <ul className="list-disc pl-5 space-y-1">
          <li>Penulis menjamin bahwa naskah yang dikirimkan adalah karya asli dan tidak melanggar hak cipta pihak lain.</li>
          <li>Penulis bertanggung jawab penuh atas isi naskah, termasuk akurasi fakta dan kepatuhan terhadap hukum yang berlaku.</li>
          <li>Kami berhak menolak naskah yang mengandung konten melanggar hukum, SARA, atau norma yang berlaku di masyarakat.</li>
          <li>Hak cipta naskah tetap milik penulis sesuai dengan ketentuan dalam kontrak penerbitan.</li>
        </ul>
      </LegalSection>

      <LegalSection title="5. Pembayaran">
        <ul className="list-disc pl-5 space-y-1">
          <li>Harga layanan sesuai dengan kesepakatan yang tercantum dalam kontrak atau invoice.</li>
          <li>Pembayaran dilakukan sesuai termin yang disepakati dalam kontrak.</li>
          <li>Keterlambatan pembayaran dapat mengakibatkan penundaan pengerjaan atau penghentian layanan.</li>
          <li>Seluruh harga belum termasuk pajak sesuai ketentuan perpajakan yang berlaku.</li>
        </ul>
      </LegalSection>

      <LegalSection title="6. Pengiriman dan Distribusi">
        <ul className="list-disc pl-5 space-y-1">
          <li>Waktu pengiriman terhitung sejak kontrak ditandatangani dan pembayaran awal diterima.</li>
          <li>Keterlambatan akibat force majeure (bencana alam, pemogokan, kebijakan pemerintah) di luar tanggung jawab kami.</li>
          <li>Biaya pengiriman buku ditanggung oleh pemesan sesuai kesepakatan dalam kontrak.</li>
          <li>Risiko kerusakan selama pengiriman menjadi tanggung jawab pihak ekspedisi.</li>
        </ul>
      </LegalSection>

      <LegalSection title="7. Pembatalan dan Pengembalian Dana">
        <ul className="list-disc pl-5 space-y-1">
          <li>Pembatalan pesanan dapat dilakukan dalam waktu 3 hari setelah pembayaran awal.</li>
          <li>Pengembalian dana akan diproses sesuai dengan tahap pengerjaan yang sudah dilakukan.</li>
          <li>Biaya yang sudah terpakai untuk proses produksi (seperti setting, desain, proofing) tidak dapat dikembalikan.</li>
          <li>Pembatalan sepihak oleh klien setelah produksi dimulai akan dikenakan biaya sesuai progres pekerjaan.</li>
        </ul>
      </LegalSection>

      <LegalSection title="8. Batasan Tanggung Jawab">
        <p>PT Mughis Cipta Media tidak bertanggung jawab atas kerugian tidak langsung, insidental, atau konsekuensial yang timbul dari penggunaan atau ketidakmampuan menggunakan layanan kami. Tanggung jawab kami dibatasi pada nilai layanan yang diterima oleh klien.</p>
      </LegalSection>

      <LegalSection title="9. Hukum yang Berlaku">
        <p>Ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum Negara Kesatuan Republik Indonesia. Setiap sengketa yang timbul akan diselesaikan melalui musyawarah mufakat terlebih dahulu, dan jika tidak tercapai, akan diselesaikan di Pengadilan Negeri yang berwenang.</p>
      </LegalSection>

      <LegalSection title="10. Perubahan Ketentuan">
        <p>Kami berhak mengubah syarat dan ketentuan ini sewaktu-waktu tanpa pemberitahuan sebelumnya. Perubahan akan diinformasikan melalui website kami. Penggunaan layanan setelah perubahan berlaku dianggap sebagai penerimaan terhadap ketentuan yang baru.</p>
      </LegalSection>
    </LegalLayout>
  )
}
