"use client"

import { Bell, Menu, Sun, Moon } from "lucide-react"
import Link from "next/link"
import { Avatar } from "@/components/ui"
import { useTheme } from "@/components/ThemeProvider"

interface Props {
  onMenuClick: () => void
  notificationCount: number
}

export default function Header({ onMenuClick, notificationCount }: Props) {
  const { theme, toggle } = useTheme()

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-700/50">
      <div className="flex items-center justify-between h-full px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden sm:flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
            <Link href="/" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Beranda</Link>
            <span>/</span>
            <span className="text-zinc-900 dark:text-white font-medium">Dashboard</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="flex items-center justify-center w-9 h-9 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <Link
            href="/dashboard/notifications"
            className="relative flex items-center justify-center w-9 h-9 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Bell className="w-4 h-4" />
            {notificationCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 flex items-center justify-center bg-gold text-white text-[9px] font-bold rounded-full">
                {notificationCount > 9 ? "9+" : notificationCount}
              </span>
            )}
          </Link>

          <div className="flex items-center gap-2 pl-2 border-l border-zinc-200 dark:border-zinc-700/50 ml-1">
            <div className="hidden sm:block text-right">
              <p className="text-xs font-medium text-zinc-900 dark:text-white">Ahmad Rizki</p>
              <p className="text-[10px] text-zinc-400">Author</p>
            </div>
            <Avatar name="Ahmad Rizki" size="sm" />
          </div>
        </div>
      </div>
    </header>
  )
}
