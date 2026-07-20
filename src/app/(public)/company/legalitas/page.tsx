"use client"

import { motion } from "framer-motion"
import { FileText, Shield, CheckCircle, Award, Scale, Building2, ExternalLink, Eye } from "lucide-react"
import { MOTION } from "@/config/design"
import SectionTitle from "@/components/company/SectionTitle"
import LegalBadge from "@/components/company/LegalBadge"
import Breadcrumb from "@/components/ui/Breadcrumb"
import GlassPanel from "@/components/ui/GlassPanel"
import { legalDocuments } from "@/components/company/company-data"

export default function LegalitasPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <section className="relative overflow-hidden bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900 pt-20 sm:pt-24 lg:pt-32 pb-16 sm:pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(200,169,106,0.08),transparent_50%)]" />
        <div className="container relative">
          <Breadcrumb items={[{ label: "Beranda", href: "/" }, { label: "Profil Perusahaan", href: "/company" }, { label: "Legalitas" }]} />
          <motion.div variants={MOTION.fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-8 max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-[11px] font-medium uppercase tracking-[0.1em] mb-6">Legalitas Perusahaan</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white leading-[1.1] tracking-tight">Legalitas & <span className="bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent">NIB</span></h1>
            <p className="mt-6 text-lg sm:text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed">PT Mughis Cipta Media memiliki legalitas lengkap dan terdaftar resmi di instansi pemerintah terkait. Seluruh dokumen legal dapat diverifikasi melalui instansi berwenang.</p>
          </motion.div>
        </div>
      </section>
      <section className="py-24 lg:py-32 bg-white dark:bg-zinc-950">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            <div className="space-y-10">
              <SectionTitle badge="Dokumen Legal" title="Surat & Dokumen" accent="Resmi" description="Dokumen legalitas yang dimiliki PT Mughis Cipta Media sebagai perusahaan berbadan hukum resmi." align="left" />
              <motion.div variants={MOTION.stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6">
                {legalDocuments.map((doc) => {
                  const Icon = doc.icon
                  return (
                    <motion.div key={doc.id} variants={MOTION.fadeUp} className="group relative bg-white dark:bg-zinc-800/50 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-700/30 hover:border-gold/30 hover:shadow-md transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="shrink-0 w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center group-hover:bg-gold group-hover:scale-110 transition-all duration-300">
                          <Icon className="w-6 h-6 text-gold group-hover:text-white transition-colors duration-300" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <h3 className="text-base font-bold text-zinc-900 dark:text-white">{doc.title}</h3>
                            <LegalBadge icon={CheckCircle} title={doc.status === "verified" ? "Terverifikasi" : "Aktif"} status={doc.status} />
                          </div>
                          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3">{doc.description}</p>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400 dark:text-zinc-500">
                            <span className="font-mono">{doc.number}</span>
                            {doc.date && <><span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-600" /><span>{doc.date}</span></>}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            </div>
            <div className="space-y-10">
              <SectionTitle badge="NIB" title="Nomor Induk" accent="Berusaha" description="NIB adalah identitas legal usaha yang diterbitkan oleh Pemerintah Indonesia melalui sistem OSS-RBA." align="left" />
              <motion.div variants={MOTION.fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <GlassPanel intensity="medium" className="p-8 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center"><FileText className="w-7 h-7 text-gold" /></div>
                    <div>
                      <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">NIB</p>
                      <p className="text-xl font-bold text-zinc-900 dark:text-white font-mono tracking-wider">1807260050954</p>
                    </div>
                  </div>
                  <div className="h-px bg-zinc-200 dark:bg-zinc-700/50" />
                  <div className="space-y-4">
                    <h3 className="font-bold text-zinc-900 dark:text-white">Informasi NIB</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {[
                        { label: "Pelaku Usaha", value: "Muhammad Aghisna" },
                        { label: "NPWP", value: "1108043110010001" },
                        { label: "KBLI", value: "58110 (Penerbitan Buku)" },
                        { label: "Skala Usaha", value: "Usaha Mikro" },
                        { label: "Tgl Terbit", value: "18 Juli 2026" },
                        { label: "Berlaku", value: "Seumur Hidup" },
                      ].map(({ label, value }) => (
                        <div key={label}>
                          <p className="text-zinc-400 dark:text-zinc-500">{label}</p>
                          <p className="font-medium text-zinc-900 dark:text-white">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="h-px bg-zinc-200 dark:bg-zinc-700/50" />
                  <div className="flex items-center gap-2 text-sm text-gold"><Shield className="w-4 h-4" /><span className="font-medium">Telah terverifikasi oleh OSS-RBA</span></div>
                </GlassPanel>
              </motion.div>
              <motion.div variants={MOTION.fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <GlassPanel intensity="light" className="p-8 space-y-5">
                  <div className="flex items-center gap-3"><Award className="w-6 h-6 text-gold" /><h3 className="font-bold text-zinc-900 dark:text-white">Sertifikasi & Keanggotaan</h3></div>
                  <div className="space-y-4">
                    {[
                      { icon: Building2, label: "Anggota IKAPI", desc: "Terdaftar sebagai anggota Ikatan Penerbit Indonesia" },
                      { icon: Scale, label: "Kepatuhan Pajak", desc: "NPWP perusahaan aktif dan patuh terhadap kewajiban perpajakan" },
                      { icon: Eye, label: "Transparan & Terpercaya", desc: "Seluruh dokumen legal dapat diverifikasi secara mandiri" },
                    ].map(({ icon: Icon, label, desc }) => (
                      <div key={label} className="flex items-start gap-3">
                        <Icon className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-zinc-900 dark:text-white">{label}</p>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2">
                    <a href="https://oss-rba.bkpm.go.id/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-dark transition-colors">Verifikasi di OSS-RBA<ExternalLink className="w-3.5 h-3.5" /></a>
                  </div>
                </GlassPanel>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(200,169,106,0.12),transparent_50%)]" />
        <div className="container relative text-center max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-[1.15]">Perusahaan <span className="bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent">Terpercaya</span></h2>
          <p className="mt-4 text-lg text-zinc-400">Dengan legalitas lengkap dan komitmen terhadap kualitas, PT Mughis Cipta Media siap menjadi mitra penerbitan Anda.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href="/kontak" className="inline-flex items-center gap-2 h-11 px-6 text-sm font-semibold rounded-full bg-gold hover:bg-gold-dark text-white shadow-md hover:shadow-lg hover:shadow-gold/25 transition-all duration-200">Hubungi Kami<ExternalLink className="w-4 h-4" /></a>
            <a href="/company" className="inline-flex items-center gap-2 h-11 px-6 text-sm font-semibold rounded-full border border-zinc-600 text-zinc-300 hover:bg-zinc-800 transition-all duration-200">Profil Perusahaan</a>
          </div>
        </div>
      </section>
    </div>
  )
}
