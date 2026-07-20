import { ReactNode } from "react"

interface Props {
  children: ReactNode
  className?: string
  intensity?: "light" | "medium" | "heavy"
  border?: boolean
}

const intensityMap = {
  light: "backdrop-blur-sm bg-cream/50 dark:bg-green/40",
  medium: "backdrop-blur-xl bg-white/70 dark:bg-green/50",
  heavy: "backdrop-blur-2xl bg-cream/90 dark:bg-green/70",
}

export default function GlassPanel({
  children,
  className = "",
  intensity = "medium",
  border = true,
}: Props) {
  return (
    <div
      className={`rounded-2xl ${intensityMap[intensity]} ${
        border ? "border border-white/20 dark:border-white/10" : ""
      } ${className}`}
    >
      {children}
    </div>
  )
}
