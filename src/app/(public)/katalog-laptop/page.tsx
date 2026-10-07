"use client"

import { useState, useEffect } from "react"
import { Search, Laptop, ShieldCheck, Phone, CheckCircle, Copy, X, Check, MapPin, ShieldAlert, Award, Sparkles, ExternalLink, ArrowRight, User } from "lucide-react"

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

interface ProductItem {
  id: string
  title: string
  slug?: string
  category: "laptop" | "digital" | "budget" | string
  badge: string
  badgeColor?: string
  stockStatus?: "READY" | "SOLD_OUT" | "HIDDEN"
  priceText: string
  rawPriceText: string
  image: string
  shortDesc: string
  specs: string[]
  conditionNote?: string
  warranty?: string
  bonus: string
}

interface BankAccount {
  id: string
  bank: string
  account_number: string
  beneficiary: string
}

const DEFAULT_BANKS: BankAccount[] = [
  { id: "b1", bank: "BANK BSI", account_number: "7368300677", beneficiary: "Muhammad Aghisna" },
  { id: "b2", bank: "BANK SEABANK", account_number: "901007430064", beneficiary: "Muhammad Aghisna" }
]

const DEFAULT_PRODUCTS: ProductItem[] = [
  {
    id: "prod-1",
    title: "Lenovo ThinkPad T480 Core i5 Gen 8",
    slug: "lenovo-thinkpad-t480-core-i5",
    category: "laptop",
    badge: "Paling Laris",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    stockStatus: "READY",
    priceText: "Rp 3.450.000",
    rawPriceText: "Rp 3.450.000 (Varian SSD 256GB / 512GB)",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80",
    shortDesc: "Laptop tangguh standar militer dengan keyboard super nyaman. Cocok untuk kerja kantor, skripsi, dan olah data bisnis.",
    specs: [
      "Prosesor: Intel Core i5-8350U (Gen 8 Quad Core)",
      "RAM: 8GB / 16GB DDR4 High Speed",
      "Penyimpanan: 256GB / 512GB SSD NVMe",
      "Layar: 14.0 inch Full HD Anti-Glare Jernih",
      "Baterai: Awet 2-4 Jam (Dual Battery Support)"
    ],
    conditionNote: "Grade A Mulus 90-95%, Baterai Awet 2-4 jam",
    warranty: "Garansi Toko 60 Hari",
    bonus: "Unit Laptop, Charger Original Type-C, Bonus Tas Baru & Mouse Wireless."
  },
  {
    id: "prod-2",
    title: "Lisensi Windows 11 Pro & Office 2021",
    slug: "lisensi-windows-11-pro-office-2021",
    category: "digital",
    badge: "Produk Digital",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
    stockStatus: "READY",
    priceText: "Rp 400.000",
    rawPriceText: "Rp 400.000 (Aktivasi Permanen Seumur Hidup)",
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&auto=format&fit=crop&q=80",
    shortDesc: "Paket lisensi resmi original untuk PC / Laptop. Tinggal pasang, tanpa crack, bebas update selamanya, aman dari virus.",
    specs: [
      "Tipe Lisensi: Windows 11 Pro Retail + Office 2021 Pro Plus",
      "Masa Aktif: Lifetime (Permanen Seumur Hidup)",
      "Pengiriman: Key resmi dikirim langsung via WhatsApp / Email",
      "Bebas Update: Terkoneksi langsung ke server resmi"
    ],
    conditionNote: "100% Produk Digital Resmi Baru",
    warranty: "Garansi 100% Ganti Baru Jika Gagal Aktivasi",
    bonus: "Buku panduan bergambar cara pasang, link download resmi, dan dibantu sampai tuntas via WA."
  },
  {
    id: "prod-3",
    title: "Dell Latitude 7490 Ultrabook Slim",
    slug: "dell-latitude-7490-ultrabook-slim",
    category: "laptop",
    badge: "Ready Stock",
    badgeColor: "bg-teal-100 text-teal-800 border-teal-300",
    stockStatus: "READY",
    priceText: "Rp 3.800.000",
    rawPriceText: "Rp 3.800.000",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80",
    shortDesc: "Bodi tipis dan ringan dengan serat karbon. Sangat nyaman dibawa bepergian, baterai awet dengan layar jernih.",
    specs: [
      "Prosesor: Intel Core i7-8650U Kecepatan hingga 4.2GHz",
      "RAM: 16GB DDR4 Lancar Multitasking",
      "Penyimpanan: 512GB SSD NVMe Cepat",
      "Layar: 14.0 inch Full HD Bezel Tipis"
    ],
    conditionNote: "Grade A Mulus 93-95%",
    warranty: "Garansi Toko 30 Hari",
    bonus: "Tas selempang Dell, Charger Original, Mouse Optik, & Garansi Toko."
  }
]

