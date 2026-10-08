"use client"

import { useState, useEffect } from "react"
import { Search, Laptop, ShieldCheck, Phone, CheckCircle, Copy, X, Check, Award, ExternalLink, ArrowRight } from "lucide-react"

interface ProductItem {
  id: string
  title: string
  category: "laptop" | "digital" | "budget" | string
  badge: string
  badgeColor?: string
  priceText: string
  rawPriceText: string
  image: string
  shortDesc: string
  specs: string[]
  bonus: string
}

interface BankAccount {
  id: string
  bank: string
  account_number: string
  beneficiary: string
}

const DEFAULT_BANKS: BankAccount[] = [
  { id: "b1", bank: "BANK BCA", account_number: "882091823341", beneficiary: "MUGHIS CIPTA MEDIA" },
  { id: "b2", bank: "BANK MANDIRI", account_number: "1370029384721", beneficiary: "MUGHIS CIPTA MEDIA" },
  { id: "b3", bank: "BANK BRI", account_number: "034101002849532", beneficiary: "MUGHIS CIPTA MEDIA" }
]

const DEFAULT_PRODUCTS: ProductItem[] = [
  {
    id: "prod-1",
    title: "Lenovo ThinkPad T480 Core i5",
    category: "laptop",
    badge: "Paling Laris",
    badgeColor: "bg-teal-100 text-teal-800 border-teal-300",
    priceText: "Harga Mulai Rp3.450.000",
    rawPriceText: "Mulai Rp3.450.000 (Tergantung varian RAM & SSD)",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80",
    shortDesc: "Laptop tangguh standar militer dengan keyboard sangat nyaman. Cocok sekali untuk kerja kantor, skripsi, maupun olah data bisnis.",
    specs: [
      "Prosesor: Intel Core i5-8350U Gen 8 (Cepat & Irit Daya)",
      "RAM: 8GB / 16GB DDR4 (Bisa di-upgrade)",
      "Penyimpanan: 256GB / 512GB SSD Fast Boot",
      "Layar: 14.0 inch Full HD Anti-Silau (Nyaman di mata)",
      "Kondisi: 90-95% Sangat Mulus, baterai awet 2-4 jam",
      "Garansi: 60 Hari Toko Resmi"
    ],
    bonus: "Unit Laptop, Charger Original Type-C, Bonus Tas Baru & Mouse Wireless."
  },
  {
    id: "prod-2",
    title: "Lisensi Windows 11 & Office Pro Plus",
    category: "digital",
    badge: "Produk Digital",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
    priceText: "Harga Mulai Rp400.000",
    rawPriceText: "Mulai Rp400.000 (Aktivasi Permanen Seumur Hidup)",
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&auto=format&fit=crop&q=80",
    shortDesc: "Paket lisensi resmi original untuk PC / Laptop. Tinggal pasang, tanpa crack, bebas update selamanya, aman dari virus.",
    specs: [
      "Tipe Lisensi: Windows 11 Pro Retail + Office 2021 Pro Plus",
      "Masa Aktif: Lifetime (Permanen Seumur Hidup)",
      "Pengiriman: Key resmi dikirim langsung via WhatsApp / Email",
      "Bebas Update: Terkoneksi langsung ke server resmi",
      "Garansi: 100% Ganti Baru jika gagal aktivasi"
    ],
    bonus: "Buku panduan bergambar cara pasang, link download resmi, dan dibantu sampai tuntas via WA."
  },
  {
    id: "prod-3",
    title: "Dell Latitude 7490 Ultrabook Slim",
    category: "laptop",
    badge: "Ready Stock",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    priceText: "Harga Mulai Rp3.800.000",
    rawPriceText: "Mulai Rp3.800.000",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80",
    shortDesc: "Bodi tipis dan ringan dengan serat karbon. Sangat nyaman dibawa bepergian, baterai awet dengan layar jernih.",
    specs: [
      "Prosesor: Intel Core i7-8650U Kecepatan hingga 4.2GHz",
      "RAM: 16GB DDR4 Lancar Multitasking",
      "Penyimpanan: 512GB SSD NVMe Cepat",
      "Layar: 14.0 inch Full HD Bezel Tipis",
      "Fitur: Keyboard dengan Lampu Menyala (Backlit)"
    ],
    bonus: "Tas selempang Dell, Charger Original, Mouse Optik, & Garansi Toko."
  },
  {
    id: "prod-4",
    title: "Paket Software Desain & Grafis Siap Pakai",
    category: "digital",
    badge: "Terlaris Digital",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-300",
    priceText: "Harga Mulai Rp450.000",
    rawPriceText: "Mulai Rp450.000 (Paket Komplit)",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    shortDesc: "Aplikasi lengkap untuk desain logo, edit foto, video konten hingga 3D. Mudah diinstal dengan panduan bahasa Indonesia.",
    specs: [
      "Kompatibel: Windows 10/11 & macOS",
      "Metode: Single Installer tinggal klik langsung jadi",
      "Keamanan: Sudah dites bersih bebas malware",
      "Akses: Cloud Drive High-Speed seumur hidup"
    ],
    bonus: "Bonus ribuan font keren, template desain siap edit, & preset warna video."
  },
  {
    id: "prod-5",
    title: "HP EliteBook 840 G5 Bodi Aluminium",
    category: "laptop",
    badge: "Tampilan Mewah",
    badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-300",
    priceText: "Harga Mulai Rp4.150.000",
    rawPriceText: "Mulai Rp4.150.000",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80",
    shortDesc: "Desain metal silver elegan standar eksekutif kantor dengan audio jernih premium Bang & Olufsen.",
    specs: [
      "Prosesor: Intel Core i5-8250U / Core i7",
      "RAM: 8GB / 16GB DDR4",
      "Penyimpanan: 256GB / 512GB SSD",
      "Speaker: Audio Jernih Bang & Olufsen"
    ],
    bonus: "Charger original HP, tas ransel laptop empuk, mouse wireless & garansi."
  },
  {
    id: "prod-6",
    title: "Netbook Ringkas Pelajar & Kasir Toko",
    category: "budget",
    badge: "Super Hemat",
    badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
    priceText: "Harga Mulai Rp1.850.000",
    rawPriceText: "Mulai Rp1.850.000 (Stok Terbatas)",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80",
    shortDesc: "Laptop hemat biaya untuk kebutuhan ketik Word, Excel, kasir minimarket, dan anak sekolah belajar online.",
    specs: [
      "Prosesor: Intel Celeron / Pentium Quad-Core",
      "RAM: 4GB / 8GB Irit Daya",
      "Penyimpanan: SSD 128GB / 256GB",
      "Layar: 11.6 - 13.3 inch Enteng & Ringkas"
    ],
    bonus: "Sudah terisi Windows & Office siap langsung digunakan, tinggal pakai!"
  }
]

