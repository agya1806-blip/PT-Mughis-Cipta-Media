# RFC-000: Global Design Foundation

| Field | Value |
|---|---|
| **ID** | RFC-000 |
| **Title** | Global Design Foundation |
| **Version** | 1.0.0 |
| **Priority** | Critical |
| **Status** | Ready |
| **Owner** | Creative Director |
| **Project** | PT Mughis Cipta Media |

---

## Objective

Establish a unified premium design system for the entire website. This foundation defines
reusable design tokens, UI rules, motion principles, spacing conventions, and component
standards that all future sections MUST follow.

---

## Design Language

### Keywords

| Category | Terms |
|---|---|
| Brand Feel | Premium, Luxury, Minimal, Editorial, Elegant |
| Personality | Technology, Publishing, Apple, Linear, Stripe, Vercel |
| Communication | Trust, Professional, High-end, Modern |

### Must Avoid

- Template look
- Busy layouts
- Excessive gradients
- Cheap / heavy box-shadows
- Over-rounded corners everywhere
- Large colorful icons

---

## Color System

### Light Mode

| Token | Value | Usage |
|---|---|---|
| `--background` | `#FAFAFA` | Page background |
| `--surface` | `#FFFFFF` | Card, sheet, elevated surfaces |
| `--primary` | `#111827` | Body text, headings |
| `--secondary` | `#6B7280` | Supporting text, captions |
| `--border` | `#E5E7EB` | Borders, dividers, strokes |
| `--gold` | `#C8A96A` | Primary accent — CTAs, highlights |
| `--gold-light` | `#E8D5A0` | Hover states, light fills |
| `--gold-dark` | `#A8884A` | Active states, deeper accent |

### Dark Mode

| Token | Value | Usage |
|---|---|---|
| `--background` | `#0A0A0B` | Page background |
| `--surface` | `#18181B` | Card, sheet, elevated surfaces |
| `--primary` | `#FAFAFA` | Body text, headings |
| `--secondary` | `#A1A1AA` | Supporting text, captions |
| `--border` | `#27272A` | Borders, dividers, strokes |
| `--gold`, `--gold-light`, `--gold-dark` | *(unchanged)* | Accent (contrast verified) |

---

## Typography

### Font Stack

```css
--font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
--font-serif: "Georgia", "Times New Roman", serif;
```

### Scale (rem)

| Level | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|
| Display | 3.5–4.5rem (56–72px) | 700 (Bold) | 1.1 | -0.02em |
| H1 | 2.5–3rem (40–48px) | 700 (Bold) | 1.15 | -0.02em |
| H2 | 1.875–2.25rem (30–36px) | 600 (Semibold) | 1.2 | -0.015em |
| H3 | 1.5rem (24px) | 600 (Semibold) | 1.3 | -0.01em |
| H4 | 1.25rem (20px) | 600 (Semibold) | 1.35 | 0 |
| Body | 1rem (16px) | 400 (Regular) | 1.6 | 0 |
| Small | 0.875rem (14px) | 400 (Regular) | 1.5 | 0 |
| Caption | 0.75rem (12px) | 500 (Medium) | 1.4 | +0.02em |

### Rules

- Maximum **one H1** per page.
- Headings: short, scannable, editorial.
- Body: never more than 4–5 lines per paragraph.
- Large whitespace between sections.
- No decorative fonts. Only Inter and serif for special copy.
- Use `text-balance` for multi-line headings.

---

## Spacing

| Context | Desktop | Tablet | Mobile |
|---|---|---|---|
| Section padding top/bottom | 120px (7.5rem) | 80px (5rem) | 64px (4rem) |
| Container max-width | 1280px | 100% | 100% |
| Container padding | 2.5rem | 2rem | 1.5rem |
| Content max-width | 720px | 640px | 100% |
| Card padding | 1.5–2rem | 1.25–1.5rem | 1–1.25rem |
| Grid gap | 1.5rem | 1.25rem | 1rem |

### Utility classes (via Tailwind)

```css
.section-padding  → py-24 sm:py-20 md:py-32
.container         → mx-auto max-w-7xl px-6 sm:px-8 lg:px-10
```

---

## Border & Radius

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | 0.5rem (8px) | Buttons, inputs, badges |
| `--radius-md` | 0.75rem (12px) | Cards, modals, dropdowns |
| `--radius-lg` | 1rem (16px) | Large cards, hero, sections |
| `--radius-xl` | 1.5rem (24px) | Special containers, CTAs |
| `--radius-full` | 9999px | Pills, avatars, tags |

---

## Shadows

