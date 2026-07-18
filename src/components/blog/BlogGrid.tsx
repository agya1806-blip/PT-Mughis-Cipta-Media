"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useReducedMotion } from "framer-motion"
import { CalendarDays, ArrowRight } from "lucide-react"
import { Badge, Button } from "@/components/ui"
import BlogCard from "./BlogCard"
import { blogArticles } from "./blog-data"

export default function BlogGrid() {
  const prefersReducedMotion = useReducedMotion()
  const featured = blogArticles.find((a) => a.featured)
  const latest = blogArticles.filter((a) => !a.featured)

  return (
    <section className="py-16 sm:py-24">
      <div className="container">
        {featured && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16"
          >
            <Link href={`/blog/${featured.slug}`} className="group block">
              <div className="relative bg-white dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700/50 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-gold/30">
                <div className="grid md:grid-cols-5 gap-0">
                  <div className="md:col-span-2 relative min-h-[240px]">
                    <div className={`absolute inset-0 bg-gradient-br ${featured.coverGradient} opacity-80`} />
                    <div className={`absolute inset-0 bg-gradient-br ${featured.coverGradient}`} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                        <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-3 p-6 sm:p-8 flex flex-col justify-center">
                    <Badge variant="gold" className="mb-3 self-start">
                      {featured.category}
                    </Badge>
                    <span className="text-[11px] font-medium text-gold tracking-[0.15em] uppercase mb-2">
                      Artikel Unggulan
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white leading-tight mb-3 group-hover:text-gold transition-colors duration-200">
                      {featured.title}
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-3 mb-4">
                      {featured.excerpt}
                    </p>
                    <div className="flex items-center gap-4 mb-5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gold/20 flex items-center justify-center text-gold text-[10px] font-bold">
                          {featured.author.charAt(0)}
                        </div>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">{featured.author}</span>
                      </div>
                      <span className="flex items-center gap-1.5 text-xs text-zinc-400">
                        <CalendarDays className="w-3.5 h-3.5" />
                        {featured.publishedAt}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-gold group-hover:gap-3 transition-all duration-200">
                      Baca Selengkapnya <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {latest.length > 0 && (
          <>
            <div className="flex items-center gap-3 mb-10">
              <div className="h-px flex-1 bg-gradient-to-r from-zinc-200 dark:from-zinc-700/50 to-transparent" />
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-[0.15em]">
                Artikel Terbaru
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-zinc-200 dark:from-zinc-700/50 to-transparent" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {latest.map((article, i) => (
                <BlogCard key={article.id} article={article} index={i} />
              ))}
            </div>
          </>
        )}

        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="flex justify-center mt-12"
        >
          <Button variant="outline" disabled className="group cursor-not-allowed opacity-60">
            Muat Lebih Banyak
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
