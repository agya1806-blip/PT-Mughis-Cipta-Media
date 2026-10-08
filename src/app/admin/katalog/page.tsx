"use client"

import { useEffect, useState } from "react"
import { Building2, CreditCard, Laptop, Plus, Trash2, Edit3, Save, Upload, Image as ImageIcon, Video, Check, X, ShieldAlert, Sparkles, Bot, Eye, RefreshCw } from "lucide-react"

interface BankAccount {
  id: string
  bank: string
  account_number: string
  beneficiary: string
}

interface ProductItem {
  id: string
  title: string
  category: "laptop" | "digital" | "budget" | string
  badge: string
  badgeColor?: string
  stockStatus: "READY" | "SOLD_OUT" | "HIDDEN"
  priceText: string
  rawPriceText: string
  image: string
  images?: string[] // Multi-photo support (Up to 4 images)
  video?: string // Video product support (MP4 base64 / URL)
  shortDesc: string
  specs: string[]
  conditionNote: string
  warranty: string
  bonus: string
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
    badge: "Ultrabook Tipis & Mewah",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    stockStatus: "READY",
    priceText: "Rp 3.750.000",
    rawPriceText: "Rp 3.750.000 (RAM 8GB / SSD 256GB)",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&auto=format&fit=crop&q=80"
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
    badgeColor: "bg-teal-100 text-teal-800 border-teal-300",
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
    badge: "Best Seller Business",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    stockStatus: "READY",
    priceText: "Rp 3.500.000",
    rawPriceText: "Rp 3.500.000 (RAM 8GB / SSD 256GB)",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80"
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
    badge: "Gen 8 Cepat 4-Core",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
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
    id: "prod-ideapad-s530",
    title: "Lenovo IdeaPad S530 Core i5 Gen 8",
    category: "budget",
    badge: "Promo Gen 8 (Minus Baterai)",
    badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
    stockStatus: "READY",
    priceText: "Rp 4.000.000",
    rawPriceText: "Rp 4.000.000 (Harga Khusus Minus Baterai Lemah)",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80"
    ],
    shortDesc: "Laptop ultrabook slim metal silver sangat kencang Core i5 Gen 8. Kondisi mesin & bodi mulus 100% lancar (Minus baterai lemah, disarankan colok charger).",
    specs: [
      "Prosesor: Intel Core i5-8265U Gen 8 (Quad Core 8 Threads)",
      "RAM: 8GB DDR4",
      "Penyimpanan: 256GB SSD NVMe Super Fast",
      "Layar: 13.3 inch Full HD IPS Bezel Tipis",
      "Catatan Minus: Baterai Lemah (Disarankan sambil colok charger)"
    ],
    conditionNote: "Kondisi Fisik 95% Mulus, Mesin 100% Normal (Minus Baterai Lemah)",
    warranty: "Garansi Toko 14 Hari Mesin",
    bonus: "Unit Laptop, Charger Original, Tas Laptop & Mouse"
  },
  {
    id: "prod-office-win11",
    title: "Lisensi Windows 11 Pro & Office 2021",
    category: "digital",
    badge: "Produk Digital",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
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

export default function AdminKatalogLaptopPage() {
  const [activeTab, setActiveTab] = useState<"store" | "banks" | "products">("products")
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  // Store & Hero Settings
  const [siteName, setSiteName] = useState("Mughis Laptop Store")
  const [ownerName, setOwnerName] = useState("Muhammad Aghisna")
  const [companyTagline, setCompanyTagline] = useState("Pusat Laptop Business & Produk Digital Terpercaya")
  const [address, setAddress] = useState("Sangso, Samalanga, Bireuen, Aceh")
  const [contactPhone, setContactPhone] = useState("0852-1770-6587")
  const [heroHeadline, setHeroHeadline] = useState("Pusat Laptop Business & Produk Digital Terpercaya")
  const [heroSubheadline, setHeroSubheadline] = useState("Unit laptop pilihan yang dites lolos QC 100%, garansi toko jelas, dan konsultasi gratis langsung via WhatsApp.")
  const [instagramUrl, setInstagramUrl] = useState("https://www.instagram.com/s/aGlnaGxpZ2h0OjE3OTI1ODg4MzI2NzYwNDM2?story_media_id=3106266946206908221&stkn=MWpwam1nMm13eDlwcg==")

  // Bank Accounts
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>(DEFAULT_BANKS)
  const [editingBank, setEditingBank] = useState<BankAccount | null>(null)

  // Products
  const [products, setProducts] = useState<ProductItem[]>(DEFAULT_PRODUCTS)
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null)
  const [specsInput, setSpecsInput] = useState("")

  // AI Copilot Auto-Fill State
  const [aiRawText, setAiRawText] = useState("")
  const [aiBase64Image, setAiBase64Image] = useState("")
  const [aiLoading, setAiLoading] = useState(false)
  const [aiPreviewProduct, setAiPreviewProduct] = useState<ProductItem | null>(null)

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          if (data.site_name) setSiteName(data.site_name)
          if (data.owner_name) setOwnerName(data.owner_name)
          if (data.company_tagline) setCompanyTagline(data.company_tagline)
          if (data.address) setAddress(data.address)
          if (data.contact_phone) setContactPhone(data.contact_phone)
          if (data.hero_headline) setHeroHeadline(data.hero_headline)
          if (data.hero_subheadline) setHeroSubheadline(data.hero_subheadline)
          if (data.instagram_url) setInstagramUrl(data.instagram_url)

          if (data.bank_accounts_json) {
            try { setBankAccounts(JSON.parse(data.bank_accounts_json)) } catch {}
          }
          if (data.catalog_products_json) {
            try {
              const loadedProducts: ProductItem[] = JSON.parse(data.catalog_products_json)
              const formatted = loadedProducts.map(p => ({
                ...p,
                images: p.images && p.images.length > 0 ? p.images : [p.image]
              }))
              setProducts(formatted)
            } catch {}
          }
        }
      })
      .catch(() => {})
  }, [])

  async function handleSaveAll() {
    setSaving(true)
    setMessage("")

    const payload = {
      site_name: siteName,
      owner_name: ownerName,
      company_tagline: companyTagline,
      address: address,
      contact_phone: contactPhone,
      hero_headline: heroHeadline,
      hero_subheadline: heroSubheadline,
      instagram_url: instagramUrl,
      bank_accounts_json: JSON.stringify(bankAccounts),
      catalog_products_json: JSON.stringify(products)
    }

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })

      if (res.ok) {
        setMessage("✅ Perubahan katalog berhasil disimpan ke database!")
        setTimeout(() => setMessage(""), 3000)
      } else {
        setMessage("❌ Gagal menyimpan data katalog")
      }
    } catch {
      setMessage("❌ Terjadi kesalahan koneksi")
    } finally {
      setSaving(false)
    }
  }

  // Process AI Admin Copilot
  async function handleProcessAiCopilot() {
    if (!aiRawText && !aiBase64Image) {
      alert("Silakan tempelkan teks WA mentah atau unggah foto spesifikasi terlebih dahulu!")
      return
    }

    setAiLoading(true)
    try {
      const res = await fetch("/api/admin/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: aiRawText,
          imageBase64: aiBase64Image,
          type: "laptop"
        })
      })

      const json = await res.json()
      if (json.success && json.data) {
        const defaultImg = "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80"
        const generated: ProductItem = {
          id: `prod-${Date.now()}`,
          title: json.data.title || "Produk Laptop Hasil AI Copilot",
          category: json.data.category || "laptop",
          badge: json.data.badge || "Paling Laris",
          badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
          stockStatus: "READY",
          priceText: json.data.priceText || "Rp 3.500.000",
          rawPriceText: json.data.rawPriceText || json.data.priceText || "Rp 3.500.000",
          image: defaultImg,
          images: [defaultImg],
          shortDesc: json.data.shortDesc || "Unit laptop business pilihan dengan kondisi mulus dan 100% lolos QC.",
          specs: Array.isArray(json.data.specs) ? json.data.specs : ["Prosesor: High Speed", "RAM: 8GB / 16GB", "SSD: 256GB / 512GB"],
          conditionNote: json.data.conditionNote || "Grade A Mulus 90-95%",
          warranty: json.data.warranty || "Garansi Toko 30 Hari",
          bonus: json.data.bonus || "Unit Laptop, Charger Original, Tas Laptop Baru & Mouse"
        }
        setAiPreviewProduct(generated)
      } else {
        alert("Gagal memproses AI. Menggunakan Draf Standar.")
      }
    } catch {
      alert("Terjadi kesalahan jaringan saat memanggil AI Copilot.")
    } finally {
      setAiLoading(false)
    }
  }

  // Publish AI Generated Draft
  function applyAiDraftToCatalog() {
    if (!aiPreviewProduct) return
    setProducts([aiPreviewProduct, ...products])
    openProductEditor(aiPreviewProduct)
    setAiPreviewProduct(null)
    setAiRawText("")
    setAiBase64Image("")
    setMessage("✅ Draf AI Copilot berhasil diterapkan! Silakan lengkapi foto dan simpan.")
    setTimeout(() => setMessage(""), 4000)
  }

  // Handle Multi-Image Upload (Up to 4 slots)
  function handleMultiImageUpload(slotIndex: number, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !editingProduct) return

    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran file gambar terlalu besar. Maksimal 5MB!")
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      const base64Data = reader.result as string
      const currentImages = editingProduct.images && editingProduct.images.length > 0
        ? [...editingProduct.images]
        : [editingProduct.image]

      currentImages[slotIndex] = base64Data

      setEditingProduct({
        ...editingProduct,
        image: currentImages[0] || base64Data,
        images: currentImages
      })
    }
    reader.readAsDataURL(file)
  }

  function handleImageUrlChange(slotIndex: number, newUrl: string) {
    if (!editingProduct) return
    const currentImages = editingProduct.images && editingProduct.images.length > 0
      ? [...editingProduct.images]
      : [editingProduct.image]

    currentImages[slotIndex] = newUrl

    setEditingProduct({
      ...editingProduct,
      image: currentImages[0] || newUrl,
      images: currentImages
    })
  }

  function deleteImageSlot(slotIndex: number) {
    if (!editingProduct) return
    const currentImages = editingProduct.images && editingProduct.images.length > 0
      ? [...editingProduct.images]
      : [editingProduct.image]

    currentImages.splice(slotIndex, 1)

    setEditingProduct({
      ...editingProduct,
      image: currentImages[0] || "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80",
      images: currentImages.length > 0 ? currentImages : ["https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80"]
    })
  }

  // Handle Video Upload (MP4 / WebM)
  function handleVideoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !editingProduct) return

    if (file.size > 20 * 1024 * 1024) {
      alert("Ukuran file video terlalu besar. Maksimal 20MB!")
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      const base64Video = reader.result as string
      setEditingProduct({ ...editingProduct, video: base64Video })
    }
    reader.readAsDataURL(file)
  }

  // Bank Actions
  function addBank() {
    const newBank: BankAccount = {
      id: `bank-${Date.now()}`,
      bank: "BANK BSI",
      account_number: "7368300677",
      beneficiary: ownerName || "Muhammad Aghisna"
    }
    setBankAccounts([...bankAccounts, newBank])
    setEditingBank(newBank)
  }

  function updateBank(updated: BankAccount) {
    setBankAccounts(bankAccounts.map((b) => (b.id === updated.id ? updated : b)))
  }

  function deleteBank(id: string) {
    setBankAccounts(bankAccounts.filter((b) => b.id !== id))
    if (editingBank?.id === id) setEditingBank(null)
  }

  // Product Actions
  function addProduct() {
    const title = "Produk Laptop / Digital Baru"
    const defaultImg = "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80"
    const newProd: ProductItem = {
      id: `prod-${Date.now()}`,
      title,
      category: "laptop",
      badge: "Ready Stock",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
      stockStatus: "READY",
      priceText: "Rp 3.500.000",
      rawPriceText: "Rp 3.500.000",
      image: defaultImg,
      images: [defaultImg],
      shortDesc: "Deskripsi singkat mengenai keunggulan produk ini.",
      specs: ["Spesifikasi 1", "Spesifikasi 2"],
      conditionNote: "Grade A Mulus Siap Pakai",
      warranty: "Garansi Toko 30 Hari",
      bonus: "Unit Laptop, Charger Original, Bonus Tas"
    }
    setProducts([...products, newProd])
    openProductEditor(newProd)
  }

  function openProductEditor(p: ProductItem) {
    const formattedImages = p.images && p.images.length > 0 ? [...p.images] : [p.image]
    setEditingProduct({ ...p, images: formattedImages })
    setSpecsInput(p.specs ? p.specs.join("\n") : "")
  }

  function saveEditingProduct() {
    if (!editingProduct) return
    const updatedSpecs = specsInput
      .split("\n")
      .map((s) => s.trim())
      .filter((s) => s.length > 0)

    const updatedImages = editingProduct.images && editingProduct.images.length > 0
      ? editingProduct.images.filter(img => img.trim().length > 0)
      : [editingProduct.image]

    const updated = {
      ...editingProduct,
      image: updatedImages[0] || editingProduct.image,
      images: updatedImages,
      specs: updatedSpecs
    }
    setProducts(products.map((p) => (p.id === updated.id ? updated : p)))
    setEditingProduct(null)
  }

  function deleteProduct(id: string) {
    if (confirm("Apakah Anda yakin ingin menghapus produk ini dari katalog?")) {
      setProducts(products.filter((p) => p.id !== id))
      if (editingProduct?.id === id) setEditingProduct(null)
    }
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 px-2 sm:px-4">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wider">
            Mughis Laptop Store Admin
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">Kelola Katalog Unit Ready Stock</h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">Single Source of Truth untuk halaman /katalog-laptop</p>
        </div>

        <button
          onClick={handleSaveAll}
          disabled={saving}
          className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition active:scale-95"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "Menyimpan..." : "Simpan Semua Perubahan"}</span>
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-xl text-xs sm:text-sm font-bold ${message.includes("✅") ? "bg-emerald-50 border border-emerald-200 text-emerald-800" : "bg-rose-50 border border-rose-200 text-rose-800"}`}>
          {message}
        </div>
      )}

      {/* Tabs Switcher */}
      <div className="flex border-b border-slate-200 gap-1 sm:gap-2 bg-white px-2 sm:px-4 pt-2 rounded-t-2xl overflow-x-auto">
        <button
          onClick={() => setActiveTab("products")}
          className={`flex items-center gap-1.5 px-3 sm:px-4 py-3 font-bold text-xs sm:text-sm border-b-2 transition whitespace-nowrap ${activeTab === "products" ? "border-emerald-600 text-emerald-700" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          <Laptop className="w-4 h-4" />
          <span>Produk Katalog ({products.length})</span>
        </button>
        <button
          onClick={() => setActiveTab("banks")}
          className={`flex items-center gap-1.5 px-3 sm:px-4 py-3 font-bold text-xs sm:text-sm border-b-2 transition whitespace-nowrap ${activeTab === "banks" ? "border-emerald-600 text-emerald-700" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Rekening Resmi ({bankAccounts.length})</span>
        </button>
        <button
          onClick={() => setActiveTab("store")}
          className={`flex items-center gap-1.5 px-3 sm:px-4 py-3 font-bold text-xs sm:text-sm border-b-2 transition whitespace-nowrap ${activeTab === "store" ? "border-emerald-600 text-emerald-700" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          <Building2 className="w-4 h-4" />
          <span>Informasi Toko & Hero</span>
        </button>
      </div>

      {/* TAB 1: PRODUCTS CRUD & AI ADMIN COPILOT */}
      {activeTab === "products" && (
        <div className="bg-white p-4 sm:p-6 rounded-b-2xl border border-slate-200 shadow-sm space-y-6">

          {/* 🤖 AI ADMIN COPILOT AUTO-FILL WIDGET */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 text-white space-y-4 shadow-xl border-2 border-teal-500/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-teal-500 text-slate-950 flex items-center justify-center font-bold">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-base text-white">AI Admin Copilot (Auto-Fill & Pratinjau)</h3>
                  <p className="text-xs text-teal-200">Tempelkan chat WA mentah dari supplier atau foto spesifikasi unit</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/40">
                Gemini AI Active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-teal-200 font-bold mb-1">Tempel Chat WA Mentah Supplier:</label>
                <textarea
                  rows={3}
                  placeholder="Contoh: ready lagi T480 i5 gen 8 ram 16 ssd 512 mulus 95% garansi 1 bln harga 3.5jt bonus tas mouse..."
                  value={aiRawText}
                  onChange={(e) => setAiRawText(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 font-medium focus:outline-none focus:border-teal-400"
                />
              </div>

              <div>
                <label className="block text-teal-200 font-bold mb-1">Atau Unggah Foto Spesifikasi / Brosur Unit:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (!file) return
                    const reader = new FileReader()
                    reader.onloadend = () => setAiBase64Image(reader.result as string)
                    reader.readAsDataURL(file)
                  }}
                  className="w-full p-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-teal-600 file:text-white font-bold"
                />
                {aiBase64Image && (
                  <p className="text-[10px] text-emerald-400 mt-1 font-bold">✓ File foto spesifikasi siap diproses AI</p>
                )}
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                onClick={handleProcessAiCopilot}
                disabled={aiLoading}
                className="px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg transition active:scale-95"
              >
                {aiLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                <span>{aiLoading ? "Menganalisis Data..." : "Proses dengan AI Copilot"}</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900">Unit Laptop & Produk Digital Ready Stock</h2>
              <p className="text-xs text-slate-500">Mendukung 4 galeri foto rasio 4:5 + Video produk MP4/URL.</p>
            </div>
            <button
              onClick={addProduct}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/20 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>+ Tambah Produk Baru Manual</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {products.map((p) => (
              <div key={p.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-emerald-500 transition">
                <div>
                  <div className="relative aspect-[4/5] w-full bg-slate-100">
                    <img src={p.images?.[0] || p.image} alt={p.title} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      {p.badge}
                    </span>
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-900/80 text-white backdrop-blur-sm">
                      📷 {p.images?.length || 1} Foto {p.video ? "• 🎥 Video" : ""}
                    </span>
                    <span className={`absolute top-2 right-2 px-2 py-0.5 rounded-md text-[10px] font-black uppercase ${p.stockStatus === 'READY' ? 'bg-emerald-600 text-white' : p.stockStatus === 'SOLD_OUT' ? 'bg-rose-600 text-white' : 'bg-slate-700 text-slate-200'}`}>
                      {p.stockStatus || 'READY'}
                    </span>
                  </div>

                  <div className="p-4 space-y-2 text-xs">
                    <h3 className="font-bold text-sm text-slate-900 leading-snug">{p.title}</h3>
                    <p className="text-emerald-700 font-extrabold text-base">{p.priceText}</p>
                    <p className="text-slate-600 line-clamp-2">{p.shortDesc}</p>
                  </div>
                </div>

                <div className="p-4 pt-0 flex gap-2">
                  <button
                    onClick={() => openProductEditor(p)}
                    className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl font-bold text-slate-800 text-xs flex items-center justify-center gap-1"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Unit</span>
                  </button>
                  <button
                    onClick={() => deleteProduct(p.id)}
                    className="px-3 py-2 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl text-rose-700 font-bold text-xs"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* AI DRAFT PREVIEW MODAL */}
          {aiPreviewProduct && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
              <div className="bg-white border border-slate-300 max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl p-6 space-y-4 text-slate-900 relative">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2">
                    <Bot className="w-5 h-5 text-teal-600" />
                    <h3 className="font-extrabold text-base text-slate-900">Pratinjau Draf Hasil AI Copilot</h3>
                  </div>
                  <button onClick={() => setAiPreviewProduct(null)} className="text-slate-400 hover:text-slate-800">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                  <span className="px-3 py-1 rounded-full font-bold bg-teal-100 text-teal-800 uppercase text-[10px]">
                    {aiPreviewProduct.badge}
                  </span>
                  <h4 className="font-black text-lg text-slate-900">{aiPreviewProduct.title}</h4>
                  <p className="text-xl font-black text-teal-800">{aiPreviewProduct.priceText}</p>
                  <p className="text-slate-600 leading-relaxed font-medium">{aiPreviewProduct.shortDesc}</p>

                  <div className="pt-2 border-t border-slate-200">
                    <p className="font-bold text-slate-900 mb-1">Spesifikasi Hasil Ekstraksi:</p>
                    <ul className="space-y-1 text-slate-700 font-medium">
                      {aiPreviewProduct.specs.map((s, idx) => (
                        <li key={idx}>✓ {s}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setAiPreviewProduct(null)}
                    className="px-4 py-2 rounded-xl border border-slate-300 font-bold text-xs text-slate-600"
                  >
                    Batal
                  </button>
                  <button
                    onClick={applyAiDraftToCatalog}
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
                  >
                    <Check className="w-4 h-4" />
                    <span>Terapkan & Publish ke Website</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Product Editor Form Box with 4-Image Slots & Video Upload */}
          {editingProduct && (
            <div className="p-4 sm:p-6 rounded-2xl border-2 border-emerald-500 bg-slate-50 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                <h3 className="font-bold text-sm sm:text-base text-slate-900">Editor Unit: {editingProduct.title}</h3>
                <button onClick={() => setEditingProduct(null)} className="text-slate-400 hover:text-slate-700 text-xs font-bold">
                  ✕ Tutup Editor
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Judul / Nama Produk</label>
                  <input
                    type="text"
                    value={editingProduct.title}
                    onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-slate-300 bg-white font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kategori Produk</label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as any })}
                    className="w-full p-2.5 rounded-lg border border-slate-300 bg-white font-bold text-slate-900"
                  >
                    <option value="laptop">Laptop Business</option>
                    <option value="digital">Produk Digital & Lisensi</option>
                    <option value="budget">Promo & Pilihan Hemat</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Status Stok</label>
                  <select
                    value={editingProduct.stockStatus || "READY"}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stockStatus: e.target.value as any })}
                    className="w-full p-2.5 rounded-lg border border-slate-300 bg-white font-bold text-slate-900"
                  >
                    <option value="READY">Ready Stock (Tampil)</option>
                    <option value="SOLD_OUT">Sold Out (Terjual)</option>
                    <option value="HIDDEN">Hidden (Sembunyikan dari Publik)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Badge Text (e.g. "Ultrabook Tipis")</label>
                  <input
                    type="text"
                    value={editingProduct.badge}
                    onChange={(e) => setEditingProduct({ ...editingProduct, badge: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-slate-300 bg-white font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Teks Harga Kartu (e.g. "Rp 3.750.000")</label>
                  <input
                    type="text"
                    value={editingProduct.priceText}
                    onChange={(e) => setEditingProduct({ ...editingProduct, priceText: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-slate-300 bg-white font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Teks Harga Detail Modal</label>
                  <input
                    type="text"
                    value={editingProduct.rawPriceText}
                    onChange={(e) => setEditingProduct({ ...editingProduct, rawPriceText: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-slate-300 bg-white font-bold text-slate-900"
                  />
                </div>

                {/* 4-IMAGE GALERI SLOTS SECTION WITH ASPECT 4:5 */}
                <div className="md:col-span-2 p-4 rounded-xl bg-white border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="block font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                        Galeri Foto Produk Rasio 4:5 (Hingga 4 Foto Multi-Sudut)
                      </label>
                      <p className="text-[11px] text-slate-500 font-medium">Slot 1 = Foto Utama Kartu. Slot 2-4 = Foto Samping, Keyboard, & Layar.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {[0, 1, 2, 3].map((slotIdx) => {
                      const currentImages = editingProduct.images && editingProduct.images.length > 0 ? editingProduct.images : [editingProduct.image]
                      const slotImage = currentImages[slotIdx] || ""

                      return (
                        <div key={slotIdx} className="p-3 rounded-xl bg-slate-50 border border-slate-300 space-y-2 relative">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-[11px] text-slate-700">Foto Slot #{slotIdx + 1} {slotIdx === 0 ? "(Utama)" : ""}</span>
                            {slotImage && slotIdx > 0 && (
                              <button
                                onClick={() => deleteImageSlot(slotIdx)}
                                className="p-1 rounded bg-rose-100 text-rose-700 hover:bg-rose-200 text-[10px] font-bold"
                              >
                                Hapus
                              </button>
                            )}
                          </div>

                          <div className="w-full aspect-[4/5] rounded-lg bg-slate-200 overflow-hidden relative border border-slate-300">
                            {slotImage ? (
                              <img src={slotImage} alt={`Slot ${slotIdx + 1}`} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 text-[11px] font-bold">
                                <ImageIcon className="w-6 h-6 mb-1 text-slate-300" />
                                <span>Kosong</span>
                              </div>
                            )}
                          </div>

                          <label className="w-full py-2 px-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold text-[11px] flex items-center justify-center gap-1 cursor-pointer transition">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload Foto</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleMultiImageUpload(slotIdx, e)}
                              className="hidden"
                            />
                          </label>

                          <input
                            type="text"
                            placeholder="Atau Paste URL..."
                            value={slotImage}
                            onChange={(e) => handleImageUrlChange(slotIdx, e.target.value)}
                            className="w-full p-1.5 rounded border border-slate-300 bg-white font-mono text-[10px] text-slate-900"
                          />
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* VIDEO PRODUCT SECTION */}
                <div className="md:col-span-2 p-4 rounded-xl bg-white border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="block font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                        Video Showroom Produk (Opsional - MP4 / YouTube / TikTok / Reel)
                      </label>
                      <p className="text-[11px] text-slate-500 font-medium">Unggah video durasi 10-30 detik perlihatkan kondisi nyala bodi/keyboard laptop.</p>
                    </div>
                    {editingProduct.video && (
                      <button
                        onClick={() => setEditingProduct({ ...editingProduct, video: "" })}
                        className="px-2.5 py-1 rounded bg-rose-100 text-rose-700 hover:bg-rose-200 text-xs font-bold"
                      >
                        Hapus Video
                      </button>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    {editingProduct.video ? (
                      <div className="w-36 h-28 rounded-xl bg-slate-900 overflow-hidden shrink-0 border border-slate-300 relative flex items-center justify-center">
                        {editingProduct.video.startsWith("data:video") || editingProduct.video.endsWith(".mp4") ? (
                          <video src={editingProduct.video} controls className="w-full h-full object-cover" />
                        ) : (
                          <div className="text-white text-[10px] font-bold text-center p-2">
                            🎥 Link Video Terpasang
                          </div>
                        )}
                      </div>
                    ) : null}

                    <div className="flex-1 space-y-2 w-full">
                      <label className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs inline-flex items-center gap-2 cursor-pointer shadow-md shadow-indigo-600/20 active:scale-95 transition">
                        <Video className="w-4 h-4" />
                        <span>Upload File Video MP4 (Dari HP / Laptop)</span>
                        <input
                          type="file"
                          accept="video/mp4,video/webm,video/*"
                          onChange={handleVideoUpload}
                          className="hidden"
                        />
                      </label>
                      <p className="text-[11px] text-slate-500 font-medium">Atau tempelkan Link Video (YouTube Shorts / TikTok / Instagram Reel / MP4 URL):</p>
                      <input
                        type="text"
                        placeholder="https://www.youtube.com/shorts/... atau https://..."
                        value={editingProduct.video || ""}
                        onChange={(e) => setEditingProduct({ ...editingProduct, video: e.target.value })}
                        className="w-full p-2 rounded-lg border border-slate-300 bg-slate-50 font-mono text-[11px] text-slate-900"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kondisi & Grade Unit</label>
                  <input
                    type="text"
                    value={editingProduct.conditionNote || "Grade A Mulus 90-95%"}
                    onChange={(e) => setEditingProduct({ ...editingProduct, conditionNote: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-slate-300 bg-white font-medium text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Ketentuan Garansi</label>
                  <input
                    type="text"
                    value={editingProduct.warranty || "Garansi Toko 30 Hari"}
                    onChange={(e) => setEditingProduct({ ...editingProduct, warranty: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-slate-300 bg-white font-medium text-slate-900"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Deskripsi Singkat</label>
                  <textarea
                    rows={2}
                    value={editingProduct.shortDesc}
                    onChange={(e) => setEditingProduct({ ...editingProduct, shortDesc: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-slate-300 bg-white font-medium text-slate-900"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Spesifikasi Lengkap (Satu spesifikasi per baris)</label>
                  <textarea
                    rows={4}
                    value={specsInput}
                    onChange={(e) => setSpecsInput(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 bg-white font-mono text-xs text-slate-900"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Bonus & Kelengkapan</label>
                  <input
                    type="text"
                    value={editingProduct.bonus}
                    onChange={(e) => setEditingProduct({ ...editingProduct, bonus: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-slate-300 bg-white font-medium text-slate-900"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => setEditingProduct(null)} className="px-4 py-2 rounded-xl border border-slate-300 font-bold text-xs text-slate-600">
                  Batal
                </button>
                <button onClick={saveEditingProduct} className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs">
                  Simpan Perubahan Unit
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: BANK ACCOUNTS */}
      {activeTab === "banks" && (
        <div className="bg-white p-4 sm:p-6 rounded-b-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900">Rekening Resmi Pembayaran</h2>
            <button
              onClick={addBank}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Rekening</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bankAccounts.map((b) => (
              <div key={b.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 relative">
                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-sm text-emerald-800">{b.bank}</span>
                  <div className="flex items-center gap-1">
                    <button onClick={() => setEditingBank({ ...b })} className="p-1.5 text-slate-500 hover:text-emerald-600">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button onClick={() => deleteBank(b.id)} className="p-1.5 text-slate-500 hover:text-rose-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-xl font-black font-mono text-slate-900">{b.account_number}</p>
                <p className="text-xs font-bold text-slate-600">a/n {b.beneficiary}</p>
              </div>
            ))}
          </div>

          {editingBank && (
            <div className="p-5 rounded-2xl border-2 border-emerald-500 bg-emerald-50/40 space-y-3">
              <h3 className="font-bold text-sm text-slate-900">Edit Rekening Bank</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <input
                  type="text"
                  placeholder="Nama Bank (e.g. BANK BSI)"
                  value={editingBank.bank}
                  onChange={(e) => setEditingBank({ ...editingBank, bank: e.target.value })}
                  className="bg-white border border-slate-300 rounded-lg p-2.5 font-semibold text-slate-900"
                />
                <input
                  type="text"
                  placeholder="Nomor Rekening"
                  value={editingBank.account_number}
                  onChange={(e) => setEditingBank({ ...editingBank, account_number: e.target.value })}
                  className="bg-white border border-slate-300 rounded-lg p-2.5 font-black font-mono text-slate-900"
                />
                <input
                  type="text"
                  placeholder="Atas Nama (Beneficiary)"
                  value={editingBank.beneficiary}
                  onChange={(e) => setEditingBank({ ...editingBank, beneficiary: e.target.value })}
                  className="bg-white border border-slate-300 rounded-lg p-2.5 font-semibold text-slate-900"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => setEditingBank(null)} className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-600">
                  Batal
                </button>
                <button
                  onClick={() => {
                    updateBank(editingBank)
                    setEditingBank(null)
                  }}
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold"
                >
                  Simpan Rekening
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: STORE & HERO SETTINGS */}
      {activeTab === "store" && (
        <div className="bg-white p-4 sm:p-6 rounded-b-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-base sm:text-lg font-extrabold text-slate-900 border-b border-slate-100 pb-3">Pengaturan Identitas Toko & Banner Hero</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Nama Toko / Brand</label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 font-medium text-slate-900 focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Nama Owner / Pemilik</label>
              <input
                type="text"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 font-medium text-slate-900 focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Alamat Fisik Toko</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 font-medium text-slate-900 focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">No. WhatsApp CS (Format: 0852xxx atau 628xxx)</label>
              <input
                type="text"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 font-medium text-slate-900 focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-slate-700 font-bold mb-1">Hero Headline Utama</label>
              <input
                type="text"
                value={heroHeadline}
                onChange={(e) => setHeroHeadline(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 font-bold text-slate-900 focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-slate-700 font-bold mb-1">Hero Subheadline Deskripsi</label>
              <textarea
                rows={2}
                value={heroSubheadline}
                onChange={(e) => setHeroSubheadline(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 font-medium text-slate-900 focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-slate-700 font-bold mb-1">URL Link Highlight Testimoni Instagram</label>
              <input
                type="text"
                value={instagramUrl}
                onChange={(e) => setInstagramUrl(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 font-mono text-xs text-slate-900 focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