| Token | Value | Usage |
|---|---|---|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.04)` | Subtle elevation |
| `--shadow-md` | `0 4px 12px rgba(0,0,0,0.06)` | Cards, dropdowns |
| `--shadow-lg` | `0 8px 24px rgba(0,0,0,0.08)` | Modals, floating elements |
| `--shadow-xl` | `0 16px 48px rgba(0,0,0,0.1)` | Hero, fullscreen overlays |
| `--shadow-gold` | `0 4px 14px rgba(200,169,106,0.25)` | Gold accent glow |

---

## Motion

### Library

- **Only** Framer Motion (already installed).
- No GSAP, no custom animation libs.

### Principles

1. **Purposeful** — every animation must communicate hierarchy or state.
2. **Subtle** — never bounce, never rotate, never distract.
3. **Fast** — exit/enter within 200–500ms.
4. **Easing** — use cubic-bezier `[0.16, 1, 0.3, 1]` (ease-out) for entrances,
   `[0.4, 0, 1, 1]` for exits.

### Preferred Effects

| Effect | Usage | Duration | Easing |
|---|---|---|---|
| Fade Up | Section entrance, cards | 0.5s | `[0.16,1,0.3,1]` |
| Blur Reveal | Headlines, hero text | 0.6–0.8s | `[0.16,1,0.3,1]` |
| Scale 0.98→1 | Cards, CTAs on hover | 0.3s | `[0.16,1,0.3,1]` |
| Opacity crossfade | Modals, overlays | 0.3s | ease-in-out |
| Counter | Numbers, stats | 1.5–2s | `[0.16,1,0.3,1]` |

### Framer Motion Presets

```tsx
// Stagger children (grids, lists)
const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

const blurReveal = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}
```

---

## Component Rules

### Buttons

| Variant | Style | Hover | Focus |
|---|---|---|---|
| Primary | `bg-gold` text-white | `bg-gold-dark` + shadow-lg | ring-2 ring-gold/50 |
| Secondary | border text-primary | bg-zinc-50 (light) / bg-zinc-800 (dark) | ring-2 ring-zinc-300 |
| Ghost | transparent | bg-zinc-50 / bg-zinc-800 | ring-2 ring-zinc-300 |

- Border radius: `rounded-full` (pill) or `--radius-sm`
- Height: 44px (2.75rem) default, 36px (2.25rem) small.
- Padding: horizontal 1.5–2rem.
- Transitions: `all 0.2s ease`.

### Cards

| Property | Value |
|---|---|
| Background | `--surface` (white / dark surface) |
| Border | 1px solid `--border` |
| Radius | `--radius-md` (0.75rem) |
| Shadow | `--shadow-md` on default; `--shadow-lg` on hover |
| Padding | 1.5rem (mobile 1rem) |
| Hover | y -2px to -4px, border tint to gold |

### Badges / Tags

| Property | Value |
|---|---|
| Background | `gold/10` |
| Text | gold, uppercase, 11–12px, tracking-wider |
| Radius | `--radius-full` (9999px) |
| Padding | 0.25rem 0.75rem |

### Section Headers

```html
<!-- Pattern for every section heading -->
<div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 mb-6">
  <span class="text-gold text-[11px] font-medium uppercase tracking-[0.1em]">BADGE_LABEL</span>
</div>
<h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
  Normal Text <span class="bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent">Accent Text</span>
</h2>
```

---

## Responsive Strategy

- **Mobile-first.** Build for mobile, then enhance for tablet and desktop.
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px).
- Grid: default single column, `sm:grid-cols-2`, `lg:grid-cols-3/4`.
- Text: scale up at `sm:` and `lg:` breakpoints.
- Touch targets: minimum 44×44px for interactive elements.

---

## Performance Budget

| Metric | Target |
|---|---|
| Lighthouse Performance | ≥ 95 |
| Lighthouse Accessibility | ≥ 95 |
| Lighthouse Best Practices | ≥ 95 |
| Lighthouse SEO | ≥ 95 |
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2s |
| Cumulative Layout Shift | < 0.05 |

### Rules

- No large images (max 200KB per image, prefer WebP/AVIF).
- Lazy-load below-fold images.
- No heavy animation on low-end devices (respect `prefers-reduced-motion`).
- Use Next.js `<Image>` with `priority` on hero images.

---

## Accessibility

- Semantic HTML (nav, main, section, article, aside, footer).
- Proper heading hierarchy (h1 → h2 → h3, never skip levels).
- All interactive elements must have focus styles.
- `aria-label` on icon-only buttons.
- `alt` on every image.
- Color contrast: minimum 4.5:1 for text, 3:1 for large text.
- Support `prefers-reduced-motion`.

---

## File Conventions

| Pattern | Location | Purpose |
|---|---|---|
| `src/components/ui/*.tsx` | UI kit | Reusable primitive components |
| `src/components/landing/*.tsx` | Landing | Homepage sections |
| `src/components/about/*.tsx` | About | About page sections |
| `src/config/design.ts` | Config | Design token constants |

---

## How to Use This Foundation

1. **Colors** — use Tailwind classes `bg-gold`, `text-primary`, `border-border`, etc.
2. **Typography** — use the scale from the table above. Keep body text short.
3. **Spacing** — use `section-padding` class for section vertical rhythm.
4. **Motion** — import `framer-motion` presets from `src/config/design.ts`.
5. **Components** — prefer `src/components/ui/` primitives over custom markup.
6. **Validation** — run `npm run build` before every commit.

---

## Future Work

- [ ] Hero section redesign (RFC-001)
- [ ] Premium catalog redesign (RFC-002)
- [ ] Blog section redesign (RFC-003)
- [ ] Premium admin panels (RFC-004)
- [ ] Global search & filter system (RFC-005)

---

*This document is a living specification. Update as the design evolves.*
