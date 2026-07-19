'use client'

import { useEffect, useState, Suspense } from 'react'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, Receipt, CreditCard, ArrowLeft } from 'lucide-react'

interface OrderData {
  id: string
  grandTotal: number
  status: string
}

function PaymentContent() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const orderId = params.order_id as string
  const redirectUrl = searchParams.get('redirect_url')

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [order, setOrder] = useState<OrderData | null>(null)

  useEffect(() => {
    if (!orderId) return
    fetch(`/api/orders?id=${orderId}`)
      .then((r) => r.json())
      .then((data) => {
        setOrder(data.order)
        setStatus(data.order?.status === 'paid' ? 'success' : 'loading')
      })
      .catch(() => setStatus('error'))
  }, [orderId])

  const checkPayment = async () => {
    setStatus('loading')
    try {
      const res = await fetch(`/api/orders?id=${orderId}`)
      const data = await res.json()
      setOrder(data.order)
      if (data.order?.status === 'paid') {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-lg mx-auto px-4 py-16 text-center"
      >
        <div className="mb-4"><CheckCircle className="w-16 h-16 text-gold mx-auto" /></div>
        <h1 className="text-2xl font-bold text-zinc-800 mb-2">Pembayaran Berhasil!</h1>
        <p className="text-zinc-500 mb-2">
          Pesanan <span className="font-semibold">{orderId}</span> telah dikonfirmasi.
        </p>
        <p className="text-zinc-500 mb-6">
          Pesanan akan segera diproses. Kami akan mengirimkan notifikasi ke WhatsApp Anda.
        </p>
        <button
          onClick={() => router.push('/')}
          className="bg-gold text-white px-6 py-3 rounded-lg hover:bg-gold-dark transition-colors"
        >
          Kembali ke Toko
        </button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-lg mx-auto px-4 py-16 text-center"
    >
      <div className="mb-4"><Receipt className="w-16 h-16 text-gold mx-auto" /></div>
      <h1 className="text-2xl font-bold text-zinc-800 mb-2">Menunggu Pembayaran</h1>
      <p className="text-zinc-500 mb-2">
        Pesanan: <span className="font-semibold">{orderId}</span>
      </p>
      {order && (
        <p className="text-zinc-500 mb-6">
          Total: <span className="font-bold">Rp {order.grandTotal?.toLocaleString('id-ID')}</span>
        </p>
      )}

      {redirectUrl && redirectUrl !== 'null' && (
        <a
          href={redirectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gold text-white px-6 py-3 rounded-lg hover:bg-gold-dark transition-colors mb-4"
        >
          Lanjutkan ke Pembayaran
        </a>
      )}

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
        className="mt-4 space-y-3"
      >
        <motion.button
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
          }}
          onClick={checkPayment}
          className="block w-full bg-gold text-white px-6 py-3 rounded-lg hover:bg-gold-dark transition-colors"
        >
          Konfirmasi Pembayaran
        </motion.button>
        <motion.button
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
          }}
          onClick={() => router.push('/')}
          className="block w-full text-zinc-600 px-6 py-3 rounded-lg border border-zinc-300 hover:bg-zinc-50 transition-colors"
        >
          Lanjut Belanja
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        viewport={{ once: true }}
        className="mt-8 p-4 bg-gold/5 border border-gold/20 rounded-lg text-left"
      >
        <p className="text-sm font-medium text-gold-dark mb-2">Metode Pembayaran Tersedia:</p>
        <ul className="text-sm text-gold/80 space-y-1 list-disc list-inside">
          <li>QRIS (semua e-wallet & mobile banking)</li>
          <li>E-Wallet: Dana, OVO, LinkAja, GoPay</li>
          <li>Virtual Account: BCA, Mandiri, BNI, BRI</li>
          <li>Bank Transfer</li>
        </ul>
      </motion.div>
    </motion.div>
  )
}

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-lg mx-auto px-4 py-16 text-center">
          <p className="text-zinc-500">Memuat halaman pembayaran...</p>
        </div>
      }
    >
      <PaymentContent />
    </Suspense>
  )
}
