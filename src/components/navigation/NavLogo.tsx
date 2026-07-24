"use client"

import Image from "next/image"
import Link from "next/link"

interface Props {
  scrolled: boolean
}

export default function NavLogo({ scrolled }: Props) {
  return (
    <Link href="/" className="flex items-center gap-2.5 group shrink-0">
      <Image
        src="/logo-original.png"
        alt="PT Mughis Cipta Media"
        width={600}
        height={63}
        className="h-7 sm:h-8 w-auto transition-opacity duration-300 opacity-100"
        priority
      />
    </Link>
  )
}
