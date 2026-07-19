"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useReducedMotion } from "framer-motion"
import { Eye, FileText } from "lucide-react"
import type { Manuscript } from "@/types/dashboard"
import { statusLabels, statusColors } from "@/lib/dashboard/data"

interface Props {
  manuscripts: Manuscript[]
}

export default function ManuscriptTable({ manuscripts }: Props) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="bg-white dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700/50 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700/50 bg-zinc-50 dark:bg-zinc-800/80">
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Judul</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-zinc-500 uppercase tracking-wider hidden sm:table-cell">Kategori</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-zinc-500 uppercase tracking-wider hidden md:table-cell">Tanggal</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Status</th>
              <th className="text-right px-5 py-3.5 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-700/50">
            {manuscripts.map((m, i) => (
              <motion.tr
                key={m.id}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}
                className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4 text-gold" />
                    </div>
                    <div>
                      <Link href={`/dashboard/manuscripts/${m.id}`} className="text-sm font-medium text-zinc-900 dark:text-white hover:text-gold transition-colors line-clamp-1">
                        {m.title}
                      </Link>
                      <p className="text-xs text-zinc-400 mt-0.5">{m.author}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 hidden sm:table-cell">
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">{m.category}</span>
                </td>
                <td className="px-5 py-4 hidden md:table-cell">
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">{m.createdAt}</span>
                </td>
                <td className="px-5 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium border ${statusColors[m.status]}`}>
                    {statusLabels[m.status]}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <Link href={`/dashboard/manuscripts/${m.id}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                    <Eye className="w-3.5 h-3.5" />
                    Detail
                  </Link>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
