import { ReactNode } from "react"

interface Props {
  children: ReactNode
  className?: string
  intensity?: "light" | "medium" | "heavy"
  border?: boolean
}

const intensityMap = {
  light: "backdrop-blur-sm bg-white/30 dark:bg-black/30",
  medium: "backdrop-blur-xl bg-white/60 dark:bg-black/60",
  heavy: "backdrop-blur-2xl bg-white/80 dark:bg-black/80",
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
