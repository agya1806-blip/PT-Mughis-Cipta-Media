"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import SectionWrapper from "@/components/landing/SectionWrapper"
import SectionHeader from "@/components/landing/SectionHeader"
import { Button } from "@/components/ui"
import { journeySteps } from "./journey-data"
import JourneyStep from "./JourneyStep"

export default function PublishingJourneySection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  })
  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <SectionWrapper ref={sectionRef} muted>
      <SectionHeader
        badge="Alur Penerbitan"
        title="Perjalanan Penerbitan"
        accent="Anda Dimulai di Sini"
        description="Proses penerbitan yang transparan, profesional, dan terpandu dari naskah hingga buku jadi."
      />

      <div className="relative max-w-5xl mx-auto">
        {/* Timeline connector line */}
        <div className="absolute left-5 lg:left-1/2 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800 lg:-translate-x-px" />
        {prefersReducedMotion ? (
          <div className="absolute left-5 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold via-gold-light to-gold lg:-translate-x-0.5 z-10" />
        ) : (
          <motion.div
            style={{ scaleY: lineProgress, transformOrigin: "top" }}
            className="absolute left-5 lg:left-1/2 top-0 w-0.5 bg-gradient-to-b from-gold via-gold-light to-gold lg:-translate-x-0.5 z-10"
          />
        )}

        {/* Steps */}
        <div className="space-y-12 lg:space-y-16">
          {journeySteps.map((step, i) => {
            const isLeft = i % 2 === 0
            return (
              <div key={step.id} className="relative lg:grid lg:grid-cols-2 lg:gap-16">
                <div
                  className={`pl-14 lg:pl-0 ${
                    isLeft ? "lg:pr-16" : "lg:col-start-2 lg:pl-16"
                  }`}
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute top-6 w-3.5 h-3.5 rounded-full bg-gold border-2 border-white dark:border-zinc-900 shadow z-10 left-5 ${
                      isLeft
                        ? "lg:left-auto lg:right-0 lg:translate-x-1/2"
                        : "lg:left-0 lg:-translate-x-1/2"
                    }`}
                  />

                  {/* Animated step card */}
                  <motion.div
                    initial={
                      prefersReducedMotion
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 40 }
                    }
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                      duration: 0.7,
                      delay: prefersReducedMotion ? 0 : i * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <JourneyStep
                      step={step.id}
                      title={step.title}
                      description={step.description}
                      icon={step.icon}
                    />
                  </motion.div>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={
            prefersReducedMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 20 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: prefersReducedMotion ? 0 : 0.3,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="text-center mt-16"
        >
          <Button href="/katalog" variant="primary" className="group">
            Mulai Perjalanan Penerbitan
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
