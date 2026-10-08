"use client"

import { useState, useEffect } from "react"
import { Search, Laptop, ShieldCheck, Phone, CheckCircle, Copy, X, Check, MapPin, ShieldAlert, Award, Image as ImageIcon, Video as VideoIcon, ZoomIn, ZoomOut, RotateCcw, ChevronLeft, ChevronRight, Scale, Star, Printer, Truck, Clock, CheckSquare } from "lucide-react"

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
  useCase?: "mahasiswa" | "kantor" | "editing" | "all" | string
  badge: string
  badgeColor?: string
  stockStatus?: "READY" | "LIMITED" | "SOLD_OUT" | "HIDDEN"
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

export interface TestimonialItem {
  id: string
  name: string
  location: string
  rating: number
  text: string
  photoUrl?: string
}

const DEFAULT_BANKS: BankAccount[] = [
  { id: "b1", bank: "BANK BSI", account_number: "7368300677", beneficiary: "Muhammad Aghisna" },
  { id: "b2", bank: "BANK SEABANK", account_number: "901007430064", beneficiary: "Muhammad Aghisna" }
]

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "t1",
    name: "Tgk. Ridwan",
    location: "Sangso, Samalanga",
    rating: 5,
    text: "Laptop ThinkPad X1 Carbon sangat mulus seperti baru. Baterai awet, keyboard backlit nyaman untuk ngetik malam. Recomended!",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
  },
  {
    id: "t2",
    name: "Ibu Nurul Hayati",
    location: "Bireuen, Aceh",
    rating: 5,
    text: "Pelayanan Fast Respons dari Owner (Aghisnas). Kirim via L300 barang langsung nyampe sore. Garansi toko bikin tenang.",
    photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80"
  },
  {
    id: "t3",
    name: "Ahmad Fauzi",
    location: "Lhokseumawe",
    rating: 5,
    text: "Lisensi Windows 11 & Office 2021 diaktivasi langsung tanpa ribet. Harga terjangkau dan bebas virus.",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80"
  }
]

