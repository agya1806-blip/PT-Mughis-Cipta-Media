"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { FilePlus } from "lucide-react"
import ManuscriptTable from "@/components/dashboard/cards/ManuscriptTable"
import { mockManuscripts } from "@/lib/dashboard/data"
import { Button } from "@/components/ui"

export default function ManuscriptsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-green-dark dark:text-cream">Naskah Saya</h1>
          <p className="text-sm text-green/70 dark:text-gold/80 mt-1">Kelola dan pantau progress naskah Anda</p>
        </div>
        <Link href="/dashboard/manuscripts/new">
          <Button size="small">
            <FilePlus className="w-4 h-4" />
            Naskah Baru
          </Button>
        </Link>
      </div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
        <ManuscriptTable manuscripts={mockManuscripts} />
      </motion.div>
    </div>
  )
}
