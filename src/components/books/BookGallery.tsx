"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { MOTION } from "@/config/design"
import SectionTitle from "./SectionTitle"

interface Props {
  images: string[]
  title: string
}

export default function BookGallery({ images, title }: Props) {
  if (!images.length) return null

  return (
    <section className="space-y-8">
      <SectionTitle title="Galeri Buku" subtitle="Lihat tampilan buku dari berbagai sudut" />
      <motion.div
        variants={MOTION.stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-3 gap-4"
      >
        {images.map((src, i) => (
          <motion.div
            key={i}
            variants={MOTION.fadeUp}
            className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/50 group"
          >
            <Image
              src={src}
              alt={`${title} - ${i + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
