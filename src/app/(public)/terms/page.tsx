import { Scale } from "lucide-react"

export const metadata = { title: "Syarat & Ketentuan | Maktabah al-Mughis" }

export default function TermsPage() {
  return (
    <div className="flex-1 bg-zinc-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
            <Scale className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">Syarat & Ketentuan</h1>
            <p className="text-sm text-zinc-500">PT Mughis Cipta Media</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-zinc-200 p-8 space-y-6 text-zinc-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">1. Penerimaan Ketentuan</h2>
            <p>Dengan mengakses dan menggunakan website ini, Anda menyetujui untuk terikat oleh syarat dan ketentuan yang berlaku. Jika Anda tidak setuju dengan ketentuan ini, mohon untuk tidak menggunakan layanan kami.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">2. Layanan</h2>
            <p>PT Mughis Cipta Media menyediakan layanan penerbitan, percetakan, distribusi buku, dan media kreatif. Detail layanan akan diatur dalam kontrak terpisah antara perusahaan dan klien.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">3. Hak Kekayaan Intelektual</h2>
            <p>Seluruh konten yang terdapat di website ini, termasuk teks, gambar, logo, dan desain, dilindungi oleh hak cipta dan hak kekayaan intelektual lainnya. Dilarang menggunakan konten tanpa izin tertulis dari PT Mughis Cipta Media.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">4. Naskah dan Konten Pengguna</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Penulis menjamin bahwa naskah yang dikirimkan adalah karya asli dan tidak melanggar hak cipta pihak lain.</li>
              <li>Penulis bertanggung jawab penuh atas isi naskah.</li>
              <li>Kami berhak menolak naskah yang mengandung konten melanggar hukum, SARA, atau pornografi.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">5. Pembayaran</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Harga layanan sesuai dengan kesepakatan yang tercantum dalam kontrak/invoice.</li>
              <li>Pembayaran dilakukan sesuai termin yang disepakati.</li>
              <li>Keterlambatan pembayaran dapat mengakibatkan penundaan pengerjaan.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">6. Pengiriman dan Distribusi</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Waktu pengiriman terhitung sejak kontrak ditandatangani dan pembayaran diterima.</li>
              <li>Keterlambatan akibat force majeure di luar tanggung jawab kami.</li>
              <li>Biaya pengiriman buku ditanggung oleh pemesan sesuai kesepakatan.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">7. Pembatalan dan Pengembalian Dana</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Pembatalan pesanan dapat dilakukan dalam waktu 3 hari setelah pembayaran.</li>
              <li>Pengembalian dana akan diproses sesuai dengan tahap pengerjaan yang sudah dilakukan.</li>
              <li>Biaya yang sudah terpakai untuk proses produksi tidak dapat dikembalikan.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">8. Batasan Tanggung Jawab</h2>
            <p>PT Mughis Cipta Media tidak bertanggung jawab atas kerugian tidak langsung yang timbul dari penggunaan layanan kami, termasuk namun tidak terbatas pada kehilangan keuntungan atau data.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">9. Hukum yang Berlaku</h2>
            <p>Ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum Negara Kesatuan Republik Indonesia.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">10. Perubahan Ketentuan</h2>
            <p>Kami berhak mengubah syarat dan ketentuan ini sewaktu-waktu. Perubahan akan diumumkan melalui website kami.</p>
          </section>

          <p className="text-sm text-zinc-400 pt-4 border-t border-zinc-200">
            Terakhir diperbarui: Juli 2026
          </p>
        </div>
      </div>
    </div>
  )
}
