"use client"

import { motion } from "framer-motion"
import { BookOpen, Printer } from "lucide-react"
import Button from "@/components/ui/Button"
import GlassPanel from "@/components/ui/GlassPanel"
import { MOTION } from "@/config/design"

interface Props {
  isbn?: string
  pages?: number
  publicationYear?: number
}

export default function BookActionCard({ isbn, pages, publicationYear }: Props) {
  return (
    <motion.div
      variants={MOTION.fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="sticky top-28"
    >
      <GlassPanel intensity="heavy" className="p-6 space-y-5">
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-white uppercase tracking-wider">
            Informasi Buku
          </h2>
          {isbn && (
            <div className="flex items-center gap-3 text-sm">
              <BookOpen className="w-4 h-4 text-gold shrink-0" />
              <div>
                <p className="text-zinc-500 dark:text-zinc-400 text-xs">ISBN</p>
                <p className="font-medium text-zinc-900 dark:text-white">{isbn}</p>
              </div>
            </div>
          )}
          {pages && (
            <div className="flex items-center gap-3 text-sm">
              <BookOpen className="w-4 h-4 text-gold shrink-0" />
              <div>
                <p className="text-zinc-500 dark:text-zinc-400 text-xs">Halaman</p>
                <p className="font-medium text-zinc-900 dark:text-white">{pages} hal</p>
              </div>
            </div>
          )}
          {publicationYear && (
            <div className="flex items-center gap-3 text-sm">
              <Printer className="w-4 h-4 text-gold shrink-0" />
              <div>
                <p className="text-zinc-500 dark:text-zinc-400 text-xs">Tahun Terbit</p>
                <p className="font-medium text-zinc-900 dark:text-white">{publicationYear}</p>
              </div>
            </div>
          )}
        </div>

        <Button variant="primary" size="default" className="w-full justify-center">
          <BookOpen className="w-4 h-4" />
          Lihat Detail Buku
        </Button>
      </GlassPanel>
    </motion.div>
  )
}
