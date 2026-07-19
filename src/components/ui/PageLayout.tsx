import { ReactNode } from "react"

interface Props {
  children: ReactNode
  className?: string
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full"
}

const maxWidths = {
  sm: "max-w-3xl",
  md: "max-w-4xl",
  lg: "max-w-5xl",
  xl: "max-w-7xl",
  full: "max-w-full",
}

export default function PageLayout({
  children,
  className = "",
  maxWidth = "md",
}: Props) {
  return (
    <div className="flex-1 bg-zinc-50">
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 py-16 ${maxWidths[maxWidth]} ${className}`}>
        {children}
      </div>
    </div>
  )
}
