"use client"

import Link from "next/link"
import { useCart } from "./CartProvider"

export function NavCart() {
  const { itemCount } = useCart()

  return (
    <Link
      href="/cart"
      className="relative text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
    >
      Cart
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-4 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </Link>
  )
}
