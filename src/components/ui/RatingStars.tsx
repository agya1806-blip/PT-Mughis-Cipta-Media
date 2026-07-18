import { Star } from "lucide-react"

interface RatingStarsProps {
  rating: number
  max?: number
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizeMap = {
  sm: "w-3 h-3",
  md: "w-4 h-4",
  lg: "w-5 h-5",
}

export default function RatingStars({
  rating,
  max = 5,
  size = "sm",
  className = "",
}: RatingStarsProps) {
  return (
    <div className={`flex items-center gap-0.5 `} aria-label={`Rating:  dari `}>
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={` `}
        />
      ))}
    </div>
  )
}