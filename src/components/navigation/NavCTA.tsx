import Link from "next/link"
import { MessageCircle, ArrowRight } from "lucide-react"

export default function NavCTA() {
  return (
    <Link
      href="/kontak"
      className="group inline-flex items-center gap-2 px-5 py-2.5 bg-gold hover:bg-gold-dark text-green-dark font-semibold text-sm rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-gold/30 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
    >
      <MessageCircle className="w-3.5 h-3.5" />
      Hubungi Kami
      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  )
}
