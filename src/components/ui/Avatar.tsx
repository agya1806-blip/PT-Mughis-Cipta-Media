import Image from "next/image"
import { ReactNode } from "react"

type Size = "sm" | "md" | "lg"

interface Props {
  src?: string
  alt?: string
  name?: string
  size?: Size
  className?: string
  children?: ReactNode
}

const sizeMap: Record<Size, string> = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
}

export default function Avatar({
  src,
  alt = "",
  name,
  size = "md",
  className = "",
  children,
}: Props) {
  const initial = name ? name[0].toUpperCase() : "?"

  if (src) {
    return (
      <Image
        src={src}
        alt={alt || name || "Avatar"}
        width={48}
        height={48}
        className={`${sizeMap[size]} rounded-full object-cover ${className}`}
      />
    )
  }

  return (
    <div
      className={`${sizeMap[size]} rounded-full bg-gold/10 flex items-center justify-center text-gold font-semibold shrink-0 ${className}`}
      aria-label={name || "Avatar"}
    >
      {children || initial}
    </div>
  )
}
