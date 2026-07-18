import { Shield } from "lucide-react"
import Breadcrumb from "@/components/ui/Breadcrumb"

export const metadata = {
  title: "Kebijakan Privasi",
  description: "Kebijakan privasi PT Mughis Cipta Media - Maktabah al-Mughis mengenai pengumpulan, penggunaan, dan perlindungan data pribadi pengguna.",
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
    <div className="flex-1 bg-zinc-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Breadcrumb
          items={[
            { label: "Beranda", href: "/" },
            { label: "Kebijakan Privasi" },
          ]}
        />

        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
            <Shield className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">Kebijakan Privasi</h1>
            <p className="text-sm text-zinc-500">PT Mughis Cipta Media</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-zinc-200 p-8 sm:p-10 space-y-6 text-zinc-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">1. Informasi yang Kami Kumpulkan</h2>
            <p>Kami mengumpulkan informasi yang Anda berikan secara langsung saat menggunakan layanan kami, termasuk:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Nama lengkap</li>
              <li>Alamat email</li>
              <li>Nomor telepon</li>
              <li>Alamat pengiriman</li>
              <li>Informasi pembayaran</li>
              <li>Data naskah yang Anda unggah</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">2. Penggunaan Informasi</h2>
            <p>Informasi yang kami kumpulkan digunakan untuk:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Memproses pesanan dan transaksi Anda</li>
              <li>Memberikan layanan penerbitan dan percetakan</li>
              <li>Mengirimkan konfirmasi dan update status pesanan</li>
              <li>Meningkatkan kualitas layanan kami</li>
              <li>Mengirimkan informasi promosi (dengan persetujuan Anda)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">3. Perlindungan Data</h2>
            <p>Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang tepat untuk melindungi data pribadi Anda dari akses tidak sah, perubahan, pengungkapan, atau perusakan.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">4. Pengungkapan kepada Pihak Ketiga</h2>
            <p>Kami tidak menjual, menukar, atau mentransfer informasi pribadi Anda kepada pihak ketiga tanpa persetujuan Anda, kecuali diwajibkan oleh hukum.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">5. Cookie</h2>
            <p>Website kami menggunakan cookie untuk meningkatkan pengalaman browsing. Anda dapat mengontrol penggunaan cookie melalui pengaturan browser Anda.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">6. Hak Anda</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Mengakses data pribadi yang kami simpan</li>
              <li>Memperbaiki data yang tidak akurat</li>
              <li>Menghapus data pribadi Anda</li>
              <li>Menolak pemrosesan data untuk tujuan pemasaran</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">7. Perubahan Kebijakan</h2>
            <p>Kebijakan privasi ini dapat diperbarui dari waktu ke waktu. Perubahan akan diinformasikan melalui website kami.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">8. Kontak</h2>
            <p>Jika Anda memiliki pertanyaan tentang kebijakan privasi ini, silakan hubungi kami melalui halaman Kontak.</p>
          </section>

          <p className="text-sm text-zinc-400 pt-4 border-t border-zinc-200">Terakhir diperbarui: Juli 2026</p>
        </div>
      </div>
    </div>
  )
}
