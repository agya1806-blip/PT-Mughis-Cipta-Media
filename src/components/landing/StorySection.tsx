"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Eye, BookOpen, Shield, Sparkles, Users, TrendingUp, CheckCircle, Quote, ArrowRight, Target } from "lucide-react"
import Link from "next/link"
import Badge from "@/components/ui/Badge"
import Divider from "@/components/ui/Divider"
import { fadeInLeft, fadeInRight, fadeInUp, staggerContainer, staggerItem, scaleIn } from "./types"

const storyIntro = {
  badge: "Cerita Kami",
  title: "Membangun Peradaban Melalui ",
  accent: "Literasi",
  paragraphs: [
    "PT Mughis Cipta Media lahir dari keyakinan bahwa setiap ide layak diabadikan dalam bentuk buku. Kami hadir sebagai mitra terpercaya bagi penulis, institusi, dan organisasi untuk mewujudkan karya bermakna.",
    "Lebih dari sekadar penerbit, kami adalah jembatan antara penulis dan pembaca, antara gagasan dan kenyataan. Dengan standar kualitas tinggi dan sentuhan personal, setiap buku adalah mahakarya yang menginspirasi.",
  ],
}

const vision = {
  quote: "Menjadi perusahaan penerbitan dan media kreatif yang terpercaya, inovatif, serta berkontribusi dalam membangun peradaban melalui ilmu pengetahuan, pendidikan, dan literasi.",
  author: "Visi PT Mughis Cipta Media",
}

const missions = [
  { icon: BookOpen, title: "Memberdayakan Penulis", desc: "Mendukung dan memberdayakan penulis Indonesia untuk menghasilkan karya terbaik mereka." },
  { icon: Sparkles, title: "Menerbitkan Buku Berkualitas", desc: "Menghadirkan buku-buku bermutu tinggi yang mencerahkan dan menginspirasi masyarakat." },
  { icon: TrendingUp, title: "Menyebarluaskan Ilmu", desc: "Memperluas akses literasi melalui inovasi digital dan jaringan distribusi nasional." },
  { icon: Users, title: "Layanan Profesional", desc: "Memberikan layanan penerbitan yang profesional, transparan, dan terpercaya." },
]

const values = [
  { icon: Shield, title: "Integritas", desc: "Kejujuran dan tanggung jawab dalam setiap aspek bisnis. Kepercayaan adalah fondasi utama kami." },
  { icon: Target, title: "Kualitas", desc: "Tidak ada kompromi dalam kualitas. Setiap karya melalui proses kurasi dan produksi yang ketat." },
  { icon: Sparkles, title: "Inovasi", desc: "Terus berinovasi dalam teknologi penerbitan, desain, dan distribusi untuk solusi terbaik." },
  { icon: Users, title: "Kolaborasi", desc: "Sinergi dengan penulis, institusi, dan masyarakat untuk menciptakan dampak literasi yang luas." },
]

const timeline = [
  { year: "2020", label: "Berdiri", desc: "PT Mughis Cipta Media resmi didirikan sebagai penerbit dan media kreatif." },
  { year: "2021", label: "Berkembang", desc: "Memulai operasional penerbitan dengan buku-buku pertama yang mendapat sambutan positif." },
  { year: "2023", label: "Tonggak Penerbitan", desc: "Mengembangkan divisi percetakan dan memperluas jangkauan distribusi nasional." },
  { year: "2025+", label: "Visi Masa Depan", desc: "Terus berkembang menjadi penerbit nasional yang berkontribusi pada literasi Indonesia." },
]

function AnimatedDivider() {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="origin-left"
    >
      <Divider decorative className="my-24 sm:my-32" />
    </motion.div>
  )
}

