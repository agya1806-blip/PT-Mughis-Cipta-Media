import { Quote } from "lucide-react"
import Avatar from "./Avatar"
import Badge from "./Badge"
import RatingStars from "./RatingStars"
import type { Testimonial } from "@/components/home/testimonials-data"

interface TestimonialCardProps {
  testimonial: Testimonial
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const { name, role, institution, content, rating, verified } = testimonial

  return (
    <div className="group relative bg-cream rounded-2xl border border-gold/20 p-6 sm:p-8 shadow-md hover:shadow-xl hover:shadow-gold/5 transition-all duration-300 h-full flex flex-col">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="relative flex flex-col flex-1">
        <Quote className="w-6 h-6 text-gold/20 mb-4 shrink-0" />
        <p className="text-green/80 leading-relaxed mb-6 flex-1">
          &ldquo;{content}&rdquo;
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <Avatar name={name} size="md" />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-green-dark text-sm truncate">{name}</p>
            <p className="text-xs text-green/80 truncate">
              {role}
              {institution ? ` -- ${institution}` : ""}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between shrink-0 mt-4 pt-4 border-t border-gold/10">
          <RatingStars rating={rating} size="sm" />
          {verified && (
            <Badge variant="gold" className="!text-[10px] !px-2 !py-0.5">
              Verified Client
            </Badge>
          )}
        </div>
      </div>
    </div>
  )
}