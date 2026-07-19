"use client"

import { useState, useMemo } from "react"
import { Search, X } from "lucide-react"
import AuthorCard from "./AuthorCard"
import Breadcrumb from "@/components/ui/Breadcrumb"
import type { Author } from "@/data/authors"

interface Props {
  authors: Author[]
}

export default function AuthorListClient({ authors }: Props) {
  const [search, setSearch] = useState("")
  const [activeField, setActiveField] = useState<string | null>(null)

  const fields = useMemo(() => {
    const set = new Set(authors.map((a) => a.field))
    return Array.from(set).sort()
  }, [authors])

  const filtered = useMemo(() => {
    let result = authors
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.field.toLowerCase().includes(q) ||
          a.bio.toLowerCase().includes(q)
      )
    }
    if (activeField) {
      result = result.filter((a) => a.field === activeField)
    }
    return result
  }, [authors, search, activeField])

  const resetFilters = () => {
    setSearch("")
    setActiveField(null)
  }

  const hasActiveFilters = search.trim() || activeField

  return (
    <div className="flex-1 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Breadcrumb items={[{ label: "Beranda", href: "/" }, { label: "Penulis" }]} />

        <h1 className="text-3xl font-bold text-zinc-900 mb-2">Penulis</h1>
        <p className="text-zinc-500 mb-8">
          Para penulis yang telah berkarya bersama Maktabah al-Mughis
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari penulis atau bidang..."
              className="w-full h-11 pl-10 pr-4 bg-white border border-zinc-200 rounded-xl text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-8">
          {fields.map((field) => (
            <button
              key={field}
              onClick={() => setActiveField(activeField === field ? null : field)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all ${
                activeField === field
                  ? "bg-gold text-white border-gold"
                  : "bg-white text-zinc-600 border-zinc-200 hover:border-gold/30 hover:text-gold"
              }`}
            >
              {field}
            </button>
          ))}
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium text-zinc-400 hover:text-zinc-600 transition-colors"
            >
              <X className="w-3 h-3" />
              Reset
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-zinc-100 flex items-center justify-center">
              <Search className="w-6 h-6 text-zinc-300" />
            </div>
            <h3 className="text-lg font-medium text-zinc-600 mb-1">Penulis tidak ditemukan</h3>
            <p className="text-sm text-zinc-400 mb-4">Coba ubah kata kunci atau filter pencarian</p>
            <button
              onClick={resetFilters}
              className="text-sm font-medium text-gold hover:text-gold-dark transition-colors"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {filtered.map((author) => (
              <AuthorCard
                key={author.id}
                name={author.name}
                slug={author.slug}
                photo={author.photo}
                field={author.field}
                bookCount={author.bookIds.length}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
