"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    q: "How long does the publishing process take?",
    a: "The timeline depends on the complexity of your project. On average, book publishing takes 4–8 weeks from manuscript submission to finished book.",
  },
  {
    q: "What are the costs involved in publishing a book?",
    a: "Costs vary based on page count, format, quantity, and additional services like editing or cover design. Contact us for a tailored quote.",
  },
  {
    q: "Do you handle ISBN registration?",
    a: "Yes, we provide complete ISBN registration assistance through the National Library of Indonesia as part of our publishing package.",
  },
  {
    q: "Can I publish in small quantities?",
    a: "Absolutely. We offer flexible print runs, from as few as 1 copy for personal projects to large quantities for commercial distribution.",
  },
  {
    q: "What file formats do you accept?",
    a: "We accept Microsoft Word, PDF, and Google Docs. Our team can also help format your manuscript if needed.",
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
    <div className="border-b border-zinc-200 dark:border-zinc-700/50 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-medium text-zinc-900 dark:text-white text-sm sm:text-base">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-zinc-400" />
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
            <p className="pb-5 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-zinc-50 dark:bg-zinc-900/50">
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
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white leading-[1.15] tracking-tight">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="mt-3 text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto">
            Quick answers to common questions about our publishing services.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="max-w-2xl mx-auto bg-white dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700/50 px-6"
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
