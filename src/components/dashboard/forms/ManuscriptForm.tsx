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
      <div className="bg-cream dark:bg-green-dark/80 rounded-2xl border border-gold/20 dark:border-gold/10 p-6 sm:p-8">
        <div className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-green-dark dark:text-cream mb-1.5">Judul Naskah</label>
            <input id="title" type="text" placeholder="Masukkan judul naskah" className="w-full h-11 px-4 bg-cream dark:bg-green/20 border border-gold/30 dark:border-gold/10 rounded-xl text-sm text-green-dark dark:text-cream placeholder-green/60 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all duration-200" />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-green-dark dark:text-cream mb-1.5">Kategori</label>
            <select id="category" className="w-full h-11 px-4 bg-cream dark:bg-green/20 border border-gold/30 dark:border-gold/10 rounded-xl text-sm text-green-dark dark:text-cream focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all duration-200" defaultValue="">
              <option value="" disabled>Pilih kategori</option>
              {categories.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
            </select>
          </div>
          <div>
            <label htmlFor="synopsis" className="block text-sm font-medium text-green-dark dark:text-cream mb-1.5">Sinopsis</label>
            <textarea id="synopsis" rows={4} placeholder="Tulis sinopsis singkat naskah Anda" className="w-full px-4 py-3 bg-cream dark:bg-green/20 border border-gold/30 dark:border-gold/10 rounded-xl text-sm text-green-dark dark:text-cream placeholder-green/60 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all duration-200 resize-none" />
          </div>
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-green-dark dark:text-cream mb-1.5">Nama Penulis</label>
            <input id="author" type="text" placeholder="Nama lengkap penulis" defaultValue="Ahmad Rizki" className="w-full h-11 px-4 bg-cream dark:bg-green/20 border border-gold/30 dark:border-gold/10 rounded-xl text-sm text-green-dark dark:text-cream placeholder-green/60 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all duration-200" />
          </div>
          <div>
            <label className="block text-sm font-medium text-green-dark dark:text-cream mb-1.5">Upload File Naskah</label>
            <div className="border-2 border-dashed border-gold/30 dark:border-gold/10 rounded-2xl p-8 text-center hover:border-gold/50 transition-colors cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-3">
                <Upload className="w-5 h-5 text-gold" />
              </div>
              <p className="text-sm font-medium text-green-dark dark:text-cream">Klik untuk upload file</p>
              <p className="text-xs text-green/60 dark:text-gold/70 mt-1">PDF, DOC, atau DOCX (max 10MB)</p>
            </div>
          </div>
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-green-dark dark:text-cream mb-1.5">Catatan Tambahan</label>
            <textarea id="notes" rows={3} placeholder="Catatan untuk editor (opsional)" className="w-full px-4 py-3 bg-cream dark:bg-green/20 border border-gold/30 dark:border-gold/10 rounded-xl text-sm text-green-dark dark:text-cream placeholder-green/60 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all duration-200 resize-none" />
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
