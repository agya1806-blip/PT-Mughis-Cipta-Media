import type { Metadata } from "next"
import { TimClient } from "./TimClient"

export const metadata: Metadata = {
  title: "Tim Profesional",
  description:
    "PT Mughis Cipta Media memiliki tim profesional yang berdedikasi dalam memberikan pelayanan penerbitan terbaik kepada para penulis Indonesia.",
  openGraph: {
    title: "Tim Profesional - PT Mughis Cipta Media",
    description:
      "Mengenal jajaran pimpinan dan ketua divisi PT Mughis Cipta Media yang berkomitmen menghadirkan pelayanan penerbitan terbaik.",
  },
  alternates: { canonical: "/tim" },
}

export default function TimPage() {
  return (
    <main className="min-h-screen bg-cream">
      <TimClient />
    </main>
  )
}
