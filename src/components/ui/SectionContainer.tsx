import { ReactNode } from "react"

interface Props {
  children: ReactNode
  className?: string
  as?: "section" | "div"
  id?: string
}

export default function SectionContainer({
  children,
  className = "",
  as: Tag = "section",
  id,
}: Props) {
  return (
    <Tag id={id} className={`section-padding ${className}`}>
      <div className="container">{children}</div>
    </Tag>
  )
}
