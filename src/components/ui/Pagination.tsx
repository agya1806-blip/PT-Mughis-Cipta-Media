import Link from "next/link"

interface Props {
  currentPage: number
  totalPages: number
  basePath: string
  searchParams?: Record<string, string>
  className?: string
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
  searchParams = {},
  className = "",
}: Props) {
  if (totalPages <= 1) return null

  function buildHref(page: number) {
    const params = new URLSearchParams(searchParams)
    params.set("page", String(page))
    return `${basePath}?${params.toString()}`
  }

  const pages: (number | "...")[] = []
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      pages.push(i)
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...")
    }
  }

  return (
    <nav aria-label="Pagination" className={`flex justify-center items-center gap-2 ${className}`}>
      {currentPage > 1 && (
        <Link
          href={buildHref(currentPage - 1)}
          className="px-4 py-2 rounded-lg bg-cream dark:bg-green-dark/80 border border-gold/20 dark:border-gold/10 text-green/60 dark:text-cream/70 hover:text-green-dark dark:hover:text-cream hover:bg-cream dark:hover:bg-green-dark transition-colors text-sm"
        >
          Sebelumnya
        </Link>
      )}
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} className="px-2 text-green/60 dark:text-cream/70 text-sm">
            ...
          </span>
        ) : (
          <Link
            key={p}
            href={buildHref(p)}
            className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
              p === currentPage
                ? "bg-gold text-white"
                : "bg-cream dark:bg-green-dark/80 border border-gold/20 dark:border-gold/10 text-green/60 dark:text-cream/70 hover:text-green-dark dark:hover:text-cream hover:bg-cream dark:hover:bg-green-dark"
            }`}
          >
            {p}
          </Link>
        )
      )}
      {currentPage < totalPages && (
        <Link
          href={buildHref(currentPage + 1)}
          className="px-4 py-2 rounded-lg bg-cream dark:bg-green-dark/80 border border-gold/20 dark:border-gold/10 text-green/60 dark:text-cream/70 hover:text-green-dark dark:hover:text-cream hover:bg-cream dark:hover:bg-green-dark transition-colors text-sm"
        >
          Selanjutnya
        </Link>
      )}
    </nav>
  )
}
