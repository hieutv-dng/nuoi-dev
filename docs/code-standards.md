# Code Standards

## Project Structure

```
nuoi-dev/
├── index.html              # Single HTML entry point
├── css/                    # Modular CSS files (1 file per section)
│   ├── design-tokens.css   # Design system variables
│   ├── reset.css           # CSS reset
│   ├── globals.css         # Shared styles & utilities
│   └── {section}.css       # Section-specific styles
├── js/
│   ├── main.js             # Core JavaScript (init modules)
│   └── {feature}.js        # Feature-specific logic (e.g. dev-register.js)
├── assets/
│   └── images/             # Static assets
├── docs/                   # Project documentation
└── plans/                  # Implementation plans & reports
```

## Naming Conventions

### Files

- **CSS files**: Kebab-case, named after sections — `how-it-works.css`, `dev-stories.css`
- **JS files**: Kebab-case — `main.js`
- **Image files**: Kebab-case, with size suffix if needed — `favicon-32.png`, `og-image.png`

### CSS Classes

- **BEM-inspired** but simplified (not strict BEM):
  - Block: `.navbar`, `.hero`, `.about-card`
  - Element: `.navbar-links`, `.hero-headline`, `.about-card-icon`
  - Modifier: `.scrolled`, `.active`, `.open`, `.visible`
- **Section prefix**: Each class starts with section name — `.hero-*`, `.about-*`, `.step-*`
- **Utility classes**: `.container`, `.section`, `.glass-card`, `.btn`, `.fade-in-up`

### CSS Custom Properties

- **Category prefix**: `--bg-*`, `--text-*`, `--accent-*`, `--font-*`, `--space-*`, `--shadow-*`, `--radius-*`, `--transition-*`
- **Naming**: Use semantic names — `--accent-primary` (not `--indigo-500`)

### JavaScript

- **Functions**: camelCase, `init` prefix for setup functions — `initNavbar()`, `initSmoothScroll()`
- **Variables**: camelCase — `const navbar`, `const prefersReducedMotion`
- **DOM queries**: Use class selectors — `document.querySelector('.navbar')`

### HTML

- **IDs**: Kebab-case, used for navigation anchors — `id="hero"`, `id="how-it-works"`
- **Sections**: Wrapped in `<section>` with section name class — `<section class="hero">`
- **Semantic elements**: `<nav>`, `<section>`, `<footer>`, `<main>` (when needed)
- **Data attributes**: `data-target`, `data-suffix`, `data-placeholder`

## CSS Architecture

### Load Order (Important)

CSS files must be loaded in order within `<head>`:

```html
<link rel="stylesheet" href="css/design-tokens.css">  <!-- 1. Variables -->
<link rel="stylesheet" href="css/reset.css">           <!-- 2. Reset -->
<link rel="stylesheet" href="css/globals.css">         <!-- 3. Global utils -->
<link rel="stylesheet" href="css/navbar.css">          <!-- 4+ Sections -->
<!-- ... section CSS files in order of appearance -->
<link rel="stylesheet" href="css/dev-register.css">    <!-- Feature CSS -->
```

### Design Token Rules

1. **Always use CSS variables** instead of hardcoded values
2. **Colors**: Only use `--bg-*`, `--text-*`, `--accent-*` variables
3. **Spacing**: Use the scale `--space-xs` → `--space-2xl`
4. **Typography**: Use `--text-xs` → `--text-5xl` and `--font-regular` → `--font-extrabold`
5. **Exception**: One-off values in section CSS are permitted if used only once

### Responsive Design

- **Mobile-first approach**: Base styles for mobile, media queries expand
- **Breakpoints**:
  - `480px` — Small mobile
  - `768px` — Tablet
  - `1024px` — Desktop (implicit, via `--container-max: 1200px`)
- **Font scaling**: Override CSS variables in media queries
- **`prefers-reduced-motion`**: Disable all animations

### Glassmorphism Pattern

```css
.glass-card {
  background: var(--glass-bg);              /* rgba overlay */
  border: 1px solid var(--glass-border);    /* subtle border */
  border-radius: var(--radius-md);
  backdrop-filter: blur(12px);              /* blur effect */
  -webkit-backdrop-filter: blur(12px);      /* Safari support */
  box-shadow: var(--shadow-md);
}
```

## JavaScript Standards

### Module Pattern

Core logic in `main.js`, feature logic in separate files:

```javascript
// main.js — orchestrator
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initSmoothScroll();
  initScrollAnimations();
  initImpactCounters();
  initFooterYear();
  initDevRegisterForm(); // delegates to dev-register.js
});
```

```javascript
// dev-register.js — feature module (loaded separately)
function initDevRegisterForm() { /* form validation + UX */ }
```

**Splitting rule**: If adding feature logic to `main.js` would push it > 200 LOC, create a separate `{feature}.js` file.

### DOM Interaction

- Use `querySelector` / `querySelectorAll` (no jQuery)
- IntersectionObserver for scroll-triggered effects
- `requestAnimationFrame` for smooth animations
- Event delegation when possible

### Accessibility

- Respect `prefers-reduced-motion` in both CSS and JS
- `aria-label` for interactive elements
- `aria-hidden="true"` for decorative elements
- `tabindex="-1"` for placeholder links

## HTML Standards

### SEO Meta Tags

Each page must include:

```html
<title>Nuôi Dev — Bảo trợ Developer Việt Nam</title>
<meta name="description" content="...">
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="...">
<meta name="twitter:card" content="summary_large_image">
```

### Section Pattern

```html
<section class="section {section-name}" id="{section-id}">
  <div class="container">
    <div class="section-header fade-in-up">
      <span class="section-label">// label</span>
      <h2 class="section-title">Title</h2>
      <p class="section-subtitle">Subtitle</p>
    </div>
    <!-- Section content -->
  </div>
</section>
```

### Placeholder Links

Links without URLs use this pattern:

```html
<a href="#" data-placeholder="true" aria-disabled="true" tabindex="-1" title="Coming soon">
  Link text
</a>
```

## Commit Convention

- Format: `type: description`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `chore`
- Example: `feat: implement Hero and About sections (phase-02)`

## File Size Limits

- CSS files: **< 200 LOC** per file (modular by section)
- JS files: **< 200 LOC** per file (split feature logic into separate files)
- HTML: Accepted > 200 LOC since it's a single-page
- Docs: **< 800 LOC** per file
