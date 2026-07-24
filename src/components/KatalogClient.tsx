"use client"

import { useState, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { X } from "lucide-react"
import BookCard from "./BookCard"
import Pagination from "@/components/ui/Pagination"
import type { Book, Category } from "@/lib/data"

interface Props {
  initialBooks: Book[]
  initialCategories: Category[]
  initialTotal: number
  initialTotalPages: number
}

export function KatalogClient({ initialBooks, initialCategories, initialTotal, initialTotalPages }: Props) {
  const urlParams = useSearchParams()
  const [books, setBooks] = useState<Book[]>(initialBooks)
  const [total, setTotal] = useState(initialTotal)
  const [totalPages, setTotalPages] = useState(initialTotalPages)
  const [loading, setLoading] = useState(false)
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
  const [searchInput, setSearchInput] = useState(urlParams.get("search") ?? "")
  const [categoryId, setCategoryId] = useState(urlParams.get("category_id") ?? "")
  const [sort, setSort] = useState(urlParams.get("sort") ?? "latest")
  const [page, setPage] = useState(parseInt(urlParams.get("page") ?? "1", 10))
  const [search, setSearch] = useState(urlParams.get("search") ?? "")

  const fetchBooks = useCallback(async (opts: { page?: number; category_id?: string; search?: string; sort?: string }) => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (opts.page && opts.page > 1) params.set("page", String(opts.page))
      if (opts.category_id) params.set("category_id", opts.category_id)
      if (opts.search) params.set("search", opts.search)
      if (opts.sort && opts.sort !== "latest") params.set("sort", opts.sort)
      const res = await fetch(`/api/books?${params.toString()}`)
      const data = await res.json()
      setBooks(data.books ?? [])
      setTotal(data.total ?? 0)
      setTotalPages(data.total_pages ?? 1)
    } catch {
      // keep current data on error
    } finally {
      setLoading(false)
    }
  }, [])

  const updateFilters = useCallback((updates: { category_id?: string; search?: string; sort?: string; page?: number }) => {
    const next = { page: 1, ...updates }
    if (updates.category_id !== undefined) setCategoryId(updates.category_id)
    if (updates.search !== undefined) setSearch(updates.search)
    if (updates.sort !== undefined) setSort(updates.sort)
    if (updates.page !== undefined) setPage(updates.page)
    fetchBooks({
      page: next.page,
      category_id: updates.category_id ?? categoryId,
      search: updates.search ?? search,
      sort: updates.sort ?? sort,
    })
  }, [categoryId, search, sort, fetchBooks])

  const resetFilters = () => {
    setSearchInput("")
    setCategoryId("")
    setSearch("")
    setSort("latest")
    setPage(1)
    fetchBooks({})
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
                    if (e.key === "Enter") updateFilters({ search: searchInput })
                  }}
                  placeholder="Judul, penulis..."
                  className="w-full rounded-lg border border-gold/20 bg-cream px-3 py-2.5 pr-10 text-sm text-green-dark placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-gold/50"
                />
                <button
                  onClick={() => updateFilters({ search: searchInput })}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 text-green/60 dark:text-gold/70 hover:text-green-dark dark:hover:text-cream"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-green-dark mb-3">Kategori</h3>
              <div className="space-y-1">
                {initialCategories.map((cat) => {
                  const isActive = categoryId === cat.id
                  return (
                    <button
                      key={cat.id}
                      onClick={() => updateFilters({ category_id: isActive ? "" : cat.id })}
                      className={`block w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                        isActive
                          ? "bg-gold/10 text-gold-dark dark:text-gold font-medium"
                          : "text-green/80 hover:bg-cream hover:text-green-dark"
                      }`}
                    >
                      {cat.name}
                    </button>
                  )
                })}
              </div>
            </div>

            <button
              onClick={resetFilters}
              className="w-full rounded-lg border border-gold/20 px-4 py-2 text-sm font-medium text-green/80 dark:text-gold/80 transition-colors hover:bg-cream dark:hover:bg-green-dark/80 hover:text-green-dark dark:hover:text-cream"
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
                onChange={(e) => updateFilters({ sort: e.target.value })}
                className="rounded-lg border border-gold/20 bg-cream px-3 py-2 text-sm text-green-dark focus:outline-none focus:ring-2 focus:ring-gold/50"
              >
                <option value="latest">Terbaru</option>
                <option value="title_asc">Judul A-Z</option>
                <option value="title_desc">Judul Z-A</option>
              </select>
            </div>
          </div>

          <div className="relative">
            {loading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-cream/60 rounded-xl">
                <div className="flex items-center gap-2 text-sm text-green/60">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Memuat...
                </div>
              </div>
            )}
            {books.length === 0 && !loading ? (
              <div className="text-center py-20">
                <svg className="w-16 h-16 mx-auto text-green/40 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
                <h3 className="text-lg font-medium text-green/80 mb-1">Tidak ada buku ditemukan</h3>
                <p className="text-sm text-green/60 mb-4">Coba ubah kata kunci atau filter pencarian</p>
                <button onClick={resetFilters} className="text-sm font-medium text-green dark:text-gold hover:text-green-dark dark:hover:text-cream">
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

                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={(p) => updateFilters({ page: p })}
                  className="mt-10"
                />
              </>
            )}
          </div>
        </div>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-cream border-t border-gold/20 p-3 flex gap-2 z-40 shadow-lg">
        <button
          onClick={() => setMobileFilterOpen(true)}
          className="flex-1 text-center text-sm font-medium text-green-dark border border-gold/20 rounded-lg py-2.5"
        >
          Filter
        </button>
        <button onClick={resetFilters} className="flex-1 text-center text-sm font-medium text-green dark:text-gold border border-gold/30 rounded-lg py-2.5">
          Reset
        </button>
      </div>

      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Filter katalog">
          <div className="absolute inset-0 bg-green/40" onClick={() => setMobileFilterOpen(false)} aria-hidden="true" />
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
                      updateFilters({ search: searchInput })
                      setMobileFilterOpen(false)
                    }
                  }}
                  placeholder="Judul, penulis..."
                  className="w-full rounded-lg border border-gold/20 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 bg-cream text-green-dark placeholder-zinc-400"
                />
                <button
                  onClick={() => {
                    updateFilters({ search: searchInput })
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
                  {initialCategories.map((cat) => (
                    <label key={cat.id} className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="radio"
                        name="mobile_category"
                        checked={categoryId === cat.id}
                        onChange={() => {
                          updateFilters({ category_id: cat.id })
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
                    updateFilters({ sort: e.target.value })
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
