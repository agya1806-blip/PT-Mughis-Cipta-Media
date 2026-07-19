"use client"

import { useEffect, useState } from "react"
import { animate } from "framer-motion"

interface Props {
  from: number
  to: number
  inView: boolean
}

export function Counter({ from, to, inView }: Props) {
  const [count, setCount] = useState(from)

  useEffect(() => {
    if (!inView) return
    const controls = animate(from, to, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setCount(Math.round(v)),
    })
    return () => controls.stop()
  }, [from, to, inView])

  return <>{count.toLocaleString("id-ID")}</>
}
