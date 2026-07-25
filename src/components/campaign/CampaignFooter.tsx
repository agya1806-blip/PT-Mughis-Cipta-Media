import Link from "next/link"
import { Mail, Phone, MapPin, Globe } from "lucide-react"
import { CAMPAIGN } from "@/config/campaign"

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

export function CampaignFooter() {
  return (
    <footer className="bg-green relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cream/[0.03] to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-16 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="sm:col-span-2 lg:col-span-1 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="text-xl font-bold text-gold tracking-tight">PT Mughis Cipta Media</span>
            </Link>
            <p className="text-sm text-cream/85 leading-relaxed">
              Perusahaan penerbitan dan media kreatif yang berkomitmen menghadirkan karya berkualitas.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm text-gold mb-4">Tautan</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-sm text-cream/85 hover:text-gold transition-colors">Beranda</Link></li>
              <li><Link href="/tentang-kami" className="text-sm text-cream/85 hover:text-gold transition-colors">Tentang Kami</Link></li>
              <li><Link href="/katalog" className="text-sm text-cream/85 hover:text-gold transition-colors">Katalog</Link></li>
              <li><Link href="/kontak" className="text-sm text-cream/85 hover:text-gold transition-colors">Kontak</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm text-gold mb-4">Kontak</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-cream/85"><Mail className="w-3.5 h-3.5 text-gold/70" /> Mughisciptamedia@gmail.com</li>
              <li className="flex items-start gap-2 text-sm text-cream/85"><MapPin className="w-3.5 h-3.5 text-gold/70 mt-0.5 shrink-0" /> Samalanga, Bireuen, Aceh</li>
              <li>
                <a href={`https://wa.me/${CAMPAIGN.whatsappAdmin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-cream/85 hover:text-gold transition-colors">
                  <Phone className="w-3.5 h-3.5 text-gold/70" /> +62 852-1770-6587
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm text-gold mb-4">Ikuti Kami</h3>
            <a
              href={CAMPAIGN.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-cream/10 border border-gold/20 text-cream hover:bg-gold hover:text-green transition-all duration-300 text-sm"
            >
              <InstagramIcon className="w-4 h-4" />
              Instagram
            </a>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-gold/20 text-center">
          <p className="text-xs text-cream/80">&copy; {new Date().getFullYear()} PT Mughis Cipta Media. Seluruh Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  )
}
