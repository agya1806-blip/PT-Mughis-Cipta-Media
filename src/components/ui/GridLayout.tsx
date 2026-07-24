import { ReactNode } from "react"

type Cols = 1 | 2 | 3 | 4 | 5

interface Props {
  children: ReactNode
  className?: string
  cols?: Cols
  gap?: string
}

const colMap: Record<Cols, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
}

export default function GridLayout({
  children,
  className = "",
  cols = 3,
  gap = "gap-6",
}: Props) {
  return (
    <div className={`grid ${colMap[cols]} ${gap} ${className}`}>
      {children}
    </div>
  )
}
