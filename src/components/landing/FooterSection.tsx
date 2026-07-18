"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, MapPin, Phone, ArrowUp } from "lucide-react"

const footerLinks = {
  layanan: [
    { label: "Penerbitan Buku", href: "/layanan-penerbitan" },
    { label: "Percetakan", href: "/layanan-penerbitan" },
    { label: "Self Publishing", href: "/layanan-penerbitan" },
    { label: "Distribusi", href: "/layanan-penerbitan" },
  ],
  perusahaan: [
    { label: "Tentang Kami", href: "/tentang-kami" },
    { label: "Blog", href: "/blog" },
    { label: "Katalog", href: "/katalog" },
    { label: "Kontak", href: "/kontak" },
  ],
  legal: [
    { label: "FAQ", href: "/faq" },
    { label: "Kebijakan Privasi", href: "/privacy" },
    { label: "Syarat & Ketentuan", href: "/terms" },
  ],
}

export default function FooterSection() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  return (
    <footer className="relative bg-zinc-900 border-t border-white/5">
      <div className="container py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="font-semibold text-sm tracking-wide text-white">
                MAKTABAH AL-MUGHIS
              </span>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
              Penerbit, percetakan, dan mitra kreatif untuk mewujudkan karya terbaik Anda.
            </p>
            <div className="space-y-2 text-sm text-zinc-500">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-gold" />
                <span>Jakarta Selatan, Indonesia</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gold" />
                <a href="mailto:info@mughis.com" className="hover:text-gold transition-colors">info@mughis.com</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gold" />
                <a href="https://wa.me/6281234567890" className="hover:text-gold transition-colors">+62 812-3456-7890</a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white text-sm mb-4 uppercase tracking-wider">Layanan</h4>
            <ul className="space-y-2.5">
              {footerLinks.layanan.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-zinc-400 hover:text-gold transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white text-sm mb-4 uppercase tracking-wider">Perusahaan</h4>
            <ul className="space-y-2.5">
              {footerLinks.perusahaan.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-zinc-400 hover:text-gold transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white text-sm mb-4 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-zinc-400 hover:text-gold transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <h4 className="font-semibold text-white text-sm mb-3 uppercase tracking-wider">Ikuti Kami</h4>
              <div className="flex gap-3">
                {["ig", "fb", "yt"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:bg-gold hover:text-white hover:border-gold transition-all"
                  >
                    <span className="text-xs font-bold uppercase">{s}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-500">
            &copy; {new Date().getFullYear()} PT Mughis Cipta Media. All rights reserved.
          </p>
          <motion.button
            onClick={scrollTop}
            whileHover={{ y: -2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-sm hover:bg-gold hover:text-white hover:border-gold transition-all"
          >
            Kembali ke atas
            <ArrowUp className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