export default function CatalogLaptopStorePage() {
  const [products, setProducts] = useState<ProductItem[]>(DEFAULT_PRODUCTS)
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>(DEFAULT_BANKS)
  const [waPhone, setWaPhone] = useState("0852-1770-6587")
  const [siteName, setSiteName] = useState("Mughis Laptop Store")
  const [ownerName, setOwnerName] = useState("Muhammad Aghisna")
  const [address, setAddress] = useState("Sangso, Samalanga, Bireuen, Aceh")
  const [heroHeadline, setHeroHeadline] = useState("Laptop Business Bekas Berkualitas, Siap Kerja & Siap Kuliah")
  const [heroSubheadline, setHeroSubheadline] = useState("Unit pilihan yang diperiksa sebelum dijual, dengan kondisi dijelaskan secara transparan, garansi toko sesuai ketentuan, dan konsultasi langsung melalui WhatsApp.")
  const [igHighlight, setIgHighlight] = useState("https://www.instagram.com/s/aGlnaGxpZ2h0OjE3OTI1ODg4MzI2NzYwNDM2?story_media_id=3106266946206908221&stkn=MWpwam1nMm13eDlwcg==")

  const [currentCategory, setCurrentCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null)
  const [toastMsg, setToastMsg] = useState("")

  useEffect(() => {
    fetch("/api/public/settings")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          if (data.site_name) setSiteName(data.site_name)
          if (data.owner_name) setOwnerName(data.owner_name)
          if (data.address) setAddress(data.address)
          if (data.contact_phone) setWaPhone(data.contact_phone)
          if (data.hero_headline) setHeroHeadline(data.hero_headline)
          if (data.hero_subheadline) setHeroSubheadline(data.hero_subheadline)
          if (data.instagram_url) setIgHighlight(data.instagram_url)

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

  const activeProducts = products.filter((p) => p.stockStatus !== "HIDDEN")

  const filteredProducts = activeProducts.filter((p) => {
    const matchCat =
      currentCategory === "all" ||
      p.category === currentCategory ||
      (currentCategory === "budget" && (p.category === "budget" || p.badge.includes("Hemat") || p.priceText.includes("1.8") || p.priceText.includes("400")))

    const q = searchQuery.toLowerCase()
    const matchSearch =
      p.title.toLowerCase().includes(q) ||
      p.shortDesc.toLowerCase().includes(q) ||
      p.priceText.toLowerCase().includes(q)

    return matchCat && matchSearch
  })

  const formattedWa = waPhone.replace(/[^0-9]/g, "").replace(/^0/, "62")

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">

      {/* Top Announcement Fraud Alert */}
      <div className="bg-gradient-to-r from-amber-600 via-rose-600 to-amber-600 text-white text-xs sm:text-sm py-2.5 px-4 text-center font-bold tracking-wide shadow-md">
        ⚠️ <strong>PERINGATAN RESMI WASPADA PENIPUAN:</strong> Pembayaran HANYA dikirim ke rekening resmi a/n <u>{ownerName}</u> (BSI / SeaBank). WA Resmi: <u>{waPhone}</u>!
      </div>

      {/* Header Navigation */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Laptop className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white block leading-tight">
                {siteName}
              </span>
              <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-emerald-400" />
                {address}
              </span>
            </div>
          </a>

          <div className="flex items-center gap-3">
            <a
              href={igHighlight}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-pink-950/60 hover:bg-pink-900/60 border border-pink-700/50 text-pink-300 font-bold text-xs transition"
            >
              <InstagramIcon className="w-4 h-4 text-pink-400" />
              <span>Testimoni Buyer IG</span>
            </a>

            <a
              href={`https://wa.me/${formattedWa}?text=${encodeURIComponent("Halo Mughis Laptop Store, saya mau konsultasi stok laptop/produk digital.")}`}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition transform hover:-translate-y-0.5"
            >
              <Phone className="w-4 h-4" />
              <span>CS WhatsApp ({waPhone})</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Showroom Banner */}
      <section className="relative pt-12 pb-16 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs sm:text-sm font-extrabold uppercase tracking-wider">
            <Award className="w-4 h-4 text-emerald-400" />
            Official Store • Owner: {ownerName} • {address}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            {heroHeadline}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
            {heroSubheadline}
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto shadow-2xl rounded-2xl pt-2">
            <Search className="w-6 h-6 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari ThinkPad, EliteBook, Latitude, RAM 16GB, SSD 512GB..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-base sm:text-lg font-bold rounded-2xl border-2 border-slate-700 focus:border-emerald-500 focus:outline-none bg-slate-900 text-white placeholder:text-slate-500 font-medium"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold pt-2">
            <button
              onClick={() => setCurrentCategory("all")}
              className={`px-5 py-2.5 rounded-xl border transition ${currentCategory === "all" ? "bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-600/20" : "bg-slate-900 border-slate-800 text-slate-300 hover:border-emerald-600"}`}
            >
              🔥 Semua Unit & Digital
            </button>
            <button
              onClick={() => setCurrentCategory("laptop")}
              className={`px-5 py-2.5 rounded-xl border transition ${currentCategory === "laptop" ? "bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-600/20" : "bg-slate-900 border-slate-800 text-slate-300 hover:border-emerald-600"}`}
            >
              💻 Laptop Business
            </button>
            <button
              onClick={() => setCurrentCategory("digital")}
              className={`px-5 py-2.5 rounded-xl border transition ${currentCategory === "digital" ? "bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-600/20" : "bg-slate-900 border-slate-800 text-slate-300 hover:border-emerald-600"}`}
            >
              🔑 Produk Digital & Lisensi
            </button>
            <button
              onClick={() => setCurrentCategory("budget")}
              className={`px-5 py-2.5 rounded-xl border transition ${currentCategory === "budget" ? "bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-600/20" : "bg-slate-900 border-slate-800 text-slate-300 hover:border-emerald-600"}`}
            >
              🏷️ Pilihan Hemat (&lt; 3 Jt)
            </button>
          </div>
        </div>
      </section>

      {/* Fraud Warning Callout Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="bg-gradient-to-r from-slate-900 via-amber-950/60 to-slate-900 border-2 border-amber-500/50 p-5 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-8 h-8 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-extrabold text-amber-300 uppercase tracking-wider">HIMBAUAN KEAMANAN TRANSAKSI OWNER ({ownerName.toUpperCase()})</p>
              <p className="text-slate-300 mt-0.5">
                Pastikan transfer pembayaran Anda <strong>HANYA</strong> dikirimkan ke rekening Bank BSI atau SeaBank atas nama <strong>{ownerName}</strong>. Kami tidak bertanggung jawab atas transaksi di luar rekening resmi ini.
              </p>
            </div>
          </div>

          <a
            href={igHighlight}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs flex items-center gap-2 shrink-0 shadow-lg"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>Cek Bukti Testimoni IG</span>
          </a>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 pb-4 border-b border-slate-800 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Daftar Unit & Produk Ready Stock</h2>
            <p className="text-sm text-slate-400 font-medium">Klik pada produk untuk melihat rincian spesifikasi lengkap & garansi toko</p>
          </div>
          <div className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-4 py-2 rounded-xl border border-emerald-800/60 self-start sm:self-auto">
            100% Lolos QC & Siap Pakai
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-slate-900 rounded-3xl border-2 border-dashed border-slate-800 space-y-2">
            <p className="text-lg font-bold text-slate-200">Produk tidak ditemukan</p>
            <p className="text-xs text-slate-400">Coba kata kunci pencarian lain atau hubungi CS kami.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((p) => {
              const waMsg = encodeURIComponent(`Assalamu’alaikum ${siteName},\n\nSaya tertarik dengan unit:\n*${p.title}*\nHarga: ${p.priceText}\n\nApakah unit masih tersedia? Mohon informasi kondisi dan garansinya.`)
              const waUrl = `https://wa.me/${formattedWa}?text=${waMsg}`

              return (
                <div key={p.id} className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between shadow-xl hover:border-emerald-500/50 transition-all duration-300 group">
                  <div>
                    <div className="relative h-52 w-full bg-slate-800 overflow-hidden">
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-950/90 text-emerald-300 border border-emerald-700/80 shadow-md">
                        {p.badge}
                      </span>
                      {p.stockStatus === "SOLD_OUT" && (
                        <span className="absolute top-3 right-3 px-3 py-1 rounded-md text-xs font-black uppercase bg-rose-600 text-white shadow-md">
                          SOLD OUT
                        </span>
                      )}
                    </div>

                    <div className="p-6 space-y-3">
                      <h3 className="text-xl font-black text-white leading-snug line-clamp-1">{p.title}</h3>

                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                        <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider">Harga Penawaran</span>
                        <span className="text-2xl font-black text-emerald-400">{p.priceText}</span>
                      </div>

                      <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed font-normal">{p.shortDesc}</p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setSelectedProduct(p)}
                      className="w-full py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-extrabold flex items-center justify-center gap-1.5 transition"
                    >
                      <span>Lihat Spek</span>
                    </button>

                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black flex items-center justify-center gap-1.5 transition shadow-lg shadow-emerald-600/30"
                    >
                      <span>Tanya di WA</span>
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* Bank Accounts Info Section */}
      <section className="py-16 bg-slate-900 border-t border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest border border-emerald-500/30">
              Rekening Resmi Owner ({ownerName})
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Informasi Rekening Pembayaran Resmi</h2>
            <p className="text-slate-400 text-sm sm:text-base font-normal">
              Pastikan transfer Anda dikirimkan sesuai dengan nama rekening resmi pemilik toko di bawah ini:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {bankAccounts.map((b) => (
              <div key={b.id} className="p-6 rounded-2xl bg-slate-950 border-2 border-emerald-600/40 space-y-3 relative shadow-2xl">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-black text-emerald-400 tracking-wider">{b.bank}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Rekening Resmi
                  </span>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Nomor Rekening:</p>
                  <p className="text-3xl font-black font-mono tracking-widest text-white mt-1">{b.account_number}</p>
                </div>
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Atas Nama / Owner:</p>
                    <p className="text-base font-black text-amber-300">{b.beneficiary}</p>
                  </div>
                  <button
                    onClick={() => copyText(b.account_number, b.bank)}
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-lg shadow-emerald-600/30"
                  >
                    <Copy className="w-4 h-4" />
                    <span>Salin No. Rekening</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs">
          <div className="space-y-1.5 text-center md:text-left">
            <p className="text-base font-black text-white">{siteName.toUpperCase()}</p>
            <p className="text-slate-400">Owner: {ownerName} • Alamat: {address}</p>
            <p className="text-slate-500">© 2026 {siteName}. A unit business of PT Mughis Cipta Media. Hak Cipta Dilindungi.</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 font-bold text-sm">
            <a href={igHighlight} target="_blank" rel="noreferrer" className="text-pink-400 hover:underline flex items-center gap-1.5">
              <InstagramIcon className="w-4 h-4" />
              <span>Highlight Testimoni IG</span>
            </a>
            <a href={`https://wa.me/${formattedWa}`} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline flex items-center gap-1.5">
              <Phone className="w-4 h-4" />
              <span>WhatsApp CS ({waPhone})</span>
            </a>
          </div>
        </div>
      </footer>

      {/* Modal Detail */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 max-w-xl w-full rounded-2xl overflow-hidden shadow-2xl p-6 space-y-4 text-white relative">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-700 uppercase">
                {selectedProduct.badge}
              </span>
              <h3 className="text-xl font-black text-white">{selectedProduct.title}</h3>
              <p className="text-3xl font-black text-emerald-400">{selectedProduct.rawPriceText || selectedProduct.priceText}</p>

              <div className="w-full h-48 rounded-xl overflow-hidden bg-slate-800">
                <img src={selectedProduct.image} alt={selectedProduct.title} className="w-full h-full object-cover" />
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <p className="font-extrabold text-emerald-400 uppercase">Spesifikasi Lengkap & Kondisi:</p>
                <ul className="space-y-1.5 font-medium text-slate-300">
                  {selectedProduct.specs.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {selectedProduct.conditionNote && (
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                  <span className="font-bold text-amber-300 block">Kondisi Unit:</span>
                  <span className="text-slate-300">{selectedProduct.conditionNote}</span>
                </div>
              )}

              {selectedProduct.warranty && (
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                  <span className="font-bold text-emerald-400 block">Masa Garansi Toko:</span>
                  <span className="text-slate-300">{selectedProduct.warranty}</span>
                </div>
              )}

              <p className="text-xs text-slate-400 leading-relaxed font-medium">{selectedProduct.shortDesc}</p>

              <a
                href={`https://wa.me/${formattedWa}?text=${encodeURIComponent(`Assalamu’alaikum ${siteName},\n\nSaya tertarik dengan unit:\n*${selectedProduct.title}*\nHarga: ${selectedProduct.priceText}\n\nApakah unit masih tersedia? Mohon informasi kondisi dan garansinya.`)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30"
              >
                <Phone className="w-4 h-4" />
                <span>Lanjutkan Pesanan via WhatsApp CS</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 px-6 py-3.5 rounded-full bg-slate-900 border border-emerald-500/50 text-white shadow-2xl flex items-center gap-2 text-xs font-bold">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  )
}
