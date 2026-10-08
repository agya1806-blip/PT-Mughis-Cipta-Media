"use client"

import { useEffect, useState } from "react"
import { Building2, CreditCard, Laptop, Plus, Trash2, Edit3, Save, Upload, Image as ImageIcon, Video, Star, MessageSquare } from "lucide-react"

interface BankAccount {
  id: string
  bank: string
  account_number: string
  beneficiary: string
}

interface TestimonialItem {
  id: string
  name: string
  location: string
  rating: number
  text: string
  photoUrl?: string
}

interface ProductItem {
  id: string
  title: string
  category: "laptop" | "digital" | "budget" | string
  useCase?: "mahasiswa" | "kantor" | "editing" | "all" | string
  badge: string
  badgeColor?: string
  stockStatus: "READY" | "LIMITED" | "SOLD_OUT" | "HIDDEN"
  priceText: string
  rawPriceText: string
  image: string
  images?: string[]
  video?: string
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
  }
]

export default function AdminKatalogLaptopPage() {
  const [activeTab, setActiveTab] = useState<"products" | "banks" | "testimonials" | "store">("products")
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

  // Testimonials
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(DEFAULT_TESTIMONIALS)
  const [editingTestimonial, setEditingTestimonial] = useState<TestimonialItem | null>(null)

  // Products
  const [products, setProducts] = useState<ProductItem[]>([])
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null)
  const [specsInput, setSpecsInput] = useState("")
  const [uploadingSlot, setUploadingSlot] = useState<number | null>(null)
  const [uploadingVideo, setUploadingVideo] = useState(false)

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
          if (data.catalog_testimonials_json) {
            try { setTestimonials(JSON.parse(data.catalog_testimonials_json)) } catch {}
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
      catalog_testimonials_json: JSON.stringify(testimonials),
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

  // Handle Multi-Image Upload (Up to 4 slots) via Server Endpoint
  async function handleMultiImageUpload(slotIndex: number, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !editingProduct) return

    if (file.size > 15 * 1024 * 1024) {
      alert("Ukuran file gambar terlalu besar. Maksimal 15MB!")
      return
    }

    try {
      setUploadingSlot(slotIndex)
      const formData = new FormData()
      formData.append("file", file)

      const res = await fetch("/api/upload/image", {
        method: "POST",
        body: formData
      })
      const data = await res.json()

      if (res.ok && data.url) {
        const currentImages = editingProduct.images && editingProduct.images.length > 0
          ? [...editingProduct.images]
          : [editingProduct.image]

        currentImages[slotIndex] = data.url

        setEditingProduct({
          ...editingProduct,
          image: currentImages[0] || data.url,
          images: currentImages
        })
      } else {
        alert(data.error || "Gagal mengunggah gambar. Silakan coba lagi.")
      }
    } catch {
      alert("Terjadi kesalahan koneksi saat mengunggah gambar.")
    } finally {
      setUploadingSlot(null)
    }
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

  // Handle Video Upload (MP4 / WebM) via Server Endpoint
  async function handleVideoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !editingProduct) return

    if (file.size > 25 * 1024 * 1024) {
      alert("Ukuran file video terlalu besar. Maksimal 25MB!")
      return
    }

    try {
      setUploadingVideo(true)
      const formData = new FormData()
      formData.append("file", file)

      const res = await fetch("/api/upload/image", {
        method: "POST",
        body: formData
      })
      const data = await res.json()

      if (res.ok && data.url) {
        setEditingProduct({ ...editingProduct, video: data.url })
      } else {
        alert(data.error || "Gagal mengunggah video.")
      }
    } catch {
      alert("Terjadi kesalahan koneksi saat mengunggah video.")
    } finally {
      setUploadingVideo(false)
    }
  }

  // Quick Stock Status Toggle Directly on Product Cards
  function toggleStockStatus(id: string, newStatus: "READY" | "LIMITED" | "SOLD_OUT" | "HIDDEN") {
    setProducts(products.map((p) => (p.id === id ? { ...p, stockStatus: newStatus } : p)))
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
    if (confirm("Apakah Anda yakin ingin menghapus rekening ini?")) {
      setBankAccounts(bankAccounts.filter((b) => b.id !== id))
      if (editingBank?.id === id) setEditingBank(null)
    }
  }

  // Testimonial Actions
  function addTestimonial() {
    const newTestimonial: TestimonialItem = {
      id: `testi-${Date.now()}`,
      name: "Nama Pembeli Baru",
      location: "Samalanga, Bireuen",
      rating: 5,
      text: "Laptop sangat mulus dan pelayanan ramah. Recommended!",
      photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
    }
    setTestimonials([...testimonials, newTestimonial])
    setEditingTestimonial(newTestimonial)
  }

  function updateTestimonial(updated: TestimonialItem) {
    setTestimonials(testimonials.map((t) => (t.id === updated.id ? updated : t)))
  }

  function deleteTestimonial(id: string) {
    if (confirm("Apakah Anda yakin ingin menghapus testimoni ini?")) {
      setTestimonials(testimonials.filter((t) => t.id !== id))
      if (editingTestimonial?.id === id) setEditingTestimonial(null)
    }
  }

  // Product Actions
  function addProduct() {
    const title = "Produk Laptop / Digital Baru"
    const defaultImg = "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80"
    const newProd: ProductItem = {
      id: `prod-${Date.now()}`,
      title,
      category: "laptop",
      useCase: "mahasiswa",
      badge: "Ready Stock",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
      stockStatus: "READY",
      priceText: "Rp 3.500.000",
      rawPriceText: "Rp 3.500.000",
      image: defaultImg,
      images: [defaultImg],
      shortDesc: "Deskripsi singkat mengenai keunggulan produk ini.",
      specs: ["Prosesor: Intel Core i5 Gen 8", "RAM: 8GB DDR4", "Penyimpanan: 256GB SSD"],
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
          <p className="text-xs sm:text-sm text-slate-500 font-medium">Pengelolaan Lengkap: Tambah, Edit, Hapus Produk, Rekening & Testimoni</p>
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
          onClick={() => setActiveTab("testimonials")}
          className={`flex items-center gap-1.5 px-3 sm:px-4 py-3 font-bold text-xs sm:text-sm border-b-2 transition whitespace-nowrap ${activeTab === "testimonials" ? "border-emerald-600 text-emerald-700" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Testimoni ({testimonials.length})</span>
        </button>
        <button
          onClick={() => setActiveTab("store")}
          className={`flex items-center gap-1.5 px-3 sm:px-4 py-3 font-bold text-xs sm:text-sm border-b-2 transition whitespace-nowrap ${activeTab === "store" ? "border-emerald-600 text-emerald-700" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          <Building2 className="w-4 h-4" />
          <span>Informasi Toko</span>
        </button>
      </div>

      {/* TAB 1: PRODUCTS CRUD */}
      {activeTab === "products" && (
        <div className="bg-white p-4 sm:p-6 rounded-b-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900">Unit Laptop & Produk Digital Ready Stock</h2>
              <p className="text-xs text-slate-500">Mendukung 4 galeri foto rasio 4:5 + Video produk MP4 + Status stok instan.</p>
            </div>
            <button
              onClick={addProduct}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/20 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>+ Tambah Produk Baru</span>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-6 w-full">
            {products.map((p) => (
              <div key={p.id} className="min-w-0 w-full max-w-full bg-white border border-slate-200 rounded-xl sm:rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between hover:border-emerald-500 transition">
                <div>
                  <div className="relative aspect-[16/10] sm:aspect-[4/5] w-full bg-slate-100">
                    <img src={p.images?.[0] || p.image} alt={p.title} className="w-full h-full object-cover" />
                    <span className="absolute top-1 left-1 sm:top-2 sm:left-2 px-1.5 sm:px-2.5 py-0.5 rounded-full text-[8px] sm:text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      {p.badge}
                    </span>
                    <span className="absolute bottom-1 left-1 sm:bottom-2 sm:left-2 px-1.5 py-0.5 rounded-md text-[8px] sm:text-[10px] font-bold bg-slate-900/80 text-white backdrop-blur-xs flex items-center gap-0.5">
                      📷 {p.images?.length || 1} Foto
                    </span>
                  </div>

                  <div className="p-2 sm:p-4 space-y-1 sm:space-y-2 text-xs">
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 leading-tight sm:leading-snug line-clamp-2">{p.title}</h3>
                    <p className="text-emerald-700 font-extrabold text-xs sm:text-base">{p.priceText}</p>

                    {/* Quick Stock Toggle Selector */}
                    <div className="pt-1">
                      <select
                        value={p.stockStatus || "READY"}
                        onChange={(e) => toggleStockStatus(p.id, e.target.value as any)}
                        className="w-full p-1 text-[10px] font-extrabold rounded border border-slate-300 bg-slate-50 text-slate-800"
                      >
                        <option value="READY">🟢 Ready Stock</option>
                        <option value="LIMITED">⚡ Sisa 1 Unit</option>
                        <option value="SOLD_OUT">🔴 Terjual (Sold Out)</option>
                        <option value="HIDDEN">🙈 Sembunyikan</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="p-2 sm:p-4 pt-0 flex gap-1 sm:gap-2">
                  <button
                    onClick={() => openProductEditor(p)}
                    className="flex-1 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg font-bold text-slate-800 text-[10px] sm:text-xs flex items-center justify-center gap-1"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => deleteProduct(p.id)}
                    className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg text-rose-700 font-bold text-[10px] sm:text-xs"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

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
                  <label className="block font-bold text-slate-700 mb-1">Kebutuhan Utama (Use Case)</label>
                  <select
                    value={editingProduct.useCase || "mahasiswa"}
                    onChange={(e) => setEditingProduct({ ...editingProduct, useCase: e.target.value as any })}
                    className="w-full p-2.5 rounded-lg border border-slate-300 bg-white font-bold text-slate-900"
                  >
                    <option value="mahasiswa">🎓 Mahasiswa & Skripsi</option>
                    <option value="kantor">💼 Perkantoran & Kasir</option>
                    <option value="editing">🎨 Editing & Multitasking</option>
                    <option value="all">🔥 Semua Kebutuhan</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Status Stok</label>
                  <select
                    value={editingProduct.stockStatus || "READY"}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stockStatus: e.target.value as any })}
                    className="w-full p-2.5 rounded-lg border border-slate-300 bg-white font-bold text-slate-900"
                  >
                    <option value="READY">🟢 Ready Stock (Tampil)</option>
                    <option value="LIMITED">⚡ Sisa 1 Unit (Stok Terbatas)</option>
                    <option value="SOLD_OUT">🔴 Sold Out (Terjual)</option>
                    <option value="HIDDEN">🙈 Hidden (Sembunyikan)</option>
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

                          <label className={`w-full py-2 px-2 rounded-lg text-white font-bold text-[11px] flex items-center justify-center gap-1 cursor-pointer transition ${uploadingSlot === slotIdx ? "bg-slate-400 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700"}`}>
                            <Upload className="w-3.5 h-3.5" />
                            <span>{uploadingSlot === slotIdx ? "Mengunggah..." : "Upload Foto"}</span>
                            <input
                              type="file"
                              accept="image/*"
                              disabled={uploadingSlot !== null}
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
                      <label className={`px-4 py-2.5 rounded-xl text-white font-bold text-xs inline-flex items-center gap-2 cursor-pointer shadow-md active:scale-95 transition ${uploadingVideo ? "bg-slate-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/20"}`}>
                        <Video className="w-4 h-4" />
                        <span>{uploadingVideo ? "Mengunggah Video..." : "Upload File Video MP4 (Dari HP / Laptop)"}</span>
                        <input
                          type="file"
                          accept="video/mp4,video/webm,video/*"
                          disabled={uploadingVideo}
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

      {/* TAB 3: TESTIMONIALS CRUD */}
      {activeTab === "testimonials" && (
        <div className="bg-white p-4 sm:p-6 rounded-b-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900">Ulasan & Testimoni Pembeli</h2>
              <p className="text-xs text-slate-500">Tampilkan ulasan pembeli asli & foto serah terima unit di halaman depan.</p>
            </div>
            <button
              onClick={addTestimonial}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Testimoni</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {testimonials.map((t) => (
              <div key={t.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 relative flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-extrabold text-sm text-slate-900">{t.name}</span>
                    <div className="flex items-center gap-1">
                      <button onClick={() => setEditingTestimonial({ ...t })} className="p-1 text-slate-500 hover:text-emerald-600">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button onClick={() => deleteTestimonial(t.id)} className="p-1 text-slate-500 hover:text-rose-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 font-bold">{t.location}</p>
                  <p className="text-xs text-slate-700 italic leading-relaxed">"{t.text}"</p>
                </div>
              </div>
            ))}
          </div>

          {editingTestimonial && (
            <div className="p-5 rounded-2xl border-2 border-emerald-500 bg-emerald-50/40 space-y-3 text-xs">
              <h3 className="font-bold text-sm text-slate-900">Editor Testimoni Pembeli</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nama Pembeli</label>
                  <input
                    type="text"
                    value={editingTestimonial.name}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })}
                    className="bg-white border border-slate-300 rounded-lg p-2.5 font-bold text-slate-900 w-full"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Lokasi Pembeli (e.g. Samalanga, Bireuen)</label>
                  <input
                    type="text"
                    value={editingTestimonial.location}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, location: e.target.value })}
                    className="bg-white border border-slate-300 rounded-lg p-2.5 font-bold text-slate-900 w-full"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Ulasan / Kesan Pembeli</label>
                  <textarea
                    rows={3}
                    value={editingTestimonial.text}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, text: e.target.value })}
                    className="bg-white border border-slate-300 rounded-lg p-2.5 font-medium text-slate-900 w-full"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => setEditingTestimonial(null)} className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-600">
                  Batal
                </button>
                <button
                  onClick={() => {
                    updateTestimonial(editingTestimonial)
                    setEditingTestimonial(null)
                  }}
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold"
                >
                  Simpan Testimoni
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: STORE SETTINGS */}
      {activeTab === "store" && (
        <div className="bg-white p-4 sm:p-6 rounded-b-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-base sm:text-lg font-extrabold text-slate-900 border-b border-slate-100 pb-3">Pengaturan Identitas Toko & Banner Hero</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Nama Toko</label>
              <input type="text" value={siteName} onChange={(e) => setSiteName(e.target.value)} className="w-full p-2.5 rounded-lg border border-slate-300 font-bold" />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Nama Owner Toko</label>
              <input type="text" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} className="w-full p-2.5 rounded-lg border border-slate-300 font-bold" />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Nomor WhatsApp CS</label>
              <input type="text" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} className="w-full p-2.5 rounded-lg border border-slate-300 font-bold font-mono" />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Alamat Fisik Toko</label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full p-2.5 rounded-lg border border-slate-300 font-bold" />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Link Highlight Testimoni Instagram</label>
              <input type="text" value={instagramUrl} onChange={(e) => setInstagramUrl(e.target.value)} className="w-full p-2.5 rounded-lg border border-slate-300 font-mono text-[11px]" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
