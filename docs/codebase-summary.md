# Codebase Summary

## Overview

Nuôi Dev is a static single-page website built entirely with plain HTML/CSS/JS. No frameworks, no build tools, no dependencies.

## Statistics

| Metric | Value |
|--------|-------|
| **Total source files** | 15 |
| **Total LOC** | ~2,512 |
| **HTML files** | 1 (574 LOC) |
| **CSS files** | 12 (1,900 LOC) |
| **JS files** | 2 (336 LOC) |
| **Image assets** | 7 (favicons, OG) |

## File Structure

```
nuoi-dev/
├── index.html              # 574 LOC — Full HTML structure
├── css/
│   ├── design-tokens.css   #  72 LOC — CSS Custom Properties (design system)
│   ├── reset.css           #  60 LOC — Modern CSS reset
│   ├── globals.css         # 177 LOC — Container, buttons, animations, responsive
│   ├── navbar.css          # 161 LOC — Fixed nav, mobile hamburger
│   ├── hero.css            # 256 LOC — Hero section, gradient bg, code block deco
│   ├── about.css           # 161 LOC — About grid, highlight cards
│   ├── how-it-works.css    # 123 LOC — Steps grid, SVG connectors
│   ├── impact.css          #  61 LOC — Counter cards grid
│   ├── dev-stories.css     # 105 LOC — Story cards, skill tags
│   ├── dev-register.css    # 174 LOC — Dev registration form, tags, validation
│   ├── cta.css             # 127 LOC — CTA section, gradient bg
│   └── footer.css          # 125 LOC — Footer layout, social links
├── js/
│   ├── main.js             # 142 LOC — 6 modules (navbar, scroll, animations, counters, year, form)
│   └── dev-register.js     # 194 LOC — Form validation, skill tags, toast notification
└── assets/
    └── images/             # Favicons (SVG, PNG), OG image
```

## Entry Point

`index.html` — Single-page application, all content in one HTML file.

### HTML Structure (8 sections)

1. `<nav class="navbar">` — Fixed navigation bar
2. `<section class="hero">` — Hero with headline, CTA, stats, code decoration
3. `<section class="about">` — 2-column layout + 3 highlight cards
4. `<section class="how-it-works">` — 3-step process with SVG connectors
5. `<section class="impact">` — 4 counter cards (scroll-triggered animation)
6. `<section class="dev-stories">` — 4 developer story cards
7. `<section class="dev-register">` — Inline registration form (skill tags, validation, toast)
8. `<section class="cta-section">` + `<footer>` — CTA + footer

## CSS Architecture

### Design Token System (`design-tokens.css`)

All design values are managed through CSS Custom Properties:

| Category | Examples |
|----------|----------|
| **Colors** | `--bg-primary`, `--accent-primary`, `--glass-bg` |
| **Typography** | `--font-sans`, `--font-mono`, `--text-4xl` |
| **Spacing** | `--space-xs` → `--space-2xl` |
| **Effects** | `--shadow-md`, `--radius-md`, `--transition-base` |
| **Layout** | `--container-max`, `--navbar-height` |

### CSS File Strategy

Each section has its own CSS file, imported in order within `<head>`:

```
design-tokens → reset → globals → navbar → hero → about → how-it-works → impact → dev-stories → dev-register → cta → footer
```

### Reusable Classes

| Class | Description |
|-------|-------------|
| `.container` | Max-width container with padding |
| `.section` | Section spacing (`padding-block`) |
| `.glass-card` | Glassmorphism card (blur, border, shadow) |
| `.btn`, `.btn-primary`, `.btn-outline` | Button variants |
| `.fade-in-up` | Scroll-triggered animation |
| `.section-label`, `.section-title` | Section headings |
| `.gradient-text` | Gradient text effect |

## JavaScript Architecture

6 modules initialized in `DOMContentLoaded` across 2 files:

### `main.js` — Core modules

| Module | Function |
|--------|----------|
| `initNavbar()` | Shadow on scroll + mobile hamburger toggle |
| `initSmoothScroll()` | Smooth scroll for anchor links, respects `prefers-reduced-motion` |
| `initScrollAnimations()` | IntersectionObserver for `.fade-in-up` elements |
| `initImpactCounters()` | Scroll-triggered counter animation (`data-target`, `data-suffix`) |
| `initFooterYear()` | Dynamic copyright year |
| `initDevRegisterForm()` | Delegates to `dev-register.js` |

### `dev-register.js` — Form logic (194 LOC)

| Function | Purpose |
|----------|--------|
| `initDevRegisterForm()` | Main entry — wires up form validation + UX |
| `initSkillTags()` | Clickable skill pills, max 5 selection, toggle `.active` |
| `initCharCounter()` | Live character count for message textarea |
| `validateField()` | Per-field validation on blur, inline error messages |
| `initFormSubmit()` | Full form validation, success state with toast notification |

### Animation Approach

- **Scroll reveal**: IntersectionObserver + CSS transitions (`.fade-in-up` → `.visible`)
- **Counter**: `requestAnimationFrame` + ease-out cubic easing
- **Accessibility**: `prefers-reduced-motion` disables all animations

## External Dependencies

| Resource | Type | Source |
|----------|------|--------|
| Inter font | Webfont | Google Fonts CDN |
| JetBrains Mono | Webfont | Google Fonts CDN |

> No npm packages, no CDN scripts, no external CSS frameworks.

## Data Layer

All data is currently hardcoded:

- **Hero stats**: 50+ devs, 120+ sponsors, ₫500M+
- **Impact counters**: 52, 128, 1200+, 35 (with `data-target` attributes)
- **Dev Stories**: 4 stories (Minh Trí, Thanh Lan, Đức Huy, Hồng Nhung)
- **Social links**: Placeholder (`data-placeholder="true"`, `pointer-events: none`)
- **CTA buttons**: Placeholder (`data-placeholder="true"`)

## Git History

| Commit | Description |
|--------|-------------|
| `00dc058` | feat: project setup & design system (phase 01) |
| `2014715` | feat: implement Hero and About sections (phase-02) |
| `9e4e396` | feat: implement How It Works, Impact, and Dev Stories sections |

> Branch: `main`
