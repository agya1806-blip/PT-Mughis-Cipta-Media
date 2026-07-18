"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"

export default function OrderSuccessPage() {
  const params = useParams()
  const [order, setOrder] = useState<any>(null)

  useEffect(() => {
    fetch(`/api/orders/${params.orderId}`)
      .then((r) => r.json())
      .then(setOrder)
      .catch(() => {})
  }, [params.orderId])

  return (
    <div className="flex-1 flex items-center justify-center py-24 px-4">
      <div className="text-center max-w-md">
        <div className="text-5xl mb-4">📦</div>
        <h1 className="text-2xl font-bold text-zinc-800 mb-2">Pesanan Dibuat!</h1>
        <p className="text-zinc-500 mb-6">
          Pesanan Anda telah berhasil dibuat. Silakan selesaikan pembayaran.
        </p>
        <p className="text-sm text-zinc-400 mb-8">
          ID Pesanan: <span className="font-mono text-zinc-700">{params.orderId}</span>
        </p>
        <Link
          href="/katalog"
          className="inline-flex h-11 items-center rounded-xl bg-amber-700 px-6 text-white font-medium hover:bg-amber-800"
        >
          Lanjut Belanja
        </Link>
      </div>
    </div>
  )
}
