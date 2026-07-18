'use client'

import { useEffect, useState, Suspense } from 'react'
import { useParams, useSearchParams, useRouter } from 'next/navigation'

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
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Pembayaran Berhasil!</h1>
        <p className="text-gray-500 mb-2">
          Pesanan <span className="font-semibold">{orderId}</span> telah dikonfirmasi.
        </p>
        <p className="text-gray-500 mb-6">
          Pesanan akan segera diproses. Kami akan mengirimkan notifikasi ke WhatsApp Anda.
        </p>
        <button
          onClick={() => router.push('/')}
          className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
        >
          Kembali ke Toko
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center">
      <div className="text-6xl mb-4">🧾</div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Menunggu Pembayaran</h1>
      <p className="text-gray-500 mb-2">
        Pesanan: <span className="font-semibold">{orderId}</span>
      </p>
      {order && (
        <p className="text-gray-500 mb-6">
          Total: <span className="font-bold">Rp {order.grandTotal?.toLocaleString('id-ID')}</span>
        </p>
      )}

      {redirectUrl && redirectUrl !== 'null' && (
        <a
          href={redirectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors mb-4"
        >
          Lanjutkan ke Pembayaran
        </a>
      )}

      <div className="mt-4 space-y-3">
        <button
          onClick={checkPayment}
          className="block w-full bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
        >
          Konfirmasi Pembayaran
        </button>
        <button
          onClick={() => router.push('/')}
          className="block w-full text-gray-600 px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
        >
          Lanjut Belanja
        </button>
      </div>

      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-left">
        <p className="text-sm font-medium text-yellow-800 mb-2">Metode Pembayaran Tersedia:</p>
        <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
          <li>QRIS (semua e-wallet & mobile banking)</li>
          <li>E-Wallet: Dana, OVO, LinkAja, GoPay</li>
          <li>Virtual Account: BCA, Mandiri, BNI, BRI</li>
          <li>Bank Transfer</li>
        </ul>
      </div>
    </div>
  )
}

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-lg mx-auto px-4 py-16 text-center">
          <p className="text-gray-500">Memuat halaman pembayaran...</p>
        </div>
      }
    >
      <PaymentContent />
    </Suspense>
  )
}
