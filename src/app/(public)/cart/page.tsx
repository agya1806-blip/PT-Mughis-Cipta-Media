"use client"

import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/components/CartProvider"

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, subtotal, itemCount } = useCart()

  if (items.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-24 px-4">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-2xl font-bold text-zinc-800 mb-2">Keranjang Belanja</h1>
        <p className="text-zinc-500 mb-8">Keranjang belanja Anda masih kosong</p>
        <Link
          href="/katalog"
          className="inline-flex h-11 items-center rounded-xl bg-amber-700 px-6 text-white font-medium hover:bg-amber-800"
        >
          Mulai Belanja
        </Link>
      </div>
    )
  }

  return (
    <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
      <h1 className="text-2xl font-bold text-zinc-800 mb-8">Keranjang Belanja</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.bookId} className="flex gap-4 bg-white rounded-xl border border-zinc-200 p-4">
            <div className="w-20 h-28 relative flex-shrink-0 rounded-lg overflow-hidden bg-zinc-100">
              {item.coverImage && (
                <Image src={item.coverImage} alt={item.title} fill className="object-cover" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-zinc-800 truncate">{item.title}</h3>
              <p className="text-amber-700 font-semibold mt-1">
                Rp {item.price.toLocaleString("id-ID")}
              </p>
              <div className="flex items-center gap-3 mt-3">
                <button
                  onClick={() => updateQuantity(item.bookId, item.quantity - 1)}
                  className="w-8 h-8 rounded-lg border border-zinc-300 flex items-center justify-center text-zinc-600 hover:bg-zinc-50"
                >
                  -
                </button>
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.bookId, item.quantity + 1)}
                  className="w-8 h-8 rounded-lg border border-zinc-300 flex items-center justify-center text-zinc-600 hover:bg-zinc-50"
                >
                  +
                </button>
              </div>
            </div>
            <div className="text-right flex flex-col items-end justify-between">
              <p className="font-semibold text-zinc-800">
                Rp {(item.price * item.quantity).toLocaleString("id-ID")}
              </p>
              <button
                onClick={() => removeItem(item.bookId)}
                className="text-sm text-red-500 hover:text-red-700"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-xl border border-zinc-200 p-6">
        <div className="flex justify-between text-lg font-semibold text-zinc-800">
          <span>Total ({itemCount} items)</span>
          <span>Rp {subtotal.toLocaleString("id-ID")}</span>
        </div>
        <div className="flex gap-3 mt-6">
          <button
            onClick={clearCart}
            className="flex-1 h-11 rounded-xl border border-zinc-300 text-zinc-600 font-medium hover:bg-zinc-50"
          >
            Kosongkan Cart
          </button>
          <Link
            href="/checkout"
            className="flex-1 flex items-center justify-center h-11 rounded-xl bg-amber-700 text-white font-medium hover:bg-amber-800"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  )
}
