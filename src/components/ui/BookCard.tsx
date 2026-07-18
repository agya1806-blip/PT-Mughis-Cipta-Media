"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export interface BookData {
  id: string
  title: string
  author: string
  price: number
  cover_image?: string | null
  synopsis?: string | null
  category_name?: string | null
}

interface Props {
  book: BookData
  className?: string
  href?: string
}

export default function BookCard({ book, className = "", href }: Props) {
  const linkHref = href || `/buku/${book.id}`

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`group relative bg-white dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700/50 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-gold/30 ${className}`}
    >
      <Link href={linkHref} className="block">
        <div className="aspect-[3/4] bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center overflow-hidden">
          <div className="flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-500 p-4 text-center">
            <svg className="w-12 h-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
            <span className="text-xs font-medium line-clamp-2">{book.title}</span>
          </div>
        </div>
        <div className="p-4">
          {book.category_name && (
            <span className="inline-block text-[10px] font-medium text-gold bg-gold/10 px-2 py-0.5 rounded-full mb-2 uppercase tracking-wider">
              {book.category_name}
            </span>
          )}
          <h3 className="font-semibold text-zinc-900 dark:text-white leading-snug line-clamp-2 text-sm mb-1">
            {book.title}
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1 mb-2">{book.author}</p>
          <div className="text-base font-bold text-zinc-900 dark:text-white">
            Rp{book.price.toLocaleString("id-ID")}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
