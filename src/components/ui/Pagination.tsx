import Link from "next/link"

interface Props {
  currentPage: number
  totalPages: number
  basePath?: string
  searchParams?: Record<string, string>
  onPageChange?: (page: number) => void
  className?: string
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
  searchParams = {},
  onPageChange,
  className = "",
}: Props) {
  if (totalPages <= 1) return null

  function buildHref(page: number) {
    const params = new URLSearchParams(searchParams)
    params.set("page", String(page))
    return `${basePath}?${params.toString()}`
  }

  function goTo(page: number) {
    onPageChange?.(page)
  }

  const pages: (number | "...")[] = []
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      pages.push(i)
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...")
    }
  }

  const btnClass = `px-4 py-2 rounded-lg bg-cream border border-gold/20 text-green-dark/80 hover:text-green-dark hover:bg-cream transition-colors text-sm`

  function renderPageBtn(p: number) {
    return onPageChange ? (
      <button
        key={p}
        onClick={() => goTo(p)}
        className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
          p === currentPage
            ? "bg-gold text-green-dark"
            : "bg-cream border border-gold/20 text-green-dark/80 hover:text-green-dark hover:bg-cream"
        }`}
      >
        {p}
      </button>
    ) : (
      <Link
        key={p}
        href={buildHref(p)}
        className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
          p === currentPage
            ? "bg-gold text-green-dark"
            : "bg-cream border border-gold/20 text-green-dark/80 hover:text-green-dark hover:bg-cream"
        }`}
      >
        {p}
      </Link>
    )
  }

  return (
    <nav aria-label="Pagination" className={`flex justify-center items-center gap-2 ${className}`}>
      {currentPage > 1 && onPageChange ? (
        <button onClick={() => goTo(currentPage - 1)} className={btnClass}>
          Sebelumnya
        </button>
      ) : currentPage > 1 ? (
        <Link href={buildHref(currentPage - 1)} className={btnClass}>
          Sebelumnya
        </Link>
      ) : null}
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} className="px-2 text-green-dark/80 text-sm">
            ...
          </span>
        ) : (
          renderPageBtn(p)
        )
      )}
      {currentPage < totalPages && onPageChange ? (
        <button onClick={() => goTo(currentPage + 1)} className={btnClass}>
          Selanjutnya
        </button>
      ) : currentPage < totalPages ? (
        <Link href={buildHref(currentPage + 1)} className={btnClass}>
          Selanjutnya
        </Link>
      ) : null}
    </nav>
  )
}
