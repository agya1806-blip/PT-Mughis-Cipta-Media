"use client"

import { useState } from "react"
import { Printer, ArrowLeft, Phone, MapPin, ShieldCheck, CheckCircle, Award, Laptop, Copy, Check } from "lucide-react"
import { ProductItem, BankAccount } from "@/types/catalog"

const DEFAULT_BANKS: BankAccount[] = [
  { id: "b1", bank: "BANK BSI", account_number: "7368300677", beneficiary: "Muhammad Aghisna" },
  { id: "b2", bank: "BANK SEABANK", account_number: "901007430064", beneficiary: "Muhammad Aghisna" }
]

export default function PrintableBrosurClient({
  products = [],
  settings = {}
}: {
  products?: ProductItem[]
  settings?: Record<string, string>
}) {
  const siteName = settings.site_name || "Mughis Laptop Store"
  const ownerName = settings.owner_name || "Muhammad Aghisna"
  const address = settings.address || "Sangso, Samalanga, Bireuen, Aceh"
  const waPhone = settings.contact_phone || "0852-1770-6587"
  const formattedWa = waPhone.replace(/[^0-9]/g, "").replace(/^0/, "62")

  const bankAccounts: BankAccount[] = settings.bank_accounts_json
    ? JSON.parse(settings.bank_accounts_json)
    : DEFAULT_BANKS

  const currentDateStr = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  })

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans antialiased p-3 sm:p-8 print:p-0 print:bg-white">

      {/* NO-PRINT TOP CONTROL BAR */}
      <div className="max-w-5xl mx-auto mb-6 bg-slate-900 text-white p-4 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3 no-print">
        <div className="flex items-center gap-3">
          <a
            href="/katalog-laptop"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition flex items-center gap-1 text-xs font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Website</span>
          </a>
          <div>
            <h1 className="text-sm sm:text-base font-extrabold text-white">Brosur Katalog Ready Stock Printable A4</h1>
            <p className="text-[11px] text-slate-400">Siap dicetak ke kertas A4 atau disimpan sebagai file PDF.</p>
          </div>
        </div>

        <button
          onClick={() => window.print()}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition active:scale-95"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak Brosur A4 / Simpan PDF</span>
        </button>
      </div>

      {/* A4 PRINTABLE CONTAINER */}
      <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-slate-300 print:border-0 print:shadow-none print:rounded-none shadow-2xl p-6 sm:p-10 space-y-6 print:p-4">

        {/* BROCHURE HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-teal-700">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-teal-800 text-white flex items-center justify-center shrink-0 shadow-md">
              <Laptop className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight uppercase leading-tight">
                MUGHIS <span className="text-teal-700">LAPTOP STORE</span>
              </h2>
              <p className="text-xs font-bold text-teal-800">Pusat Laptop Business Bekas Berkualitas & Produk Digital Samalanga</p>
              <p className="text-[11px] text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-teal-600 shrink-0" />
                <span>Alamat Toko: {address}</span>
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right text-xs space-y-1 bg-teal-50 p-3 rounded-xl border border-teal-200">
            <p className="font-extrabold text-slate-900">Owner: {ownerName}</p>
            <p className="font-bold text-emerald-800 font-mono">CS WA: {waPhone}</p>
            <p className="text-[10px] text-slate-500 font-medium">Brosur Per Tanggal: {currentDateStr}</p>
          </div>
        </div>

        {/* PROMO & GUARANTEE BANNER */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-teal-800 to-teal-900 text-white flex flex-wrap items-center justify-between gap-2 text-xs font-bold">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Garansi Toko Resmi 30 Hari</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>100% Lolos QC Hardware</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Pengiriman Travel L300 / Cargo JNE</span>
          </span>
        </div>

        {/* PRODUCTS GRID PRINTABLE */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              Daftar Unit Laptop & Produk Digital Ready Stock ({products.length} Unit)
            </h3>
            <span className="text-[10px] text-slate-500 font-bold">Siap Pakai • Windows 11 & Office Original</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 print:grid-cols-2 print:gap-3">
            {products.map((p) => (
              <div
                key={p.id}
                className="border border-slate-300 rounded-2xl p-3.5 bg-white shadow-xs flex gap-3.5 items-start print:page-break-inside-avoid print:p-3"
              >
                {/* Photo 4:5 Aspect Ratio */}
                <div className="w-28 aspect-[4/5] rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 relative">
                  <img
                    src={p.images?.[0] || p.image}
                    alt={p.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded text-[8px] font-bold bg-white/90 text-slate-900 shadow-xs border border-slate-200">
                    {p.badge}
                  </span>
                </div>

                {/* Details */}
                <div className="flex-1 space-y-1.5 min-w-0">
                  <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 leading-snug line-clamp-2">
                    {p.title}
                  </h4>

                  <div className="text-sm font-black text-teal-700">
                    {p.priceText}
                  </div>

                  <ul className="text-[10px] font-semibold text-slate-600 space-y-0.5 border-t border-slate-100 pt-1">
                    {p.specs.slice(0, 4).map((s, idx) => (
                      <li key={idx} className="line-clamp-1 flex items-start gap-1">
                        <span className="text-teal-700 font-bold">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>

                  {p.bonus && (
                    <p className="text-[9px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 line-clamp-1">
                      Bonus: {p.bonus}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* OFFICIAL BANK ACCOUNTS & ORDER FOOTER */}
        <div className="pt-4 border-t-2 border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 print:grid-cols-2 text-xs">
          <div className="p-3.5 rounded-2xl bg-teal-50 border border-teal-200 space-y-2">
            <span className="font-extrabold text-teal-900 text-xs uppercase tracking-wider block">
              Rekening Resmi Owner (Transfer HANYA a/n {ownerName}):
            </span>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono font-bold text-slate-900">
              {bankAccounts.map((b) => (
                <div key={b.id} className="p-2 rounded-xl bg-white border border-teal-300">
                  <p className="text-[9px] text-teal-800 font-extrabold font-sans">{b.bank}</p>
                  <p className="text-xs font-black">{b.account_number}</p>
                  <p className="text-[9px] text-slate-500 font-sans">a/n {b.beneficiary}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-2">
            <div>
              <span className="font-extrabold text-slate-900 text-xs uppercase tracking-wider block">
                Pemesanan & Konsultasi Langsung:
              </span>
              <p className="text-slate-600 text-[11px] font-medium leading-relaxed mt-1">
                Datang langsung ke toko di <strong>Sangso, Samalanga, Bireuen, Aceh</strong> atau pesan cepat via WhatsApp CS <strong>{waPhone}</strong>.
              </p>
            </div>

            <div className="text-[10px] text-slate-400 font-semibold border-t border-slate-200 pt-1.5 flex items-center justify-between">
              <span>© {new Date().getFullYear()} Mughis Laptop Store</span>
              <span>Website: /katalog-laptop</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
