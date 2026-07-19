"use client"

import { motion } from "framer-motion"
import { useReducedMotion } from "framer-motion"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui"

const categories = ["Fiksi", "Non-Fiksi", "Edukasi", "Bisnis", "Biografi", "Anak", "Lainnya"]

export default function ManuscriptForm() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-3xl"
    >
      <div className="bg-white dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700/50 p-6 sm:p-8">
        <div className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-zinc-900 dark:text-white mb-1.5">Judul Naskah</label>
            <input id="title" type="text" placeholder="Masukkan judul naskah" className="w-full h-11 px-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all duration-200" />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-zinc-900 dark:text-white mb-1.5">Kategori</label>
            <select id="category" className="w-full h-11 px-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all duration-200" defaultValue="">
              <option value="" disabled>Pilih kategori</option>
              {categories.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
            </select>
          </div>
          <div>
            <label htmlFor="synopsis" className="block text-sm font-medium text-zinc-900 dark:text-white mb-1.5">Sinopsis</label>
            <textarea id="synopsis" rows={4} placeholder="Tulis sinopsis singkat naskah Anda" className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all duration-200 resize-none" />
          </div>
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-zinc-900 dark:text-white mb-1.5">Nama Penulis</label>
            <input id="author" type="text" placeholder="Nama lengkap penulis" defaultValue="Ahmad Rizki" className="w-full h-11 px-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all duration-200" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-900 dark:text-white mb-1.5">Upload File Naskah</label>
            <div className="border-2 border-dashed border-zinc-200 dark:border-zinc-700 rounded-2xl p-8 text-center hover:border-gold/30 transition-colors cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mx-auto mb-3">
                <Upload className="w-5 h-5 text-zinc-400" />
              </div>
              <p className="text-sm font-medium text-zinc-900 dark:text-white">Klik untuk upload file</p>
              <p className="text-xs text-zinc-400 mt-1">PDF, DOC, atau DOCX (max 10MB)</p>
            </div>
          </div>
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-zinc-900 dark:text-white mb-1.5">Catatan Tambahan</label>
            <textarea id="notes" rows={3} placeholder="Catatan untuk editor (opsional)" className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all duration-200 resize-none" />
          </div>
          <div className="flex items-center gap-3 pt-2">
            <Button type="submit">Kirim Naskah</Button>
            <Button variant="outline" type="button">Simpan Draft</Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
