import Link from "next/link"
import Avatar from "@/components/ui/Avatar"

interface Props {
  name: string
  slug: string
  photo: string | null
  field: string
  bookCount: number
}

export default function AuthorCard({ name, slug, photo, field, bookCount }: Props) {
  return (
    <Link
      href={`/penulis/${slug}`}
      className="group relative flex flex-col items-center text-center bg-cream rounded-2xl border border-gold/20 p-6 sm:p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-gold/30"
    >
      <Avatar
        src={photo ?? undefined}
        name={name}
        size="lg"
        className="w-20 h-20 text-xl mb-4 transition-transform duration-300 group-hover:scale-105"
      />
      <h3 className="font-semibold text-green-dark text-sm sm:text-base leading-snug mb-1">
        {name}
      </h3>
      <p className="text-xs text-green/60 mb-3">{field}</p>
      <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-gold bg-gold/10 px-3 py-1 rounded-full">
        <span>{bookCount}</span>
        <span>buku</span>
      </div>
    </Link>
  )
}
