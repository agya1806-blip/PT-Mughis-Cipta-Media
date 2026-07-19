"use client"

import { motion } from "framer-motion"
import { HelpCircle, Mail, MessageCircle, ChevronRight } from "lucide-react"
import { MOTION } from "@/config/design"
import SectionTitle from "@/components/company/SectionTitle"
import FAQAccordion from "@/components/faq/FAQAccordion"
import Breadcrumb from "@/components/ui/Breadcrumb"
import Button from "@/components/ui/Button"
import GlassPanel from "@/components/ui/GlassPanel"
import { companyFAQ } from "@/components/company/company-data"

export default function CompanyFAQPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <section className="relative overflow-hidden bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900 pt-20 sm:pt-24 lg:pt-32 pb-16 sm:pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(200,169,106,0.08),transparent_50%)]" />
        <div className="container relative">
          <Breadcrumb items={[{ label: "Beranda", href: "/" }, { label: "Profil Perusahaan", href: "/company" }, { label: "FAQ" }]} />
          <motion.div variants={MOTION.fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-8 max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-[11px] font-medium uppercase tracking-[0.1em] mb-6">FAQ Perusahaan</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white leading-[1.1] tracking-tight">Pertanyaan yang <span className="bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent">Sering Diajukan</span></h1>
            <p className="mt-6 text-lg sm:text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed">Temukan jawaban atas pertanyaan seputar PT Mughis Cipta Media, layanan penerbitan, percetakan, dan distribusi.</p>
          </motion.div>
        </div>
      </section>
      <section className="py-24 lg:py-32 bg-white dark:bg-zinc-950">
        <div className="container max-w-4xl">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              {companyFAQ.map((category) => (
                <motion.div key={category.category} variants={MOTION.fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
                  <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center"><HelpCircle className="w-4 h-4 text-gold" /></span>
                    {category.category}
                  </h2>
                  <FAQAccordion items={category.items} />
                </motion.div>
              ))}
            </div>
            <motion.div variants={MOTION.fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6">
              <GlassPanel intensity="medium" className="p-6 space-y-5">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-4"><Mail className="w-6 h-6 text-gold" /></div>
                  <h3 className="font-bold text-zinc-900 dark:text-white mb-1">Masih Punya Pertanyaan?</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Tim kami siap membantu Anda.</p>
                </div>
                <div className="space-y-3">
                  <Button href="/kontak" variant="primary" className="w-full justify-center"><Mail className="w-4 h-4" />Hubungi Kami</Button>
                  <Button href="https://wa.me/6281234567890" variant="outline" className="w-full justify-center"><MessageCircle className="w-4 h-4" />WhatsApp</Button>
                </div>
              </GlassPanel>
              <GlassPanel intensity="light" className="p-6 space-y-4">
                <h3 className="font-bold text-zinc-900 dark:text-white text-sm">Navigasi Cepat</h3>
                <div className="space-y-2">
                  {[{ label: "Profil Perusahaan", href: "/company" }, { label: "Legalitas", href: "/company/legalitas" }, { label: "Layanan Penerbitan", href: "/layanan-penerbitan" }, { label: "Kontak", href: "/kontak" }].map((link) => (
                    <a key={link.href} href={link.href} className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-zinc-600 dark:text-zinc-400 hover:bg-gold/5 hover:text-gold transition-colors">{link.label}<ChevronRight className="w-4 h-4" /></a>
                  ))}
                </div>
              </GlassPanel>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
        <div className="container relative text-center max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-[1.15]">Siap Memulai <span className="bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent">Penerbitan?</span></h2>
          <p className="mt-4 text-lg text-zinc-400">Konsultasi gratis dengan tim profesional kami.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="/kontak" variant="primary">Konsultasi Gratis</Button>
            <Button href="/layanan-penerbitan" variant="ghost">Lihat Layanan</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
