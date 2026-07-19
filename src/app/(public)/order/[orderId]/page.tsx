"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Package } from "lucide-react"
import { motion } from "framer-motion"

export default function OrderSuccessPage() {
  const params = useParams()
  const [, setOrder] = useState<Record<string, unknown> | null>(null)

  useEffect(() => {
    fetch(`/api/orders/${params.orderId}`)
      .then((r) => r.json())
      .then(setOrder)
      .catch(() => {})
  }, [params.orderId])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex-1 flex items-center justify-center py-24 px-4"
    >
      <div className="text-center max-w-md">
        <div className="mb-4"><Package className="w-16 h-16 text-gold mx-auto" /></div>
        <h1 className="text-2xl font-bold text-zinc-800 mb-2">Pesanan Dibuat!</h1>
        <p className="text-zinc-500 mb-6">
          Pesanan Anda telah berhasil dibuat. Silakan selesaikan pembayaran.
        </p>
        <p className="text-sm text-zinc-400 mb-8">
          ID Pesanan: <span className="font-mono text-zinc-700">{params.orderId}</span>
        </p>
        <Link
          href="/katalog"
          className="inline-flex h-11 items-center rounded-xl bg-gold px-6 text-white font-medium hover:bg-gold-dark"
        >
          Lanjut Belanja
        </Link>
      </div>
    </motion.div>
  )
}
