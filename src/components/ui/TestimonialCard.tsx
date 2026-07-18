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
    <div className="group relative bg-white/70 dark:bg-zinc-800/50 backdrop-blur-xl rounded-2xl border border-zinc-200/50 dark:border-zinc-700/50 p-6 sm:p-8 shadow-md hover:shadow-xl hover:shadow-gold/5 transition-all duration-300 h-full flex flex-col">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="relative flex flex-col flex-1">
        <Quote className="w-6 h-6 text-gold/20 mb-4 shrink-0" />
        <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6 flex-1">
          &ldquo;{content}&rdquo;
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <Avatar name={name} size="md" />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-zinc-900 dark:text-white text-sm truncate">{name}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
              {role}
              {institution ?  --  : ""}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between shrink-0 mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-700/50">
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