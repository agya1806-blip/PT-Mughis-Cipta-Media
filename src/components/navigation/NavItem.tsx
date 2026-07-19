"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"

interface Props {
  href: string
  children: ReactNode
  className?: string
  onClick?: () => void
}

export default function NavItem({ href, children, className = "", onClick }: Props) {
  const pathname = usePathname()
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href))

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={`group relative inline-flex items-center py-2 text-sm font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold rounded-sm ${className}`}
    >
      {children}
      <span
        className={`absolute inset-x-0 -bottom-1 h-0.5 rounded-full transition-all duration-300 origin-center
          ${isActive
            ? "bg-gold scale-x-100"
            : "bg-gold/60 scale-x-0 group-hover:scale-x-100"
          }`}
      />
    </Link>
  )
}
