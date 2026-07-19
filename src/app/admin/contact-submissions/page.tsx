"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Mail, MailOpen, Trash2, ChevronDown, ChevronUp, RefreshCw } from "lucide-react"

interface Submission {
  id: number
  name: string
  email: string
  phone: string | null
  message: string
  isRead: boolean
  createdAt: string
}

function useFetch() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/contact-submissions")
      if (res.ok) setSubmissions(await res.json())
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
  }, [])

  return { submissions, setSubmissions, loading, fetchData }
}

function DetailModal({
  submission,
  onClose,
  onMarkRead,
}: {
  submission: Submission
  onClose: () => void
  onMarkRead: (id: number) => void
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-zinc-900">{submission.name}</h3>
            <p className="text-sm text-zinc-500">{submission.email}</p>
            {submission.phone && <p className="text-sm text-zinc-400">{submission.phone}</p>}
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-600 text-xl leading-none">&times;</button>
        </div>
        <div className="text-xs text-zinc-400">
          {new Date(submission.createdAt).toLocaleString("id-ID")}
        </div>
        <div className="bg-zinc-50 rounded-xl p-4 text-sm text-zinc-700 whitespace-pre-wrap leading-relaxed">
          {submission.message}
        </div>
        <div className="flex justify-end gap-3 pt-2">
          {!submission.isRead && (
            <button
              onClick={() => { onMarkRead(submission.id); onClose() }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gold/10 text-gold text-sm font-medium hover:bg-gold/20 transition-colors"
            >
              <MailOpen className="w-4 h-4" />
              Tandai Dibaca
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ContactSubmissionsPage() {
  const { submissions, setSubmissions, loading, fetchData } = useFetch()
  const [selected, setSelected] = useState<Submission | null>(null)
  const [expanded, setExpanded] = useState<Set<number>>(new Set())
  const [deleting, setDeleting] = useState<Set<number>>(new Set())

  // fetch on mount
  const [fetched, setFetched] = useState(false)
  if (!fetched) {
    setFetched(true)
    fetchData()
  }

  const unreadCount = submissions.filter((s) => !s.isRead).length

  async function markAsRead(id: number) {
    const res = await fetch("/api/admin/contact-submissions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: [id] }),
    })
    if (res.ok) {
      setSubmissions((prev) =>
        prev.map((s) => (s.id === id ? { ...s, isRead: true } : s))
      )
      if (selected?.id === id) setSelected({ ...selected, isRead: true })
    }
  }

  async function deleteSubmission(id: number) {
    if (!confirm("Hapus pesan ini?")) return
    setDeleting((prev) => new Set(prev).add(id))
    const res = await fetch(`/api/admin/contact-submissions?id=${id}`, {
      method: "DELETE",
    })
    if (res.ok) {
      setSubmissions((prev) => prev.filter((s) => s.id !== id))
      if (selected?.id === id) setSelected(null)
    }
    setDeleting((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  function toggleExpand(id: number) {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Kontak Masuk</h1>
          <p className="text-sm text-zinc-500 mt-1">
            {unreadCount > 0
              ? `${unreadCount} pesan belum dibaca`
              : "Semua pesan sudah dibaca"}
          </p>
        </div>
        <button
          onClick={fetchData}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-zinc-200 text-sm text-zinc-600 hover:bg-zinc-50 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-zinc-400">Memuat...</div>
      ) : submissions.length === 0 ? (
        <div className="text-center py-20">
          <Mail className="w-12 h-12 mx-auto text-zinc-200 mb-4" />
          <h3 className="text-lg font-medium text-zinc-500">Belum ada pesan</h3>
          <p className="text-sm text-zinc-400">Pesan dari form kontak akan muncul di sini.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {submissions.map((sub) => {
            const isExpanded = expanded.has(sub.id)
            return (
              <motion.div
                key={sub.id}
                layout
                className={`bg-white rounded-xl border transition-all ${
                  sub.isRead
                    ? "border-zinc-200"
                    : "border-gold/30 bg-gold/[0.02]"
                }`}
              >
                <div
                  className="flex items-start gap-3 p-4 cursor-pointer"
                  onClick={() => toggleExpand(sub.id)}
                >
                  <div className="mt-0.5">
                    {sub.isRead ? (
                      <MailOpen className="w-4 h-4 text-zinc-300" />
                    ) : (
                      <Mail className="w-4 h-4 text-gold" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`text-sm font-medium truncate ${
                        sub.isRead ? "text-zinc-600" : "text-zinc-900"
                      }`}>
                        {sub.name}
                      </span>
                      {!sub.isRead && (
                        <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-zinc-400 truncate">
                      {sub.email}{sub.phone ? ` · ${sub.phone}` : ""}
                    </p>
                    <p className="text-xs text-zinc-300 mt-1">
                      {new Date(sub.createdAt).toLocaleString("id-ID")}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelected(sub)
                      }}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors"
                      title="Lihat detail"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        if (!sub.isRead) markAsRead(sub.id)
                      }}
                      disabled={sub.isRead}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Tandai dibaca"
                    >
                      <MailOpen className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteSubmission(sub.id)
                      }}
                      disabled={deleting.has(sub.id)}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-30"
                      title="Hapus"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleExpand(sub.id)}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                {isExpanded && (
                  <div className="px-4 pb-4 pl-11">
                    <div className="bg-zinc-50 rounded-lg p-3 text-sm text-zinc-700 whitespace-pre-wrap leading-relaxed">
                      {sub.message}
                    </div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      )}

      {selected && (
        <DetailModal
          submission={selected}
          onClose={() => setSelected(null)}
          onMarkRead={markAsRead}
        />
      )}
    </div>
  )
}
