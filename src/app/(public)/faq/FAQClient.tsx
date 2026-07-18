"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Search, BookOpen, Printer, Truck, CreditCard, Users, HelpCircle } from "lucide-react"

const faqCategories = [
  {
    id: "umum",
    label: "Umum",
    icon: HelpCircle,
    items: [
      { q: "Apa itu PT Mughis Cipta Media?", a: "PT Mughis Cipta Media adalah perusahaan yang bergerak di bidang penerbitan, percetakan, distribusi buku, dan media kreatif. Kami berkomitmen menghadirkan karya berkualitas bagi dunia pendidikan, literasi, dan pengembangan sumber daya manusia." },
      { q: "Apa perbedaan Mughis Cipta Media dengan penerbit lain?", a: "Kami menawarkan layanan lengkap dari hulu ke hilir — mulai dari editing, layout, desain cover, penerbitan, percetakan, hingga distribusi. Kami juga memberikan pendampingan personal kepada setiap penulis." },
      { q: "Apakah perusahaan ini memiliki badan hukum resmi?", a: "Ya, PT Mughis Cipta Media adalah badan usaha resmi berbadan hukum Perseroan Terbatas dengan legalitas lengkap." },
    ],
  },
  {
    id: "penerbitan",
    label: "Penerbitan",
    icon: BookOpen,
    items: [
      { q: "Bagaimana cara menerbitkan buku di Maktabah al-Mughis?", a: "Anda bisa menghubungi kami melalui halaman Kontak atau mengirimkan naskah Anda. Tim kami akan melakukan review dan memberikan proposal penerbitan yang sesuai dengan kebutuhan Anda." },
      { q: "Berapa lama proses penerbitan buku?", a: "Proses penerbitan buku umumnya memakan waktu 2-4 bulan, tergantung pada kompleksitas naskah, kebutuhan editing, desain, dan proses produksi." },
      { q: "Apakah saya bisa self publishing?", a: "Tentu! Kami menyediakan layanan self publishing bagi penulis yang ingin mengontrol penuh proses kreatif dan distribusi buku mereka." },
      { q: "Apakah naskah saya akan diedit?", a: "Ya, setiap naskah yang masuk akan melalui proses editing profesional meliputi editing substansi, bahasa, dan proofreading untuk memastikan kualitas terbaik." },
    ],
  },
  {
    id: "percetakan",
    label: "Percetakan",
    icon: Printer,
    items: [
      { q: "Jenis cetakan apa saja yang bisa dilakukan?", a: "Kami melayani cetak buku, majalah, jurnal, modul, kalender, brosur, katalog, dan berbagai kebutuhan cetak lainnya." },
      { q: "Berapa minimal cetak buku?", a: "Minimal cetak buku adalah 50 eksemplar untuk sistem cetak digital, dan 200 eksemplar untuk cetak offset." },
      { q: "Apa perbedaan cetak digital dan offset?", a: "Cetak digital cocok untuk jumlah sedikit (50-200 eksemplar) dengan harga per buku lebih tinggi. Cetak offset cocok untuk jumlah besar (200+) dengan harga per buku lebih murah dan kualitas lebih konsisten." },
    ],
  },
  {
    id: "biaya",
    label: "Biaya & Pembayaran",
    icon: CreditCard,
    items: [
      { q: "Berapa biaya penerbitan buku?", a: "Biaya penerbitan bervariasi tergantung pada jumlah halaman, ukuran, jenis kertas, jumlah cetak, dan layanan tambahan yang dipilih. Hubungi kami untuk konsultasi gratis dan penawaran harga." },
      { q: "Apakah ada biaya tersembunyi?", a: "Tidak. Kami memberikan rincian biaya yang transparan sejak awal sehingga Anda bisa menyesuaikan dengan budget." },
      { q: "Metode pembayaran apa yang tersedia?", a: "Kami menerima pembayaran melalui transfer bank, dan berbagai metode pembayaran digital." },
    ],
  },
  {
    id: "distribusi",
    label: "Distribusi",
    icon: Truck,
    items: [
      { q: "Apakah buku saya akan didistribusikan secara nasional?", a: "Ya, kami memiliki jaringan distribusi yang mencakup berbagai kota di Indonesia. Buku Anda akan tersedia di toko buku, platform online, dan pameran." },
      { q: "Apakah buku saya akan memiliki ISBN?", a: "Ya, kami mengurus pengajuan ISBN Perpustakaan Nasional RI untuk setiap buku yang kami terbitkan." },
      { q: "Berapa lama pengurusan ISBN?", a: "Proses pengurusan ISBN umumnya memakan waktu 3-7 hari kerja setelah pengajuan." },
    ],
  },
  {
    id: "penulis",
    label: "Penulis",
    icon: Users,
    items: [
      { q: "Apakah penulis pemula bisa menerbitkan buku?", a: "Tentu! Kami sangat mendukung penulis pemula. Tim kami akan membimbing Anda dari awal hingga buku terbit." },
      { q: "Apakah saya mendapatkan royalti?", a: "Ya, sistem royalti berlaku bagi penulis yang menerbitkan melalui skema penerbitan mayor. Detail royalti akan dijelaskan dalam kontrak penerbitan." },
      { q: "Apakah naskah saya akan dilindungi hak ciptanya?", a: "Ya, kami menghormati hak cipta penulis. Seluruh naskah yang masuk akan dijaga kerahasiaannya dan hak cipta tetap milik penulis." },
    ],
  },
]

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("umum")
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [search, setSearch] = useState("")

  const currentCategory = faqCategories.find((c) => c.id === activeCategory)
  const allItems = faqCategories.flatMap((c) => c.items)

  const filteredItems = search
    ? allItems.filter((i) => i.q.toLowerCase().includes(search.toLowerCase()) || i.a.toLowerCase().includes(search.toLowerCase()))
    : currentCategory?.items || []

  return (
    <div className="flex-1 bg-zinc-50">
      <section className="relative py-20 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(16,185,129,0.1),transparent_50%)]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
          >
            FAQ
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 text-lg mb-8"
          >
            Pertanyaan yang sering diajukan
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative max-w-xl mx-auto"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari pertanyaan..."
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 backdrop-blur-xl"
            />
          </motion.div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!search && (
          <div className="flex flex-wrap gap-2 mb-8">
            {faqCategories.map((cat) => {
              const Icon = cat.icon
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeCategory === cat.id
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200"
                      : "bg-white text-zinc-600 border border-zinc-200 hover:border-emerald-200 hover:text-emerald-600"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.label}
                </button>
              )
            })}
          </div>
        )}

        <div className="space-y-3">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 text-zinc-400">
              <HelpCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Tidak ada hasil untuk pencarian Anda</p>
            </div>
          ) : (
            filteredItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="bg-white rounded-xl border border-zinc-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-zinc-50 transition-colors"
                >
                  <span className="font-medium text-zinc-900 pr-4">{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-zinc-400 shrink-0 transition-transform duration-200 ${
                      openIndex === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-zinc-500 leading-relaxed border-t border-zinc-100 pt-4">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </div>
      </section>
    </div>
  )
}