export default function StorySection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} id="story" className="py-24 sm:py-32 overflow-hidden bg-zinc-50/50 dark:bg-zinc-900/30">
      <div className="container">
        {/* INTRO — Two-column editorial layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <Badge variant="gold" className="mb-6">
              {storyIntro.badge}
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white leading-[1.15] tracking-tight text-balance">
              {storyIntro.title}
              <span className="bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent">
                {storyIntro.accent}
              </span>
            </h2>
            <div className="mt-6 space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {storyIntro.paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                >
                  {p}
                </motion.p>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,169,106,0.12),transparent_60%)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-white/30 dark:from-black/30 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-20 h-20 rounded-2xl bg-gold/10 flex items-center justify-center mb-5">
                  <span className="text-4xl font-bold text-gold">M</span>
                </div>
                <p className="text-zinc-400 dark:text-zinc-500 text-sm uppercase tracking-[0.15em] font-medium">
                  Est. 2020
                </p>
                <div className="mt-6 w-16 h-0.5 bg-gold/30" />
                <p className="mt-4 text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                  PT Mughis Cipta Media
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <AnimatedDivider />

        {/* VISION — Editorial pull quote */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-12 bg-gold/30" />
            <Eye className="w-5 h-5 text-gold" />
            <div className="h-px w-12 bg-gold/30" />
          </div>
          <blockquote className="relative">
            <Quote className="absolute -top-6 -left-4 w-8 h-8 text-gold/20" />
            <p className="text-2xl sm:text-3xl lg:text-4xl font-serif font-medium leading-[1.4] text-zinc-800 dark:text-zinc-100 italic">
              &ldquo;{vision.quote}&rdquo;
            </p>
            <footer className="mt-6 text-sm text-zinc-500 dark:text-zinc-400 tracking-wide">
              — {vision.author}
            </footer>
          </blockquote>
        </motion.div>

        <AnimatedDivider />

        {/* MISSIONS — 2x2 grid */}
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <Badge variant="gold" className="mb-4">
              Misi Kami
            </Badge>
            <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
              Komitmen{" "}
              <span className="bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent">
                Kami
              </span>
            </h3>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid sm:grid-cols-2 gap-5"
          >
            {missions.map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                variants={staggerItem}
                className="group flex items-start gap-5 p-6 rounded-2xl bg-white dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/50 hover:border-gold/30 transition-all duration-300 hover:shadow-md"
              >
                <div className="w-11 h-11 rounded-xl bg-gold/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-900 dark:text-white text-sm sm:text-base">
                    {title}
                  </h4>
                  <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <AnimatedDivider />

        {/* CORE VALUES — 4 cards */}
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <Badge variant="gold" className="mb-4">
              Value Perusahaan
            </Badge>
            <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
              Nilai{" "}
              <span className="bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent">
                Dasar
              </span>
            </h3>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {values.map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                variants={staggerItem}
                className="group relative bg-white dark:bg-zinc-800/40 rounded-2xl border border-zinc-200 dark:border-zinc-700/50 p-6 transition-all duration-300 hover:shadow-lg hover:border-gold/30"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="relative">
                  <div className="w-11 h-11 rounded-xl bg-gold/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <h4 className="font-semibold text-zinc-900 dark:text-white">{title}</h4>
                  <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <AnimatedDivider />

        {/* TIMELINE PREVIEW */}
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <Badge variant="gold" className="mb-4">
              Perjalanan
            </Badge>
            <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
              Timeline{" "}
              <span className="bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent">
                Perusahaan
              </span>
            </h3>
          </motion.div>

          <div className="relative">
            <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/40 via-gold/20 to-gold/40 -translate-x-1/2 hidden sm:block" />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="space-y-10 sm:space-y-0"
            >
              {timeline.map((item, i) => (
                <motion.div
                  key={item.label}
                  variants={staggerItem}
                  className={`relative sm:flex sm:items-start gap-8 sm:gap-12 ${
                    i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? "sm:text-right" : "sm:text-left"} hidden sm:block`}>
                    <div className="inline-block">
                      <span className="text-gold text-xs font-semibold uppercase tracking-wider">
                        {item.year}
                      </span>
                      <h4 className="mt-1 font-semibold text-zinc-900 dark:text-white">
                        {item.label}
                      </h4>
                      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-sm">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <div className="relative flex sm:block items-start gap-5 sm:gap-0">
                    <div className="relative z-10 w-12 h-12 rounded-full bg-white dark:bg-zinc-900 border-2 border-gold/30 flex items-center justify-center shrink-0 shadow-sm">
                      <div className="w-2.5 h-2.5 rounded-full bg-gold" />
                    </div>
                    <div className="sm:hidden flex-1 min-w-0">
                      <span className="text-gold text-xs font-semibold uppercase tracking-wider">
                        {item.year}
                      </span>
                      <h4 className="mt-0.5 font-semibold text-zinc-900 dark:text-white">
                        {item.label}
                      </h4>
                      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <div className={`flex-1 hidden sm:block ${i % 2 === 0 ? "sm:text-left" : "sm:text-right"}`}>
                    <div className="invisible">
                      <span className="text-gold text-xs font-semibold uppercase tracking-wider">
                        {item.year}
                      </span>
                      <h4 className="mt-1 font-semibold text-zinc-900 dark:text-white">
                        {item.label}
                      </h4>
                      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-sm">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/tentang-kami"
              className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-dark transition-colors duration-200 group"
            >
              Lihat Perjalanan Lengkap
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
