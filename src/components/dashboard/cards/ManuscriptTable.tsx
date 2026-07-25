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
    <div className="bg-cream rounded-2xl border border-gold/20 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gold/20 bg-gold/5">
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-green-dark/80 uppercase tracking-wider">Judul</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-green-dark/80 uppercase tracking-wider hidden sm:table-cell">Kategori</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-green-dark/80 uppercase tracking-wider hidden md:table-cell">Tanggal</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-green-dark/80 uppercase tracking-wider">Status</th>
              <th className="text-right px-5 py-3.5 text-xs font-semibold text-green-dark/80 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gold/10">
            {manuscripts.map((m, i) => (
              <motion.tr
                key={m.id}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}
                className="hover:bg-gold/5 transition-colors"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4 text-gold" />
                    </div>
                    <div>
                      <Link href={`/dashboard/manuscripts/${m.id}`} className="text-sm font-medium text-green-dark hover:text-gold transition-colors line-clamp-1">
                        {m.title}
                      </Link>
                      <p className="text-xs text-green-dark/80 mt-0.5">{m.author}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 hidden sm:table-cell">
                  <span className="text-sm text-green/80">{m.category}</span>
                </td>
                <td className="px-5 py-4 hidden md:table-cell">
                  <span className="text-sm text-green-dark/80">{m.createdAt}</span>
                </td>
                <td className="px-5 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium border ${statusColors[m.status]}`}>
                    {statusLabels[m.status]}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <Link href={`/dashboard/manuscripts/${m.id}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-green-dark/80 hover:text-green-dark hover:bg-gold/10 transition-colors">
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
