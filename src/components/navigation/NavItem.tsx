"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ReactNode, useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import type { MegaMenuItem } from "@/config/navigation"
import MegaMenu from "./MegaMenu"

interface BaseProps {
  children?: ReactNode
  className?: string
  onClick?: () => void
}

interface LinkItemProps extends BaseProps {
  href: string
}

interface MegaItemProps extends BaseProps {
  href?: undefined
  megaItems: MegaMenuItem[]
  label: string
}

type Props = LinkItemProps | MegaItemProps

export default function NavItem(props: Props) {
  const pathname = usePathname()
  const [megaOpen, setMegaOpen] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const isActive = props.href
    ? pathname === props.href || (props.href !== "/" && pathname.startsWith(props.href))
    : false

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  if (props.href) {
    return (
      <Link
        href={props.href}
        onClick={props.onClick}
        aria-current={isActive ? "page" : undefined}
        className={`group relative inline-flex items-center py-2 text-sm font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold rounded-sm ${props.className || ""}`}
      >
        {props.children}
        <span
          className={`absolute inset-x-0 -bottom-1 h-0.5 rounded-full transition-all duration-300 origin-center ${
            isActive
              ? "bg-gold scale-x-100"
              : "bg-gold/60 scale-x-0 group-hover:scale-x-100"
          }`}
        />
      </Link>
    )
  }

  const megaProps = props as MegaItemProps
  return (
    <div
      className="relative"
      onMouseEnter={() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        setMegaOpen(true)
      }}
      onMouseLeave={() => {
        timeoutRef.current = setTimeout(() => setMegaOpen(false), 150)
      }}
    >
      <button
        aria-expanded={megaOpen}
        aria-haspopup="true"
        className={`group relative inline-flex items-center gap-1 py-2 text-sm font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold rounded-sm ${props.className || ""}`}
      >
        {props.children}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${megaOpen ? "rotate-180" : ""}`} />
        <span
          className={`absolute inset-x-0 -bottom-1 h-0.5 rounded-full transition-all duration-300 origin-center ${
            megaOpen
              ? "bg-gold scale-x-100"
              : "bg-gold/60 scale-x-0 group-hover:scale-x-100"
          }`}
        />
      </button>
      <MegaMenu
        items={megaProps.megaItems}
        isOpen={megaOpen}
        onKeepOpen={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); setMegaOpen(true) }}
        onStartClose={() => { timeoutRef.current = setTimeout(() => setMegaOpen(false), 150) }}
      />
    </div>
  )
}
