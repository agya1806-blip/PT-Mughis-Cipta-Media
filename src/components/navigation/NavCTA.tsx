import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function NavCTA() {
  return (
    <Link
      href="/kontak"
      className="inline-flex items-center gap-2 px-5 py-2.5 bg-green hover:bg-green-dark text-gold text-sm font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-gold/25 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
    >
      Hubungi Kami
      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
    </Link>
  )
}
