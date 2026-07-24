/** Design system constants — single source of truth for all sections */

export const COLORS = {
  background: { light: "#FDF8F0", dark: "#1E5E4A" },
  surface: { light: "#FFFFFF", dark: "#234E43" },
  primary: { light: "#1E5E4A", dark: "#D3C297" },
  secondary: { light: "#5F7068", dark: "#E8DDA8" },
  border: { light: "#E6DCC8", dark: "#2F6D5B" },
  gold: "#D3C297",
  goldLight: "#E8DDA8",
  goldDark: "#B19B67",
  green: "#1E5E4A",
  greenLight: "#2A7A62",
  greenDark: "#154236",
  cream: "#FDF8F0",
} as const

export const SPACING = {
  sectionPadding: "py-24 sm:py-20 md:py-32",
  container: "mx-auto max-w-7xl px-6 sm:px-8 lg:px-10",
  contentMaxWidth: "max-w-[720px]",
  cardPadding: "p-6 sm:p-8",
  gridGap: "gap-6",
} as const

export const RADIUS = {
  sm: "rounded-xl",
  md: "rounded-2xl",
  lg: "rounded-3xl",
  full: "rounded-full",
} as const

export const TYPOGRAPHY = {
  display: "text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight",
  h1: "text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.15] tracking-tight",
  h2: "text-2xl sm:text-3xl lg:text-4xl font-semibold leading-[1.2] tracking-tight",
  h3: "text-xl sm:text-2xl font-semibold leading-[1.3]",
  h4: "text-lg sm:text-xl font-semibold leading-[1.35]",
  body: "text-base leading-relaxed",
  small: "text-sm leading-relaxed",
  caption: "text-xs font-medium leading-[1.4] tracking-wide",
} as const

export const SHADOWS = {
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
  gold: "shadow-gold",
} as const

export const EASING = {
  enter: [0.16, 1, 0.3, 1] as [number, number, number, number],
  exit: [0.4, 0, 1, 1] as [number, number, number, number],
} as const

export const DURATION = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  reveal: 0.7,
  counter: 2,
} as const

/** Framer Motion animation presets */
export const MOTION = {
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: DURATION.slow, ease: EASING.enter },
    },
  },
  blurReveal: {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: DURATION.reveal, ease: EASING.enter },
    },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: DURATION.slow, ease: EASING.enter },
    },
  },
  stagger: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  },
} as const

/** Section badge pattern */
export const SECTION_BADGE = "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 mb-6"
export const SECTION_BADGE_TEXT = "text-green-dark dark:text-gold text-[11px] font-medium uppercase tracking-[0.1em]"

/** Gradient heading pattern */
export function goldGradient(text: string) {
  return `<span class="bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent">${text}</span>`
}
