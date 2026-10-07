"use client"

import { useEffect, useState } from "react"
import { Building2, CreditCard, Laptop, Plus, Trash2, Edit3, Save, Eye, EyeOff, ShieldAlert, Check, Copy } from "lucide-react"

interface BankAccount {
  id: string
  bank: string
  account_number: string
  beneficiary: string
}

interface ProductItem {
  id: string
  title: string
  slug: string
  category: "laptop" | "digital" | "budget" | string
  badge: string
  badgeColor?: string
  stockStatus: "READY" | "SOLD_OUT" | "HIDDEN"
  priceText: string
  rawPriceText: string
  image: string
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
  }
]

export default function AdminKatalogLaptopPage() {
  const [activeTab, setActiveTab] = useState<"store" | "banks" | "products">("store")
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  // Store & Hero Settings
  const [siteName, setSiteName] = useState("Mughis Laptop Store")
  const [ownerName, setOwnerName] = useState("Muhammad Aghisna")
  const [companyTagline, setCompanyTagline] = useState("Pusat Laptop Business & Produk Digital Terpercaya")
  const [address, setAddress] = useState("Sangso, Samalanga, Bireuen, Aceh")
  const [contactPhone, setContactPhone] = useState("0852-1770-6587")
  const [heroHeadline, setHeroHeadline] = useState("Laptop Business Bekas Berkualitas, Siap Kerja & Siap Kuliah")
  const [heroSubheadline, setHeroSubheadline] = useState("Unit pilihan yang diperiksa sebelum dijual, dengan kondisi dijelaskan secara transparan, garansi toko sesuai ketentuan, dan konsultasi langsung melalui WhatsApp.")
  const [instagramUrl, setInstagramUrl] = useState("https://www.instagram.com/s/aGlnaGxpZ2h0OjE3OTI1ODg4MzI2NzYwNDM2?story_media_id=3106266946206908221&stkn=MWpwam1nMm13eDlwcg==")

  // Bank Accounts
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>(DEFAULT_BANKS)
  const [editingBank, setEditingBank] = useState<BankAccount | null>(null)

  // Products
  const [products, setProducts] = useState<ProductItem[]>(DEFAULT_PRODUCTS)
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null)
  const [specsInput, setSpecsInput] = useState("")

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
            try { setProducts(JSON.parse(data.catalog_products_json)) } catch {}
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
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-")
    const newProd: ProductItem = {
      id: `prod-${Date.now()}`,
      title,
      slug,
      category: "laptop",
      badge: "Ready Stock",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
      stockStatus: "READY",
      priceText: "Rp 3.000.000",
      rawPriceText: "Rp 3.000.000",
      image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80",
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
    setEditingProduct({ ...p })
    setSpecsInput(p.specs ? p.specs.join("\n") : "")
  }

  function saveEditingProduct() {
    if (!editingProduct) return
    const updatedSpecs = specsInput
      .split("\n")
      .map((s) => s.trim())
      .filter((s) => s.length > 0)

    const updated = {
      ...editingProduct,
      slug: editingProduct.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
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
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wider">
            Mughis Laptop Store Admin
          </span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-1">Kelola Katalog Laptop & Digital</h1>
          <p className="text-sm text-slate-500 font-medium">Single Source of Truth untuk halaman /katalog-laptop</p>
        </div>

        <button
          onClick={handleSaveAll}
          disabled={saving}
          className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "Menyimpan..." : "Simpan Semua Perubahan"}</span>
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-xl text-sm font-bold ${message.includes("✅") ? "bg-emerald-50 border border-emerald-200 text-emerald-800" : "bg-rose-50 border border-rose-200 text-rose-800"}`}>
          {message}
        </div>
      )}

      {/* Tabs Switcher */}
      <div className="flex border-b border-slate-200 gap-2 bg-white px-4 pt-2 rounded-t-2xl">
        <button
          onClick={() => setActiveTab("store")}
          className={`flex items-center gap-2 px-4 py-3 font-bold text-sm border-b-2 transition ${activeTab === "store" ? "border-emerald-600 text-emerald-700" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          <Building2 className="w-4 h-4" />
          <span>Informasi Toko, Hero & CS</span>
        </button>
        <button
          onClick={() => setActiveTab("banks")}
          className={`flex items-center gap-2 px-4 py-3 font-bold text-sm border-b-2 transition ${activeTab === "banks" ? "border-emerald-600 text-emerald-700" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Rekening Resmi ({bankAccounts.length})</span>
        </button>
        <button
          onClick={() => setActiveTab("products")}
          className={`flex items-center gap-2 px-4 py-3 font-bold text-sm border-b-2 transition ${activeTab === "products" ? "border-emerald-600 text-emerald-700" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          <Laptop className="w-4 h-4" />
          <span>Produk Katalog ({products.length})</span>
        </button>
      </div>

      {/* TAB 1: STORE & HERO SETTINGS */}
      {activeTab === "store" && (
        <div className="bg-white p-6 rounded-b-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900 border-b border-slate-100 pb-3">Pengaturan Identitas Toko & Banner Hero</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
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

      {/* TAB 2: BANK ACCOUNTS */}
      {activeTab === "banks" && (
        <div className="bg-white p-6 rounded-b-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h2 className="text-lg font-extrabold text-slate-900">Rekening Resmi Pembayaran</h2>
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

          {/* Edit Bank Box */}
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

      {/* TAB 3: PRODUCTS CRUD */}
      {activeTab === "products" && (
        <div className="bg-white p-6 rounded-b-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h2 className="text-lg font-extrabold text-slate-900">Kelola Unit Laptop & Produk Digital</h2>
            <button
              onClick={addProduct}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
            >
              <Plus className="w-4 h-4" />
              <span>+ Tambah Produk Baru</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div key={p.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-emerald-500 transition">
                <div>
                  <div className="relative h-44 bg-slate-100">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      {p.badge}
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

          {/* Product Editor Form Box */}
          {editingProduct && (
            <div className="p-6 rounded-2xl border-2 border-emerald-500 bg-slate-50 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                <h3 className="font-bold text-base text-slate-900">Editor Unit: {editingProduct.title}</h3>
                <button onClick={() => setEditingProduct(null)} className="text-slate-400 hover:text-slate-700 text-xs font-bold">
                  ✕ Tutup Editor
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
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
                    <option value="budget">Pilihan Hemat (&lt; 3 Jt)</option>
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
                  <label className="block font-bold text-slate-700 mb-1">Badge Text (e.g. "Paling Laris")</label>
                  <input
                    type="text"
                    value={editingProduct.badge}
                    onChange={(e) => setEditingProduct({ ...editingProduct, badge: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-slate-300 bg-white font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Teks Harga Kartu (e.g. "Rp 3.450.000")</label>
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

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Foto Utama / Gambar URL</label>
                  <input
                    type="text"
                    value={editingProduct.image}
                    onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-slate-300 bg-white font-mono text-[11px] text-slate-900"
                  />
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

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Ketentuan Garansi</label>
                  <input
                    type="text"
                    value={editingProduct.warranty || "Garansi Toko 60 Hari"}
                    onChange={(e) => setEditingProduct({ ...editingProduct, warranty: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-slate-300 bg-white font-medium text-slate-900"
                  />
                </div>

                <div>
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
    </div>
  )
}
