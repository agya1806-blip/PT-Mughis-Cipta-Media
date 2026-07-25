"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Users, Building2, ChevronDown } from "lucide-react"
import {
  MOTION,
  SECTION_BADGE,
  SECTION_BADGE_TEXT,
  SPACING,
} from "@/config/design"
import { TeamCard } from "./TeamCard"
import type { TeamMemberPublic } from "@/lib/team/types"

const divisionLabels: Record<string, string> = {
  executive: "Pimpinan Perusahaan",
  administration: "Divisi Administrasi & Keuangan",
  editorial: "Divisi Editorial & Produksi",
  technology: "Divisi Teknologi Informasi & Layanan Digital",
}

const divisionIcons: Record<string, React.ReactNode> = {
  executive: <Building2 className="w-4 h-4" />,
  administration: <Building2 className="w-4 h-4" />,
  editorial: <Building2 className="w-4 h-4" />,
  technology: <Building2 className="w-4 h-4" />,
}

export function TeamGrid() {
  const [members, setMembers] = useState<TeamMemberPublic[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedDivisions, setExpandedDivisions] = useState<Set<string>>(
    new Set(["executive"])
  )

  useEffect(() => {
    fetch("/api/team")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMembers(data)
          const divisions = new Set(data.map((m: TeamMemberPublic) => m.division || "other"))
          setExpandedDivisions(divisions)
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const toggleDivision = (div: string) => {
    setExpandedDivisions((prev) => {
      const next = new Set(prev)
      if (next.has(div)) next.delete(div)
      else next.add(div)
      return next
    })
  }

  const grouped = members.reduce(
    (acc, m) => {
      const div = m.division || "other"
      if (!acc[div]) acc[div] = []
      acc[div].push(m)
      return acc
    },
    {} as Record<string, TeamMemberPublic[]>
  )

  return (
    <section className="relative py-24 sm:py-32 bg-cream">
      <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green/5 rounded-full blur-3xl pointer-events-none" />

      <div className={SPACING.container}>
        <motion.div
          variants={MOTION.fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center mb-6">
            <div className={SECTION_BADGE}>
              <Users className="w-3.5 h-3.5 text-green-dark" />
              <span className={SECTION_BADGE_TEXT}>Pimpinan & Ketua Divisi</span>
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-green-dark leading-[1.15] tracking-tight">
            Jajaran{" "}
            <span className="bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent">
              Pimpinan Perusahaan
            </span>
          </h2>
          <p className="mt-3 text-green/80 max-w-2xl mx-auto">
            PT Mughis Cipta Media dipimpin oleh para profesional yang
            berkompeten di bidangnya masing-masing.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="bg-cream rounded-2xl border border-gold/10 overflow-hidden animate-pulse"
              >
                <div className="h-56 bg-green/10" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-green/10 rounded w-3/4" />
                  <div className="h-3 bg-green/10 rounded w-1/2" />
                  <div className="h-3 bg-green/10 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(grouped).map(([division, divMembers]) => (
              <motion.div
                key={division}
                variants={MOTION.fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <button
                  onClick={() => toggleDivision(division)}
                  className="flex items-center gap-3 mb-6 w-full text-left group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                    {divisionIcons[division] || <Building2 className="w-4 h-4 text-green-dark" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-green-dark group-hover:text-green-dark transition-colors">
                      {divisionLabels[division] || division}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-green-dark/70 transition-transform duration-300 ${
                      expandedDivisions.has(division) ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {expandedDivisions.has(division) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {divMembers.map((member, i) => (
                      <TeamCard
                        key={member.id}
                        member={member}
                        index={i}
                      />
                    ))}
                  </div>
                )}

              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
