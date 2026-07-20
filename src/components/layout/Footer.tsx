import Link from "next/link"
import Image from "next/image"
import { MapPin, Mail, Phone } from "lucide-react"
import Badge from "@/components/ui/Badge"
import IconWrapper from "@/components/ui/IconWrapper"
import { prisma } from "@/lib/prisma"
import { footerData, type FooterData } from "./footer-data"

async function getSettings(): Promise<Partial<FooterData["company"]> & { instagramUrl?: string; facebookUrl?: string }> {
  try {
    const settings = await prisma.setting.findMany({
      where: { key: { in: ["site_name", "contact_phone", "contact_email", "address", "instagram_url", "facebook_url"] } },
    })
    const map: Record<string, string> = {}
    for (const s of settings) map[s.key] = s.value
    return {
      name: map.site_name || undefined,
      whatsapp: map.contact_phone ? `+62 ${map.contact_phone}` : undefined,
      whatsappNumber: map.contact_phone ? map.contact_phone.replace(/[^0-9]/g, "") : undefined,
      email: map.contact_email || undefined,
      address: map.address || undefined,
      instagramUrl: map.instagram_url || undefined,
      facebookUrl: map.facebook_url || undefined,
    }
  } catch {
    return {}
  }
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  )
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
  )
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

const socialIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
  TikTok: TikTokIcon,
  YouTube: YouTubeIcon,
  LinkedIn: LinkedInIcon,
}

export default async function Footer() {
  const db = await getSettings()
  const company = { ...footerData.company, ...db }
  const social = footerData.social.map((s) => {
    if (s.name === "Instagram" && db.instagramUrl) return { ...s, href: db.instagramUrl }
    if (s.name === "Facebook" && db.facebookUrl) return { ...s, href: db.facebookUrl }
    return s
  })
  const { columns, badges, copyright } = footerData

  return (
    <footer className="relative border-t border-border bg-surface overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gold/[0.02] to-transparent pointer-events-none" />
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 relative py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          <div className="sm:col-span-2 lg:col-span-1 space-y-6">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <Image
                src="/logo.png"
                alt="Maktabah Al-Mughis"
                width={170}
                height={16}
                className="h-7 w-auto"
              />
            </Link>
            <p className="text-sm text-secondary leading-relaxed">
              {company.tagline}
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <IconWrapper size="sm">
                  <MapPin className="w-3.5 h-3.5" />
                </IconWrapper>
                <span className="text-sm text-secondary">{company.address}</span>
              </div>
              <a href={`mailto:${company.email}`} className="flex items-center gap-3 group">
                <IconWrapper size="sm">
                  <Mail className="w-3.5 h-3.5" />
                </IconWrapper>
                <span className="text-sm text-secondary group-hover:text-gold transition-colors duration-300">
                  {company.email}
                </span>
              </a>
              <a href={`https://wa.me/${company.whatsappNumber}`} className="flex items-center gap-3 group" target="_blank" rel="noopener noreferrer">
                <IconWrapper size="sm">
                  <Phone className="w-3.5 h-3.5" />
                </IconWrapper>
                <span className="text-sm text-secondary group-hover:text-gold transition-colors duration-300">
                  {company.whatsapp}
                </span>
              </a>
            </div>
            <div className="flex items-center gap-3 pt-2">
              {social.map((item) => {
                const Icon = socialIconMap[item.name]
                if (!Icon) return null
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="w-9 h-9 rounded-xl border border-border bg-background flex items-center justify-center text-secondary hover:bg-gold hover:text-white hover:border-gold transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                )
              })}
            </div>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-semibold text-sm text-primary mb-5">{col.title}</h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-secondary hover:text-gold transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-secondary">{copyright}</p>
          <div className="flex items-center gap-2">
            {badges.map((badge) => (
              <Badge key={badge} variant="outline">
                {badge}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
