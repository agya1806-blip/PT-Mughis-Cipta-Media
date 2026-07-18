import Link from "next/link"
import { motion } from "framer-motion"
import { CalendarDays, Clock, ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui"
import type { BlogArticle } from "./blog-data"

interface Props {
  article: BlogArticle
  index?: number
}

export default function BlogCard({ article, index = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="group bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/50 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-gold/30"
    >
      <Link href={`/blog/${article.slug}`} className="block">
        <div className={`relative aspect-[16/9] bg-gradient-br ${article.coverGradient} overflow-hidden`}>
          <div className={`absolute inset-0 bg-gradient-br ${article.coverGradient} opacity-60`} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <svg className="w-8 h-8 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
          </div>
          <div className="absolute top-3 left-3">
            <Badge variant="gold">{article.category}</Badge>
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-white leading-snug line-clamp-2 mb-2 group-hover:text-gold transition-colors duration-200">
            {article.title}
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 mb-4 leading-relaxed">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-white text-xs font-bold">
                {article.author.charAt(0)}
              </div>
              <div>
                <p className="text-xs font-medium text-zinc-900 dark:text-white">{article.author}</p>
                <p className="text-[11px] text-zinc-400">{article.authorRole}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-zinc-300 dark:text-zinc-600 transition-colors duration-200 group-hover:text-gold">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-700/50">
            <span className="flex items-center gap-1.5 text-[11px] text-zinc-400">
              <CalendarDays className="w-3.5 h-3.5" />
              {article.publishedAt}
            </span>
            <span className="flex items-center gap-1.5 text-[11px] text-zinc-400">
              <Clock className="w-3.5 h-3.5" />
              {article.readingTime}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
