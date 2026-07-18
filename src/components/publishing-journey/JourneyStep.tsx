"use client"

import { type LucideIcon } from "lucide-react"
import { GlassPanel, HoverWrapper, IconWrapper } from "@/components/ui"

interface Props {
  step: number
  title: string
  description: string
  icon: LucideIcon
}

export default function JourneyStep({ step, title, description, icon: Icon }: Props) {
  return (
    <HoverWrapper y={-4} scale={1.01}>
      <GlassPanel intensity="medium" border className="p-6 sm:p-8">
        <div className="flex gap-5">
          <IconWrapper size="md" variant="gold">
            <Icon className="w-5 h-5" />
          </IconWrapper>
          <div className="flex-1 min-w-0">
            <span className="text-[11px] font-bold text-gold tracking-[0.15em] uppercase">
              Step {step}
            </span>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mt-1.5">
              {title}
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1.5 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </GlassPanel>
    </HoverWrapper>
  )
}
