"use client"

import { motion } from "framer-motion"
import { ShoppingCart, Heart, Share2, Download, Eye } from "lucide-react"
import Button from "@/components/ui/Button"
import GlassPanel from "@/components/ui/GlassPanel"
import { MOTION } from "@/config/design"

interface Props {
  price: number
  stock: number
}

export default function BookActionCard({ price, stock }: Props) {
  const outOfStock = stock <= 0
  const formattedPrice = price.toLocaleString("id-ID")

  return (
    <motion.div
      variants={MOTION.fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="sticky top-28"
    >
      <GlassPanel intensity="heavy" className="p-6 space-y-5">
        <div className="space-y-1">
          <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-medium">
            Harga
          </p>
          <p className="text-3xl font-bold text-zinc-900 dark:text-white">
            Rp{formattedPrice}
          </p>
          {outOfStock ? (
            <p className="text-sm text-red-500 font-medium">Stok habis</p>
          ) : (
            <p className="text-sm text-gold font-medium">
              Stok tersedia: {stock}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <Button
            variant="primary"
            size="default"
            className="w-full justify-center"
            disabled={outOfStock}
          >
            <ShoppingCart className="w-4 h-4" />
            {outOfStock ? "Stok Habis" : "Tambah ke Keranjang"}
          </Button>

          <Button variant="outline" size="default" className="w-full justify-center">
            <Eye className="w-4 h-4" />
            Pratinjau Buku
          </Button>
        </div>

        <div className="flex gap-3 pt-2 border-t border-zinc-200 dark:border-zinc-700/50">
          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <Heart className="w-4 h-4" />
            Favorite
          </button>
          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <Share2 className="w-4 h-4" />
            Bagikan
          </button>
          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <Download className="w-4 h-4" />
            Sampel
          </button>
        </div>
      </GlassPanel>
    </motion.div>
  )
}
