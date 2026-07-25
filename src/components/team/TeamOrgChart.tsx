"use client"

import { motion } from "framer-motion"
import { ChevronDown, Users } from "lucide-react"
import {
  MOTION,
  SECTION_BADGE,
  SECTION_BADGE_TEXT,
  SPACING,
} from "@/config/design"
import { TEAM_CONFIG } from "@/config/team"

const levelColors = [
  "from-gold to-gold-dark",
  "from-green to-green-light",
  "from-green-light to-green-dark",
]

const levelBorderColors = [
  "border-gold/30",
  "border-green/30",
  "border-green-light/30",
]

function OrgNode({
  title,
  name,
  isLast,
}: {
  title: string
  name?: string
  isLast?: boolean
}) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`relative bg-cream rounded-xl border-2 ${levelBorderColors[0]} p-4 sm:p-5 text-center min-w-[200px] sm:min-w-[260px] shadow-lg hover:shadow-xl transition-all duration-300 group cursor-default`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.03] to-transparent rounded-xl" />
        <p className="text-xs font-semibold text-gold-dark uppercase tracking-[0.08em] mb-1">
          {title}
        </p>
        {name && (
          <p className="text-sm font-bold text-green-dark">{name}</p>
        )}
      </div>
      {!isLast && (
        <div className="flex flex-col items-center py-2">
          <div className="w-0.5 h-6 bg-gradient-to-b from-gold/40 to-green/20" />
          <ChevronDown className="w-4 h-4 text-gold-dark/60" />
        </div>
      )}
    </div>
  )
}

function DivisionNode({
  title,
  name,
  teamName,
  isLast,
}: {
  title: string
  name: string
  teamName?: string
  isLast?: boolean
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="h-px w-6 sm:w-12 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div
          className={`relative bg-cream rounded-xl border border-green/20 p-4 sm:p-5 text-center min-w-[200px] sm:min-w-[260px] shadow-md hover:shadow-lg transition-all duration-300 group cursor-default`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green/[0.02] to-transparent rounded-xl" />
          <p className="text-xs font-semibold text-green uppercase tracking-[0.06em] mb-1">
            {title}
          </p>
          <p className="text-sm font-medium text-green-dark">{name}</p>
        </div>
        <div className="h-px w-6 sm:w-12 bg-gradient-to-r from-gold/30 to-transparent" />
      </div>

      {teamName && (
        <>
          <div className="flex flex-col items-center py-1.5">
            <div className="w-0.5 h-4 bg-green/20" />
          </div>
          <div className="px-4 py-2 rounded-lg bg-green/5 border border-green/10 border-dashed text-xs text-green/60">
            <span className="flex items-center gap-1.5">
              <Users className="w-3 h-3" />
              {teamName}
              <span className="text-green/40">(Internal)</span>
            </span>
          </div>
        </>
      )}

      {!isLast && (
        <div className="flex flex-col items-center py-2">
          <div className="w-0.5 h-6 bg-gradient-to-b from-green/20 to-green-light/20" />
        </div>
      )}
    </div>
  )
}

export function TeamOrgChart() {
  return (
    <section className="relative py-24 sm:py-32 bg-gradient-to-b from-green/[0.02] to-cream overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-green/5 rounded-full blur-3xl pointer-events-none" />

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
              <Users className="w-3.5 h-3.5 text-gold-dark" />
              <span className={SECTION_BADGE_TEXT}>Struktur Organisasi</span>
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-green-dark leading-[1.15] tracking-tight">
            Struktur{" "}
            <span className="bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent">
              Organisasi
            </span>
          </h2>
          <p className="mt-3 text-green/80 max-w-2xl mx-auto">
            Struktur organisasi PT Mughis Cipta Media yang transparan dan
            profesional.
          </p>
        </motion.div>

        <motion.div
          variants={MOTION.fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          {/* Level 1: CEO */}
          <OrgNode
            title="Founder & Chief Executive Officer"
            name={TEAM_CONFIG.orgChart[0].name}
          />

          {/* Connector */}
          <div className="flex flex-col items-center py-2">
            <div className="w-0.5 h-6 bg-gradient-to-b from-gold/40 to-green/20" />
            <ChevronDown className="w-4 h-4 text-gold-dark/60" />
          </div>

          {/* Level 2: GM */}
          <OrgNode title="General Manager" name={TEAM_CONFIG.orgChart[1].name} />

          {/* Divider line to 3 divisions */}
          <div className="flex flex-col items-center py-2">
            <div className="w-0.5 h-6 bg-gradient-to-b from-green/20 to-green-light/20" />
            <div className="w-48 sm:w-64 h-px bg-gradient-to-r from-transparent via-green/30 to-transparent" />
          </div>

          {/* Level 3: 3 Division Heads */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 md:gap-10">
            {TEAM_CONFIG.orgChart.slice(2).map((node, i) => (
              <DivisionNode
                key={node.name}
                title={node.title}
                name={node.name}
                teamName={node.team}
                isLast={i === TEAM_CONFIG.orgChart.slice(2).length - 1}
              />
            ))}
          </div>

          {/* Bottom note */}
          <div className="mt-10 px-6 py-4 rounded-2xl bg-gold/5 border border-gold/10 text-sm text-green/60 text-center max-w-lg">
            Setiap divisi dipimpin oleh seorang Ketua Divisi yang didukung
            oleh anggota tim internal yang profesional dan berkompeten.
          </div>
        </motion.div>
      </div>
    </section>
  )
}
