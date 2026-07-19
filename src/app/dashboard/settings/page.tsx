"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useReducedMotion } from "framer-motion"
import { Button, Divider } from "@/components/ui"
import { User, Shield, Bell, Globe, Sun } from "lucide-react"

const sections = [
  { id: "account", label: "Account", icon: User, desc: "Informasi akun dan email" },
  { id: "security", label: "Security", icon: Shield, desc: "Kata sandi dan keamanan" },
  { id: "notification", label: "Notification", icon: Bell, desc: "Preferensi notifikasi" },
  { id: "language", label: "Language", icon: Globe, desc: "Bahasa dan region" },
  { id: "appearance", label: "Appearance", icon: Sun, desc: "Tema dan tampilan" },
] as const

type SectionId = (typeof sections)[number]["id"]

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<SectionId>("account")
  const prefersReducedMotion = useReducedMotion()

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Pengaturan</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Kelola preferensi akun Anda</p>
      </div>

      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col lg:flex-row gap-6"
      >
        <div className="lg:w-56 shrink-0">
          <nav className="bg-white dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700/50 p-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeSection === section.id
                    ? "bg-gold/10 text-gold"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
              >
                <section.icon className="w-4 h-4 shrink-0" />
                <span className="hidden lg:inline">{section.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1">
          <div className="bg-white dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700/50 p-6 sm:p-8">
            {activeSection === "account" && (
              <div className="space-y-5">
                <div><h3 className="text-base font-semibold text-zinc-900 dark:text-white">Account</h3><p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">Kelola informasi akun Anda</p></div>
                <Divider />
                <div><label className="block text-sm font-medium text-zinc-900 dark:text-white mb-1.5">Username</label><input type="text" defaultValue="ahmadrizki" className="w-full h-11 px-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all duration-200" /></div>
                <div><label className="block text-sm font-medium text-zinc-900 dark:text-white mb-1.5">Email</label><input type="email" defaultValue="ahmad.rizki@email.com" className="w-full h-11 px-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all duration-200" /></div>
                <Button type="submit">Simpan</Button>
              </div>
            )}

            {activeSection === "security" && (
              <div className="space-y-5">
                <div><h3 className="text-base font-semibold text-zinc-900 dark:text-white">Security</h3><p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">Kelola keamanan akun Anda</p></div>
                <Divider />
                <div><label className="block text-sm font-medium text-zinc-900 dark:text-white mb-1.5">Kata Sandi Saat Ini</label><input type="password" placeholder="********" className="w-full h-11 px-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all duration-200" /></div>
                <div><label className="block text-sm font-medium text-zinc-900 dark:text-white mb-1.5">Kata Sandi Baru</label><input type="password" placeholder="Masukkan kata sandi baru" className="w-full h-11 px-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all duration-200" /></div>
                <Button type="submit">Perbarui Kata Sandi</Button>
              </div>
            )}

            {activeSection === "notification" && (
              <div className="space-y-5">
                <div><h3 className="text-base font-semibold text-zinc-900 dark:text-white">Notification</h3><p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">Atur notifikasi yang ingin Anda terima</p></div>
                <Divider />
                {["Pembaruan naskah", "Pesan dari editor", "Info penerbitan", "Promo dan newsletter"].map((item) => (
                  <div key={item} className="flex items-center justify-between">
                    <span className="text-sm text-zinc-900 dark:text-white">{item}</span>
                    <div className="w-10 h-5 rounded-full bg-gold/30 relative cursor-not-allowed">
                      <div className="w-4 h-4 rounded-full bg-gold absolute top-0.5 right-0.5 shadow-sm" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeSection === "language" && (
              <div className="space-y-5">
                <div><h3 className="text-base font-semibold text-zinc-900 dark:text-white">Language</h3><p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">Pilih bahasa dan region</p></div>
                <Divider />
                <div><label className="block text-sm font-medium text-zinc-900 dark:text-white mb-1.5">Bahasa</label>
                  <select className="w-full h-11 px-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10">
                    <option>Indonesia</option><option>English</option>
                  </select>
                </div>
              </div>
            )}

            {activeSection === "appearance" && (
              <div className="space-y-5">
                <div><h3 className="text-base font-semibold text-zinc-900 dark:text-white">Appearance</h3><p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">Sesuaikan tampilan dashboard</p></div>
                <Divider />
                <div>
                  <label className="block text-sm font-medium text-zinc-900 dark:text-white mb-3">Mode Tampilan</label>
                  <div className="flex gap-3">
                    {["Light", "Dark", "System"].map((mode) => (
                      <button key={mode} className={`flex-1 px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 ${
                        mode === "Light" ? "bg-gold/10 border-gold/30 text-gold" : "border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-gold/30"
                      }`}>{mode}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
