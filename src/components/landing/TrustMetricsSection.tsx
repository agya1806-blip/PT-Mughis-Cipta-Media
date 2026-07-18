"use client"

import { BookOpen, Users, Printer, Star } from "lucide-react"
import SectionWrapper from "./SectionWrapper"
import SectionHeader from "./SectionHeader"
import MetricCard from "@/components/ui/MetricCard"

const metrics = [
  {
    icon: BookOpen,
    value: 500,
    suffix: "+",
    title: "Books Published",
    description: "Quality titles published across various fields.",
  },
  {
    icon: Users,
    value: 200,
    suffix: "+",
    title: "Authors Served",
    description: "Authors who trusted us with their work.",
  },
  {
    icon: Printer,
    value: 1000,
    suffix: "+",
    title: "Printing Projects",
    description: "Professional printing completed successfully.",
  },
  {
    icon: Star,
    value: 99,
    suffix: "%",
    title: "Customer Satisfaction",
    description: "Commitment to quality and service excellence.",
  },
]

export default function TrustMetricsSection() {
  return (
    <SectionWrapper muted>
      <SectionHeader
        badge="Metrics"
        title="Trusted by Authors,"
        accent="Built for Knowledge"
        description="Present company achievements as evidence of experience and professionalism."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, i) => (
          <MetricCard
            key={metric.title}
            icon={<metric.icon className="w-5 h-5" />}
            value={metric.value}
            suffix={metric.suffix}
            title={metric.title}
            description={metric.description}
            index={i}
          />
        ))}
      </div>
    </SectionWrapper>
  )
}
