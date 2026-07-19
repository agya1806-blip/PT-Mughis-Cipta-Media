"use client"

import { useState, type FormEvent } from "react"
import { motion } from "framer-motion"
import { Send } from "lucide-react"

export default function ContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
  }

  return (
    <section className="py-16 sm:py-20 md:py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 mb-6">
              <span className="text-gold text-[11px] font-medium uppercase tracking-[0.1em]">
                Send a Message
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white leading-[1.15] tracking-tight">
              Ready to{" "}
              <span className="bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent">
                Start?
              </span>
            </h2>
            <p className="mt-3 text-zinc-500 dark:text-zinc-400">
              Fill out the form below and we&apos;ll get back to you within 24 hours.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50 transition-all duration-200"
              />
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50 transition-all duration-200"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <label htmlFor="phone" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Phone (optional)
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+62 812-xxxx-xxxx"
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50 transition-all duration-200"
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your project or question..."
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50 transition-all duration-200 resize-none"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                type="submit"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold hover:bg-gold-dark text-white font-semibold rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-gold/25 hover:-translate-y-0.5"
              >
                Send Message
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
