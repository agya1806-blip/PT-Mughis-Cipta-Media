"use client"

"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FileText, Shield, CheckCircle, Award, Scale, Building2, ExternalLink, Eye } from "lucide-react"
import { MOTION } from "@/config/design"
import SectionTitle from "@/components/company/SectionTitle"
import LegalBadge from "@/components/company/LegalBadge"
import Breadcrumb from "@/components/ui/Breadcrumb"
import GlassPanel from "@/components/ui/GlassPanel"
import { legalDocuments as defaultDocs } from "@/components/company/company-data"
import type { LegalDocument } from "@/components/company/company-data"

export default function LegalitasPage() {
  const [docs, setDocs] = useState<LegalDocument[]>(defaultDocs)
  const [settings, setSettings] = useState<Record<string, string>>({})

  useEffect(() => {
    fetch("/api/public/settings")
      .then((r) => r.json())
      .then((data) => {
        setSettings(data)
        if (data.legal_nib || data.legal_npwp) {
          setDocs([
            {
              id: "nib",
              title: "Nomor Induk Berusaha (NIB)",
              number: data.legal_nib || "1807260050954",
              date: data.legal_nib_date || "18 Juli 2026",
              description: "NIB diterbitkan oleh Pemerintah Republik Indonesia melalui sistem OSS-RBA.",
              icon: FileText,
              status: "active",
            },
            {
              id: "spp",
              title: "Status PT Perorangan",
              number: data.legal_nib || "1807260050954",
              date: data.legal_nib_date || "18 Juli 2026",
              description: "PT Perorangan atas nama Muhammad Aghisna — didirikan berdasarkan NIB melalui sistem OSS-RBA, tanpa akta notaris sesuai UU Cipta Kerja.",
              icon: Building2,
              status: "active",
            },
            {
              id: "npwp",
              title: "NPWP Perusahaan",
              number: data.legal_npwp || "1108043110010001",
              date: data.legal_npwp_date || "18 Juli 2026",
              description: "Nomor Pokok Wajib Pajak perusahaan yang terdaftar di DJP.",
              icon: Scale,
              status: "active",
            },
            {
              id: "sku",
              title: "Izin Usaha (NIB)",
              number: data.legal_nib || "1807260050954",
              date: data.legal_nib_date || "18 Juli 2026",
              description: "NIB berlaku sebagai izin usaha. KBLI 58110 (Penerbitan Buku) – sektor Perindustrian. Usaha Mikro.",
              icon: Shield,
              status: "active",
            },
            {
              id: "sertifikat",
              title: "Anggota IKAPI (Dalam Proses)",
              number: data.legal_ikapi || "-",
              date: data.legal_ikapi_date || "-",
              description: "Pendaftaran anggota IKAPI sedang dalam proses pengajuan.",
              icon: Award,
              status: "active",
            },
            {
              id: "sppl",
              title: "SPPL (Pengelolaan Lingkungan)",
              number: "6A5B3C20125CF",
              date: "18 Juli 2026",
              description: "Surat Pengelolaan Lingkungan Hidup terverifikasi otomatis melalui sistem AMDALNET.",
              icon: FileText,
              status: "active",
            },
          ])
        }
      })
      .catch(() => {})
  }, [])

  return (
    <div className="min-h-screen bg-cream dark:bg-green-dark">
      <section className="relative overflow-hidden bg-gradient-to-br from-green via-green-dark to-green pt-20 sm:pt-24 lg:pt-32 pb-16 sm:pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(211,194,151,0.08),transparent_50%)]" />
        <div className="container relative">
          <Breadcrumb items={[{ label: "Beranda", href: "/" }, { label: "Profil Perusahaan", href: "/company" }, { label: "Legalitas" }]} />
          <motion.div variants={MOTION.fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-8 max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream/10 border border-cream/20 text-gold text-[11px] font-medium uppercase tracking-[0.1em] mb-6">Legalitas Perusahaan</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-cream leading-[1.1] tracking-tight">Legalitas & <span className="bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent">NIB</span></h1>
            <p className="mt-6 text-lg sm:text-xl text-cream/70 leading-relaxed">PT Mughis Cipta Media memiliki legalitas lengkap dan terdaftar resmi di instansi pemerintah terkait. Seluruh dokumen legal dapat diverifikasi melalui instansi berwenang.</p>
          </motion.div>
        </div>
      </section>
      <section className="py-24 lg:py-32 bg-cream dark:bg-zinc-950">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            <div className="space-y-10">
              <SectionTitle badge="Dokumen Legal" title="Surat & Dokumen" accent="Resmi" description="Dokumen legalitas yang dimiliki PT Mughis Cipta Media sebagai perusahaan berbadan hukum resmi." align="left" />
              <motion.div variants={MOTION.stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6">
                {docs.map((doc) => {
                  const Icon = doc.icon
                  return (
                    <motion.div key={doc.id} variants={MOTION.fadeUp} className="group relative bg-cream dark:bg-green-dark/80 rounded-2xl p-6 border border-gold/20 dark:border-gold/10 hover:border-gold/30 hover:shadow-md transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="shrink-0 w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center group-hover:bg-gold group-hover:scale-110 transition-all duration-300">
                          <Icon className="w-6 h-6 text-gold group-hover:text-white transition-colors duration-300" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <h3 className="text-base font-bold text-green-dark dark:text-cream">{doc.title}</h3>
                            <LegalBadge icon={CheckCircle} title={doc.status === "verified" ? "Terverifikasi" : "Aktif"} status={doc.status} />
                          </div>
                          <p className="text-sm text-green/60 dark:text-cream/70 mb-3">{doc.description}</p>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-green/60 dark:text-cream/70">
                            <span className="font-mono">{doc.number}</span>
                            {doc.date && <><span className="w-1 h-1 rounded-full bg-gold/30 dark:bg-gold/20" /><span>{doc.date}</span></>}
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
                      <p className="text-xs font-medium text-green/60 dark:text-cream/70 uppercase tracking-wider">NIB</p>
                      <p className="text-xl font-bold text-green-dark dark:text-cream font-mono tracking-wider">{settings.legal_nib || "1807260050954"}</p>
                    </div>
                  </div>
                  <div className="h-px bg-gold/20 dark:bg-gold/10" />
                  <div className="space-y-4">
                    <h3 className="font-bold text-green-dark dark:text-cream">Informasi NIB</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {[
                        { label: "Pelaku Usaha", value: "Muhammad Aghisna" },
                        { label: "NPWP", value: settings.legal_npwp || "1108043110010001" },
                        { label: "KBLI", value: "58110 (Penerbitan Buku)" },
                        { label: "Skala Usaha", value: "Usaha Mikro" },
                        { label: "Tgl Terbit", value: settings.legal_nib_date || "18 Juli 2026" },
                        { label: "Berlaku", value: "Seumur Hidup" },
                      ].map(({ label, value }) => (
                        <div key={label}>
                          <p className="text-green/60 dark:text-cream/70">{label}</p>
                          <p className="font-medium text-green-dark dark:text-cream">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="h-px bg-gold/20 dark:bg-gold/10" />
                  <div className="flex items-center gap-2 text-sm text-gold"><Shield className="w-4 h-4" /><span className="font-medium">Telah terverifikasi oleh OSS-RBA</span></div>
                </GlassPanel>
              </motion.div>
              <motion.div variants={MOTION.fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <GlassPanel intensity="light" className="p-8 space-y-5">
                  <div className="flex items-center gap-3"><Award className="w-6 h-6 text-gold" /><h3 className="font-bold text-green-dark dark:text-cream">Sertifikasi & Keanggotaan</h3></div>
                  <div className="space-y-4">
                    {[
                      { icon: Building2, label: "Anggota IKAPI", desc: "Terdaftar sebagai anggota Ikatan Penerbit Indonesia" },
                      { icon: Scale, label: "Kepatuhan Pajak", desc: "NPWP perusahaan aktif dan patuh terhadap kewajiban perpajakan" },
                      { icon: Eye, label: "Transparan & Terpercaya", desc: "Seluruh dokumen legal dapat diverifikasi secara mandiri" },
                    ].map(({ icon: Icon, label, desc }) => (
                      <div key={label} className="flex items-start gap-3">
                        <Icon className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-green-dark dark:text-cream">{label}</p>
                          <p className="text-xs text-green/60 dark:text-cream/70">{desc}</p>
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(211,194,151,0.12),transparent_50%)]" />
        <div className="container relative text-center max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-[1.15]">Perusahaan <span className="bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent">Terpercaya</span></h2>
          <p className="mt-4 text-lg text-zinc-400">Dengan legalitas lengkap dan komitmen terhadap kualitas, PT Mughis Cipta Media siap menjadi mitra penerbitan Anda.</p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href="/kontak" className="inline-flex items-center gap-2 h-11 px-6 text-sm font-semibold rounded-full bg-green hover:bg-green-dark text-gold shadow-md hover:shadow-lg hover:shadow-green/25 transition-all duration-200">Hubungi Kami<ExternalLink className="w-4 h-4" /></a>
            <a href="/company" className="inline-flex items-center gap-2 h-11 px-6 text-sm font-semibold rounded-full border border-zinc-600 text-zinc-300 hover:bg-zinc-800 transition-all duration-200">Profil Perusahaan</a>
          </div>
        </div>
      </section>
    </div>
  )
}
