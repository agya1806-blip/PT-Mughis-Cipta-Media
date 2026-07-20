"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    q: "Berapa lama proses penerbitan buku?",
    a: "Waktu penerbitan tergantung pada kompleksitas proyek Anda. Rata-rata, penerbitan buku memakan waktu 4–8 minggu dari pengajuan naskah hingga buku jadi.",
  },
  {
    q: "Berapa biaya yang diperlukan untuk menerbitkan buku?",
    a: "Biaya bervariasi tergantung jumlah halaman, format, jumlah cetak, dan layanan tambahan seperti editing atau desain cover. Hubungi kami untuk penawaran yang disesuaikan.",
  },
  {
    q: "Apakah Anda mengurus pendaftaran ISBN?",
    a: "Ya, kami menyediakan bantuan pendaftaran ISBN lengkap melalui Perpustakaan Nasional Republik Indonesia sebagai bagian dari paket penerbitan kami.",
  },
  {
    q: "Bisakah saya menerbitkan dalam jumlah sedikit?",
    a: "Tentu. Kami menawarkan cetak fleksibel, mulai dari 1 eksemplar untuk proyek pribadi hingga jumlah besar untuk distribusi komersial.",
  },
  {
    q: "Format file apa yang Anda terima?",
    a: "Kami menerima Microsoft Word, PDF, dan Google Docs. Tim kami juga dapat membantu memformat naskah Anda jika diperlukan.",
  },
]

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="border-b border-gold/10 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-medium text-green-dark text-sm sm:text-base">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-gold" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-green/80 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-cream">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 mb-6">
            <span className="text-gold text-[11px] font-medium uppercase tracking-[0.1em]">
              FAQ
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-green-dark leading-[1.15] tracking-tight">
            Pertanyaan{" "}
            <span className="bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent">
              Umum
            </span>
          </h2>
          <p className="mt-3 text-green/80 max-w-lg mx-auto">
            Jawaban cepat untuk pertanyaan umum seputar layanan penerbitan kami.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="max-w-2xl mx-auto bg-cream rounded-2xl border border-gold/20 px-6"
        >
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              question={faq.q}
              answer={faq.a}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
