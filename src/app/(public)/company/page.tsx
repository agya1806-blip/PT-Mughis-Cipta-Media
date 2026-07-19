"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Building2, Target, Eye, CheckCircle, Shield, Award, BookText, Printer, Globe } from "lucide-react"
import { MOTION } from "@/config/design"
import SectionTitle from "@/components/company/SectionTitle"
import CompanyCard from "@/components/company/CompanyCard"
import Timeline from "@/components/company/Timeline"
import Breadcrumb from "@/components/ui/Breadcrumb"
import Button from "@/components/ui/Button"
import { companyValues, milestones, companyStats, whyUs } from "@/components/company/company-data"

export default function CompanyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <section className="relative overflow-hidden bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(200,169,106,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(200,169,106,0.06),transparent_50%)]" />
        <div className="container relative pt-20 sm:pt-24 lg:pt-32 pb-16 sm:pb-20">
          <Breadcrumb items={[{ label: "Beranda", href: "/" }, { label: "Profil Perusahaan" }]} />
          <motion.div variants={MOTION.fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-8 max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-[11px] font-medium uppercase tracking-[0.1em] mb-6">Profil Perusahaan</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white leading-[1.1] tracking-tight">PT Mughis <span className="bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent">Cipta Media</span></h1>
            <p className="mt-6 text-lg sm:text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl">Perusahaan penerbitan, percetakan, dan media kreatif yang berkomitmen menghadirkan karya berkualitas bagi dunia pendidikan dan literasi Indonesia melalui Maktabah al-Mughis.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/company/legalitas" variant="primary">Legalitas Perusahaan<ArrowRight className="w-4 h-4" /></Button>
              <Button href="/company/faq" variant="outline">FAQ Perusahaan</Button>
            </div>
          </motion.div>
          <motion.div variants={MOTION.stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {companyStats.map((stat) => (
              <motion.div key={stat.label} variants={MOTION.fadeUp} className="text-center p-6 rounded-2xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/30">
                <p className="text-3xl sm:text-4xl font-bold text-gold">{stat.value}{stat.suffix}</p>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-white dark:bg-zinc-950">
        <div className="container">
          <SectionTitle badge="Tentang Perusahaan" title="Mitra Terpercaya untuk" accent="Penerbitan Anda" description="PT Mughis Cipta Media hadir sebagai solusi lengkap bagi para penulis dan penerbit." />
          <motion.div variants={MOTION.stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Building2, title: "Berdiri Sejak 2020", description: "Telah berpengalaman lebih dari 5 tahun dalam industri penerbitan dan media kreatif." },
              { icon: BookText, title: "Ratusan Judul Buku", description: "Telah menerbitkan ratusan judul buku berkualitas di seluruh Indonesia." },
              { icon: Printer, title: "Percetakan Modern", description: "Fasilitas percetakan dengan teknologi modern untuk hasil cetakan terbaik." },
              { icon: Globe, title: "Distribusi Nasional", description: "Jaringan distribusi yang menjangkau toko buku dan platform online." },
              { icon: Shield, title: "Legalitas Lengkap", description: "Badan usaha resmi dengan NIB, Akta, NPWP, dan sertifikasi IKAPI." },
              { icon: Award, title: "Tim Profesional", description: "Tim berpengalaman yang siap mendampingi penulis dari naskah hingga distribusi." },
            ].map((item) => (
              <motion.div key={item.title} variants={MOTION.fadeUp} className="relative bg-zinc-50 dark:bg-zinc-800/30 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-700/30 hover:border-gold/30 transition-all duration-300 hover:shadow-lg group">
                <item.icon className="w-12 h-12 text-gold mb-5" />
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-3">{item.title}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-zinc-50 dark:bg-zinc-950/50">
        <div className="container">
          <SectionTitle badge="Arah & Tujuan" title="Visi &" accent="Misi" description="Landasan yang menjadi panduan setiap langkah dan keputusan perusahaan." />
          <div className="mt-16 grid lg:grid-cols-2 gap-8">
            <motion.div variants={MOTION.fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="group relative bg-white dark:bg-zinc-800/50 rounded-3xl p-8 lg:p-10 border border-zinc-200 dark:border-zinc-700/30 hover:border-gold/30 transition-all duration-500">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"><Eye className="w-7 h-7 text-white" /></div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Visi</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg">Menjadi perusahaan penerbitan dan media kreatif yang terpercaya, inovatif, serta berkontribusi dalam membangun peradaban melalui ilmu pengetahuan, pendidikan, dan literasi.</p>
            </motion.div>
            <motion.div variants={MOTION.fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="group relative bg-white dark:bg-zinc-800/50 rounded-3xl p-8 lg:p-10 border border-zinc-200 dark:border-zinc-700/30 hover:border-gold/30 transition-all duration-500">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"><Target className="w-7 h-7 text-white" /></div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Misi</h3>
              <ul className="space-y-4">
                {["Menerbitkan buku berkualitas", "Layanan profesional dan transparan", "Memberdayakan penulis Indonesia", "Mengembangkan ekosistem literasi", "Memanfaatkan teknologi digital"].map((m, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.05, duration: 0.4 }} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-gold mt-0.5 shrink-0" /><span className="text-zinc-600 dark:text-zinc-400">{m}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-white dark:bg-zinc-950">
        <div className="container">
          <SectionTitle badge="Fundasi Perusahaan" title="Nilai" accent="Perusahaan" description="Nilai-nilai yang menjadi fondasi setiap langkah dan keputusan kami." />
          <motion.div variants={MOTION.stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyValues.map((v) => (<CompanyCard key={v.title} icon={v.icon} title={v.title} description={v.description} />))}
          </motion.div>
        </div>
      </section>

      <Timeline items={milestones} />

      <section className="relative py-24 lg:py-32 bg-white dark:bg-zinc-950 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl" />
        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={MOTION.fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <SectionTitle badge="Keunggulan" title="Mengapa Memilih" accent="Kami?" description="Layanan personal, profesional, dan terpercaya." align="left" />
              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                {whyUs.map((r, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03, duration: 0.3 }} className="flex items-start gap-3 group">
                    <CheckCircle className="w-5 h-5 text-gold mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-zinc-700 dark:text-zinc-300 text-sm">{r}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={MOTION.scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative">
              <div className="relative bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-3xl p-10 text-white overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(200,169,106,0.15),transparent_50%)]" />
                <div className="relative">
                  <h3 className="text-xl font-bold mb-2">Siap Memulai?</h3>
                  <p className="text-zinc-400 text-sm mb-6">Konsultasikan naskah Anda dengan tim kami.</p>
                  <Link href="/kontak" className="inline-flex items-center gap-2 h-11 px-6 text-sm font-semibold rounded-full bg-gold hover:bg-gold-dark text-white shadow-md transition-all duration-200">Hubungi Kami<ArrowRight className="w-4 h-4" /></Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
        <div className="container relative text-center max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-[1.15]">Bergabung dengan <span className="bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent">Maktabah al-Mughis</span></h2>
          <p className="mt-4 text-lg text-zinc-400">Wujudkan karya Anda bersama penerbit terpercaya.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="/kontak" variant="primary">Konsultasi Gratis<ArrowRight className="w-4 h-4" /></Button>
            <Button href="/layanan-penerbitan" variant="ghost">Lihat Layanan</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
