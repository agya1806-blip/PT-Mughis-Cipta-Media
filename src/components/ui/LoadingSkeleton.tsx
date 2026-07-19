type Variant = "card" | "text" | "circle" | "rect"

interface Props {
  variant?: Variant
  className?: string
  width?: string
  height?: string
  count?: number
}

function SkeletonBlock({
  variant = "text",
  width,
  height,
  className = "",
}: Props) {
  const base = "animate-pulse bg-zinc-100 dark:bg-zinc-800 rounded"

  const styles: Record<Variant, string> = {
    card: `${base} rounded-2xl aspect-[3/4]`,
    text: `${base} h-3 rounded`,
    circle: `${base} rounded-full aspect-square`,
    rect: `${base} rounded-xl`,
  }

  return (
    <div
      className={`${styles[variant]} ${className}`}
      style={{ width, height }}
    />
  )
}

export function BookCardSkeleton() {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700/50 bg-white dark:bg-zinc-800/50 overflow-hidden">
      <SkeletonBlock variant="card" />
      <div className="p-4 space-y-3">
        <SkeletonBlock variant="text" width="30%" />
        <SkeletonBlock variant="text" width="75%" />
        <SkeletonBlock variant="text" width="50%" />
        <SkeletonBlock variant="text" width="25%" />
      </div>
    </div>
  )
}

export function ArticleCardSkeleton() {
  return (
    <div className="bg-white dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700/50 p-6 space-y-3">
      <SkeletonBlock variant="text" width="75%" height="1.25rem" />
      <SkeletonBlock variant="text" width="33%" />
      <div className="space-y-2 pt-2">
        <SkeletonBlock variant="text" width="100%" />
        <SkeletonBlock variant="text" width="85%" />
        <SkeletonBlock variant="text" width="65%" />
      </div>
    </div>
  )
}

export function FeatureCardSkeleton() {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700/50 bg-white dark:bg-zinc-800/50 p-6 space-y-4">
      <SkeletonBlock variant="circle" width="2.5rem" height="2.5rem" />
      <SkeletonBlock variant="text" width="60%" />
      <SkeletonBlock variant="text" width="100%" />
      <SkeletonBlock variant="text" width="80%" />
    </div>
  )
}

export default function LoadingSkeleton({
  variant = "text",
  className = "",
  width,
  height,
  count = 1,
}: Props) {
  if (count > 1) {
    return (
      <>
        {Array.from({ length: count }).map((_, i) => (
          <SkeletonBlock
            key={i}
            variant={variant}
            width={width}
            height={height}
            className={className}
          />
        ))}
      </>
    )
  }

  return (
    <SkeletonBlock
      variant={variant}
      width={width}
      height={height}
      className={className}
    />
  )
}
