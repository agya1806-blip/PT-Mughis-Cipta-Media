"use client"

import { useState } from "react"
import Image from "next/image"
import { BookOpen } from "lucide-react"

interface Props {
  title: string
  frontCover?: string | null
  backCover?: string | null
}

export default function CoverGallery({ title, frontCover, backCover }: Props) {
  const hasBack = Boolean(backCover)
  const [active, setActive] = useState<"front" | "back">("front")

  const images: { key: "front" | "back"; label: string; src: string | null }[] = [
    { key: "front", label: "Cover Depan", src: frontCover || null },
    { key: "back", label: "Cover Belakang", src: hasBack ? backCover! : null },
  ]

  const current = images.find((i) => i.key === active)!
  const available = images.filter((i) => i.src)

  return (
    <div className="space-y-3">
      <div className="aspect-[3/4] bg-cream rounded-xl border border-gold/10 flex items-center justify-center overflow-hidden">
        {current.src ? (
          <Image
            key={current.key}
            src={current.src}
            alt={`${current.label} ${title}`}
            width={300}
            height={400}
            priority={current.key === "front"}
            className="w-full h-full object-contain bg-cream"
          />
        ) : (
          <div className="flex flex-col items-center text-green-dark/60 p-8 text-center">
            <BookOpen className="w-16 h-16 mb-3" />
            <span className="text-sm font-medium">{current.label} tidak tersedia</span>
          </div>
        )}
      </div>

      {available.length > 1 && (
        <div className="flex gap-3">
          {images.map((img) => (
            <button
              key={img.key}
              type="button"
              onClick={() => img.src && setActive(img.key)}
              className={`relative w-20 aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all ${
                active === img.key ? "border-gold" : "border-gold/20 hover:border-gold/50"
              }`}
              aria-label={img.label}
            >
              {img.src && (
                <Image src={img.src} alt={img.label} fill sizes="80px" className="object-cover" />
              )}
              <span className="absolute inset-x-0 bottom-0 bg-green/80 text-white text-[9px] font-medium text-center py-0.5">
                {img.label.replace("Cover ", "")}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}