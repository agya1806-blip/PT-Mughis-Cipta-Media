import { Shield } from "lucide-react"
import { LegalLayout, LegalSection } from "@/components/legal"

export const metadata = {
  title: "Kebijakan Privasi",
  description: "Kebijakan privasi PT Mughis Cipta Media mengenai pengumpulan, penggunaan, dan perlindungan data pribadi pengguna.",
  openGraph: {
    title: "Kebijakan Privasi - Maktabah al-Mughis",
    description: "Kebijakan privasi PT Mughis Cipta Media.",
  },
  twitter: {
    title: "Kebijakan Privasi - Maktabah al-Mughis",
    description: "Kebijakan privasi PT Mughis Cipta Media.",
  },
  alternates: { canonical: "/privacy" },
}

export default function PrivacyPage() {
  return (
    <LegalLayout
      icon={Shield}
      iconBg="bg-gold/20"
      iconColor="text-gold"
      title="Kebijakan Privasi"
      subtitle="PT Mughis Cipta Media"
      lastUpdated="Juli 2026"
    >
      <LegalSection title="1. Informasi yang Kami Kumpulkan">
        <p>Kami mengumpulkan informasi yang Anda berikan secara langsung saat menggunakan layanan kami, termasuk:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Nama lengkap</li>
          <li>Alamat email</li>
          <li>Nomor telepon</li>
          <li>Alamat pengiriman</li>
          <li>Informasi pembayaran</li>
          <li>Data naskah yang Anda unggah</li>
        </ul>
      </LegalSection>

      <LegalSection title="2. Penggunaan Informasi">
        <p>Informasi yang kami kumpulkan digunakan untuk:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Memproses pesanan dan transaksi Anda</li>
          <li>Memberikan layanan penerbitan dan percetakan</li>
          <li>Mengirimkan konfirmasi dan update status pesanan</li>
          <li>Meningkatkan kualitas layanan kami</li>
          <li>Mengirimkan informasi promosi (dengan persetujuan Anda)</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Perlindungan Data">
        <p>Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang tepat untuk melindungi data pribadi Anda dari akses tidak sah, perubahan, pengungkapan, atau perusakan. Seluruh data disimpan secara aman dengan enkripsi yang sesuai dengan standar industri.</p>
      </LegalSection>

      <LegalSection title="4. Pengungkapan kepada Pihak Ketiga">
        <p>Kami tidak menjual, menukar, atau mentransfer informasi pribadi Anda kepada pihak ketiga tanpa persetujuan Anda, kecuali diwajibkan oleh hukum. Data hanya dapat dibagikan kepada mitra tepercaya yang membantu kami mengoperasikan website dan menjalankan bisnis, dengan ikatan kerahasiaan yang ketat.</p>
      </LegalSection>

      <LegalSection title="5. Cookie">
        <p>Website kami menggunakan cookie untuk meningkatkan pengalaman browsing, menganalisis tren, dan mengelola preferensi pengguna. Anda dapat mengontrol penggunaan cookie melalui pengaturan browser Anda. Penonaktifan cookie dapat memengaruhi beberapa fungsi website.</p>
      </LegalSection>

      <LegalSection title="6. Hak Anda">
        <ul className="list-disc pl-5 space-y-1">
          <li>Mengakses data pribadi yang kami simpan</li>
          <li>Memperbaiki data yang tidak akurat atau tidak lengkap</li>
          <li>Menghapus data pribadi Anda sesuai ketentuan yang berlaku</li>
          <li>Menolak pemrosesan data untuk tujuan pemasaran langsung</li>
          <li>Membatasi pemrosesan data dalam kondisi tertentu</li>
          <li>Mengajukan keluhan kepada lembaga pengawas perlindungan data</li>
        </ul>
      </LegalSection>

      <LegalSection title="7. Perubahan Kebijakan">
        <p>Kebijakan privasi ini dapat diperbarui dari waktu ke waktu untuk mencerminkan perubahan praktik kami atau kepatuhan terhadap peraturan yang berlaku. Perubahan signifikan akan diinformasikan melalui website kami atau pemberitahuan langsung.</p>
      </LegalSection>

      <LegalSection title="8. Kontak">
        <p>Jika Anda memiliki pertanyaan, keberatan, atau permintaan terkait kebijakan privasi ini atau data pribadi Anda, silakan hubungi kami melalui halaman Kontak atau kirim email ke admin@pt-mughis-cipta-media.com.</p>
      </LegalSection>
    </LegalLayout>
  )
}
