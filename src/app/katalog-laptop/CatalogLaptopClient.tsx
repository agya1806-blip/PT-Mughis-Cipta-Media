"use client"

import { useState, useEffect } from "react"
import { Search, Laptop, ShieldCheck, Phone, CheckCircle, Copy, X, Check, MapPin, Award, Image as ImageIcon, Video as VideoIcon, ZoomIn, ZoomOut, RotateCcw, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

export interface ProductItem {
  id: string
  title: string
  category: "laptop" | "digital" | "budget" | string
  badge: string
  badgeColor?: string
  stockStatus?: "READY" | "SOLD_OUT" | "HIDDEN"
  priceText: string
  rawPriceText: string
  image: string
  images?: string[]
  video?: string
  shortDesc: string
  specs: string[]
  conditionNote?: string
  warranty?: string
  bonus: string
}

export interface BankAccount {
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
    id: "prod-x1-carbon",
    title: "Lenovo ThinkPad X1 Carbon Core i5 Gen 6",
    category: "laptop",
    badge: "Ultrabook Tipis",
    stockStatus: "READY",
    priceText: "Rp 3.750.000",
    rawPriceText: "Rp 3.750.000 (RAM 8GB / SSD 256GB)",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80"
    ],
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    shortDesc: "Ultrabook flagship bodi Carbon Fiber super ringan (~1.1 kg). Sangat mewah, slim, dan nyaman dibawa mobilitas tinggi.",
    specs: [
      "Prosesor: Intel Core i5-6200U / i5-6300U Gen 6",
      "RAM: 8GB LPDDR3 High Speed",
      "Penyimpanan: 256GB SSD High Speed",
      "Layar: 14.0 inch Full HD IPS Anti-Glare",
      "Fitur: Bodi Carbon Fiber, Keyboard Backlit Nyala"
    ],
    conditionNote: "Grade A Mulus 92-95%, Baterai Awet 2-4 Jam",
    warranty: "Garansi Toko 30 Hari",
    bonus: "Unit Laptop, Charger Original, Tas Laptop Baru & Mouse Wireless"
  },
  {
    id: "prod-t460",
    title: "Lenovo ThinkPad T460 Core i5 Gen 6",
    category: "laptop",
    badge: "Kerja Tangguh",
    stockStatus: "READY",
    priceText: "Rp 3.400.000",
    rawPriceText: "Rp 3.400.000 (RAM 8GB / SSD 256GB)",
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80"
    ],
    shortDesc: "Laptop standar korporat terkenal bandel, keyboard super empuk, dan konstruksi fisik sangat kokoh untuk kerja seharian.",
    specs: [
      "Prosesor: Intel Core i5-6200U / i5-6300U Gen 6",
      "RAM: 8GB DDR4 (Bisa di-upgrade)",
      "Penyimpanan: 256GB SSD Cepat",
      "Layar: 14.0 inch HD / Full HD",
      "Baterai: Dual Battery System Awet 2-4 Jam"
    ],
    conditionNote: "Grade A- Mulus 90%, Fungsi 100% Normal",
    warranty: "Garansi Toko 30 Hari",
    bonus: "Unit Laptop, Charger Original, Tas Laptop & Mouse"
  },
  {
    id: "prod-t470",
    title: "Lenovo ThinkPad T470 Core i5 Gen 6",
    category: "laptop",
    badge: "Best Seller",
    stockStatus: "READY",
    priceText: "Rp 3.500.000",
    rawPriceText: "Rp 3.500.000 (RAM 8GB / SSD 256GB)",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80"
    ],
    shortDesc: "Generasi penerus T460 dengan bodi lebih ringkas, port Type-C USB-C fast charge, dan performa mulus untuk olah data.",
    specs: [
      "Prosesor: Intel Core i5-6200U / i5-6300U Gen 6",
      "RAM: 8GB DDR4 (Upgradable)",
      "Penyimpanan: 256GB SSD Fast Boot",
      "Layar: 14.0 inch Anti-Glare Jernih",
      "Port: USB-C Type-C, HDMI, USB 3.0, LAN"
    ],
    conditionNote: "Grade A Mulus 92-95%, Baterai Awet 2-4 Jam",
    warranty: "Garansi Toko 30 Hari",
    bonus: "Unit Laptop, Charger Original Type-C, Tas Laptop Baru & Mouse"
  },
  {
    id: "prod-hp-430-g5",
    title: "HP ProBook 430 G5 Core i5 Gen 8",
    category: "laptop",
    badge: "Quad Core",
    stockStatus: "READY",
    priceText: "Rp 4.200.000",
    rawPriceText: "Rp 4.200.000 (Core i5 Gen 8 / RAM 8GB / SSD 256GB)",
    image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&auto=format&fit=crop&q=80"
    ],
    shortDesc: "Prosesor Intel Gen 8 Quad Core kencang dengan desain silver aluminium elegan. Cocok untuk multitasking berat, kerja & kuliah.",
    specs: [
      "Prosesor: Intel Core i5-8250U Gen 8 (Quad Core 8 Threads)",
      "RAM: 8GB DDR4 High Speed",
      "Penyimpanan: 256GB SSD NVMe Cepat",
      "Layar: 13.3 inch Full HD Compact Bezel",
      "Bodi: Silver Aluminium Modern Premium"
    ],
    conditionNote: "Grade A Mulus 93-95%, Baterai Awet 3-4 Jam",
    warranty: "Garansi Toko 30 Hari",
    bonus: "Unit Laptop, Charger Original HP, Tas Ransel & Mouse"
  },
  {
    id: "prod-office-win11",
    title: "Lisensi Windows 11 Pro & Office 2021",
    category: "digital",
    badge: "Lisensi Resmi",
    stockStatus: "READY",
    priceText: "Rp 400.000",
    rawPriceText: "Rp 400.000 (Aktivasi Permanen Seumur Hidup)",
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&auto=format&fit=crop&q=80"
    ],
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
  }
]

