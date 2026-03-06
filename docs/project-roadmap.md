# Project Roadmap

## Status Overview

| Phase | Status | Progress |
|-------|--------|----------|
| Phase 1: Landing Page MVP | ✅ Complete | 100% |
| Phase 2: Content & Deployment | 🔲 Planned | 0% |
| Phase 3: Dynamic Features | 🔲 Planned | 0% |
| Phase 4: Platform Development | 🔲 Planned | 0% |

---

## Phase 1: Landing Page MVP ✅

**Status**: Complete
**Timeline**: 2026-02-27
**Branch**: `main`

### Milestones

- [x] Project setup & design system (CSS tokens, reset, globals)
- [x] Hero section (headline, CTA, animated bg, code block decoration)
- [x] About section (2-column layout, highlight cards)
- [x] How It Works section (3-step process, SVG connectors)
- [x] Impact section (counter animations, scroll-triggered)
- [x] Dev Stories section (4 story cards, glassmorphism)
- [x] CTA section (sponsor + dev registration buttons)
- [x] Footer (navigation, social links, copyright)
- [x] Responsive design (mobile/tablet/desktop)
- [x] Accessibility (semantic HTML, aria, reduced motion)
- [x] SEO (meta tags, OG image, Twitter Card)

### Deliverables

- Single-page `index.html` with 8 sections
- Modular CSS (12 files) + 2 JS files
- Favicons (SVG, PNG 32/192, Apple Touch Icon)
- OG image

---

## Phase 2: Content & Deployment 🔲

**Status**: Planned
**Priority**: High

### Milestones

- [ ] Deploy to hosting (GitHub Pages / Cloudflare Pages / Vercel)
- [ ] Custom domain setup (`nuoi.dev`)
- [ ] SSL certificate
- [ ] Analytics integration (Google Analytics or Plausible)
- [ ] Update social links with real URLs (GitHub, Facebook, LinkedIn, Email)
- [ ] Create high-quality OG image
- [ ] Content review & copywriting refinement
- [ ] Performance audit (Lighthouse)
- [ ] Cross-browser testing

### Dependencies

- Domain name purchased
- Hosting account ready

---

## Phase 3: Dynamic Features 🔲

**Status**: Planned
**Priority**: Medium

### Milestones

- [x] Registration form for Devs (inline UI, client-side validation)
- [ ] Registration form for Sponsors
- [ ] Backend integration for form submissions
- [ ] Email notification system
- [ ] Dynamic Dev Stories (CMS or JSON file)
- [ ] Dynamic Impact counters (API or JSON file)
- [ ] Blog / Articles section
- [ ] Dark mode toggle
- [ ] Multi-language support (vi/en)

### Technical Considerations

- Google Forms API can be used for MVP forms
- JSON file + fetch() for dynamic data (before building a backend)
- Theme toggle: CSS variables + JS localStorage

---

## Phase 4: Platform Development 🔲

**Status**: Planned
**Priority**: Low

### Milestones

- [ ] Backend API (sponsor-dev matching)
- [ ] User authentication
- [ ] Sponsor Dashboard (track dev progress)
- [ ] Dev Dashboard (mentoring schedule, resources)
- [ ] Payment integration (donations)
- [ ] Admin panel
- [ ] Notification system

### Technical Considerations

- Framework: TBD (Next.js, NestJS, or similar)
- Database: TBD (PostgreSQL, Supabase)
- Auth: TBD (Better Auth, Clerk, NextAuth)
- Hosting: TBD (Vercel, Railway, Fly.io)

---

## Changelog

### 2026-03-03

- ✅ Dev Registration Form (UI demo) implemented
  - Inline section with glassmorphism form card
  - Skill multi-select tags (max 5), character counter
  - Client-side validation with inline error messages
  - Success state with toast notification
  - New files: `css/dev-register.css`, `js/dev-register.js`
- 📄 Documentation updated to English (`docs/` directory)

### 2026-02-27

- ✅ Phase 1 complete: Landing page MVP shipped
  - Project setup & design system
  - All 7 sections implemented
  - Responsive + accessible + SEO optimized
  - 3 commits: setup → hero+about → content sections
