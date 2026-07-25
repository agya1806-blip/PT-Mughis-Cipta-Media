import Link from "next/link"
import { ArrowRight, MessageCircle } from "lucide-react"

export default function NavCTA() {
  return (
    <div className="flex items-center gap-3">
      <Link
        href="/penulis"
        className="group inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-gold text-green-dark hover:text-white text-sm font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-gold/25 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
      >
        Daftar Program
        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
      <Link
        href="/kontak"
        className="group inline-flex items-center gap-2 px-5 py-2.5 border border-gold/30 text-green-dark text-sm font-medium rounded-full transition-all duration-300 hover:bg-gold/10 hover:border-gold hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
      >
        <MessageCircle className="w-3.5 h-3.5" />
        Hubungi Kami
      </Link>
    </div>
  )
}
