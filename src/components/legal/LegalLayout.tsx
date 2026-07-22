import { ReactNode } from "react"
import { LucideIcon } from "lucide-react"
import Breadcrumb from "@/components/ui/Breadcrumb"

interface Props {
  icon: LucideIcon
  iconBg: string
  iconColor: string
  title: string
  subtitle: string
  lastUpdated: string
  children: ReactNode
}

export default function LegalLayout({
  icon: Icon,
  iconBg,
  iconColor,
  title,
  subtitle,
  lastUpdated,
  children,
}: Props) {
  return (
    <div className="flex-1 bg-cream">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <Breadcrumb
          items={[
            { label: "Beranda", href: "/" },
            { label: title },
          ]}
        />

        <div className="flex items-center gap-3 mb-8">
          <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center`}>
            <Icon className={`w-6 h-6 ${iconColor}`} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-green-dark">{title}</h1>
            <p className="text-sm text-green/60">{subtitle}</p>
          </div>
        </div>

        <div className="bg-cream rounded-2xl border border-gold/20 p-8 sm:p-10 space-y-6 text-green/80 leading-relaxed">
          {children}

          <p className="text-sm text-green/60 pt-4 border-t border-gold/20">
            Terakhir diperbarui: {lastUpdated}
          </p>
        </div>
      </div>
    </div>
  )
}
