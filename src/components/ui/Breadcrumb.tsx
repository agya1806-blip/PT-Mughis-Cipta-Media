import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { JsonLd } from "@/components/JsonLd"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface Props {
  items: BreadcrumbItem[]
  className?: string
}

export default function Breadcrumb({ items, className = "" }: Props) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.label,
            ...(item.href ? { item: `${process.env.NEXT_PUBLIC_BASE_URL || "https://mughisciptamedia.com"}${item.href}` } : {}),
          })),
        }}
      />
      <nav aria-label="Breadcrumb" className={`mb-6 ${className}`}>
      <ol className="flex items-center gap-1.5 text-sm text-green-dark/80">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="w-3.5 h-3.5" />}
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-green-dark transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-green-dark font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
    </>
  )
}
