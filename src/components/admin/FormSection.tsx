"use client"

interface Props {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}

export default function FormSection({ title, description, children, className = "" }: Props) {
  return (
    <div className={`bg-cream rounded-xl border border-gold/20 p-5 sm:p-6 space-y-4 ${className}`}>
      <div>
        <h2 className="text-base font-semibold text-green-dark">{title}</h2>
        {description && <p className="text-sm text-green/70 mt-0.5">{description}</p>}
      </div>
      {children}
    </div>
  )
}
