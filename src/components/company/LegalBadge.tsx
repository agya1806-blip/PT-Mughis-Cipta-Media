import type { LucideIcon } from "lucide-react"

interface Props {
  icon: LucideIcon
  title: string
  status: "verified" | "active"
}

const statusStyles = {
  verified:
    "bg-green-50 text-green-700 border-green-200",
  active:
    "bg-gold/10 text-gold border-gold/20",
}

export default function LegalBadge({ icon: Icon, title, status }: Props) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${statusStyles[status]}`}
    >
      <Icon className="w-3 h-3" />
      {title}
    </span>
  )
}
