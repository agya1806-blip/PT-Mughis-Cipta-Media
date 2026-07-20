

interface Props {
  className?: string
  decorative?: boolean
}

export default function Divider({ className = "", decorative = false }: Props) {
  return (
    <hr
      role={decorative ? "presentation" : "separator"}
      className={`border-gold/20 dark:border-gold/10 ${className}`}
    />
  )
}
