"use client"

import { useState, useEffect } from "react"
import {
  Laptop,
  ShieldCheck,
  Phone,
  CheckCircle,
  Copy,
  X,
  Check,
  MapPin,
  Award,
  Image as ImageIcon,
  Video as VideoIcon,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Star,
  Share2,
  Heart,
  Truck,
  Sparkles,
  ArrowLeft,
  Printer,
  ChevronRight as BreadcrumbArrow,
  CheckSquare
} from "lucide-react"
import { ProductItem, ProductVariant, BankAccount, TestimonialItem } from "@/types/catalog"

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

const DEFAULT_BANKS: BankAccount[] = [
  { id: "b1", bank: "BANK BSI", account_number: "7368300677", beneficiary: "Muhammad Aghisna" },
  { id: "b2", bank: "BANK SEABANK", account_number: "901007430064", beneficiary: "Muhammad Aghisna" }
]

export default function ProductDetailClient({
  product,
  allProducts = [],
  settings = {}
}: {
  product: ProductItem
  allProducts?: ProductItem[]
  settings?: Record<string, string>
}) {
  const waPhone = settings.contact_phone || "0852-1770-6587"
  const ownerName = settings.owner_name || "Muhammad Aghisna"
  const address = settings.address || "Sangso, Samalanga, Bireuen, Aceh"
  const formattedWa = waPhone.replace(/[^0-9]/g, "").replace(/^0/, "62")

  // Banks & Testimonials
  const bankAccounts: BankAccount[] = settings.bank_accounts_json
    ? JSON.parse(settings.bank_accounts_json)
    : DEFAULT_BANKS

  const testimonials: TestimonialItem[] = settings.catalog_testimonials_json
    ? JSON.parse(settings.catalog_testimonials_json)
    : []

  // Media State
  const images = product.images && product.images.length > 0 ? product.images : [product.image]
  const [activeMediaMode, setActiveMediaMode] = useState<"image" | "video">("image")
  const [activePhotoIdx, setActivePhotoIdx] = useState(0)

  // Zoom Lightbox State
  const [isZoomOpen, setIsZoomOpen] = useState(false)
  const [zoomScale, setZoomScale] = useState(1)

  // Variant Selection State
  const variants = product.variants && product.variants.length > 0 ? product.variants : []
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    variants.find((v) => v.isDefault) || variants[0] || null
  )

  // Active Price Calculation
  const currentPriceText = selectedVariant ? selectedVariant.priceText : product.priceText
  const currentOriginalPriceText = selectedVariant?.originalPriceText || product.originalPriceText || ""

  // Favorites & Toast State
  const [isLiked, setIsLiked] = useState(false)
  const [toastMsg, setToastMsg] = useState("")

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsZoomOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  function showToast(msg: string) {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(""), 3000)
  }

  function handleShare() {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: `Cek ${product.title} di Mughis Laptop Store! ${product.priceText}`,
        url: window.location.href,
      }).catch(() => {})
    } else {
      navigator.clipboard.writeText(window.location.href)
      showToast("Link produk berhasil disalin!")
    }
  }

  function copyText(text: string, label: string) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`Nomor Rekening ${label} (${text}) berhasil disalin!`)
    })
  }

  // Related Products
  const relatedProducts = allProducts.filter(
    (p) => p.id !== product.id && p.stockStatus !== "HIDDEN"
  ).slice(0, 4)

  // Pre-filled WA Order Link
  const variantInfoStr = selectedVariant ? `\nVarian Spesifikasi: ${selectedVariant.name}` : ""
  const waMsg = encodeURIComponent(
    `Assalamu’alaikum Mughis Laptop Store,\n\nSaya tertarik membeli produk via Katalog Website:\n*${product.title}*${variantInfoStr}\nHarga: ${currentPriceText}\nLink Produk: ${typeof window !== "undefined" ? window.location.href : ""}\n\nApakah unit ini masih ready stock? Mohon konfirmasi prosedur pemesanannya. Terima kasih.`
  )
  const waUrl = `https://wa.me/${formattedWa}?text=${waMsg}`

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased pb-28">
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-teal-700 text-white text-[11px] sm:text-xs py-2 px-4 text-center font-semibold border-b border-teal-800">
        💡 <strong>Toko Resmi & Terpercaya:</strong> Garansi Toko 30 Hari • Transfer Hanya a/n <u className="font-bold text-amber-200">{ownerName}</u> (BSI / SeaBank). CS WA: <u>{waPhone}</u>
      </div>

      {/* 2. STORE NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3">
          <a href="/katalog-laptop" className="flex items-center gap-2.5 min-w-0">
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
              href="/katalog-laptop"
              className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 border border-slate-300 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Kembali ke Katalog</span>
            </a>

            <a
              href={waUrl}
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

      {/* 3. BREADCRUMB NAVIGATION */}
      <nav className="bg-white border-b border-slate-200/80 py-2.5 px-4 sm:px-8 text-xs font-semibold text-slate-500">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <a href="/" className="hover:text-teal-700 transition shrink-0">Beranda</a>
          <BreadcrumbArrow className="w-3 h-3 text-slate-400 shrink-0" />
          <a href="/katalog-laptop" className="hover:text-teal-700 transition shrink-0">Katalog Laptop</a>
          <BreadcrumbArrow className="w-3 h-3 text-slate-400 shrink-0" />
          <span className="text-slate-900 font-bold truncate">{product.title}</span>
        </div>
      </nav>

      {/* 4. MAIN SHOPEE-STYLE PRODUCT DETAIL SECTION */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-10">
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden p-4 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">

            {/* LEFT COLUMN: SHOPEE GALLERY (5 COLS) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Main Media Box Aspect 4:5 */}
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 flex items-center justify-center group shadow-sm">
                {activeMediaMode === "video" && product.video ? (
                  product.video.startsWith("data:video") || product.video.endsWith(".mp4") ? (
                    <video src={product.video} controls autoPlay loop muted playsInline className="w-full h-full object-cover" />
                  ) : (
                    <iframe
                      src={product.video.replace("watch?v=", "embed/").replace("shorts/", "embed/")}
                      className="w-full h-full border-0"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                    ></iframe>
                  )
                ) : (
                  <>
                    <img
                      src={images[activePhotoIdx] || product.image}
                      alt={product.title}
                      loading="eager"
                      decoding="async"
                      onClick={() => { setIsZoomOpen(true); setZoomScale(1); }}
                      className="w-full h-full object-cover cursor-zoom-in transition-transform duration-300 group-hover:scale-105"
                    />
                    <button
                      onClick={() => { setIsZoomOpen(true); setZoomScale(1); }}
                      className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-xs text-xs font-bold flex items-center gap-1.5 shadow-md border border-white/20 transition active:scale-95"
                    >
                      <ZoomIn className="w-4 h-4 text-teal-400" />
                      <span>Zoom Foto (4:5)</span>
                    </button>
                  </>
                )}

                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-bold bg-white/90 text-slate-900 backdrop-blur-xs border border-slate-200 shadow-xs">
                  {product.badge}
                </span>

                {product.stockStatus === "LIMITED" && (
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg text-xs font-bold uppercase bg-amber-500 text-slate-900 shadow-xs">
                    ⚡ Sisa 1 Unit
                  </span>
                )}
              </div>

              {/* Thumbnails Carousel */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 justify-center sm:justify-start">
                {images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setActiveMediaMode("image"); setActivePhotoIdx(idx); }}
                    className={`w-14 aspect-[4/5] rounded-xl overflow-hidden border-2 shrink-0 transition ${activeMediaMode === "image" && activePhotoIdx === idx ? "border-teal-600 ring-2 ring-teal-600/30 shadow-xs" : "border-slate-200 opacity-60 hover:opacity-100"}`}
                  >
                    <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}

                {product.video && (
                  <button
                    onClick={() => setActiveMediaMode("video")}
                    className={`px-3 py-2 aspect-[4/5] rounded-xl border-2 shrink-0 transition flex flex-col items-center justify-center gap-1 font-bold text-xs ${activeMediaMode === "video" ? "bg-indigo-600 text-white border-indigo-600 shadow-xs" : "bg-indigo-50 text-indigo-700 border-indigo-200"}`}
                  >
                    <VideoIcon className="w-4 h-4" />
                    <span className="text-[10px]">Video</span>
                  </button>
                )}
              </div>

              {/* Share & Favorite Buttons */}
              <div className="flex items-center justify-between pt-2 text-xs font-bold text-slate-600 border-t border-slate-100">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition"
                >
                  <Share2 className="w-4 h-4 text-teal-600" />
                  <span>Bagikan Produk</span>
                </button>

                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${isLiked ? "text-rose-600 bg-rose-50" : "hover:bg-slate-100"}`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? "fill-rose-600" : ""}`} />
                  <span>{isLiked ? "Disukai" : "Suka"}</span>
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN: SHOPEE INFO & PRICING (7 COLS) */}
            <div className="lg:col-span-7 space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                {/* Title & Category */}
                <div>
                  <span className="text-xs font-bold uppercase text-teal-700 tracking-wider bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200 inline-block mb-2">
                    {product.category === "laptop" ? "Laptop Business Bekas" : product.category}
                  </span>
                  <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                    {product.title}
                  </h1>
                </div>

                {/* Rating Stars & Sold Count (Shopee Style Header) */}
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-600 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-1 text-amber-500 font-extrabold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span>{product.rating || 5.0}</span>
                  </div>
                  <span className="text-slate-300">|</span>
                  <span className="underline cursor-pointer hover:text-teal-700">{testimonials.length || 12} Ulasan</span>
                  <span className="text-slate-300">|</span>
                  <span className="font-bold text-slate-800">{product.soldCount || 18} Terjual</span>
                </div>

                {/* SHOPEE PRICE BOX BANNER */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-teal-50 via-emerald-50 to-teal-50 border border-teal-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-teal-800 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      Penawaran Spesial Mughis Store
                    </span>
                    {product.discountPercent ? (
                      <span className="px-2 py-0.5 rounded bg-rose-600 text-white font-extrabold text-xs">
                        -{product.discountPercent}% OFF
                      </span>
                    ) : null}
                  </div>

                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl sm:text-4xl font-black text-teal-700">
                      {currentPriceText}
                    </span>
                    {currentOriginalPriceText && (
                      <span className="text-xs sm:text-base font-semibold text-slate-400 line-through">
                        {currentOriginalPriceText}
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-teal-900 font-medium flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>Harga sudah termasuk Windows 11 & Office Original Aktivasi Permanen.</span>
                  </p>
                </div>

                {/* VARIANT SELECTOR (IF ANY) */}
                {variants.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block">
                      Pilihan Varian Spesifikasi:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {variants.map((v) => {
                        const isSelected = selectedVariant?.id === v.id
                        return (
                          <button
                            key={v.id}
                            onClick={() => setSelectedVariant(v)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition ${isSelected ? "bg-teal-700 text-white border-teal-700 shadow-xs ring-2 ring-teal-600/30" : "bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100"}`}
                          >
                            <span>{v.name}</span>
                            <span className="ml-1.5 opacity-80 text-[11px]">({v.priceText})</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* GUARANTEE BADGES */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                    <span className="font-bold text-slate-800 text-[11px]">Garansi Toko 30 Hari</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-bold text-slate-800 text-[11px]">100% Lolos QC Test</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 col-span-2 sm:col-span-1">
                    <Award className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="font-bold text-slate-800 text-[11px]">Bisa Tes / COD Toko</span>
                  </div>
                </div>

                {/* SHIPPING OPTIONS */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                  <span className="font-extrabold text-slate-900 flex items-center gap-1.5 uppercase text-[11px] tracking-wider">
                    <Truck className="w-4 h-4 text-teal-700" />
                    Opsi Pengiriman & Delivery:
                  </span>
                  <ul className="space-y-1 font-medium text-slate-600 text-[11px]">
                    <li>• <strong>L300 / Travel Instan:</strong> Khusus area Aceh & Medan (Sampai Hari Ini).</li>
                    <li>• <strong>JNE / J&T Cargo:</strong> Kirim ke seluruh Indonesia dengan Packing Kayu + Bubble Wrap tebal.</li>
                  </ul>
                </div>
              </div>

              {/* ACTION BUTTONS (DESKTOP) */}
              <div className="pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`https://wa.me/${formattedWa}?text=${encodeURIComponent(`Assalamu’alaikum Mughis Laptop Store,\n\nSaya mau tanya-tanya stok & kondisi unit:\n*${product.title}*\nHarga: ${currentPriceText}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3.5 px-4 rounded-2xl bg-teal-50 hover:bg-teal-100 text-teal-800 font-extrabold text-xs sm:text-sm border border-teal-300 flex items-center justify-center gap-2 transition"
                >
                  <Phone className="w-4 h-4 text-teal-700" />
                  <span>Tanya Stok via WA</span>
                </a>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 active:scale-95 transition"
                >
                  <Phone className="w-4 h-4" />
                  <span>Beli Sekarang via WA</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 5. PRODUCT SPECS, DESCRIPTION & BONUS TABS */}
        <section className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-8 space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900">Spesifikasi & Rincian Lengkap Unit</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs sm:text-sm">
            {/* Specs List */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <h3 className="font-extrabold text-slate-900 uppercase text-xs tracking-wider flex items-center gap-1.5">
                <CheckSquare className="w-4 h-4 text-teal-700" />
                Spesifikasi Hardware Utama:
              </h3>
              <ul className="space-y-2 font-medium text-slate-700">
                {product.specs.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Condition, Warranty & Bonus */}
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="font-extrabold text-slate-900 uppercase text-xs tracking-wider block">
                  Deskripsi Ringkas:
                </span>
                <p className="text-slate-700 font-medium leading-relaxed">{product.shortDesc}</p>
              </div>

              {product.conditionNote && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1 text-amber-900">
                  <span className="font-extrabold uppercase text-xs block">Kondisi & Grade Unit:</span>
                  <p className="font-medium">{product.conditionNote}</p>
                </div>
              )}

              {product.bonus && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1 text-emerald-900">
                  <span className="font-extrabold uppercase text-xs block">Bonus & Kelengkapan Paket:</span>
                  <p className="font-medium">{product.bonus}</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 6. BUYER REVIEWS & DELIVERY TESTIMONIALS */}
        {testimonials.length > 0 && (
          <section className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-8 space-y-6">
            <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900">Ulasan & Serah Terima Pembeli</h2>
                <p className="text-xs text-slate-500 font-medium">Testimoni asli hasil transaksi di Mughis Laptop Store</p>
              </div>
              <div className="flex items-center gap-1 text-amber-500 font-bold text-xs sm:text-sm">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>5.0 / 5.0 Rating</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {testimonials.map((t) => (
                <div key={t.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 flex flex-col justify-between text-xs">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(t.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-slate-700 italic">"{t.text}"</p>
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
                    <div className="w-7 h-7 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-xs shrink-0">
                      {t.name.slice(0, 1)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{t.name}</p>
                      <p className="text-[10px] text-slate-500">{t.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 7. OFFICIAL PAYMENT BANKS */}
        <section className="p-6 sm:p-8 rounded-3xl bg-teal-900 text-white shadow-md space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-teal-300 bg-teal-800 px-3 py-1 rounded-full border border-teal-700">
              Rekening Pembayaran Resmi Owner
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white">Transfer Hanya a/n {ownerName}</h2>
            <p className="text-teal-200 text-xs sm:text-sm">Demi keamanan, hindari transfer ke rekening selain nama pemilik resmi di bawah ini:</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {bankAccounts.map((b) => (
              <div key={b.id} className="p-4 rounded-2xl bg-slate-950/80 border border-teal-700 space-y-2 relative">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-teal-400 text-sm">{b.bank}</span>
                  <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-teal-800 text-teal-200">
                    Rekening Resmi
                  </span>
                </div>
                <p className="text-xl font-black font-mono tracking-wider text-white">{b.account_number}</p>
                <div className="flex items-center justify-between pt-1 border-t border-slate-800">
                  <span className="text-[11px] text-teal-300 font-bold">a/n {b.beneficiary}</span>
                  <button
                    onClick={() => copyText(b.account_number, b.bank)}
                    className="px-2.5 py-1 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-[10px] font-bold flex items-center gap-1 transition shadow-xs"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Salin No. Rek</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. RELATED PRODUCTS (SHOPEE STYLE "PRODUK LAIN DARI TOKO INI") */}
        {relatedProducts.length > 0 && (
          <section className="space-y-4 pt-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">Produk Lain dari Mughis Laptop Store</h2>
              <a href="/katalog-laptop" className="text-xs font-bold text-teal-700 hover:underline">
                Lihat Semua Produk →
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
              {relatedProducts.map((rel) => (
                <a
                  key={rel.id}
                  href={`/katalog-laptop/${rel.slug}`}
                  className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition group flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[4/5] w-full bg-slate-100 relative overflow-hidden">
                      <img src={rel.images?.[0] || rel.image} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-bold bg-white/90 text-slate-800 shadow-xs">
                        {rel.badge}
                      </span>
                    </div>

                    <div className="p-3 space-y-1">
                      <h3 className="font-bold text-xs text-slate-900 line-clamp-2">{rel.title}</h3>
                      <p className="text-teal-700 font-extrabold text-xs sm:text-sm">{rel.priceText}</p>
                    </div>
                  </div>

                  <div className="p-3 pt-0">
                    <span className="w-full py-1.5 rounded-lg bg-slate-100 text-slate-800 text-[10px] font-bold flex items-center justify-center">
                      Lihat Detail
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* 9. MOBILE STICKY BOTTOM ACTION BAR (SHOPEE STYLE) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200/90 p-3 safe-pb lg:hidden shadow-2xl">
        <div className="max-w-md mx-auto flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-3 rounded-xl bg-slate-100 text-slate-700 active:scale-95 font-bold shrink-0 transition"
            title="Bagikan"
          >
            <Share2 className="w-5 h-5" />
          </button>

          <a
            href={waUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 active:scale-95 transition"
          >
            <Phone className="w-4 h-4" />
            <span>Beli / Tanya via WhatsApp</span>
          </a>
        </div>
      </div>

      {/* TOAST NOTIFICATION */}
      {toastMsg && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-slate-900 text-white shadow-xl flex items-center gap-2 text-xs font-bold animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* 10. LIGHTBOX FULLSCREEN ZOOM MODAL */}
      {isZoomOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 backdrop-blur-md transition-all duration-300 p-2 sm:p-4">
          <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between text-white">
            <div className="flex items-center gap-2 bg-slate-900/80 px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-bold backdrop-blur-md">
              <InstagramIcon className="w-4 h-4 text-pink-400" />
              <span>Rasio Instagram Feed 4:5 • ({activePhotoIdx + 1} / {images.length})</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoomScale((s) => Math.min(s + 0.5, 3))}
                className="p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-white/20 transition shadow-md"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <button
                onClick={() => setZoomScale((s) => Math.max(s - 0.5, 1))}
                className="p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-white/20 transition shadow-md"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsZoomOpen(false)}
                className="p-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white shadow-md transition ml-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {images.length > 1 && (
            <>
              <button
                onClick={() => setActivePhotoIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-white/20 backdrop-blur-md transition shadow-lg"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => setActivePhotoIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-white/20 backdrop-blur-md transition shadow-lg"
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
                src={images[activePhotoIdx]}
                alt={product.title}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
