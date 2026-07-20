"use client"

import { use } from "react"
import Link from "next/link"
import { ArrowLeft, CalendarDays, User, BookOpen } from "lucide-react"
import { notFound } from "next/navigation"
import { Badge, Divider } from "@/components/ui"
import ManuscriptTimeline from "@/components/dashboard/cards/ManuscriptTimeline"
import EditorNotes from "@/components/dashboard/cards/EditorNotes"
import { mockManuscripts, statusLabels, statusColors } from "@/lib/dashboard/data"

interface Props {
  params: Promise<{ id: string }>
}

const mockActivityHistory = [
  { action: "Naskah dikirim", date: "20 Juni 2026" },
  { action: "Diterima oleh tim penerbitan", date: "21 Juni 2026" },
  { action: "Masuk tahap review editor", date: "22 Juni 2026" },
  { action: "Catatan revisi dari editor", date: "25 Juni 2026" },
  { action: "Revisi dikirim kembali", date: "28 Juni 2026" },
  { action: "Masuk tahap editing", date: "1 Juli 2026" },
]

export default function ManuscriptDetailPage({ params }: Props) {
  const { id } = use(params)
  const manuscript = mockManuscripts.find((m) => m.id === id)

  if (!manuscript) notFound()

  return (
    <div>
      <Link href="/dashboard/manuscripts" className="inline-flex items-center gap-1.5 text-sm text-green/70 dark:text-gold/80 hover:text-green-dark dark:hover:text-cream transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" />
        Kembali ke naskah
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Badge variant="outline">{manuscript.category}</Badge>
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium border ${statusColors[manuscript.status]}`}>
              {statusLabels[manuscript.status]}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-green-dark dark:text-cream">{manuscript.title}</h1>
          <div className="flex items-center gap-4 mt-2 text-sm text-green/70 dark:text-gold/80">
            <span className="flex items-center gap-1.5"><User className="w-4 h-4" />{manuscript.author}</span>
            <span className="flex items-center gap-1.5"><CalendarDays className="w-4 h-4" />{manuscript.createdAt}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-cream dark:bg-green-dark/80 rounded-2xl border border-gold/20 dark:border-gold/10 p-6">
            <h3 className="text-sm font-semibold text-green-dark dark:text-cream mb-3">Sinopsis</h3>
            <p className="text-sm text-green/70 dark:text-gold/80 leading-relaxed">{manuscript.synopsis}</p>
          </div>
          <EditorNotes />
          <div className="bg-cream dark:bg-green-dark/80 rounded-2xl border border-gold/20 dark:border-gold/10 p-6">
            <h3 className="text-sm font-semibold text-green-dark dark:text-cream mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-gold" />
              Riwayat Aktivitas
            </h3>
            <div className="space-y-0">
              {mockActivityHistory.map((item, i) => (
                <div key={i} className="relative flex gap-4 pb-4 last:pb-0">
                  {i < mockActivityHistory.length - 1 && <div className="absolute left-[7px] top-4 bottom-0 w-px bg-zinc-200 dark:bg-zinc-700" />}
                  <div className="w-[14px] h-[14px] rounded-full border-2 border-gold/40 bg-white dark:bg-zinc-900 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-green-dark dark:text-cream">{item.action}</p>
                    <p className="text-xs text-green/60 dark:text-gold/70 mt-0.5">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <ManuscriptTimeline currentStatus={manuscript.status} />
          <div className="bg-cream dark:bg-green-dark/80 rounded-2xl border border-gold/20 dark:border-gold/10 p-6">
            <h3 className="text-sm font-semibold text-green-dark dark:text-cream mb-3">Informasi Naskah</h3>
            <Divider className="mb-3" />
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between"><span className="text-green/70 dark:text-gold/80">Judul</span><span className="text-green-dark dark:text-cream font-medium text-right max-w-[60%]">{manuscript.title}</span></div>
              <div className="flex justify-between"><span className="text-green/70 dark:text-gold/80">Kategori</span><span className="text-green-dark dark:text-cream">{manuscript.category}</span></div>
              <div className="flex justify-between"><span className="text-green/70 dark:text-gold/80">Penulis</span><span className="text-green-dark dark:text-cream">{manuscript.author}</span></div>
              <div className="flex justify-between"><span className="text-green/70 dark:text-gold/80">Dibuat</span><span className="text-green-dark dark:text-cream">{manuscript.createdAt}</span></div>
              <div className="flex justify-between"><span className="text-green/70 dark:text-gold/80">Diperbarui</span><span className="text-green-dark dark:text-cream">{manuscript.updatedAt}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