export default function CatalogLaptopClient({
  initialProducts = [],
  initialSettings = {}
}: {
  initialProducts?: ProductItem[]
  initialSettings?: Record<string, string>
}) {
  const [products] = useState<ProductItem[]>(
    initialProducts.length > 0 ? initialProducts : DEFAULT_PRODUCTS
  )
  const [bankAccounts] = useState<BankAccount[]>(() => {
    if (initialSettings.bank_accounts_json) {
      try { return JSON.parse(initialSettings.bank_accounts_json) } catch {}
    }
    return DEFAULT_BANKS
  })

  const waPhone = initialSettings.contact_phone || "0852-1770-6587"
  const ownerName = initialSettings.owner_name || "Muhammad Aghisna"
  const address = initialSettings.address || "Sangso, Samalanga, Bireuen, Aceh"
  const igHighlight = initialSettings.instagram_url || "https://www.instagram.com/s/aGlnaGxpZ2h0OjE3OTI1ODg4MzI2NzYwNDM2?story_media_id=3106266946206908221&stkn=MWpwam1nMm13eDlwcg=="

  const [currentCategory, setCurrentCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Modal, Lightbox & FAQ State
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null)
  const [activeMediaMode, setActiveMediaMode] = useState<"image" | "video">("image")
  const [activePhotoIdx, setActivePhotoIdx] = useState(0)
  const [toastMsg, setToastMsg] = useState("")
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  // Zoom Lightbox State
  const [isZoomOpen, setIsZoomOpen] = useState(false)
  const [zoomScale, setZoomScale] = useState(1)

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (isZoomOpen) {
          setIsZoomOpen(false)
        } else {
          setSelectedProduct(null)
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isZoomOpen])

  function openDetailModal(p: ProductItem) {
    setSelectedProduct(p)
    setActiveMediaMode("image")
    setActivePhotoIdx(0)
    setIsZoomOpen(false)
    setZoomScale(1)
  }

  function openZoomModal() {
    setIsZoomOpen(true)
    setZoomScale(1)
  }

  function handleZoomIn() {
    setZoomScale((prev) => Math.min(prev + 0.5, 3))
  }

  function handleZoomOut() {
    setZoomScale((prev) => Math.max(prev - 0.5, 1))
  }

  function handleZoomReset() {
    setZoomScale(1)
  }

  function handlePrevPhoto() {
    if (!selectedProduct?.images?.length) return
    setActivePhotoIdx((prev) => (prev === 0 ? selectedProduct.images!.length - 1 : prev - 1))
  }

  function handleNextPhoto() {
    if (!selectedProduct?.images?.length) return
    setActivePhotoIdx((prev) => (prev === selectedProduct.images!.length - 1 ? 0 : prev + 1))
  }

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
      (currentCategory === "budget" && (p.category === "budget" || p.badge.includes("Hemat") || p.priceText.includes("400")))

    const q = searchQuery.toLowerCase()
    const matchSearch =
      p.title.toLowerCase().includes(q) ||
      p.shortDesc.toLowerCase().includes(q) ||
      p.priceText.toLowerCase().includes(q)

    return matchCat && matchSearch
  })

  const formattedWa = waPhone.replace(/[^0-9]/g, "").replace(/^0/, "62")

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased pb-24">

      {/* 1. CLEAN TOP ANNOUNCEMENT BAR */}
      <div className="bg-teal-700 text-white text-[11px] sm:text-xs py-2 px-4 text-center font-semibold border-b border-teal-800">
        💡 <strong>Toko Resmi & Terpercaya:</strong> Garansi Toko 30 Hari • Transfer Hanya a/n <u className="font-bold text-amber-200">{ownerName}</u> (BSI / SeaBank). CS WA: <u>{waPhone}</u>
      </div>

      {/* 2. MINIMALIST STORE NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3">
          <a href="/" className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-teal-700 flex items-center justify-center text-white shrink-0 shadow-xs">
              <Laptop className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-base sm:text-xl font-extrabold tracking-tight text-slate-900 block truncate">
                Mughis <span className="text-teal-700">Laptop Store</span>
              </span>
              <span className="text-[10px] sm:text-xs text-slate-500 font-medium flex items-center gap-1 truncate">
                <MapPin className="w-3 h-3 text-teal-600 shrink-0" />
                <span className="truncate">{address}</span>
              </span>
            </div>
          </a>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={igHighlight}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 font-semibold text-xs transition border border-pink-200/60"
            >
              <InstagramIcon className="w-4 h-4 text-pink-600" />
              <span>Testimoni IG</span>
            </a>

            <a
              href={`https://wa.me/${formattedWa}?text=${encodeURIComponent("Halo Mughis Laptop Store, saya ingin bertanya stok laptop/produk digital.")}`}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-xs transition active:scale-95"
            >
              <Phone className="w-4 h-4" />
              <span>Chat WA CS</span>
            </a>
          </div>
        </div>
      </header>

      {/* 3. HERO & SEARCH SECTION */}
      <section className="bg-gradient-to-b from-teal-50/60 via-white to-slate-50 border-b border-slate-200/60 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100/80 border border-teal-200 text-teal-800 text-[11px] sm:text-xs font-bold uppercase tracking-wide">
            <Award className="w-3.5 h-3.5 text-teal-600" />
            <span>Pusat Laptop Business & Lisensi Digital Samalanga</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-3xl mx-auto">
            Laptop Business Bekas Berkualitas & Produk Digital Resmi
          </h1>

          <p className="text-xs sm:text-base text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Unit pilihan teruji 100% QC, garansi toko 30 hari jelas, dan konsultasi gratis langsung dengan Owner ({ownerName}).
          </p>

          {/* Search Box */}
          <div className="relative max-w-xl mx-auto pt-2">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 mt-1" />
            <input
              type="text"
              placeholder="Cari ThinkPad X1, T460, T470, HP ProBook, Windows 11..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 text-xs sm:text-sm font-semibold rounded-2xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 focus:outline-none bg-white shadow-xs text-slate-900 placeholder:text-slate-400"
            />
          </div>
        </div>
      </section>

      {/* 4. STICKY CATEGORY FILTER BAR */}
      <div className="sticky top-16 sm:top-20 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 py-2.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 overflow-x-auto text-xs font-bold no-scrollbar">
          <button
            onClick={() => setCurrentCategory("all")}
            className={`px-3.5 py-1.5 rounded-xl shrink-0 transition border ${currentCategory === "all" ? "bg-teal-700 border-teal-700 text-white shadow-xs" : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"}`}
          >
            🔥 Semua Produk ({activeProducts.length})
          </button>
          <button
            onClick={() => setCurrentCategory("laptop")}
            className={`px-3.5 py-1.5 rounded-xl shrink-0 transition border ${currentCategory === "laptop" ? "bg-teal-700 border-teal-700 text-white shadow-xs" : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"}`}
          >
            💻 Laptop Business
          </button>
          <button
            onClick={() => setCurrentCategory("digital")}
            className={`px-3.5 py-1.5 rounded-xl shrink-0 transition border ${currentCategory === "digital" ? "bg-teal-700 border-teal-700 text-white shadow-xs" : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"}`}
          >
            🔑 Produk Digital
          </button>
          <button
            onClick={() => setCurrentCategory("budget")}
            className={`px-3.5 py-1.5 rounded-xl shrink-0 transition border ${currentCategory === "budget" ? "bg-teal-700 border-teal-700 text-white shadow-xs" : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"}`}
          >
            🏷️ Promo Hemat
          </button>
        </div>
      </div>

      {/* 5. MODERN MINIMALIST PRODUCT CATALOG GRID */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200/80 space-y-3 p-6">
            <Laptop className="w-10 h-10 text-teal-600 mx-auto opacity-40" />
            <p className="text-sm sm:text-base font-bold text-slate-800">
              {searchQuery ? `Tidak ada produk yang cocok dengan "${searchQuery}"` : "Belum Ada Unit Produk dalam Katalog"}
            </p>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              {searchQuery
                ? "Coba gunakan kata kunci lain atau reset filter pencarian Anda."
                : "Produk yang Anda unggah dari Dashboard Admin akan langsung otomatis muncul di sini."}
            </p>
            {searchQuery && (
              <button
                onClick={() => { setSearchQuery(""); setCurrentCategory("all"); }}
                className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-xs transition"
              >
                <span>Reset Pencarian</span>
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-5 w-full">
            {filteredProducts.map((p) => {
              const waMsg = encodeURIComponent(`Assalamu’alaikum Mughis Laptop Store,\n\nSaya tertarik dengan unit:\n*${p.title}*\nHarga: ${p.priceText}\n\nApakah unit masih tersedia? Mohon informasi kondisi dan garansinya.`)
              const waUrl = `https://wa.me/${formattedWa}?text=${waMsg}`
              const photoCount = p.images && p.images.length > 0 ? p.images.length : 1

              return (
                <div key={p.id} className="min-w-0 w-full max-w-full bg-white rounded-2xl border border-slate-200/80 overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-200 group">
                  <div>
                    {/* CLEAN COMPACT IMAGE (ASPECT 16/10 ON MOBILE, 4:5 ON TABLET/DESKTOP) */}
                    <div className="relative aspect-[16/10] sm:aspect-[4/5] w-full bg-slate-100 overflow-hidden">
                      <img src={p.images?.[0] || p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[9px] sm:text-xs font-semibold bg-white/90 text-slate-800 shadow-xs border border-slate-200/60 backdrop-blur-xs">
                        {p.badge}
                      </span>

                      <div className="absolute bottom-2 left-2 flex items-center gap-1">
                        <span className="px-1.5 py-0.5 rounded text-[8px] sm:text-[10px] font-bold bg-slate-900/75 text-white backdrop-blur-xs flex items-center gap-0.5">
                          <ImageIcon className="w-2.5 h-2.5 text-teal-400" />
                          <span>{photoCount} Foto</span>
                        </span>
                        {p.video && (
                          <span className="px-1.5 py-0.5 rounded text-[8px] sm:text-[10px] font-bold bg-indigo-600 text-white flex items-center gap-0.5">
                            <VideoIcon className="w-2.5 h-2.5 text-white" />
                            <span>Video</span>
                          </span>
                        )}
                      </div>

                      {p.stockStatus === "SOLD_OUT" && (
                        <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-rose-600 text-white shadow-xs">
                          SOLD OUT
                        </span>
                      )}
                    </div>

                    <div className="p-2 sm:p-4 space-y-1 sm:space-y-2">
                      <h3 className="text-xs sm:text-base font-bold text-slate-900 leading-tight line-clamp-2">{p.title}</h3>

                      <div className="text-xs sm:text-xl font-black text-teal-700">
                        {p.priceText}
                      </div>

                      <p className="text-[10px] sm:text-xs text-slate-500 font-medium line-clamp-1 hidden sm:block">
                        {p.specs?.[0] || p.shortDesc}
                      </p>
                    </div>
                  </div>

                  <div className="p-2 sm:p-4 pt-0 grid grid-cols-2 gap-1.5">
                    <button
                      onClick={() => openDetailModal(p)}
                      className="w-full py-1.5 sm:py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-[10px] sm:text-xs font-bold flex items-center justify-center transition"
                    >
                      <span>Detail</span>
                    </button>

                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-1.5 sm:py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] sm:text-xs font-bold flex items-center justify-center gap-1 transition shadow-xs active:scale-95"
                    >
                      <span>Beli WA</span>
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* 6. TRUST & WARRANTY SECTION */}
        <section className="mt-12 pt-10 border-t border-slate-200/80">
          <div className="text-center max-w-xl mx-auto mb-6 space-y-1">
            <span className="text-[10px] sm:text-xs font-bold uppercase text-teal-700 tracking-wider">Layanan Purna Jual</span>
            <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900">Garansi & Keamanan Pembeli</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5 text-xs">
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1.5">
              <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Garansi Toko 30 Hari</h3>
              <p className="text-slate-600 text-[11px] leading-relaxed">Meliputi kerusakan motherboard, RAM, SSD, layar, & keyboard.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <CheckCircle className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">100% Lolos Pengujian QC</h3>
              <p className="text-slate-600 text-[11px] leading-relaxed">Hardware, baterai, & fungsionalitas dites menyeluruh sebelum dikirim.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1.5">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Award className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Rekening Owner Resmi</h3>
              <p className="text-slate-600 text-[11px] leading-relaxed">Transfer aman hanya a/n <strong>Muhammad Aghisna</strong>.</p>
            </div>
          </div>
        </section>

        {/* 7. INTERACTIVE FAQ ACCORDION */}
        <section className="mt-10 pt-10 border-t border-slate-200/80">
          <div className="text-center max-w-xl mx-auto mb-6 space-y-1">
            <span className="text-[10px] sm:text-xs font-bold uppercase text-teal-700 tracking-wider">Tanya Jawab Pembeli</span>
            <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900">Pertanyaan Sering Diajukan (FAQ)</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-2.5 text-xs sm:text-sm">
            {[
              {
                q: "Apakah seluruh unit laptop bekas ini bergaransi resmi toko?",
                a: "Ya! Seluruh unit laptop yang dibeli di Mughis Laptop Store mendapatkan garansi toko resmi selama 30 hari meliputi jaminan motherboard, RAM, SSD, layar, dan keyboard."
              },
              {
                q: "Apakah bisa datang & cek fisik unit langsung di toko (COD)?",
                a: "Sangat bisa! Silakan datang langsung ke toko fisik kami di Sangso, Samalanga, Bireuen, Aceh. Anda bisa tes keyboard, tes layar, cek ketahanan baterai, dan konsultasi gratis bersama Owner (Muhammad Aghisna)."
              },
              {
                q: "Bagaimana sistem pengiriman untuk pembeli di luar Samalanga / luar Aceh?",
                a: "Untuk area Aceh & Medan, pengiriman dapat dilakukan instan via Travel/L300 (sampai di hari yang sama). Untuk area luar provinsi seluruh Indonesia, kami kirim via JNE / J&T / Cargo dengan packing kayu tebal & bubble wrap aman."
              },
              {
                q: "Apakah laptop sudah langsung terpasang Windows & Office original?",
                a: "Ya, setiap unit di-install Windows 11 Pro / Windows 10 Pro original dan Microsoft Office 2021 original yang telah diaktivasi permanen. Laptop siap langsung Anda gunakan untuk kerja, skripsi, atau aktivitas kantor."
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden transition shadow-xs">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full p-4 text-left font-bold text-slate-900 flex justify-between items-center gap-3 hover:bg-slate-50 transition"
                >
                  <span className="text-xs sm:text-sm">{faq.q}</span>
                  <span className="text-teal-700 text-base shrink-0 font-black">{openFaqIndex === idx ? "−" : "+"}</span>
                </button>
                {openFaqIndex === idx && (
                  <div className="p-4 pt-0 text-slate-600 font-medium text-xs leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 8. OFFICIAL PAYMENT BANK ACCOUNTS - BRIGHT & CLEAN DESIGN */}
        <section className="mt-10 p-5 sm:p-8 rounded-3xl bg-teal-50/80 border border-teal-200/80 text-slate-900 shadow-xs space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-teal-800 bg-teal-100 px-3 py-1 rounded-full border border-teal-200">
              Rekening Resmi Owner
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900">Informasi Pembayaran Resmi</h2>
            <p className="text-slate-600 text-xs sm:text-sm font-medium">Transfer HANYA ke rekening resmi atas nama <strong>{ownerName}</strong>:</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {bankAccounts.map((b) => (
              <div key={b.id} className="p-4 rounded-2xl bg-white border border-teal-300 space-y-2 relative shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-teal-800 text-sm">{b.bank}</span>
                  <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-teal-100 text-teal-800 border border-teal-300">
                    Rekening Resmi
                  </span>
                </div>
                <p className="text-xl font-black font-mono tracking-wider text-slate-900">{b.account_number}</p>
                <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                  <span className="text-[11px] text-teal-900 font-bold">a/n {b.beneficiary}</span>
                  <button
                    onClick={() => copyText(b.account_number, b.bank)}
                    className="px-2.5 py-1 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-[10px] font-bold flex items-center gap-1 transition shadow-xs"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Salin</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 9. STORE LOCATION & FOOTER */}
        <section className="mt-10 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 space-y-3 text-xs text-slate-700 text-center sm:text-left flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <p className="font-extrabold text-slate-900 text-sm">MUGHIS LAPTOP STORE</p>
            <p className="text-slate-600 font-medium">Owner: {ownerName} • Alamat: {address}</p>
            <p className="text-slate-400 text-[11px]">© 2026 Mughis Laptop Store. Hak Cipta Dilindungi.</p>
          </div>

          <div className="flex items-center justify-center gap-3 shrink-0">
            <a href={igHighlight} target="_blank" rel="noreferrer" className="px-3 py-2 rounded-xl bg-pink-50 border border-pink-200 text-pink-700 font-bold text-xs flex items-center gap-1.5">
              <InstagramIcon className="w-3.5 h-3.5" />
              <span>Testimoni IG</span>
            </a>
            <a href={`https://wa.me/${formattedWa}`} target="_blank" rel="noreferrer" className="px-3 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              <span>CS WA</span>
            </a>
          </div>
        </section>
      </main>

      {/* 10. MODAL DETAIL PRODUK */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs transition-all duration-200">
          <div className="bg-white border border-slate-200 max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl p-4 sm:p-6 space-y-4 text-slate-900 relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 p-1 rounded-lg">
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-3">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 text-teal-800 uppercase border border-teal-200">
                {selectedProduct.badge}
              </span>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 pr-6 leading-snug">{selectedProduct.title}</h3>
              <p className="text-xl sm:text-2xl font-black text-teal-700">{selectedProduct.rawPriceText || selectedProduct.priceText}</p>

              {/* Main Media Box with Strict 4:5 Instagram Feed Ratio */}
              <div className="relative w-full aspect-[4/5] max-h-[380px] rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 mx-auto flex items-center justify-center group shadow-md">
                {activeMediaMode === "video" && selectedProduct.video ? (
                  selectedProduct.video.startsWith("data:video") || selectedProduct.video.endsWith(".mp4") ? (
                    <video src={selectedProduct.video} controls autoPlay loop muted playsInline className="w-full h-full object-cover" />
                  ) : (
                    <iframe
                      src={selectedProduct.video.replace("watch?v=", "embed/").replace("shorts/", "embed/")}
                      className="w-full h-full border-0"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                    ></iframe>
                  )
                ) : (
                  <>
                    <img
                      src={selectedProduct.images?.[activePhotoIdx] || selectedProduct.image}
                      alt={selectedProduct.title}
                      onClick={openZoomModal}
                      className="w-full h-full object-cover cursor-zoom-in transition-transform duration-300 group-hover:scale-105"
                    />
                    <button
                      onClick={openZoomModal}
                      className="absolute bottom-3 right-3 px-2.5 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-xs text-[11px] font-bold flex items-center gap-1.5 shadow-md border border-white/20 transition active:scale-95"
                    >
                      <ZoomIn className="w-3.5 h-3.5 text-teal-400" />
                      <span>Zoom Foto (4:5)</span>
                    </button>
                  </>
                )}
              </div>

              {/* Multi-Photo & Video Selector Thumbnails with Strict 4:5 Ratio */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 justify-center">
                {selectedProduct.images && selectedProduct.images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setActiveMediaMode("image"); setActivePhotoIdx(idx); }}
                    className={`w-12 aspect-[4/5] rounded-xl overflow-hidden border-2 shrink-0 transition ${activeMediaMode === "image" && activePhotoIdx === idx ? "border-teal-600 ring-2 ring-teal-600/30 shadow-xs" : "border-slate-200 opacity-60 hover:opacity-100"}`}
                  >
                    <img src={imgUrl} alt={`Foto ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}

                {selectedProduct.video && (
                  <button
                    onClick={() => setActiveMediaMode("video")}
                    className={`px-3 py-2 rounded-xl border-2 shrink-0 transition flex items-center gap-1 font-bold text-xs ${activeMediaMode === "video" ? "bg-indigo-600 text-white border-indigo-600 shadow-xs" : "bg-indigo-50 text-indigo-700 border-indigo-200"}`}
                  >
                    <VideoIcon className="w-3.5 h-3.5" />
                    <span>Video</span>
                  </button>
                )}
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                <p className="font-extrabold text-slate-900 uppercase text-[10px]">Spesifikasi Unit:</p>
                <ul className="space-y-1 font-medium text-slate-700">
                  {selectedProduct.specs.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {selectedProduct.conditionNote && (
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-medium">
                  <span className="font-bold block text-[10px] uppercase">Kondisi:</span>
                  <span>{selectedProduct.conditionNote}</span>
                </div>
              )}

              {selectedProduct.bonus && (
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-medium">
                  <span className="font-bold block text-[10px] uppercase">Bonus:</span>
                  <span>{selectedProduct.bonus}</span>
                </div>
              )}

              <a
                href={`https://wa.me/${formattedWa}?text=${encodeURIComponent(`Assalamu’alaikum Mughis Laptop Store,\n\nSaya tertarik dengan unit:\n*${selectedProduct.title}*\nHarga: ${selectedProduct.priceText}\n\nApakah unit masih tersedia? Mohon informasi kondisi dan garansinya.`)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-xs active:scale-95 transition"
              >
                <Phone className="w-4 h-4" />
                <span>Pesan via WhatsApp CS</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-slate-900 text-white shadow-xl flex items-center gap-2 text-xs font-bold animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Floating WhatsApp Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <a
          href={`https://wa.me/${formattedWa}?text=${encodeURIComponent("Halo Mughis Laptop Store, saya ingin bertanya stok laptop/produk digital.")}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl hover:scale-105 transition-all duration-200"
        >
          <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
        </a>
      </div>

      {/* 11. LIGHTBOX FULLSCREEN ZOOM MODAL (INSTAGRAM FEED 4:5 RATIO & ZOOM CONTROLS) */}
      {isZoomOpen && selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 backdrop-blur-md transition-all duration-300 p-2 sm:p-4">
          {/* Top Control Bar */}
          <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between text-white">
            <div className="flex items-center gap-2 bg-slate-900/80 px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-bold backdrop-blur-md">
              <InstagramIcon className="w-4 h-4 text-pink-400" />
              <span>Rasio Instagram Feed 4:5 • ({activePhotoIdx + 1} / {selectedProduct.images?.length || 1})</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleZoomIn}
                className="p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-white/20 transition shadow-md"
                title="Zoom In"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <button
                onClick={handleZoomOut}
                className="p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-white/20 transition shadow-md"
                title="Zoom Out"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <button
                onClick={handleZoomReset}
                className="p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-white/20 transition shadow-md"
                title="Reset Zoom"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsZoomOpen(false)}
                className="p-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white shadow-md transition ml-2"
                title="Tutup Zoom"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Previous / Next Arrow Controls */}
          {selectedProduct.images && selectedProduct.images.length > 1 && (
            <>
              <button
                onClick={handlePrevPhoto}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-white/20 backdrop-blur-md transition shadow-lg active:scale-95"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNextPhoto}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-white/20 backdrop-blur-md transition shadow-lg active:scale-95"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Main Zoomable Image Canvas with 4:5 Aspect Ratio */}
          <div className="w-full h-full max-w-2xl max-h-[85vh] flex items-center justify-center overflow-auto p-4">
            <div
              className="relative aspect-[4/5] w-full max-h-full rounded-2xl overflow-hidden shadow-2xl transition-transform duration-200 flex items-center justify-center bg-black border border-white/10"
              style={{ transform: `scale(${zoomScale})` }}
            >
              <img
                src={selectedProduct.images?.[activePhotoIdx] || selectedProduct.image}
                alt={selectedProduct.title}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
