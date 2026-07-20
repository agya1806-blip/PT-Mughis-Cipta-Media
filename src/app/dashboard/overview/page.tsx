"use client"

import { BookOpen, FileSearch, Cog, CheckCircle2 } from "lucide-react"
import KpiCard from "@/components/dashboard/cards/KpiCard"
import ActivityTimeline from "@/components/dashboard/cards/ActivityTimeline"
import QuickActions from "@/components/dashboard/cards/QuickActions"
import { mockStats, mockActivities } from "@/lib/dashboard/data"

export default function OverviewPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-green-dark dark:text-cream">Overview</h1>
        <p className="text-sm text-green/70 dark:text-gold/80 mt-1">Selamat datang di dashboard penulis, Ahmad Rizki</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KpiCard label="Total Naskah" value={mockStats.totalManuscripts} icon={<BookOpen className="w-4 h-4" />} color="gold" />
        <KpiCard label="Sedang Direview" value={mockStats.underReview} icon={<FileSearch className="w-4 h-4" />} trend="+2" color="blue" />
        <KpiCard label="Sedang Diproses" value={mockStats.inProgress} icon={<Cog className="w-4 h-4" />} color="violet" />
        <KpiCard label="Sudah Terbit" value={mockStats.published} icon={<CheckCircle2 className="w-4 h-4" />} trend="+1" color="green" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActivityTimeline activities={mockActivities} />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>
    </div>
  )
}
