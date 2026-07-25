"use client"

import { Bell, Menu } from "lucide-react"
import Link from "next/link"
import { Avatar } from "@/components/ui"

interface Props {
  onMenuClick: () => void
  notificationCount: number
}

export default function Header({ onMenuClick, notificationCount }: Props) {

  return (
    <header className="sticky top-0 z-30 h-16 bg-cream/90 backdrop-blur-xl border-b border-gold/20">
      <div className="flex items-center justify-between h-full px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg text-green/70 hover:text-green-dark hover:bg-gold/10 transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden sm:flex items-center gap-2 text-sm text-green/70">
            <Link href="/" className="hover:text-green-dark transition-colors">Beranda</Link>
            <span>/</span>
            <span className="text-green-dark font-medium">Dashboard</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/notifications"
            className="relative flex items-center justify-center w-9 h-9 rounded-lg text-green/70 hover:text-green-dark hover:bg-gold/10 transition-colors"
          >
            <Bell className="w-4 h-4" />
            {notificationCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 flex items-center justify-center bg-gold text-white text-[9px] font-bold rounded-full">
                {notificationCount > 9 ? "9+" : notificationCount}
              </span>
            )}
          </Link>

          <div className="flex items-center gap-2 pl-2 border-l border-gold/20 ml-1">
            <div className="hidden sm:block text-right">
              <p className="text-xs font-medium text-green-dark">Ahmad Rizki</p>
              <p className="text-[10px] text-green/60">Author</p>
            </div>
            <Avatar name="Ahmad Rizki" size="sm" />
          </div>
        </div>
      </div>
    </header>
  )
}
