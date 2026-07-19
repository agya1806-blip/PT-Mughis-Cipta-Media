"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/components/CartProvider"

interface Province {
  province_id: string
  province: string
}

interface City {
  city_id: string
  city_name: string
  postal_code: string
}

interface Subdistrict {
  subdistrict_id: string
  subdistrict_name: string
}

interface ShippingCost {
  service: string
  description: string
  cost: number
  etd: string
}

interface CourierResult {
  code: string
  name: string
  costs: ShippingCost[]
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, subtotal, totalWeight, clearCart } = useCart()

  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    shippingAddress: "",
    province: "",
    provinceId: "",
    city: "",
    cityId: "",
    subdistrict: "",
    subdistrictId: "",
    notes: "",
  })

  const [provinces, setProvinces] = useState<Province[]>([])
  const [cities, setCities] = useState<City[]>([])
  const [subdistricts, setSubdistricts] = useState<Subdistrict[]>([])
  const [couriers, setCouriers] = useState<CourierResult[]>([])
  const [selectedCourier, setSelectedCourier] = useState("jne")
  const [selectedService, setSelectedService] = useState<ShippingCost | null>(null)
  const [shippingCost, setShippingCost] = useState(0)
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart")
      return
    }
    fetch("/api/shipping/provinces")
      .then((r) => r.json())
      .then((data) => setProvinces(data as Province[]))
      .catch(() => {})
  }, [items, router])

  const loadCities = useCallback(async (provinceId: string) => {
    const res = await fetch(`/api/shipping/cities?province=${provinceId}`)
    const data = await res.json()
    setCities(data as City[])
    setSubdistricts([])
    setCouriers([])
    setShippingCost(0)
    setSelectedService(null)
  }, [])

  const loadSubdistricts = useCallback(async (cityId: string) => {
    const res = await fetch(`/api/shipping/subdistricts?city=${cityId}`)
    const data = await res.json()
    setSubdistricts(data as Subdistrict[])
    setCouriers([])
    setShippingCost(0)
    setSelectedService(null)
  }, [])

  const calculateShipping = useCallback(async () => {
    if (!form.subdistrictId || !totalWeight) return
    setLoading(true)
    try {
      const res = await fetch("/api/shipping/cost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination: form.subdistrictId,
          weight: totalWeight,
          courier: selectedCourier,
        }),
      })
      const data = await res.json()
      setCouriers(data as CourierResult[])
      setSelectedService(null)
      setShippingCost(0)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [form.subdistrictId, totalWeight, selectedCourier])

  const grandTotal = subtotal + shippingCost

  async function handleSubmit() {
    setSubmitting(true)
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            bookId: i.bookId,
            title: i.title,
            price: i.price,
            quantity: i.quantity,
            weight: i.weight,
            coverImage: i.coverImage,
          })),
          customerName: form.customerName,
          customerEmail: form.customerEmail,
          customerPhone: form.customerPhone,
          shippingAddress: form.shippingAddress,
          province: form.province,
          city: form.city,
          subdistrict: form.subdistrict,
          courier: selectedCourier,
          courierService: selectedService?.service || "",
          shippingCost,
          shippingEtd: selectedService?.etd || "",
          notes: form.notes,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      clearCart()

      if (data.paymentUrl) {
        window.location.href = data.paymentUrl
      } else {
        router.push(`/order/${data.orderId}`)
      }
    } catch (e) {
      const message = e instanceof Error ? e.message : "Terjadi kesalahan"
      alert(message)
    } finally {
      setSubmitting(false)
    }
  }

  if (items.length === 0) return null

  return (
    <div className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
      <h1 className="text-2xl font-bold text-zinc-800 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-zinc-200 p-6">
            <h2 className="text-lg font-semibold text-zinc-800 mb-4">Data Pelanggan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-600 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                  value={form.customerName}
                  onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-600 mb-1">Email</label>
                <input
                  type="email"
                  required
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                  value={form.customerEmail}
                  onChange={(e) => setForm({ ...form, customerEmail: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-600 mb-1">No. WhatsApp</label>
                <input
                  type="tel"
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                  value={form.customerPhone}
                  onChange={(e) => setForm({ ...form, customerPhone: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-zinc-200 p-6">
            <h2 className="text-lg font-semibold text-zinc-800 mb-4">Alamat Pengiriman</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-600 mb-1">Alamat Lengkap</label>
                <textarea
                  required
                  rows={3}
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                  value={form.shippingAddress}
                  onChange={(e) => setForm({ ...form, shippingAddress: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-600 mb-1">Provinsi</label>
                  <select
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                    value={form.provinceId}
                    onChange={(e) => {
                      const p = provinces.find((p) => p.province_id === e.target.value)
                      setForm({
                        ...form,
                        provinceId: e.target.value,
                        province: p?.province || "",
                        cityId: "",
                        city: "",
                        subdistrictId: "",
                        subdistrict: "",
                      })
                      loadCities(e.target.value)
                    }}
                  >
                    <option value="">Pilih Provinsi</option>
                    {provinces.map((p) => (
                      <option key={p.province_id} value={p.province_id}>
                        {p.province}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-600 mb-1">Kota/Kabupaten</label>
                  <select
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                    value={form.cityId}
                    onChange={(e) => {
                      const c = cities.find((c) => c.city_id === e.target.value)
                      setForm({
                        ...form,
                        cityId: e.target.value,
                        city: c?.city_name || "",
                        subdistrictId: "",
                        subdistrict: "",
                      })
                      loadSubdistricts(e.target.value)
                    }}
                    disabled={!form.provinceId}
                  >
                    <option value="">Pilih Kota</option>
                    {cities.map((c) => (
                      <option key={c.city_id} value={c.city_id}>
                        {c.city_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-600 mb-1">Kecamatan</label>
                  <select
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                    value={form.subdistrictId}
                    onChange={(e) => {
                      const s = subdistricts.find((s) => s.subdistrict_id === e.target.value)
                      setForm({
                        ...form,
                        subdistrictId: e.target.value,
                        subdistrict: s?.subdistrict_name || "",
                      })
                    }}
                    disabled={!form.cityId}
                  >
                    <option value="">Pilih Kecamatan</option>
                    {subdistricts.map((s) => (
                      <option key={s.subdistrict_id} value={s.subdistrict_id}>
                        {s.subdistrict_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-600 mb-1">Catatan (opsional)</label>
                <textarea
                  rows={2}
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Catatan untuk pengiriman..."
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-zinc-200 p-6">
            <h2 className="text-lg font-semibold text-zinc-800 mb-4">Kurir Pengiriman</h2>
            <div className="flex gap-3 mb-4 flex-wrap">
              {["jne", "tiki", "pos", "jnt", "sicepat"].map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setSelectedCourier(c)
                    setCouriers([])
                    setSelectedService(null)
                    setShippingCost(0)
                  }}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                    selectedCourier === c
                      ? "bg-gold text-white border-gold"
                      : "border-zinc-300 text-zinc-600 hover:bg-zinc-50"
                  }`}
                >
                  {c.toUpperCase()}
                </button>
              ))}
            </div>

            {form.subdistrictId && totalWeight ? (
              <button
                onClick={calculateShipping}
                disabled={loading}
                className="w-full sm:w-auto px-4 py-2 bg-gold text-white rounded-lg hover:bg-gold disabled:bg-gray-400 transition-colors font-medium mb-4"
              >
                {loading ? "Menghitung..." : "Cek Ongkos Kirim"}
              </button>
            ) : (
              <p className="text-sm text-zinc-500">Pilih kecamatan terlebih dahulu.</p>
            )}

            {couriers.length > 0 && (
              <div className="space-y-2 mt-4">
                {couriers[0]?.costs?.map((cost, idx) => (
                  <label
                    key={idx}
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedService?.service === cost.service
                        ? "border-gold bg-gold/5"
                        : "border-zinc-200 hover:bg-zinc-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="service"
                        checked={selectedService?.service === cost.service}
                        onChange={() => {
                          setSelectedService(cost)
                          setShippingCost(cost.cost)
                        }}
                        className="accent-gold"
                      />
                      <div>
                        <p className="font-medium text-sm text-zinc-800">{cost.service}</p>
                        <p className="text-xs text-zinc-500">{cost.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm text-zinc-800">
                        Rp {cost.cost.toLocaleString("id-ID")}
                      </p>
                      <p className="text-xs text-zinc-500">{cost.etd} hari</p>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-zinc-200 p-6 sticky top-8">
            <h2 className="text-lg font-semibold text-zinc-800 mb-4">Ringkasan Pesanan</h2>

            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div key={item.bookId} className="flex justify-between text-sm">
                  <span className="text-zinc-600 truncate mr-2">
                    {item.title} x{item.quantity}
                  </span>
                  <span className="text-zinc-800 font-medium">
                    Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-zinc-200 pt-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-600">Subtotal</span>
                <span className="text-zinc-800">Rp {subtotal.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-600">Ongkos Kirim</span>
                <span className="text-zinc-800">
                  {shippingCost > 0
                    ? `Rp ${shippingCost.toLocaleString("id-ID")}`
                    : "-"}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold text-zinc-800 pt-2 border-t border-zinc-200">
                <span>Total</span>
                <span>Rp {grandTotal.toLocaleString("id-ID")}</span>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={submitting || !form.customerName || !form.customerEmail || !form.shippingAddress || !selectedService}
              className="w-full mt-6 h-12 rounded-xl bg-gold text-white font-medium hover:bg-gold-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? "Memproses..." : "Bayar Sekarang"}
            </button>

            <p className="text-xs text-zinc-400 text-center mt-3">
              Pembayaran diproses secara aman melalui Midtrans
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
