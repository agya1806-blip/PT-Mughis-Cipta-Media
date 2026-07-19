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
    title: "Buku Terbit",
    description: "Judul berkualitas yang telah diterbitkan di berbagai bidang.",
  },
  {
    icon: Users,
    value: 200,
    suffix: "+",
    title: "Penulis Dibantu",
    description: "Penulis yang mempercayakan karyanya kepada kami.",
  },
  {
    icon: Printer,
    value: 1000,
    suffix: "+",
    title: "Proyek Cetak",
    description: "Percetakan profesional yang berhasil diselesaikan.",
  },
  {
    icon: Star,
    value: 99,
    suffix: "%",
    title: "Kepuasan Pelanggan",
    description: "Komitmen terhadap kualitas dan layanan prima.",
  },
]

export default function TrustMetricsSection() {
  return (
    <SectionWrapper muted>
      <SectionHeader
        badge="Pencapaian"
        title="Dipercaya Penulis,"
        accent="Dibangun untuk Ilmu"
        description="Menghadirkan pencapaian perusahaan sebagai bukti pengalaman dan profesionalisme."
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
