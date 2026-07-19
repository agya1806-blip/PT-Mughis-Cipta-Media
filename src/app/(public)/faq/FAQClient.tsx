"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Search, BookOpen, Printer, Hash, CreditCard, Truck, HelpCircle } from "lucide-react"
import { FAQAccordion, faqCategories, getAllFAQItems } from "@/components/faq"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen, Printer, Hash, CreditCard, Truck, HelpCircle,
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("penerbitan")
  const [search, setSearch] = useState("")

  const currentCategory = faqCategories.find((c) => c.id === activeCategory)
  const allItems = useMemo(() => getAllFAQItems(), [])

  const filteredItems = search
    ? allItems.filter(
        (i) =>
          i.q.toLowerCase().includes(search.toLowerCase()) ||
          i.a.toLowerCase().includes(search.toLowerCase())
      )
    : currentCategory?.items || []

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative max-w-xl mx-auto mb-10"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari pertanyaan..."
          className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white border border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold shadow-sm"
        />
      </motion.div>

      {!search && (
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {faqCategories.map((cat) => {
            const Icon = iconMap[cat.icon] || HelpCircle
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat.id
                    ? "bg-gold text-white shadow-lg shadow-gold/20"
                    : "bg-white text-zinc-600 border border-zinc-200 hover:border-gold/30 hover:text-gold"
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.label}
              </button>
            )
          })}
        </div>
      )}

      <div className="text-center text-sm text-zinc-400 mb-6">
        {search
          ? `${filteredItems.length} hasil ditemukan`
          : `${currentCategory?.items.length || 0} pertanyaan`}
      </div>

      {filteredItems.length === 0 ? (
        <div className="text-center py-12 text-zinc-400">
          <HelpCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>Tidak ada hasil untuk pencarian Anda</p>
        </div>
      ) : (
        <FAQAccordion items={filteredItems} />
      )}
    </section>
  )
}