const DEFAULT_PRODUCTS: ProductItem[] = [
  {
    id: "prod-x1-carbon",
    title: "Lenovo ThinkPad X1 Carbon Core i5 Gen 6",
    category: "laptop",
    useCase: "mahasiswa",
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
    useCase: "kantor",
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
    id: "prod-hp-430-g5",
    title: "HP ProBook 430 G5 Core i5 Gen 8",
    category: "laptop",
    useCase: "editing",
    badge: "Quad Core Cepat",
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

  // Sub-Pages / Tab Isolation
  const [activeTab, setActiveTab] = useState<"beranda" | "stok" | "garansi" | "pembayaran" | "lokasi">("beranda")
  const [currentCategory, setCurrentCategory] = useState("all")
  const [useCaseFilter, setUseCaseFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Side-by-Side Laptop Comparator State
  const [compareIds, setCompareIds] = useState<string[]>([])
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false)

  // Product Detail Modal & 4-Photo Carousel State
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null)
  const [activeMediaMode, setActiveMediaMode] = useState<"image" | "video">("image")
  const [activePhotoIdx, setActivePhotoIdx] = useState(0)

  // Fullscreen Zoom Lightbox State (Aspect 4:5)
  const [isZoomOpen, setIsZoomOpen] = useState(false)
  const [zoomScale, setZoomScale] = useState(1)

  // FAQ State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const [toastMsg, setToastMsg] = useState("")

  const waPhone = initialSettings.contact_phone || "0852-1770-6587"
  const formattedWa = waPhone.replace(/[^0-9]/g, "").replace(/^0/, "62")
  const ownerName = initialSettings.owner_name || "Muhammad Aghisna"
  const address = initialSettings.address || "Sangso, Samalanga, Bireuen, Aceh"
  const igHighlight = initialSettings.instagram_url || "https://www.instagram.com/s/aGlnaGxpZ2h0OjE3OTI1ODg4MzI2NzYwNDM2?story_media_id=3106266946206908221&stkn=MWpwam1nMm13eDlwcg=="
  const heroHeadline = initialSettings.hero_headline || "Pusat Laptop Business & Produk Digital Terpercaya"
  const heroSubheadline = initialSettings.hero_subheadline || "Unit laptop pilihan yang dites lolos QC 100%, garansi toko jelas, dan konsultasi gratis langsung via WhatsApp."

  function copyText(text: string, bankName: string) {
    navigator.clipboard.writeText(text).then(() => {
      setToastMsg(`Nomor Rekening ${bankName} (${text}) berhasil disalin!`)
      setTimeout(() => setToastMsg(""), 3000)
    })
  }

  function toggleCompare(id: string) {
    if (compareIds.includes(id)) {
      setCompareIds(compareIds.filter((item) => item !== id))
    } else {
      if (compareIds.length >= 2) {
        setCompareIds([compareIds[1], id])
      } else {
        setCompareIds([...compareIds, id])
      }
    }
  }

  function openDetailModal(p: ProductItem) {
    setSelectedProduct(p)
    setActiveMediaMode("image")
    setActivePhotoIdx(0)
    setZoomScale(1)
  }

  function openZoomModal() {
    setZoomScale(1)
    setIsZoomOpen(true)
  }

  function handleZoomIn() {
    setZoomScale((prev) => Math.min(prev + 0.3, 2.5))
  }

  function handleZoomOut() {
    setZoomScale((prev) => Math.max(prev - 0.3, 0.8))
  }

  function handleZoomReset() {
    setZoomScale(1)
  }

  function handleNextPhoto() {
    if (!selectedProduct || !selectedProduct.images) return
    setActivePhotoIdx((prev) => (prev + 1) % selectedProduct.images!.length)
  }

  function handlePrevPhoto() {
    if (!selectedProduct || !selectedProduct.images) return
    setActivePhotoIdx((prev) => (prev - 1 + selectedProduct.images!.length) % selectedProduct.images!.length)
  }

  const activeProducts = products.filter((p) => p.stockStatus !== "HIDDEN")

  const filteredProducts = activeProducts.filter((p) => {
    const matchCat =
      currentCategory === "all" ||
      p.category === currentCategory ||
      (currentCategory === "budget" && (p.category === "budget" || p.badge.includes("Hemat") || p.badge.includes("Minus") || p.priceText.includes("1.8") || p.priceText.includes("400")))

    const matchUseCase = useCaseFilter === "all" || p.useCase === useCaseFilter || p.category === "digital"

    const q = searchQuery.toLowerCase()
    const matchSearch =
      p.title.toLowerCase().includes(q) ||
      p.shortDesc.toLowerCase().includes(q) ||
      p.priceText.toLowerCase().includes(q)

    return matchCat && matchUseCase && matchSearch
  })

  const comparedProducts = products.filter((p) => compareIds.includes(p.id))

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-teal-500 selection:text-white pb-20">

      {/* Top Banner Warning */}
      <div className="bg-slate-900 text-white text-[11px] sm:text-sm py-2 px-3 sm:px-4 text-center font-bold leading-snug">
        💡 <strong>TIPS BELANJA AMAN:</strong> Pastikan hanya bertransaksi ke rekening resmi a/n <u>{ownerName}</u> (BSI / SeaBank). WA CS: <u>{waPhone}</u>!
      </div>

      {/* Header Navigation - Glassmorphism Mobile Ergonomic */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2">

          <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab("beranda"); }} className="flex items-center gap-2 min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-teal-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-teal-600/20">
              <Laptop className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <span className="text-base sm:text-2xl font-black tracking-tight text-slate-900 truncate block leading-tight">
                Mughis <span className="text-teal-600">Laptop Store</span>
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-teal-700 truncate flex items-center gap-1">
                <MapPin className="w-3 h-3 text-teal-600 shrink-0" />
                <span className="truncate">{address}</span>
              </span>
            </div>
          </a>

          {/* Sub-Page Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-2 text-xs sm:text-sm font-extrabold text-slate-700">
            <button
              onClick={() => setActiveTab("beranda")}
              className={`px-3 py-2 rounded-xl transition ${activeTab === "beranda" ? "bg-teal-600 text-white shadow-sm" : "hover:bg-slate-100 text-slate-700"}`}
            >
              🏠 Beranda
            </button>
            <button
              onClick={() => setActiveTab("stok")}
              className={`px-3 py-2 rounded-xl transition ${activeTab === "stok" ? "bg-teal-600 text-white shadow-sm" : "hover:bg-slate-100 text-slate-700"}`}
            >
              💻 Stok Unit Ready
            </button>
            <button
              onClick={() => setActiveTab("garansi")}
              className={`px-3 py-2 rounded-xl transition ${activeTab === "garansi" ? "bg-teal-600 text-white shadow-sm" : "hover:bg-slate-100 text-slate-700"}`}
            >
              🛡️ Layanan Garansi
            </button>
            <button
              onClick={() => setActiveTab("pembayaran")}
              className={`px-3 py-2 rounded-xl transition ${activeTab === "pembayaran" ? "bg-teal-600 text-white shadow-sm" : "hover:bg-slate-100 text-slate-700"}`}
            >
              💳 Rekening Resmi
            </button>
            <button
              onClick={() => setActiveTab("lokasi")}
              className={`px-3 py-2 rounded-xl transition ${activeTab === "lokasi" ? "bg-teal-600 text-white shadow-sm" : "hover:bg-slate-100 text-slate-700"}`}
            >
              📍 Lokasi & Kontak
            </button>
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={igHighlight}
              target="_blank"
              rel="noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-pink-50 hover:bg-pink-100 border border-pink-200 text-pink-700 font-bold text-xs transition"
            >
              <InstagramIcon className="w-4 h-4 text-pink-600" />
              <span>Testimoni IG</span>
            </a>

            <button
              onClick={() => window.print()}
              className="hidden xl:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 font-bold text-xs transition"
              title="Cetak Katalog PDF"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>Cetak PDF</span>
            </button>

            <a
              href={`https://wa.me/${formattedWa}?text=${encodeURIComponent("Halo Mughis Laptop Store, saya ingin bertanya stok laptop/produk digital.")}`}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition transform active:scale-95"
            >
              <Phone className="w-4 h-4 shrink-0" />
              <span>CS WA</span>
            </a>
          </div>
        </div>

        {/* Mobile Tab Switcher Bar */}
        <div className="md:hidden flex border-t border-slate-200 bg-slate-50 px-2 py-1.5 overflow-x-auto gap-1 text-xs font-bold">
          <button
            onClick={() => setActiveTab("beranda")}
            className={`px-3 py-1.5 rounded-lg shrink-0 whitespace-nowrap transition ${activeTab === "beranda" ? "bg-teal-600 text-white" : "text-slate-600 hover:bg-slate-200"}`}
          >
            🏠 Beranda
          </button>
          <button
            onClick={() => setActiveTab("stok")}
            className={`px-3 py-1.5 rounded-lg shrink-0 whitespace-nowrap transition ${activeTab === "stok" ? "bg-teal-600 text-white" : "text-slate-600 hover:bg-slate-200"}`}
          >
            💻 Stok Unit
          </button>
          <button
            onClick={() => setActiveTab("garansi")}
            className={`px-3 py-1.5 rounded-lg shrink-0 whitespace-nowrap transition ${activeTab === "garansi" ? "bg-teal-600 text-white" : "text-slate-600 hover:bg-slate-200"}`}
          >
            🛡️ Garansi
          </button>
          <button
            onClick={() => setActiveTab("pembayaran")}
            className={`px-3 py-1.5 rounded-lg shrink-0 whitespace-nowrap transition ${activeTab === "pembayaran" ? "bg-teal-600 text-white" : "text-slate-600 hover:bg-slate-200"}`}
          >
            💳 Rekening
          </button>
          <button
            onClick={() => setActiveTab("lokasi")}
            className={`px-3 py-1.5 rounded-lg shrink-0 whitespace-nowrap transition ${activeTab === "lokasi" ? "bg-teal-600 text-white" : "text-slate-600 hover:bg-slate-200"}`}
          >
            📍 Lokasi
          </button>
        </div>
      </header>

      {/* 1. TAB CONTENT: BERANDA / HOME (HERO BANNER ONLY RENDERS HERE) */}
      {activeTab === "beranda" && (
        <>
          <section className="pt-8 sm:pt-14 pb-12 sm:pb-16 bg-gradient-to-b from-teal-50/80 via-white to-slate-50 border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 sm:space-y-6">

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100 border border-teal-300 text-teal-800 text-[11px] sm:text-sm font-extrabold uppercase tracking-wider">
                <Award className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Official Store • Owner: {ownerName} • Samalanga, Bireuen</span>
              </div>

              <h1 className="text-2xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
                {heroHeadline}
              </h1>

              <p className="text-xs sm:text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
                {heroSubheadline}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setActiveTab("stok")}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-teal-600/30 active:scale-95 transition"
                >
                  <Laptop className="w-5 h-5" />
                  <span>Lihat Semua Stok Unit Ready Stock ({activeProducts.length})</span>
                </button>

                <a
                  href={`https://wa.me/${formattedWa}?text=${encodeURIComponent("Halo Mughis Laptop Store, saya ingin bertanya stok laptop/produk digital.")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 active:scale-95 transition"
                >
                  <Phone className="w-5 h-5" />
                  <span>Konsultasi WA CS</span>
                </a>
              </div>
            </div>
          </section>

          {/* Fraud Protection Callout Banner */}
          <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 -mt-5 relative z-10">
            <div className="bg-amber-50 border-2 border-amber-400/80 p-4 sm:p-5 rounded-2xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-slate-900">
              <div className="flex items-start gap-3">
                <ShieldAlert className="w-7 h-7 sm:w-8 sm:h-8 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-extrabold text-amber-900 uppercase tracking-wider">HIMBAUAN KEAMANAN TRANSAKSI OWNER ({ownerName.toUpperCase()})</p>
                  <p className="text-slate-700 mt-0.5 leading-relaxed">
                    Pastikan transfer pembayaran Anda <strong>HANYA</strong> dikirimkan ke rekening Bank BSI atau SeaBank atas nama <strong>{ownerName}</strong>. WA Resmi: <strong>{waPhone}</strong>.
                  </p>
                </div>
              </div>

              <a
                href={igHighlight}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs flex items-center gap-2 shrink-0 shadow-md w-full sm:w-auto justify-center"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>Cek Testimoni IG</span>
              </a>
            </div>
          </section>

          {/* Store Strengths Section */}
          <section id="keunggulan" className="py-12 sm:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
                <span className="px-3.5 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-extrabold uppercase">Keunggulan Toko</span>
                <h2 className="text-2xl sm:text-4xl font-black text-slate-900">Mengapa Memilih Mughis Laptop Store?</h2>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs sm:text-base font-bold text-slate-900">Garansi Toko Jelas</h3>
                  <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed font-medium">Semua unit dilengkapi garansi toko resmi 30 hari.</p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    <CheckSquare className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs sm:text-base font-bold text-slate-900">QC Unit 100%</h3>
                  <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed font-medium">Layar, keyboard, baterai, & hardware dites menyeluruh.</p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                    <Phone className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs sm:text-base font-bold text-slate-900">Konsultasi Gratis WA</h3>
                  <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed font-medium">CS ramah membantu memilih spek laptop sesuai kebutuhan.</p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs sm:text-base font-bold text-slate-900">Rekening Owner Resmi</h3>
                  <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed font-medium">Transfer aman hanya a/n Muhammad Aghisna.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-12 bg-slate-50 border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold uppercase">Testimoni Pembeli</span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Apa Kata Pelanggan Kami?</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {DEFAULT_TESTIMONIALS.map((t) => (
                  <div key={t.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                    <div className="flex items-center gap-3">
                      <img src={t.photoUrl} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-slate-300" />
                      <div>
                        <p className="font-extrabold text-slate-900 text-sm">{t.name}</p>
                        <p className="text-xs text-slate-500 font-medium">{t.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-amber-400 gap-1 text-xs">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed italic">"{t.text}"</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* 2. TAB CONTENT: STOK UNIT READY (PURE PRODUCT CATALOG WITH ASPECT RATIO 4:5, VIDEO SUPPORT, OPTION A PRICE ASSURANCE NOTE, & SMART USE-CASE FILTERS) */}
      {activeTab === "stok" && (
        <section id="katalog" className="py-8 sm:py-12 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 pb-3 border-b border-slate-200 gap-3">
            <div>
              <h2 className="text-xl sm:text-3xl font-black text-slate-900">Daftar Unit & Produk Ready Stock</h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">Klik produk untuk melihat spesifikasi, galeri foto multi-sudut (Rasio 4:5), & video unit</p>
            </div>
            <div className="text-[11px] sm:text-xs font-bold text-slate-600 bg-white px-3 py-1.5 rounded-xl border border-slate-200 self-start sm:self-auto">
              100% Lolos QC & Siap Pakai
            </div>
          </div>

          {/* Search Bar & Smart Use-Case Filters */}
          <div className="space-y-4 mb-8">
            <div className="relative max-w-2xl mx-auto shadow-md rounded-2xl">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari ThinkPad X1, T460, T470, HP 430 G5, Ideapad S530..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-sm sm:text-base font-bold rounded-2xl border-2 border-slate-300 focus:border-teal-600 focus:outline-none bg-white text-slate-900 placeholder:text-slate-400"
              />
            </div>

            {/* Smart Use-Case Quick Filter Pills */}
            <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs max-w-3xl mx-auto space-y-2">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block text-center">Rekomendasi Kebutuhan / Use Case:</span>
              <div className="flex flex-wrap justify-center gap-1.5 text-xs font-bold">
                <button
                  onClick={() => setUseCaseFilter("all")}
                  className={`px-3 py-1.5 rounded-xl transition ${useCaseFilter === "all" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
                >
                  Semua
                </button>
                <button
                  onClick={() => setUseCaseFilter("mahasiswa")}
                  className={`px-3 py-1.5 rounded-xl transition ${useCaseFilter === "mahasiswa" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
                >
                  🎓 Ketik / Skripsi
                </button>
                <button
                  onClick={() => setUseCaseFilter("kantor")}
                  className={`px-3 py-1.5 rounded-lg transition ${useCaseFilter === "kantor" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
                >
                  📊 Olah Data / Kantor
                </button>
                <button
                  onClick={() => setUseCaseFilter("editing")}
                  className={`px-3 py-1.5 rounded-lg transition ${useCaseFilter === "editing" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
                >
                  🎨 Desain / Editing
                </button>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2 text-xs sm:text-sm font-bold">
              <button
                onClick={() => setCurrentCategory("all")}
                className={`px-3.5 py-2 rounded-xl border-2 transition ${currentCategory === "all" ? "bg-teal-600 border-teal-600 text-white shadow-sm" : "bg-white border-slate-200 text-slate-700 hover:border-teal-600"}`}
              >
                🔥 Semua Kategori ({activeProducts.length})
              </button>
              <button
                onClick={() => setCurrentCategory("laptop")}
                className={`px-3.5 py-2 rounded-xl border-2 transition ${currentCategory === "laptop" ? "bg-teal-600 border-teal-600 text-white shadow-sm" : "bg-white border-slate-200 text-slate-700 hover:border-teal-600"}`}
              >
                💻 Laptop Business
              </button>
              <button
                onClick={() => setCurrentCategory("digital")}
                className={`px-3.5 py-2 rounded-xl border-2 transition ${currentCategory === "digital" ? "bg-teal-600 border-teal-600 text-white shadow-sm" : "bg-white border-slate-200 text-slate-700 hover:border-teal-600"}`}
              >
                🔑 Produk Digital & Lisensi
              </button>
              <button
                onClick={() => setCurrentCategory("budget")}
                className={`px-3.5 py-2 rounded-xl border-2 transition ${currentCategory === "budget" ? "bg-teal-600 border-teal-600 text-white shadow-sm" : "bg-white border-slate-200 text-slate-700 hover:border-teal-600"}`}
              >
                🏷️ Promo & Pilihan Hemat
              </button>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border-2 border-dashed border-slate-200 space-y-2">
              <p className="text-base font-bold text-slate-800">Produk tidak ditemukan</p>
              <p className="text-xs text-slate-500">Coba ubah kata kunci pencarian Anda.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
              {filteredProducts.map((p) => {
                const waMsg = encodeURIComponent(`Assalamu’alaikum Mughis Laptop Store,\n\nSaya tertarik dengan unit:\n*${p.title}*\nHarga: ${p.priceText}\n\nApakah unit masih tersedia? Mohon informasi kondisi dan garansinya.`)
                const waUrl = `https://wa.me/${formattedWa}?text=${waMsg}`
                const photoCount = p.images && p.images.length > 0 ? p.images.length : 1
                const isCompared = compareIds.includes(p.id)

                return (
                  <div key={p.id} className="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                    <div>
                      {/* STRICT ASPECT RATIO 4:5 PORTRAIT CONTAINER */}
                      <div className="relative aspect-[4/5] w-full bg-slate-100 overflow-hidden">
                        <img src={p.images?.[0] || p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />

                        <span className="absolute top-2 left-2 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-xs font-black uppercase tracking-wider bg-teal-100 text-teal-800 border border-teal-300 shadow-sm">
                          {p.badge}
                        </span>

                        <button
                          onClick={() => toggleCompare(p.id)}
                          className={`absolute top-2 right-2 p-1.5 rounded-lg border text-[10px] font-bold transition flex items-center gap-1 shadow-sm ${isCompared ? "bg-teal-600 text-white border-teal-600" : "bg-white/90 hover:bg-white text-slate-700 border-slate-300"}`}
                          title="Bandingkan Laptop"
                        >
                          <Scale className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">{isCompared ? "Dibandingkan" : "Bandingkan"}</span>
                        </button>

                        <div className="absolute bottom-2 left-2 flex items-center gap-1">
                          <span className="px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-bold bg-slate-900/80 text-white backdrop-blur-sm shadow-sm flex items-center gap-1">
                            <ImageIcon className="w-3 h-3 text-teal-400" />
                            <span>{photoCount} Foto</span>
                          </span>
                          {p.video && (
                            <span className="px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-indigo-600 text-white shadow-sm flex items-center gap-1">
                              <VideoIcon className="w-3 h-3 text-white" />
                              <span className="hidden sm:inline">Ada Video</span>
                            </span>
                          )}
                        </div>

                        {p.stockStatus === "SOLD_OUT" && (
                          <span className="absolute top-2 right-2 px-2.5 py-1 rounded-md text-[10px] font-black uppercase bg-rose-600 text-white shadow-md">
                            SOLD OUT
                          </span>
                        )}
                      </div>

                      <div className="p-3 sm:p-6 space-y-2">
                        <h3 className="text-sm sm:text-xl font-black text-slate-900 leading-snug line-clamp-2">{p.title}</h3>

                        <div className="p-2 sm:p-3 rounded-xl bg-teal-50 border border-teal-200 space-y-1">
                          <span className="text-[9px] sm:text-xs text-slate-500 font-bold block uppercase tracking-wider">Penawaran Spesial</span>
                          <span className="text-base sm:text-2xl font-black text-teal-800 block">{p.priceText}</span>

                          {/* HUMBLE PRICE ASSURANCE NOTE OPTION A */}
                          <p className="text-[9px] sm:text-[11px] text-teal-900/90 font-medium leading-tight pt-1.5 border-t border-teal-200/80 italic hidden sm:block">
                            ✨ Silakan cek & bandingkan penawaran terbaik kami di area Aceh hingga Medan. Harga Mughis Laptop Store hadir bukan untuk merusak pasar, melainkan karena modal yang kami dapatkan terjangkau, maka kami jual kembali dengan harga yang bersahabat demi keberkahan bersama.
                          </p>
                        </div>

                        <p className="text-[11px] sm:text-sm text-slate-600 line-clamp-2 leading-relaxed font-normal">{p.shortDesc}</p>
                      </div>
                    </div>

                    <div className="p-3 sm:p-6 pt-0 grid grid-cols-2 gap-2">
                      <button
                        onClick={() => openDetailModal(p)}
                        className="w-full py-2.5 sm:py-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 text-[11px] sm:text-xs font-extrabold flex items-center justify-center gap-1 transition"
                      >
                        <span>Lihat Spek</span>
                      </button>

                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-2.5 sm:py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] sm:text-xs font-black flex items-center justify-center gap-1 transition shadow-md shadow-emerald-600/20 active:scale-95"
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
      )}

      {/* 3. TAB CONTENT: PUSAT GARANSI & LAYANAN PURNA JUAL */}
      {activeTab === "garansi" && (
        <section className="py-8 sm:py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-md space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-3xl font-black text-slate-900">Ketentuan Garansi Toko Mughis Laptop Store</h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">Layanan purna jual resmi & penanganan cepat langsung dari Owner ({ownerName})</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-700">
              <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200 space-y-2">
                <h3 className="font-extrabold text-teal-900 text-base flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-600" />
                  <span>Garansi Hardware & Mesin (30 Hari)</span>
                </h3>
                <p className="leading-relaxed text-slate-600 font-medium">
                  Semua unit laptop bekas yang dibeli mendapatkan garansi toko 30 hari meliputi kerusakan motherboard, prosesor, RAM, SSD, layar, dan keyboard.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-2">
                <h3 className="font-extrabold text-blue-900 text-base flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <span>Garansi 100% Lisensi Digital</span>
                </h3>
                <p className="leading-relaxed text-slate-600 font-medium">
                  Untuk lisensi Windows 11 Pro & Office 2021, apabila terjadi kegagalan aktivasi, kami garansi 100% ganti key lisensi baru atau dibantu aktivasi remote.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs sm:text-sm">
              <h4 className="font-extrabold text-slate-900 uppercase">Syarat Klaim Garansi Sangat Mudah:</h4>
              <ul className="space-y-2 text-slate-600 font-medium">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>Segel garansi toko pada bodi laptop masih utuh (tidak rusak/sobek).</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>Bukan disebabkan oleh kelalaian pemakaian (seperti jatuh, terkena air, atau konsleting listrik rumah).</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>Cukup hubungi WhatsApp CS resmi ({waPhone}) dengan menyebutkan nama pembeli & foto unit.</span>
                </li>
              </ul>
            </div>

            <a
              href={`https://wa.me/${formattedWa}?text=${encodeURIComponent("Halo Mughis Laptop Store, saya mau konsultasi klaim garansi toko.")}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
            >
              <Phone className="w-5 h-5" />
              <span>Konsultasi / Klaim Garansi via WhatsApp CS</span>
            </a>
          </div>
        </section>
      )}

      {/* 4. TAB CONTENT: REKENING RESMI & PEMBAYARAN */}
      {activeTab === "pembayaran" && (
        <section id="info-bisnis" className="py-8 sm:py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border-2 border-slate-800 shadow-2xl space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest border border-emerald-500/30">
                Rekening Resmi Owner ({ownerName})
              </span>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight">Informasi Rekening Pembayaran Resmi</h2>
              <p className="text-slate-300 text-xs sm:text-base font-normal leading-relaxed">
                Pastikan transfer Anda dikirimkan sesuai dengan nama rekening resmi pemilik toko di bawah ini:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {bankAccounts.map((b) => (
                <div key={b.id} className="p-5 sm:p-6 rounded-2xl bg-slate-950 border-2 border-emerald-600/40 space-y-3 relative shadow-2xl">
                  <div className="flex items-center justify-between">
                    <span className="text-base sm:text-lg font-black text-emerald-400 tracking-wider">{b.bank}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Rekening Resmi
                    </span>
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 font-medium">Nomor Rekening:</p>
                    <p className="text-2xl sm:text-3xl font-black font-mono tracking-widest text-white mt-1">{b.account_number}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Atas Nama / Owner:</p>
                      <p className="text-sm sm:text-base font-black text-amber-300">{b.beneficiary}</p>
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

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs sm:text-sm">
              <h3 className="font-extrabold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                <Truck className="w-5 h-5 text-amber-400" />
                <span>Metode Pengiriman & Pembayaran yang Tersedia:</span>
              </h3>
              <ul className="space-y-2 text-slate-300 font-medium">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>COD / Ambil Langsung:</strong> Silakan datang ke toko fisik kami di Sangso, Samalanga, Bireuen, Aceh.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Pengiriman Travel / L300 (Aceh & Medan):</strong> Pengiriman instan sampai di hari yang sama untuk area Aceh & Sumut.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Pengiriman Ekspedisi (JNE / J&T / Cargo):</strong> Dilengkapi packing kayu aman & bubble wrap tebal ke seluruh Indonesia.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* 5. TAB CONTENT: LOKASI TOKO FISIK & KONTAK */}
      {activeTab === "lokasi" && (
        <section className="py-8 sm:py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-md space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-3xl font-black text-slate-900">Lokasi Toko Fisik & Kontak Resmi</h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">Mughis Laptop Store — Sangso, Samalanga, Bireuen, Aceh</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <span className="font-extrabold text-slate-900 uppercase text-xs tracking-wider block">Alamat Fisik Toko:</span>
                <p className="text-slate-800 font-bold text-base leading-snug">{address}</p>
                <p className="text-slate-600 font-medium">Owner: {ownerName}</p>

                <div className="pt-2 border-t border-slate-200 flex items-center gap-2 text-slate-600 font-medium">
                  <Clock className="w-4 h-4 text-teal-600" />
                  <span>Buka Setiap Hari: 08:30 - 22:00 WIB</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
                <span className="font-extrabold text-emerald-900 uppercase text-xs tracking-wider block">Kontak WhatsApp CS Resmi:</span>
                <p className="text-2xl sm:text-3xl font-black text-emerald-800 font-mono">{waPhone}</p>
                <p className="text-slate-600 font-medium">Layanan konsultasi unit, garansi, & pengecekan stok fast response.</p>

                <a
                  href={`https://wa.me/${formattedWa}?text=${encodeURIComponent("Halo Mughis Laptop Store, saya mau konsultasi lokasi toko / stok laptop.")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md"
                >
                  <Phone className="w-4 h-4" />
                  <span>Hubungi CS WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer - 100% Tech Storefront */}
      <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-center md:text-left">
          <div className="space-y-1.5">
            <p className="text-base font-black text-white tracking-wide">MUGHIS LAPTOP STORE</p>
            <p className="text-slate-300 font-medium">Owner: {ownerName} • Alamat: {address}</p>
            <p className="text-slate-500">© 2026 Mughis Laptop Store. Hak Cipta Dilindungi.</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 font-bold text-xs sm:text-sm">
            <a href={igHighlight} target="_blank" rel="noreferrer" className="px-3 py-2 rounded-xl bg-pink-950/60 border border-pink-700/50 text-pink-300 hover:text-white flex items-center gap-1.5 transition">
              <InstagramIcon className="w-4 h-4 text-pink-400" />
              <span>Testimoni IG</span>
            </a>
            <a href={`https://wa.me/${formattedWa}`} target="_blank" rel="noreferrer" className="px-3 py-2 rounded-xl bg-emerald-950/60 border border-emerald-700/50 text-emerald-300 hover:text-white flex items-center gap-1.5 transition">
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>CS WA ({waPhone})</span>
            </a>
          </div>
        </div>
      </footer>

      {/* FLOATING COMPARE BAR */}
      {compareIds.length > 0 && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 bg-slate-900 text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-4 text-xs font-bold border border-teal-500/50 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-teal-400" />
            <span>Dibandingkan ({compareIds.length}/2 Unit)</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-xs transition"
            >
              Lihat Perbandingan
            </button>
            <button
              onClick={() => setCompareIds([])}
              className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white"
              title="Bersihkan"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* SIDE-BY-SIDE LAPTOP COMPARISON MODAL */}
      {isCompareModalOpen && comparedProducts.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs transition-all duration-200">
          <div className="bg-white border border-slate-200 max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl p-4 sm:p-6 space-y-4 text-slate-900 relative max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-teal-700" />
                <h3 className="font-extrabold text-base sm:text-lg text-slate-900">Perbandingan Spesifikasi Laptop</h3>
              </div>
              <button onClick={() => setIsCompareModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-6 text-xs">
              {comparedProducts.map((p) => (
                <div key={p.id} className="space-y-3 bg-slate-50 p-3 sm:p-4 rounded-xl border border-slate-200">
                  <div className="aspect-[4/5] rounded-lg overflow-hidden bg-slate-200">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm line-clamp-2">{p.title}</h4>
                  <p className="text-teal-700 font-black text-sm sm:text-base">{p.priceText}</p>

                  <div className="space-y-1.5 text-[11px] pt-2 border-t border-slate-200 text-slate-700">
                    <p className="font-bold text-slate-900 uppercase text-[10px]">Spesifikasi:</p>
                    {p.specs.map((s, idx) => (
                      <p key={idx} className="line-clamp-2">• {s}</p>
                    ))}
                  </div>

                  <a
                    href={`https://wa.me/${formattedWa}?text=${encodeURIComponent(`Assalamu’alaikum Mughis Laptop Store,\n\nSaya tertarik dengan unit:\n*${p.title}*\nHarga: ${p.priceText}\n\nApakah unit ini ready? Saya baru saja membandingkannya di website.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1 shadow-xs transition block text-center"
                  >
                    <span>Pesan Model Ini</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal Detail with ASPECT-RATIO 4:5 Portrait Gallery & VIDEO PLAYER */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm transition-all duration-300">
          <div className="bg-white border border-slate-300 max-w-xl w-full rounded-2xl overflow-hidden shadow-2xl p-5 sm:p-6 space-y-4 text-slate-900 relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 p-1 rounded-lg">
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-800 border border-teal-200 uppercase">
                {selectedProduct.badge}
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 pr-8">{selectedProduct.title}</h3>

              <div className="p-2.5 sm:p-3 rounded-xl bg-teal-50 border border-teal-200 space-y-1">
                <p className="text-2xl sm:text-3xl font-black text-teal-700">{selectedProduct.rawPriceText || selectedProduct.priceText}</p>
                <p className="text-[10px] sm:text-[11px] text-teal-900/90 font-medium leading-tight pt-1.5 border-t border-teal-200/80 italic">
                  ✨ Silakan cek & bandingkan penawaran terbaik kami di area Aceh hingga Medan. Harga Mughis Laptop Store hadir bukan untuk merusak pasar, melainkan karena modal yang kami dapatkan terjangkau, maka kami jual kembali dengan harga yang bersahabat demi keberkahan bersama.
                </p>
              </div>

              {/* Main Media Player Box (Image or Video) with Strict 4:5 Aspect Ratio */}
              <div className="w-full aspect-[4/5] max-h-[380px] rounded-xl overflow-hidden bg-slate-950 border border-slate-200 relative mx-auto flex items-center justify-center group shadow-md">
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

              {/* Multi-Photo & Video Selector Thumbnails */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 justify-center">
                {selectedProduct.images && selectedProduct.images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setActiveMediaMode("image"); setActivePhotoIdx(idx); }}
                    className={`w-14 aspect-[4/5] rounded-lg overflow-hidden border-2 shrink-0 transition ${activeMediaMode === "image" && activePhotoIdx === idx ? "border-teal-600 ring-2 ring-teal-600/30" : "border-slate-200 opacity-60 hover:opacity-100"}`}
                  >
                    <img src={imgUrl} alt={`Foto ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}

                {selectedProduct.video && (
                  <button
                    onClick={() => setActiveMediaMode("video")}
                    className={`px-3 py-2.5 rounded-lg border-2 shrink-0 transition flex items-center gap-1.5 font-bold text-xs ${activeMediaMode === "video" ? "bg-indigo-600 text-white border-indigo-600 shadow-md" : "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100"}`}
                  >
                    <VideoIcon className="w-4 h-4" />
                    <span>🎥 Video Unit</span>
                  </button>
                )}
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <p className="font-extrabold text-slate-900 uppercase">Spesifikasi Lengkap & Kondisi:</p>
                <ul className="space-y-1.5 font-medium text-slate-700">
                  {selectedProduct.specs.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {selectedProduct.conditionNote && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-medium">
                  <span className="font-bold block">Kondisi Unit:</span>
                  <span>{selectedProduct.conditionNote}</span>
                </div>
              )}

              {selectedProduct.bonus && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-medium">
                  <span className="font-bold block">Bonus Kelengkapan:</span>
                  <span>{selectedProduct.bonus}</span>
                </div>
              )}

              <p className="text-xs text-slate-600 leading-relaxed font-medium">{selectedProduct.shortDesc}</p>

              <a
                href={`https://wa.me/${formattedWa}?text=${encodeURIComponent(`Assalamu’alaikum Mughis Laptop Store,\n\nSaya tertarik dengan unit:\n*${selectedProduct.title}*\nHarga: ${selectedProduct.priceText}\n\nApakah unit masih tersedia? Mohon informasi kondisi dan garansinya.`)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 active:scale-95 transition"
              >
                <Phone className="w-4 h-4" />
                <span>Pesan Sekarang via WhatsApp CS</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* LIGHTBOX FULLSCREEN ZOOM MODAL (INSTAGRAM FEED 4:5 RATIO & ZOOM CONTROLS) */}
      {isZoomOpen && selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 backdrop-blur-md transition-all duration-300 p-2 sm:p-4">
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

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full bg-slate-900 text-white shadow-2xl flex items-center gap-2 text-xs font-bold animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Floating WhatsApp Action Button with Pulsing Ring */}
      <div className="fixed bottom-6 right-6 z-40">
        <a
          href={`https://wa.me/${formattedWa}?text=${encodeURIComponent("Halo Mughis Laptop Store, saya ingin bertanya stok laptop/produk digital.")}`}
          target="_blank"
          rel="noreferrer"
          className="relative group flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xl shadow-emerald-600/40 hover:scale-105 transition-all duration-200"
        >
          <span className="absolute -inset-1 rounded-full bg-emerald-500 opacity-75 animate-ping"></span>
          <Phone className="w-6 h-6 sm:w-7 sm:h-7 relative z-10" />
        </a>
      </div>
    </div>
  )
}
