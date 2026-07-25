"use client"

import { MessageSquare, User } from "lucide-react"

const mockNotes = [
  { id: "e1", author: "Dewi Sartika", role: "Editor Senior", note: "Naskah sudah cukup baik. Beberapa bagian perlu diperbaiki pada bab 3 dan 5 terkait alur cerita yang kurang konsisten. Mohon direvisi sesuai catatan yang sudah dilampirkan.", date: "2 hari yang lalu" },
  { id: "e2", author: "Dewi Sartika", role: "Editor Senior", note: "Revisi bab 3 sudah sesuai. Lanjut ke tahap editing bahasa untuk seluruh naskah.", date: "1 hari yang lalu" },
]

export default function EditorNotes() {
  return (
    <div className="bg-cream rounded-2xl border border-gold/20 p-6">
      <h3 className="text-sm font-semibold text-green-dark mb-5 flex items-center gap-2">
        <MessageSquare className="w-4 h-4 text-gold" />
        Catatan Editor
      </h3>
      {mockNotes.length === 0 ? (
        <p className="text-sm text-green-dark/80">Belum ada catatan dari editor.</p>
      ) : (
        <div className="space-y-4">
          {mockNotes.map((note) => (
            <div key={note.id} className="p-4 rounded-xl bg-cream/70 border border-gold/20">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4 text-gold" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div>
                      <p className="text-xs font-semibold text-green-dark">{note.author}</p>
                      <p className="text-[10px] text-green-dark/80">{note.role}</p>
                    </div>
                    <span className="text-[10px] text-green-dark/80 shrink-0">{note.date}</span>
                  </div>
                  <p className="text-xs text-green/80 leading-relaxed mt-1.5">{note.note}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
