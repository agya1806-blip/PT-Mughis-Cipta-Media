"use client"

import { useEffect, useState } from "react"
import { Building2, CreditCard, Laptop, Plus, Trash2, Edit3, Save } from "lucide-react"

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
  priceText: string
  rawPriceText: string
  image: string
  shortDesc: string
  specs: string[]
  bonus: string
}

const DEFAULT_BANKS: BankAccount[] = [
  { id: "b1", bank: "Bank Central Asia (BCA)", account_number: "882091823341", beneficiary: "MUGHIS CIPTA MEDIA" },
  { id: "b2", bank: "Bank Mandiri", account_number: "1370029384721", beneficiary: "MUGHIS CIPTA MEDIA" },
  { id: "b3", bank: "Bank Rakyat Indonesia (BRI)", account_number: "034101002849532", beneficiary: "MUGHIS CIPTA MEDIA" }
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
      "Layar: 14.0 inch Full HD Anti-Silau",
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
      "Garansi: 100% Ganti Baru jika gagal aktivasi"
    ],
    bonus: "Buku panduan bergambar cara pasang, link download resmi, dan dibantu sampai tuntas via WA."
  }
]

export default function AdminKatalogPage() {
  const [activeTab, setActiveTab] = useState<"company" | "banks" | "products">("company")
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  // Company Settings
  const [siteName, setSiteName] = useState("TechVault.ID")
  const [companyTagline, setCompanyTagline] = useState("Pusat Laptop & Produk Digital Terpercaya")
  const [contactPhone, setContactPhone] = useState("6281234567890")
  const [instagramUrl, setInstagramUrl] = useState("https://instagram.com/mughisciptamedia")

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
          if (data.company_tagline) setCompanyTagline(data.company_tagline)
          if (data.contact_phone) setContactPhone(data.contact_phone)
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
      company_tagline: companyTagline,
      contact_phone: contactPhone,
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
        setMessage("✅ Perubahan berhasil disimpan ke database!")
        setTimeout(() => setMessage(""), 3000)
      } else {
        setMessage("❌ Gagal menyimpan data")
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
      bank: "Bank Baru",
      account_number: "0000000000",
      beneficiary: "PT MUGHIS CIPTA MEDIA"
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
    const newProd: ProductItem = {
      id: `prod-${Date.now()}`,
      title: "Produk Laptop / Digital Baru",
      category: "laptop",
      badge: "Ready Stock",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
      priceText: "Harga Mulai Rp3.000.000",
      rawPriceText: "Mulai Rp3.000.000",
      image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80",
      shortDesc: "Deskripsi singkat mengenai keunggulan produk ini.",
      specs: ["Spesifikasi 1", "Spesifikasi 2"],
      bonus: "Unit, Charger Original, Tas Laptop"
    }
    setProducts([...products, newProd])
    openProductEditor(newProd)
  }

  function openProductEditor(p: ProductItem) {
    setEditingProduct({ ...p })
    setSpecsInput(p.specs.join("\n"))
  }

  function saveEditingProduct() {
    if (!editingProduct) return
    const updatedSpecs = specsInput
      .split("\n")
      .map((s) => s.trim())
      .filter((s) => s.length > 0)

    const updated = { ...editingProduct, specs: updatedSpecs }
    setProducts(products.map((p) => (p.id === updated.id ? updated : p)))
    setEditingProduct(null)
  }

  function deleteProduct(id: string) {
    setProducts(products.filter((p) => p.id !== id))
    if (editingProduct?.id === id) setEditingProduct(null)
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Kelola Katalog Laptop & Digital</h1>
          <p className="text-sm text-slate-500 font-medium">Ubah informasi perusahaan, rekening resmi, dan daftar produk katalog secara live.</p>
        </div>

        <button
          onClick={handleSaveAll}
          disabled={saving}
          className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-teal-600/20 transition"
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
          onClick={() => setActiveTab("company")}
          className={`flex items-center gap-2 px-4 py-3 font-bold text-sm border-b-2 transition ${activeTab === "company" ? "border-teal-600 text-teal-700" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          <Building2 className="w-4 h-4" />
          <span>Info Perusahaan & CS</span>
        </button>
        <button
          onClick={() => setActiveTab("banks")}
          className={`flex items-center gap-2 px-4 py-3 font-bold text-sm border-b-2 transition ${activeTab === "banks" ? "border-teal-600 text-teal-700" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Rekening Resmi ({bankAccounts.length})</span>
        </button>
        <button
          onClick={() => setActiveTab("products")}
          className={`flex items-center gap-2 px-4 py-3 font-bold text-sm border-b-2 transition ${activeTab === "products" ? "border-teal-600 text-teal-700" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          <Laptop className="w-4 h-4" />
          <span>Katalog Produk ({products.length})</span>
        </button>
      </div>

      {/* TAB 1: COMPANY INFO */}
      {activeTab === "company" && (
        <div className="bg-white p-6 rounded-b-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900 border-b border-slate-100 pb-3">Informasi Brand & Kontak</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Nama Brand / Usaha</label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 font-medium text-slate-900 focus:outline-none focus:border-teal-600"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Subtitle / Tagline Katalog</label>
              <input
                type="text"
                value={companyTagline}
                onChange={(e) => setCompanyTagline(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 font-medium text-slate-900 focus:outline-none focus:border-teal-600"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">No. WhatsApp CS (Format: 628xxx)</label>
              <input
                type="text"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 font-medium text-slate-900 focus:outline-none focus:border-teal-600"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">URL Instagram Testimoni</label>
              <input
                type="text"
                value={instagramUrl}
                onChange={(e) => setInstagramUrl(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 font-medium text-slate-900 focus:outline-none focus:border-teal-600"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BANK ACCOUNTS */}
      {activeTab === "banks" && (
        <div className="bg-white p-6 rounded-b-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h2 className="text-lg font-extrabold text-slate-900">Rekening Resmi Perusahaan</h2>
            <button
              onClick={addBank}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Rekening</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bankAccounts.map((b) => (
              <div key={b.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 relative">
                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-sm text-teal-800">{b.bank}</span>
                  <div className="flex items-center gap-1">
                    <button onClick={() => setEditingBank({ ...b })} className="p-1.5 text-slate-500 hover:text-teal-600">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button onClick={() => deleteBank(b.id)} className="p-1.5 text-slate-500 hover:text-rose-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-lg font-extrabold font-mono text-slate-900">{b.account_number}</p>
                <p className="text-xs font-semibold text-slate-600">a/n {b.beneficiary}</p>
              </div>
            ))}
          </div>

          {/* Edit Bank Modal / Box */}
          {editingBank && (
            <div className="p-5 rounded-2xl border-2 border-teal-500 bg-teal-50/40 space-y-3">
              <h3 className="font-bold text-sm text-slate-900">Edit Rekening Bank</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <input
                  type="text"
                  placeholder="Nama Bank (e.g. Bank BCA)"
                  value={editingBank.bank}
                  onChange={(e) => setEditingBank({ ...editingBank, bank: e.target.value })}
                  className="bg-white border border-slate-300 rounded-lg p-2.5 font-semibold text-slate-900"
                />
                <input
                  type="text"
                  placeholder="Nomor Rekening"
                  value={editingBank.account_number}
                  onChange={(e) => setEditingBank({ ...editingBank, account_number: e.target.value })}
                  className="bg-white border border-slate-300 rounded-lg p-2.5 font-bold font-mono text-slate-900"
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
                  className="px-4 py-1.5 rounded-lg bg-teal-600 text-white text-xs font-bold"
                >
                  Simpan Rekening
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: PRODUCTS */}
      {activeTab === "products" && (
        <div className="bg-white p-6 rounded-b-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h2 className="text-lg font-extrabold text-slate-900">Katalog Produk Laptop & Digital</h2>
            <button
              onClick={addProduct}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Produk</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div key={p.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
                <div>
                  <div className="relative h-44 bg-slate-100">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 text-teal-800 border border-teal-300">
                      {p.badge}
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
                    <span>Edit</span>
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
            <div className="p-6 rounded-2xl border-2 border-teal-500 bg-slate-50 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                <h3 className="font-bold text-base text-slate-900">Editor Produk: {editingProduct.title}</h3>
                <button onClick={() => setEditingProduct(null)} className="text-slate-400 hover:text-slate-700 text-xs font-bold">
                  ✕ Tutup Editor
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Judul Produk</label>
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
                  <label className="block font-bold text-slate-700 mb-1">Badge Text (e.g. "Paling Laris")</label>
                  <input
                    type="text"
                    value={editingProduct.badge}
                    onChange={(e) => setEditingProduct({ ...editingProduct, badge: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-slate-300 bg-white font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Teks Harga Kartu (e.g. "Harga Mulai Rp3.450.000")</label>
                  <input
                    type="text"
                    value={editingProduct.priceText}
                    onChange={(e) => setEditingProduct({ ...editingProduct, priceText: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-slate-300 bg-white font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Teks Harga Modal Detail</label>
                  <input
                    type="text"
                    value={editingProduct.rawPriceText}
                    onChange={(e) => setEditingProduct({ ...editingProduct, rawPriceText: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-slate-300 bg-white font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Gambar URL (Unsplash / Cloud Storage)</label>
                  <input
                    type="text"
                    value={editingProduct.image}
                    onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-slate-300 bg-white font-medium text-slate-900 font-mono text-[11px]"
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
                <button onClick={saveEditingProduct} className="px-6 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs">
                  Simpan Produk Ini
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
