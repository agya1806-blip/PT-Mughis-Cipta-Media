interface Props {
  text?: string
  className?: string
}

export default function LoadingState({ text = "Memuat...", className = "" }: Props) {
  return (
    <div className={`flex items-center justify-center py-20 ${className}`}>
      <div className="text-center">
        <div className="inline-block w-8 h-8 border-4 border-gold/20 border-t-gold rounded-full animate-spin mb-4" />
        <p className="text-green/60 text-sm">{text}</p>
      </div>
    </div>
  )
}
