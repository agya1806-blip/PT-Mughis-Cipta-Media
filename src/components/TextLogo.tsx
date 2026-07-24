interface TextLogoProps {
  variant?: "navbar" | "footer" | "loading" | "card" | "inline"
  className?: string
}

const styles = {
  navbar: { wrapper: "flex items-center gap-1.5", pt: "text-gold text-[10px] sm:text-xs font-semibold tracking-wider", name: "text-green-dark dark:text-cream font-bold text-sm sm:text-base" },
  footer: { wrapper: "inline-flex items-center gap-1.5", pt: "text-gold text-xs font-semibold tracking-wider", name: "text-cream font-bold text-lg" },
  loading: { wrapper: "flex flex-col items-center", pt: "text-gold text-sm sm:text-base font-semibold tracking-wider", name: "text-cream font-bold text-2xl sm:text-3xl" },
  card: { wrapper: "flex items-center gap-1.5", pt: "text-green-dark dark:text-gold text-xs font-semibold tracking-wider", name: "text-green-dark dark:text-cream font-bold text-base" },
  inline: { wrapper: "flex items-center gap-1", pt: "text-green-dark dark:text-gold text-[10px] font-semibold tracking-wider", name: "text-green-dark dark:text-cream font-bold text-xs" },
}

export default function TextLogo({ variant = "navbar", className = "" }: TextLogoProps) {
  const s = styles[variant]
  return (
    <div className={`${s.wrapper} ${className}`}>
      <span className={s.pt}>PT</span>
      <span className={s.name}>Mughis Cipta Media</span>
    </div>
  )
}