export default function CatalogLaptopDigitalPage() {
  const [products, setProducts] = useState<ProductItem[]>(DEFAULT_PRODUCTS)
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>(DEFAULT_BANKS)
  const [waPhone, setWaPhone] = useState("6281234567890")
  const [brandName, setBrandName] = useState("PT Mughis Cipta Media")
  const [brandTagline, setBrandTagline] = useState("Pusat Laptop & Produk Digital Terpercaya")

  const [currentCategory, setCurrentCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null)
  const [toastMsg, setToastMsg] = useState("")

  useEffect(() => {
    fetch("/api/public/settings")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          if (data.site_name) setBrandName(data.site_name)
          if (data.company_tagline) setBrandTagline(data.company_tagline)
          if (data.contact_phone) setWaPhone(data.contact_phone)

          if (data.bank_accounts_json) {
            try { setBankAccounts(JSON.parse(data.bank_accounts_json)) } catch {}
          }
          if (data.catalog_products_json) {
            try { setProducts(JSON.parse(data.catalog_products_json)) } catch {}
          }
        }
      })
      .catch(() => {})
  }, [])

  function copyText(text: string, bankName: string) {
    navigator.clipboard.writeText(text).then(() => {
      setToastMsg(`Nomor Rekening ${bankName} (${text}) berhasil disalin!`)
      setTimeout(() => setToastMsg(""), 3000)
    })
  }

  const filteredProducts = products.filter((p) => {
    const matchCat =
      currentCategory === "all" ||
      p.category === currentCategory ||
      (currentCategory === "budget" && (p.category === "budget" || p.badge.includes("Hemat") || p.priceText.includes("400")))

    const q = searchQuery.toLowerCase()
    const matchSearch =
      p.title.toLowerCase().includes(q) ||
      p.shortDesc.toLowerCase().includes(q) ||
      p.priceText.toLowerCase().includes(q)

    return matchCat && matchSearch
  })

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white text-xs sm:text-sm py-2.5 px-4 text-center font-semibold">
        ✨ <strong>Tips Belanja Aman:</strong> Pastikan hanya bertransaksi ke rekening resmi atas nama <strong>{brandName}</strong>. Layanan tanya jawab via WhatsApp aktif setiap hari!
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-teal-600 flex items-center justify-center text-white font-extrabold text-xl shadow-md shadow-teal-600/30">
              <Laptop className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 block leading-tight">
                {brandName}
              </span>
              <span className="text-xs tracking-wider text-teal-700 uppercase font-extrabold block">
                {brandTagline}
              </span>
            </div>
          </a>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${waPhone}?text=${encodeURIComponent("Halo Admin, saya ingin bertanya mengenai katalog laptop dan produk digital.")}`}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-emerald-600/20 transition"
            >
              <Phone className="w-4 h-4" />
              <span>Chat Admin WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-12 pb-16 bg-gradient-to-b from-teal-50/70 via-white to-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-100 border border-teal-300 text-teal-800 text-xs sm:text-sm font-extrabold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            Unit Lolos QC • Garansi Jelas • Pengiriman Aman
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Koleksi Laptop Pilihan & <span className="text-teal-600 underline underline-offset-8">Produk Digital</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Dapatkan laptop bisnis berkualitas tinggi, lisensi software resmi seumur hidup, dan paket hemat kerja dengan harga jujur, unit bergaransi, dan layanan pesan siap antar.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto shadow-lg rounded-2xl">
            <Search className="w-6 h-6 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari laptop (ThinkPad, ASUS, HP, Dell), RAM, atau produk digital..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-base sm:text-lg font-bold rounded-2xl border-2 border-slate-300 focus:border-teal-600 focus:outline-none bg-white text-slate-900 placeholder:text-slate-400 font-medium"
            />
          </div>

          {/* Filter Categories */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold pt-2">
            <button
              onClick={() => setCurrentCategory("all")}
              className={`px-5 py-2.5 rounded-xl border-2 transition ${currentCategory === "all" ? "bg-teal-600 border-teal-600 text-white shadow-sm" : "bg-white border-slate-200 text-slate-700 hover:border-teal-600"}`}
            >
              🔥 Semua Produk
            </button>
            <button
              onClick={() => setCurrentCategory("laptop")}
              className={`px-5 py-2.5 rounded-xl border-2 transition ${currentCategory === "laptop" ? "bg-teal-600 border-teal-600 text-white shadow-sm" : "bg-white border-slate-200 text-slate-700 hover:border-teal-600"}`}
            >
              💻 Laptop Business
            </button>
            <button
              onClick={() => setCurrentCategory("digital")}
              className={`px-5 py-2.5 rounded-xl border-2 transition ${currentCategory === "digital" ? "bg-teal-600 border-teal-600 text-white shadow-sm" : "bg-white border-slate-200 text-slate-700 hover:border-teal-600"}`}
            >
              🔑 Produk Digital & Lisensi
            </button>
            <button
              onClick={() => setCurrentCategory("budget")}
              className={`px-5 py-2.5 rounded-xl border-2 transition ${currentCategory === "budget" ? "bg-teal-600 border-teal-600 text-white shadow-sm" : "bg-white border-slate-200 text-slate-700 hover:border-teal-600"}`}
            >
              🏷️ Pilihan Hemat (&lt; 3 Jt)
            </button>
          </div>
        </div>
      </section>

      {/* Catalog Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 pb-4 border-b border-slate-200 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Katalog Unit & Produk Ready</h2>
            <p className="text-sm text-slate-500 font-medium">Klik pada produk untuk melihat rincian spesifikasi lengkap & garansi</p>
          </div>
          <div className="text-xs font-bold text-slate-600 bg-white px-4 py-2 rounded-xl border border-slate-200">
            Unit Dites Lolos QC Sebelum Dikirim
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-slate-200 space-y-2">
            <p className="text-lg font-bold text-slate-800">Produk tidak ditemukan</p>
            <p className="text-xs text-slate-500">Coba ubah kata kunci pencarian Anda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-6 w-full">
            {filteredProducts.map((p) => {
              const waMsg = encodeURIComponent(`Halo Admin, saya tertarik dengan produk "${p.title}" (${p.priceText}). Mohon info stok.`)
              const waUrl = `https://wa.me/${waPhone}?text=${waMsg}`

              return (
                <div key={p.id} className="min-w-0 w-full max-w-full bg-white rounded-xl sm:rounded-2xl border sm:border-2 border-slate-200 overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-200 group">
                  <div>
                    <div className="relative aspect-[16/10] sm:aspect-[4/5] w-full bg-slate-100 overflow-hidden">
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <span className="absolute top-1 left-1 sm:top-3 sm:left-3 px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-xs font-black uppercase tracking-wider bg-teal-100/90 text-teal-800 border border-teal-300 shadow-xs backdrop-blur-xs">
                        {p.badge}
                      </span>
                    </div>

                    <div className="p-1.5 sm:p-5 space-y-1 sm:space-y-3">
                      <h3 className="text-[11px] sm:text-lg font-bold sm:font-black text-slate-900 leading-tight sm:leading-snug line-clamp-2">{p.title}</h3>

                      <div className="p-1 sm:p-3 rounded-md sm:rounded-xl bg-teal-50 border border-teal-200">
                        <span className="text-[8px] sm:text-xs text-slate-500 font-bold block uppercase tracking-wider hidden sm:block">Penawaran Spesial</span>
                        <span className="text-[11px] sm:text-2xl font-black text-teal-800">{p.priceText}</span>
                      </div>

                      <p className="text-[10px] sm:text-sm text-slate-600 line-clamp-2 leading-relaxed font-normal hidden sm:block">{p.shortDesc}</p>
                    </div>
                  </div>

                  <div className="p-1.5 sm:p-5 pt-0 grid grid-cols-2 gap-1 sm:gap-3">
                    <button
                      onClick={() => setSelectedProduct(p)}
                      className="w-full py-1 sm:py-3.5 rounded-md sm:rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 text-[9px] sm:text-xs font-extrabold flex items-center justify-center gap-0.5 transition"
                    >
                      <span>Spek</span>
                    </button>

                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-1 sm:py-3.5 rounded-md sm:rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[9px] sm:text-xs font-black flex items-center justify-center gap-0.5 transition shadow-md shadow-emerald-600/20 active:scale-95"
                    >
                      <span>Tanya WA</span>
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* Official Bank Accounts Section */}
      <section className="py-16 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest border border-emerald-500/30">
              Keamanan Transaksi Pembeli
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Informasi Legalitas & Rekening Pembayaran Resmi</h2>
            <p className="text-slate-300 text-sm sm:text-base font-normal">
              Waspada terhadap penipuan! Pastikan transfer pembayaran Anda HANYA ditujukan ke rekening atas nama PT resmi perusahaan kami.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bankAccounts.map((b) => (
              <div key={b.id} className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3 relative shadow-xl hover:border-emerald-500/50 transition">
                <div className="flex items-center justify-between">
                  <span className="text-base font-extrabold text-emerald-400 tracking-wider">{b.bank}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Rekening Resmi
                  </span>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Nomor Rekening:</p>
                  <p className="text-2xl font-black font-mono tracking-widest text-white mt-0.5">{b.account_number}</p>
                </div>
                <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Atas Nama / Beneficiary:</p>
                    <p className="text-sm font-extrabold text-slate-200">{b.beneficiary}</p>
                  </div>
                  <button
                    onClick={() => copyText(b.account_number, b.bank)}
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-lg shadow-emerald-600/30"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
          <div className="bg-white border border-slate-300 max-w-xl w-full rounded-2xl overflow-hidden shadow-2xl p-6 space-y-4 text-slate-900 relative">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 text-lg">
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-800 border border-teal-200 uppercase">
                {selectedProduct.badge}
              </span>
              <h3 className="text-xl font-extrabold text-slate-900">{selectedProduct.title}</h3>
              <p className="text-2xl font-black text-teal-700">{selectedProduct.rawPriceText || selectedProduct.priceText}</p>

              <div className="w-full h-48 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                <img src={selectedProduct.image} alt={selectedProduct.title} className="w-full h-full object-cover" />
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <p className="font-extrabold text-slate-900 uppercase">Spesifikasi & Detail:</p>
                <ul className="space-y-1.5 font-medium text-slate-700">
                  {selectedProduct.specs.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-xs text-slate-600 font-medium leading-relaxed">{selectedProduct.shortDesc}</p>

              <a
                href={`https://wa.me/${waPhone}?text=${encodeURIComponent(`Halo Admin, saya ingin memesan "${selectedProduct.title}" (${selectedProduct.priceText}). Mohon info ketersediaan stok.`)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20"
              >
                <Phone className="w-4 h-4" />
                <span>Pesan Sekarang via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full bg-slate-900 text-white shadow-2xl flex items-center gap-2 text-xs font-bold">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  )
}
