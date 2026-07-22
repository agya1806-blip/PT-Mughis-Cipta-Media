"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { X } from "lucide-react"
import BookCard from "./BookCard"
import type { Book, Category } from "@/lib/data"
import type { BooksResponse } from "@/lib/books"

interface Props {
  initialBooks: Book[]
  initialCategories: Category[]
  initialTotal: number
  initialTotalPages: number
}

export function KatalogClient({ initialBooks, initialCategories, initialTotal, initialTotalPages }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [books, setBooks] = useState<Book[]>(initialBooks)
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [total, setTotal] = useState(initialTotal)
  const [totalPages, setTotalPages] = useState(initialTotalPages)
  const [loading, setLoading] = useState(false)
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  const page = parseInt(searchParams.get("page") ?? "1", 10)
  const category_id = searchParams.get("category_id") ?? ""
  const search = searchParams.get("search") ?? ""
  const sort = (searchParams.get("sort") ?? "latest") as string

  const [searchInput, setSearchInput] = useState(search)

  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    async function fetchBooks() {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        params.set("page", String(page))
        if (category_id) params.set("category_id", category_id)
        if (search) params.set("search", search)
        if (sort) params.set("sort", sort)

        const [booksRes, catsRes] = await Promise.all([
          fetch(`/api/books?${params}`),
          fetch("/api/categories"),
        ])

        const booksData: BooksResponse = await booksRes.json()
        const catsData: { categories: Category[] } = await catsRes.json()

        setBooks(booksData.books)
        setTotal(booksData.total)
        setTotalPages(booksData.total_pages)
        setCategories(catsData.categories)
      } catch {
        setBooks([])
        setCategories([])
        setTotal(0)
        setTotalPages(1)
      } finally {
        setLoading(false)
      }
    }
    fetchBooks()
  }, [page, category_id, search, sort])

  const updateSearchParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString())
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })
    if (updates.category_id !== undefined || updates.search !== undefined || updates.sort !== undefined) {
      params.set("page", "1")
    }
    router.push(`/katalog?${params.toString()}`)
  }

  const resetFilters = () => {
    setSearchInput("")
    router.push("/katalog")
  }

  return (
    <>
      <div className="flex gap-8">
        <aside className="w-64 shrink-0 hidden lg:block">
          <div className="sticky top-8 space-y-6">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-green-dark mb-2">
                Cari Buku
              </label>
              <div className="relative">
                <input
                  id="search"
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") updateSearchParams({ search: searchInput })
                  }}
                  placeholder="Judul, penulis..."
                  className="w-full rounded-lg border border-gold/20 bg-cream px-3 py-2.5 pr-10 text-sm text-green-dark placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-gold/50"
                />
                <button
                  onClick={() => updateSearchParams({ search: searchInput })}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 text-green/60 hover:text-gold"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-green-dark mb-3">Kategori</h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <label
                    key={cat.id}
                    className="flex items-center gap-2.5 cursor-pointer group"
                  >
                    <input
                      type="radio"
                      name="category"
                      checked={category_id === cat.id}
                      onChange={() => updateSearchParams({ category_id: cat.id })}
                      className="h-4 w-4 text-gold border-gold/20 focus:ring-gold/50"
                    />
                    <span className="text-sm text-green/80 group-hover:text-green-dark transition-colors">
                      {cat.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={resetFilters}
              className="w-full rounded-lg border border-gold/20 px-4 py-2 text-sm font-medium text-green/80 transition-colors hover:bg-cream hover:text-green-dark"
            >
              Reset Filter
            </button>
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <p className="text-sm text-green/60">
                {total} buku ditemukan
              </p>
            </div>
            <div className="flex items-center gap-3">
              <label htmlFor="sort" className="text-sm text-green/60">Urutkan:</label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => updateSearchParams({ sort: e.target.value })}
                className="rounded-lg border border-gold/20 bg-cream px-3 py-2 text-sm text-green-dark focus:outline-none focus:ring-2 focus:ring-gold/50"
              >
                <option value="latest">Terbaru</option>
                <option value="title_asc">Judul A-Z</option>
                <option value="title_desc">Judul Z-A</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-xl border border-gold/20 bg-cream overflow-hidden animate-pulse">
                  <div className="aspect-[3/4] bg-cream" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-cream rounded w-1/3" />
                    <div className="h-5 bg-cream rounded w-3/4" />
                    <div className="h-4 bg-cream rounded w-1/2" />
                    <div className="h-6 bg-cream rounded w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : books.length === 0 ? (
            <div className="text-center py-20">
              <svg className="w-16 h-16 mx-auto text-green/40 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
              <h3 className="text-lg font-medium text-green/80 mb-1">Tidak ada buku ditemukan</h3>
              <p className="text-sm text-green/60 mb-4">Coba ubah kata kunci atau filter pencarian</p>
              <button onClick={resetFilters} className="text-sm font-medium text-gold hover:text-gold-dark">
                Reset Filter
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  <button
                    disabled={page <= 1}
                    onClick={() => updateSearchParams({ page: String(page - 1) })}
                    className="px-3 py-2 rounded-lg border border-gold/20 text-sm font-medium text-green/80 hover:bg-cream disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Sebelumnya
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => updateSearchParams({ page: String(p) })}
                      className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                        p === page
                          ? "bg-gold text-white"
                          : "text-green/80 border border-gold/20 hover:bg-cream"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    disabled={page >= totalPages}
                    onClick={() => updateSearchParams({ page: String(page + 1) })}
                    className="px-3 py-2 rounded-lg border border-gold/20 text-sm font-medium text-green/80 hover:bg-cream disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Selanjutnya
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-cream border-t border-gold/20 p-3 flex gap-2 z-40 shadow-lg">
        <button
          onClick={() => setMobileFilterOpen(true)}
          className="flex-1 text-center text-sm font-medium text-green-dark border border-gold/20 rounded-lg py-2.5"
        >
          Filter
        </button>
        <button onClick={resetFilters} className="flex-1 text-center text-sm font-medium text-gold border border-gold/30 rounded-lg py-2.5">
          Reset
        </button>
      </div>

      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-green/40" onClick={() => setMobileFilterOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-cream rounded-t-2xl max-h-[80vh] overflow-y-auto p-6 pb-24">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-green-dark">Filter</h2>
              <button onClick={() => setMobileFilterOpen(false)} className="p-2 text-green/60 hover:text-green-dark">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-green-dark mb-2">Cari Buku</label>
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      updateSearchParams({ search: searchInput })
                      setMobileFilterOpen(false)
                    }
                  }}
                  placeholder="Judul, penulis..."
                  className="w-full rounded-lg border border-gold/20 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 bg-cream text-green-dark placeholder-zinc-400"
                />
                <button
                  onClick={() => {
                    updateSearchParams({ search: searchInput })
                    setMobileFilterOpen(false)
                  }}
                  className="mt-2 w-full rounded-lg bg-green text-gold py-2.5 text-sm font-medium hover:bg-green-dark"
                >
                  Cari
                </button>
              </div>

              <div>
              <h3 className="text-sm font-medium text-green-dark mb-3">Kategori</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="radio"
                        name="mobile_category"
                        checked={category_id === cat.id}
                        onChange={() => {
                          updateSearchParams({ category_id: cat.id })
                          setMobileFilterOpen(false)
                        }}
                        className="h-4 w-4 text-gold border-gold/20 focus:ring-gold/50"
                      />
                      <span className="text-sm text-green/80">{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-green-dark mb-3">Urutkan</h3>
                <select
                  value={sort}
                  onChange={(e) => {
                    updateSearchParams({ sort: e.target.value })
                    setMobileFilterOpen(false)
                  }}
                  className="w-full rounded-lg border border-gold/20 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 bg-cream text-green-dark placeholder-zinc-400"
                >
                  <option value="latest">Terbaru</option>
                  <option value="title_asc">Judul A-Z</option>
                  <option value="title_desc">Judul Z-A</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
