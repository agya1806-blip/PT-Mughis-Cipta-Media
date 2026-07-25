"use client"

import { motion } from "framer-motion"
import { Mail, MessageCircle, ExternalLink, Globe, Quote } from "lucide-react"
import type { TeamMemberPublic } from "@/lib/team/types"

interface TeamCardProps {
  member: TeamMemberPublic
  index: number
}

export function TeamCard({ member, index }: TeamCardProps) {
  const skills = member.skills
    ? member.skills.split(",").map((s) => s.trim()).filter(Boolean)
    : []

  const isFounder = member.role === "FOUNDER"

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="relative bg-cream rounded-2xl border border-gold/20 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-gold/10 hover:border-gold/40 hover:-translate-y-1">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Photo */}
        <div className="relative h-56 sm:h-64 overflow-hidden bg-gradient-to-br from-green to-green-dark">
          {member.photo ? (
            <img
              src={member.photo}
              alt={member.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-cream/10 border-2 border-gold/30 flex items-center justify-center">
                <span className="text-3xl font-bold text-gold/60">
                  {member.name.charAt(0)}
                </span>
              </div>
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-green-dark/80 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="inline-block px-3 py-1 rounded-full bg-gold/20 backdrop-blur-sm border border-gold/30 text-xs font-medium text-gold mb-2">
              {member.role === "FOUNDER"
                ? "Founder & CEO"
                : member.role === "GENERAL_MANAGER"
                  ? "General Manager"
                  : "Ketua Divisi"}
            </div>
            <h3 className="text-lg font-bold text-white">{member.name}</h3>
            <p className="text-xs text-cream/70">{member.position}</p>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          {/* Quote */}
          {member.quote && (
            <div className="flex items-start gap-2 text-green/60 italic text-sm border-l-2 border-gold/30 pl-3">
              <Quote className="w-3.5 h-3.5 text-gold-dark shrink-0 mt-0.5" />
              <span>&ldquo;{member.quote}&rdquo;</span>
            </div>
          )}

          {/* Bio */}
          <p className="text-sm text-green/70 leading-relaxed line-clamp-3">
            {member.bio}
          </p>

          {/* Skills */}
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-block px-2.5 py-1 rounded-full bg-gold/10 border border-gold/20 text-[11px] font-medium text-gold-dark"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          {/* Contact */}
          <div className="flex items-center gap-2 pt-2 border-t border-gold/10">
            {!isFounder && member.whatsapp && (
              <a
                href={`https://wa.me/${member.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-green/60 hover:text-green-dark transition-colors"
                title="WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>
            )}
            {!isFounder && member.email && (
              <a
                href={`mailto:${member.email}`}
                className="flex items-center gap-1.5 text-xs text-green/60 hover:text-green-dark transition-colors"
                title="Email"
              >
                <Mail className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Email</span>
              </a>
            )}
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-green/60 hover:text-green-dark transition-colors"
                title="LinkedIn"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {!isFounder && member.website && (
              <a
                href={member.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-green/60 hover:text-green-dark transition-colors ml-auto"
              >
                <Globe className="w-3.5 h-3.5" />
              </a>
            )}
            {isFounder && (
              <a
                href="/kontak"
                className="ml-auto flex items-center gap-1.5 text-xs font-semibold text-gold-dark hover:text-gold transition-colors"
              >
                HUBUNGI PERUSAHAAN
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
