"use client"

import { useState, useCallback } from "react"
import Sidebar from "@/components/dashboard/layout/Sidebar"
import Header from "@/components/dashboard/layout/Header"
import { mockNotifications } from "@/lib/dashboard/data"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const unreadCount = mockNotifications.filter((n) => !n.read).length

  const toggleCollapsed = useCallback(() => setCollapsed((prev) => !prev), [])
  const openMobile = useCallback(() => setMobileOpen(true), [])
  const closeMobile = useCallback(() => setMobileOpen(false), [])

  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
      <Sidebar collapsed={collapsed} onToggle={toggleCollapsed} mobileOpen={mobileOpen} onMobileClose={closeMobile} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={openMobile} notificationCount={unreadCount} />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  )
}
