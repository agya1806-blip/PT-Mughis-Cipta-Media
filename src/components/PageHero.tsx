"use client"

import { motion } from "framer-motion"
import { BookOpen, FileText, Users, Package, Sparkles } from "lucide-react"

interface Props {
  title: string
  accent: string
  description: string
  breadcrumb: { label: string; href?: string }[]
  icon?: "layanan" | "katalog" | "penulis" | "blog"
}

const icons = {
  layanan: BookOpen,
  katalog: Package,
  penulis: Users,
  blog: FileText,
}

export default function PageHero({ title, accent, description, breadcrumb, icon }: Props) {
  const Icon = icon ? icons[icon] : Sparkles

  return (
    <section className="relative min-h-[75vh] sm:min-h-[80vh] flex items-center overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(200,169,106,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(200,169,106,0.06),transparent_50%)]" />

      <motion.div
        className="absolute top-20 right-[15%] text-gold/10"
        animate={{ y: [0, -20, 0], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Icon size={48} />
      </motion.div>
      <motion.div
        className="absolute bottom-32 left-[10%] text-gold/10"
        animate={{ y: [0, 20, 0], opacity: [0.08, 0.18, 0.08] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <Icon size={32} />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 pt-32 pb-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-zinc-500 text-sm mb-6"
        >
          {breadcrumb.map((item, i) => (
            <span key={item.label} className="flex items-center gap-2">
              {i > 0 && <span className="text-zinc-700">/</span>}
              {item.href ? (
                <a href={item.href} className="hover:text-gold transition-colors">
                  {item.label}
                </a>
              ) : (
                <span className="text-zinc-300">{item.label}</span>
              )}
            </span>
          ))}
        </motion.div>

        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-gold text-xs sm:text-sm font-medium tracking-wide uppercase">
              {breadcrumb[breadcrumb.length - 1]?.label || title}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight"
          >
            {title}{" "}
            <span className="bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
              {accent}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-lg sm:text-xl text-zinc-400 leading-relaxed max-w-lg"
          >
            {description}
          </motion.p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </section>
  )
}
