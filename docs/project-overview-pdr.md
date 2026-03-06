# Nuôi Dev — Project Overview (PDR)

## 1. Product Overview

**Nuôi Dev** is a landing page website for a Vietnamese developer sponsorship platform. The website introduces a model connecting sponsors with young programmers through financial support, mentoring, and job opportunities.

### Vision

Every Vietnamese developer deserves the opportunity to grow — regardless of their starting point.

### Goals

- Clearly present the Nuôi Dev operating model
- Attract new sponsors and developers to participate
- Showcase impact through real numbers and stories
- Provide clear CTAs for both Sponsors and Devs

## 2. Target Audience

| Audience | Needs |
|----------|-------|
| **Sponsors** | Want to support young developers, track development progress |
| **Developers** | Need financial support, mentoring, career opportunities |
| **Community** | Learn about the model, want to contribute |

## 3. Product Requirements

### Functional Requirements

- [x] Single-page landing page with 8 sections
- [x] Responsive design (mobile/tablet/desktop)
- [x] Smooth scroll navigation
- [x] Mobile hamburger menu
- [x] Counter animation for Impact metrics
- [x] Scroll-triggered fade-in animations
- [x] SEO meta tags (OG, Twitter Card)
- [x] Dev registration form (UI demo — client-side validation, skill tags, toast)
- [ ] CTA buttons link to registration forms (placeholder `#`)
- [ ] Social media links (placeholder)

### Non-Functional Requirements

- [x] Zero dependencies — runs directly in the browser
- [x] Performance: Only loads Google Fonts, no external scripts
- [x] Accessibility: Semantic HTML, aria-labels, `prefers-reduced-motion`
- [x] SEO: Meta tags, structured headings, og:image

## 4. Tech Stack Decision

### Why Plain HTML/CSS/JS

| Criteria | Decision |
|----------|----------|
| **Development speed** | Fast for a simple landing page |
| **Performance** | No framework overhead |
| **Maintenance** | Easy to understand, no build tools needed |
| **Deployment** | Upload static files anywhere |
| **Bundle size** | ~30KB total (CSS + JS, excluding fonts) |

### Trade-offs

- ✅ Zero setup, zero dependencies
- ✅ SEO-friendly (no client-side rendering)
- ⚠️ No component reuse (acceptable for 1 page)
- ⚠️ No state management (not needed)

## 5. Design Inspiration

Inspired by [nuoiem.com](https://nuoiem.com) — a child sponsorship platform — but adapted for the developer community with a **tech/modern** aesthetic:

- Light mode with indigo/cyan accents
- Glassmorphism cards
- Code-inspired UI elements (code block decoration, monospace labels)
- Smooth micro-animations

## 6. Data Strategy

**Current**: All data is hardcoded directly in HTML

| Data | Source | Sample Value |
|------|--------|-------------|
| Sponsored Devs | Hardcode | 52 |
| Sponsors | Hardcode | 128 |
| Mentoring Hours | Hardcode | 1200+ |
| Projects Completed | Hardcode | 35 |
| Dev Stories | Hardcode | 4 stories |

**Future**: May integrate a CMS or API for dynamic data management.

## 7. Current Status

| Phase | Status |
|-------|--------|
| Project Setup & Design System | ✅ Done |
| Hero + About Sections | ✅ Done |
| How It Works + Impact + Dev Stories | ✅ Done |
| CTA + Footer + Polish | ✅ Done |
| Dev Registration Form (UI) | ✅ Done |

**Next steps**: See [Project Roadmap](./project-roadmap.md) for upcoming phases.
