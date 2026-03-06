# System Architecture

## Architecture Overview

Nuôi Dev is a **static single-page website** that uses no frameworks or build tools. Simple architecture, easy to maintain, and performance-optimized.

```
┌─────────────────────────────────────────┐
│              Browser                     │
│                                         │
│  ┌─────────┐  ┌──────────┐  ┌────────┐ │
│  │  HTML    │  │   CSS    │  │   JS   │ │
│  │(content) │  │(styling) │  │(logic) │ │
│  └────┬─────┘  └────┬─────┘  └───┬────┘ │
│       │              │            │      │
│       └──────────────┼────────────┘      │
│                      │                   │
│              ┌───────▼────────┐          │
│              │   DOM / CSSOM  │          │
│              │   Render Tree  │          │
│              └────────────────┘          │
│                                         │
│  External:                              │
│  ┌─────────────────┐                    │
│  │ Google Fonts CDN │                   │
│  │ (Inter, JBMono)  │                   │
│  └─────────────────┘                    │
└─────────────────────────────────────────┘
```

## Component Architecture

### HTML Layer (Structure)

Single `index.html` contains all content, organized into 8 sections:

```
index.html
├── <head>           → Meta, fonts, CSS imports
├── <nav>            → Navbar (fixed position)
├── <section#hero>   → Hero section
├── <section#about>  → About section
├── <section#how-it-works> → How It Works
├── <section#impact> → Impact counters
├── <section#stories> → Dev Stories
├── <section#dev-register> → Dev Registration Form
├── <section#cta>    → Call-to-action
├── <footer>         → Footer
└── <script>         → JS imports (main.js + dev-register.js)
```

### CSS Layer (Styling)

Modular CSS architecture with a Design Token system:

```
design-tokens.css     ← Foundation: CSS Custom Properties
       │
reset.css             ← Normalize browser defaults
       │
globals.css           ← Shared utilities, buttons, animations
       │
┌──────┴──────┐
│  Section CSS │       ← Per-section styles (8 files)
│  navbar.css  │
│  hero.css    │
│  about.css   │
│  dev-register.css │
│  ...         │
└──────────────┘
```

#### Design Token Categories

| Category | Variables | Examples |
|----------|----------|----------|
| Colors | 8 vars | `--bg-primary`, `--accent-primary`, `--glass-bg` |
| Typography | 14 vars | `--font-sans`, `--text-5xl`, `--font-extrabold` |
| Spacing | 6 vars | `--space-xs` (0.25rem) → `--space-2xl` (8rem) |
| Border Radius | 4 vars | `--radius-sm` → `--radius-full` |
| Shadows | 4 vars | `--shadow-sm` → `--shadow-glow` |
| Transitions | 3 vars | `--transition-fast` → `--transition-slow` |
| Layout | 3 vars | `--container-max`, `--container-padding`, `--navbar-height` |

### JavaScript Layer (Behavior)

2 JS files, 6 self-contained modules:

```
main.js                    → Core modules orchestrator
├── initNavbar()           → Scroll effect + mobile toggle
├── initSmoothScroll()     → Anchor link smooth scrolling
├── initScrollAnimations() → IntersectionObserver for fade-in
├── initImpactCounters()   → Counter animation (rAF)
├── initFooterYear()       → Dynamic copyright year
└── initDevRegisterForm()  → Delegates to dev-register.js

dev-register.js            → Form feature module
├── initSkillTags()        → Clickable skill pills (max 5)
├── initCharCounter()      → Textarea character counter
├── validateField()        → Per-field blur validation
└── initFormSubmit()       → Submit validation + toast notification
```

## Data Flow

### Static Data (Current)

```
index.html (hardcoded) → DOM → Browser render
```

Data types:
- **Hero stats**: Inline text (`50+`, `120+`, `₫500M+`)
- **Impact counters**: `data-target` attributes → JS animation
- **Dev Stories**: Inline HTML cards
- **Dev Registration**: Client-side only (UI demo, no data sent)
- **Social/CTA links**: `data-placeholder="true"` (disabled)

### Future Data Flow (With Backend)

```
API/CMS → fetch() → DOM manipulation → Browser render
```

## Animation Architecture

### CSS Animations

| Animation | Trigger | Method |
|-----------|---------|--------|
| Navbar shadow | Scroll > 10px | `window.scroll` → `.scrolled` class |
| Hero gradient | Page load | `@keyframes` in CSS |
| Card hover | Mouse hover | CSS `:hover` transitions |

### JS Animations (IntersectionObserver)

```
Element enters viewport
       │
       ▼
IntersectionObserver fires
       │
       ▼
Add `.visible` class
       │
       ▼
CSS transition triggers
(opacity 0→1, translateY 30px→0)
       │
       ▼
Unobserve element (one-time)
```

### Counter Animation (Impact Section)

```
Section enters viewport (threshold: 0.3)
       │
       ▼
animateCounter() starts
       │
       ▼
requestAnimationFrame loop
│ elapsed = now - start
│ progress = min(elapsed/1800ms, 1)
│ eased = 1 - (1 - progress)³   // ease-out cubic
│ current = floor(eased × target)
│ el.textContent = current + suffix
       │
       ▼
progress >= 1 → stop
```

## Responsive Architecture

### Breakpoints

| Breakpoint | Target | Behavior |
|-----------|--------|----------|
| Default | Mobile | Base styles |
| `768px` | Tablet | Expand grids, larger fonts |
| `480px` (max) | Small mobile | Reduce fonts, tighter spacing |
| `1200px` | Desktop | `--container-max` natural limit |

### Responsive Patterns

- **Font scaling**: Override CSS vars in media queries
- **Grid layouts**: CSS Grid/Flexbox, collapse to 1 column on mobile
- **Navbar**: Horizontal links → hamburger menu (`768px`)
- **Cards**: Multi-column → stack single-column

## Performance Characteristics

| Metric | Value |
|--------|-------|
| **Total bundle** | ~35KB (CSS + JS, uncompressed) |
| **External requests** | 1 (Google Fonts) |
| **JavaScript** | ~10KB (vanilla, no framework) |
| **Images** | ~30KB (favicons + OG image) |
| **Time to Interactive** | Near-instant (no framework hydration) |

### Optimizations

- Google Fonts: `preconnect` hints
- CSS: Modular files (browser parallel download)
- JS: Deferred load (`<script>` at end of `<body>`)
- Animations: CSS transitions (GPU-accelerated)
- IntersectionObserver: Lazy trigger, auto-unobserve

## Security

| Aspect | Implementation |
|--------|---------------|
| **CSP** | N/A (static site, no inline scripts policy needed) |
| **External scripts** | None (zero third-party JS) |
| **User data** | Registration form is UI demo only — no data collected, stored, or transmitted |
| **HTTPS** | Required for production deployment |

## Deployment

### Current

- Open `index.html` directly in browser
- No server required

### Production Options

| Platform | Method |
|----------|--------|
| **GitHub Pages** | Push to `main` branch, enable Pages |
| **Cloudflare Pages** | Connect repo, auto-deploy |
| **Vercel** | Import project, zero-config |
| **Netlify** | Drag & drop or Git integration |

All platforms support static sites out-of-the-box, no build step required.
