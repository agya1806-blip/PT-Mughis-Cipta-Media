import { ReactNode } from "react"

interface Props {
  title: string
  children: ReactNode
}

export default function LegalSection({ title, children }: Props) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-zinc-900 mb-3">{title}</h2>
      {children}
    </section>
  )
}
