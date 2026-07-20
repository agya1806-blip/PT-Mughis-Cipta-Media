"use client"

import { motion } from "framer-motion"
import { useReducedMotion } from "framer-motion"
import { Avatar, Button, Divider } from "@/components/ui"
import { mockProfile } from "@/lib/dashboard/data"
import { CalendarDays } from "lucide-react"

export default function ProfilePage() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-green-dark dark:text-cream">Profil</h1>
        <p className="text-sm text-green/70 dark:text-gold/80 mt-1">Kelola informasi akun Anda</p>
      </div>

      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl"
      >
        <div className="bg-cream dark:bg-green-dark/80 rounded-2xl border border-gold/20 dark:border-gold/10 p-6 sm:p-8 mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-6">
            <Avatar name={mockProfile.name} size="lg" className="w-16 h-16 text-lg" />
            <div className="text-center sm:text-left">
              <h2 className="text-lg font-semibold text-green-dark dark:text-cream">{mockProfile.name}</h2>
              <p className="text-sm text-green/70 dark:text-gold/80">{mockProfile.email}</p>
              <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-1 text-xs text-green/60 dark:text-gold/70">
                <CalendarDays className="w-3.5 h-3.5" />
                Anggota sejak {mockProfile.memberSince}
              </div>
            </div>
          </div>
          <Divider className="mb-6" />
          <div className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-green-dark dark:text-cream mb-1.5">Nama Lengkap</label>
              <input id="name" type="text" defaultValue={mockProfile.name} className="w-full h-11 px-4 bg-cream dark:bg-green/20 border border-gold/30 dark:border-gold/10 rounded-xl text-sm text-green-dark dark:text-cream placeholder-green/60 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all duration-200" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-green-dark dark:text-cream mb-1.5">Email</label>
              <input id="email" type="email" defaultValue={mockProfile.email} className="w-full h-11 px-4 bg-cream dark:bg-green/20 border border-gold/30 dark:border-gold/10 rounded-xl text-sm text-green-dark dark:text-cream placeholder-green/60 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all duration-200" />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-green-dark dark:text-cream mb-1.5">Nomor HP</label>
              <input id="phone" type="tel" defaultValue={mockProfile.phone} className="w-full h-11 px-4 bg-cream dark:bg-green/20 border border-gold/30 dark:border-gold/10 rounded-xl text-sm text-green-dark dark:text-cream placeholder-green/60 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all duration-200" />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-green-dark dark:text-cream mb-1.5">Alamat</label>
              <textarea id="address" rows={2} defaultValue={mockProfile.address} className="w-full px-4 py-3 bg-cream dark:bg-green/20 border border-gold/30 dark:border-gold/10 rounded-xl text-sm text-green-dark dark:text-cream placeholder-green/60 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all duration-200 resize-none" />
            </div>
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-green-dark dark:text-cream mb-1.5">Bio</label>
              <textarea id="bio" rows={3} defaultValue={mockProfile.bio} className="w-full px-4 py-3 bg-cream dark:bg-green/20 border border-gold/30 dark:border-gold/10 rounded-xl text-sm text-green-dark dark:text-cream placeholder-green/60 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all duration-200 resize-none" />
            </div>
            <div className="pt-2">
              <Button type="submit">Simpan Perubahan</Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
