# Design Guidelines

## Design Style

**Light mode, tech-modern** — Clean, professional, with code-inspired UI elements.

### Design Principles

1. **Clean & Modern** — White/light gray backgrounds, uncluttered
2. **Tech-inspired** — Code blocks, monospace font, bracket logo `{nuôi.dev}`
3. **Glassmorphism** — Cards with backdrop blur, subtle borders
4. **Micro-animations** — Smooth transitions, scroll reveals, counter animations
5. **Accessibility first** — Semantic HTML, contrast ratio, reduced motion support

## Color Palette

### Primary Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#ffffff` | Main background |
| `--bg-secondary` | `#f8f9fc` | Secondary background (alternating sections) |
| `--text-primary` | `#1a1a2e` | Primary text (dark navy) |
| `--text-secondary` | `#64648a` | Secondary text (muted) |

### Accent Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--accent-primary` | `#6366f1` | Indigo — Primary accent, links, buttons |
| `--accent-secondary` | `#06b6d4` | Cyan — Gradient endpoint |
| `--accent-gradient` | `135deg, #6366f1 → #06b6d4` | Gradient for buttons, headings |

### Glass Effects

| Token | Value | Usage |
|-------|-------|-------|
| `--glass-bg` | `rgba(255,255,255,0.6)` | Card backgrounds |
| `--glass-border` | `rgba(99,102,241,0.15)` | Card borders (indigo tint) |
| `--bg-card` | `rgba(255,255,255,0.8)` | Card backgrounds (opaque) |

## Typography

### Font Families

| Font | Usage | Source |
|------|-------|--------|
| **Inter** | Body text, headings | Google Fonts |
| **JetBrains Mono** | Code elements, section labels | Google Fonts |

### Type Scale

| Token | Size | Usage |
|-------|------|-------|
| `--text-xs` | 0.75rem (12px) | Captions |
| `--text-sm` | 0.875rem (14px) | Section labels, small text |
| `--text-base` | 1rem (16px) | Body text |
| `--text-lg` | 1.125rem (18px) | Subtitles |
| `--text-xl` | 1.25rem (20px) | Card titles |
| `--text-2xl` | 1.5rem (24px) | Sub-headings |
| `--text-3xl` | 2rem (32px) | Mid headings |
| `--text-4xl` | 2.5rem (40px) | Section titles |
| `--text-5xl` | 3.5rem (56px) | Hero headline |

### Font Weights

| Token | Weight | Usage |
|-------|--------|-------|
| `--font-regular` | 400 | Body text |
| `--font-medium` | 500 | Labels, subtle emphasis |
| `--font-semibold` | 600 | Buttons, card titles |
| `--font-bold` | 700 | Headings |
| `--font-extrabold` | 800 | Section titles, hero |

### Responsive Font Scaling

Fonts automatically scale down on mobile via CSS variable overrides:

| Breakpoint | `--text-5xl` | `--text-4xl` | `--text-3xl` |
|-----------|-------------|-------------|-------------|
| Desktop | 3.5rem | 2.5rem | 2rem |
| ≤768px | 2.5rem | 2rem | 1.5rem |
| ≤480px | 2rem | 1.75rem | 1.25rem |

## Spacing System

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | 0.25rem (4px) | Tight spacing |
| `--space-sm` | 0.5rem (8px) | Element gaps |
| `--space-md` | 1rem (16px) | Component spacing |
| `--space-lg` | 2rem (32px) | Section padding |
| `--space-xl` | 4rem (64px) | Large spacing |
| `--space-2xl` | 8rem (128px) | Section block padding |

## Components

### Buttons

| Variant | Style | Usage |
|---------|-------|-------|
| `.btn-primary` | Gradient bg, white text, glow shadow | Primary CTA |
| `.btn-outline` | Transparent bg, accent border | Secondary actions |
| `.btn-hero-primary` | Large gradient button | Hero CTA |
| `.btn-hero-secondary` | Large outline button | Hero secondary |
| `.navbar-cta` | Compact primary | Nav CTA |

### Glass Cards

Cards use the glassmorphism effect:

- Background: `rgba(255,255,255,0.6)`
- Border: `1px solid rgba(99,102,241,0.15)`
- Blur: `backdrop-filter: blur(12px)`
- Hover: `translateY(-4px)` + shadow increase

### Section Headers

Consistent pattern across all sections:

```
// section_label (monospace, accent color)
Section Title (extrabold, --text-4xl)
Subtitle text (secondary color, max-width 640px)
```

### Form Components (Dev Registration)

| Component | Style |
|-----------|-------|
| **Form card** | `.glass-card` container with responsive 2-column grid |
| **Skill tags** | Pill-shaped buttons (`.skill-tag`), toggle `.active` on click, max 5 |
| **Error messages** | Red text below fields (`.field-error`), shown on blur/submit |
| **Toast notification** | Fixed-position popup (`.toast`), auto-dismiss after 5s |

## Shadow System

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.06)` | Subtle elevation |
| `--shadow-md` | `0 4px 12px rgba(0,0,0,0.08)` | Cards, default |
| `--shadow-lg` | `0 8px 30px rgba(0,0,0,0.1)` | Hover state, elevated |
| `--shadow-glow` | `0 0 20px rgba(99,102,241,0.15)` | Accent glow |

## Animation Guidelines

### Scroll Reveals

- **Effect**: Fade in + slide up (30px)
- **Duration**: 600ms ease-out
- **Trigger**: IntersectionObserver (threshold 0.1, rootMargin -40px bottom)
- **Class**: `.fade-in-up` → `.visible`

### Hover Effects

- **Cards**: `translateY(-4px)` + shadow upgrade
- **Buttons**: `translateY(-2px)` + shadow upgrade
- **Duration**: `--transition-fast` (150ms) or `--transition-base` (250ms)

### Counter Animation

- **Duration**: 1800ms
- **Easing**: Cubic ease-out (`1 - (1-t)³`)
- **Trigger**: IntersectionObserver (threshold 0.3)

### Reduced Motion

All animations are disabled when the user has `prefers-reduced-motion: reduce`:

```css
@media (prefers-reduced-motion: reduce) {
  .fade-in-up { opacity: 1; transform: none; transition: none; }
}
```

## Logo

The logo uses a text-based format with bracket decoration:

```
{nuôi.dev}
```

- Brackets: Accent color (indigo)
- Text: Primary text color or gradient
- Font: `--font-mono` (JetBrains Mono)

## Iconography

Uses **emoji** instead of icon libraries:

| Section | Icons |
|---------|-------|
| About cards | 📚 🧭 💼 |
| How It Works | 📝 🤝 🚀 |
| Impact | 👨‍💻 💎 ⏱️ 🎯 |
| Hero CTA | 🚀 |
| Dev Registration | 👨‍💻 |

> Emoji keeps the page lightweight — no icon fonts or SVG sprites needed.
