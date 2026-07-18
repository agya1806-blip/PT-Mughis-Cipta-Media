import { Check } from "lucide-react"

interface Props {
  label: string
}

export default function CTAFeature({ label }: Props) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
        <Check className="w-3 h-3 text-gold" strokeWidth={3} />
      </div>
      <span className="text-zinc-300 font-medium">{label}</span>
    </div>
  )
}
