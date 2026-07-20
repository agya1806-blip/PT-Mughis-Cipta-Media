"use client"

import { ReactNode } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Button from "./Button"

interface Props {
  title: string
  description?: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
  className?: string
  children?: ReactNode
}

export default function CtaCard({
  title,
  description,
  primaryLabel,
  primaryHref = "/",
  secondaryLabel,
  secondaryHref = "/",
  className = "",
  children,
}: Props) {
  return (
    <section
      className={`relative py-24 sm:py-32 overflow-hidden bg-gradient-to-br from-green-dark via-green to-green-light ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(211,194,151,0.12),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(211,194,151,0.08),transparent_50%)]" />
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cream leading-[1.15]">
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-lg text-gold/80">{description}</p>
          )}
          {children}
          {(primaryLabel || secondaryLabel) && (
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              {primaryLabel && (
                <Button href={primaryHref} variant="primary">
                  {primaryLabel}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
              {secondaryLabel && (
                <Button href={secondaryHref} variant="ghost">
                  {secondaryLabel}
                </Button>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
