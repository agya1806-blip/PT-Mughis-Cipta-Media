"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
  LayoutDashboard,
  FileText,
  FilePlus,
  Bell,
  User,
  Settings,
  ChevronLeft,
  BookOpen,
} from "lucide-react"
import { useReducedMotion } from "framer-motion"

interface Props {
  collapsed: boolean
  onToggle: () => void
  mobileOpen: boolean
  onMobileClose: () => void
}

const navItems = [
  { href: "/dashboard/overview", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/manuscripts", label: "Naskah Saya", icon: FileText },
  { href: "/dashboard/manuscripts/new", label: "Naskah Baru", icon: FilePlus },
  { href: "/dashboard/notifications", label: "Notifikasi", icon: Bell },
  { href: "/dashboard/profile", label: "Profil", icon: User },
  { href: "/dashboard/settings", label: "Pengaturan", icon: Settings },
]

export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: Props) {
  const pathname = usePathname()
  const prefersReducedMotion = useReducedMotion()

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-4 h-16 border-b border-gold/20 dark:border-gold/10 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
          <BookOpen className="w-4 h-4 text-gold" />
        </div>
        {!collapsed && (
          <motion.span
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm font-bold text-green-dark dark:text-cream truncate"
          >
            Author Panel
          </motion.span>
        )}
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onMobileClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-gold/10 text-gold"
                  : "text-green/70 dark:text-gold/80 hover:text-green-dark dark:hover:text-cream hover:bg-gold/10 dark:hover:bg-green/20"
              }`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {!collapsed && (
                <motion.span
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="truncate"
                >
                  {item.label}
                </motion.span>
              )}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-gold/20 dark:border-gold/10 p-3">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-green/70 dark:text-gold/80 hover:text-green-dark dark:hover:text-cream hover:bg-gold/10 dark:hover:bg-green/20 transition-all duration-200"
          onClick={onMobileClose}
        >
          <ChevronLeft className="w-4 h-4 shrink-0" />
          {!collapsed && <span className="truncate">Ke Toko</span>}
        </Link>
      </div>

      <div className="border-t border-gold/20 dark:border-gold/10 p-3">
        <button
          onClick={onToggle}
          className="hidden lg:flex items-center justify-center w-full py-2 rounded-xl text-sm text-green/60 dark:text-gold/70 hover:text-green-dark dark:hover:text-cream hover:bg-gold/10 dark:hover:bg-green/20 transition-all duration-200"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronLeft className={`w-4 h-4 transition-transform duration-200 ${collapsed ? "rotate-180" : ""}`} />
        </button>
      </div>
    </div>
  )

  return (
    <>
      <button
        onClick={onMobileClose}
        className="fixed inset-0 bg-green/40 backdrop-blur-sm z-40 lg:hidden"
        aria-hidden={!mobileOpen}
        style={{ display: mobileOpen ? "block" : "none" }}
      />
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 flex flex-col bg-cream dark:bg-green-dark border-r border-gold/20 dark:border-gold/10 transition-all duration-300 ${
          collapsed ? "lg:w-[68px]" : "lg:w-60"
        } ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {sidebarContent}
      </aside>
    </>
  )
}
