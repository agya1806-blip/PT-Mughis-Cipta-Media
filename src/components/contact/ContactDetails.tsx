"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

interface ContactInfo {
  phone: string
  email: string
  address: string
}

const staggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" as const },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
}

function ContactCard({
  icon,
  label,
  children,
  href,
}: {
  icon: React.ReactNode
  label: string
  children: React.ReactNode
  href?: string
}) {
  const Tag = href ? "a" : "div"
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -2 }}
      className="group relative bg-white dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700/50 p-6 transition-all duration-300 hover:shadow-lg hover:border-gold/30"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="relative">
        <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="font-semibold text-zinc-900 dark:text-white text-sm mb-1">{label}</h3>
        <Tag
          href={href as string}
          target={href ? "_blank" : undefined}
          rel={href ? "noopener noreferrer" : undefined}
          className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed hover:text-gold transition-colors"
        >
          {children}
        </Tag>
      </div>
    </motion.div>
  )
}

export default function ContactDetails({ phone, email, address }: ContactInfo) {
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
              Get in Touch
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white leading-[1.15] tracking-tight">
            Our{" "}
            <span className="bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent">
              Contact
            </span>
          </h2>
          <p className="mt-3 text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto">
            Reach out through any of these channels, and we&apos;ll respond promptly.
          </p>
        </motion.div>

        <motion.div
          variants={staggerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          <ContactCard
            icon={<MapPin className="w-5 h-5 text-gold" />}
            label="Office Address"
          >
            {address || "Jl. Raya No. 123, Jakarta"}
          </ContactCard>

          <ContactCard
            icon={<Phone className="w-5 h-5 text-gold" />}
            label="WhatsApp"
            href={phone ? `https://wa.me/${phone.replace(/[^0-9]/g, "")}` : undefined}
          >
            {phone || "+62 812-3456-7890"}
          </ContactCard>

          <ContactCard
            icon={<Mail className="w-5 h-5 text-gold" />}
            label="Email"
            href={email ? `mailto:${email}` : undefined}
          >
            {email || "info@mughis.co.id"}
          </ContactCard>

          <ContactCard
            icon={<Clock className="w-5 h-5 text-gold" />}
            label="Business Hours"
          >
            Mon–Fri, 08:00–17:00
            <br />
            Sat, 08:00–14:00
          </ContactCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="mt-8"
        >
          <div className="aspect-[21/9] bg-zinc-200 dark:bg-zinc-800 rounded-2xl border border-zinc-300 dark:border-zinc-700 flex items-center justify-center">
            <div className="text-center p-6">
              <MapPin className="w-10 h-10 text-zinc-400 mx-auto mb-3" />
              <p className="text-zinc-500 dark:text-zinc-400 font-medium">Google Maps</p>
              <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-1">
                Map integration coming soon
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
