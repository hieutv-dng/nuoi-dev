# Nuôi Dev — Sponsor Vietnamese Developers

> A platform connecting sponsors with Vietnamese developers. Every contribution is a step forward for the next generation of programmers.

[![Website](https://img.shields.io/badge/website-nuoi.dev-6366f1)](https://nuoi.dev)
[![License](https://img.shields.io/badge/license-MIT-green)](#license)

## Overview

**Nuôi Dev** is a developer sponsorship platform that connects sponsors with young programmers who need support. Inspired by [nuoiem.com](https://nuoiem.com) (child sponsorship), but tailored specifically for the Vietnamese developer community.

### How It Works

1. **Register** — Devs or Sponsors sign up; profiles are verified within 24 hours
2. **Connect** — Sponsors are matched with suitable devs based on field and goals
3. **Support & Track** — Ongoing mentoring, financial support, and progress tracking

### Three Core Areas

- 📚 **Learning** — Course fees, study materials, development tools
- 🧭 **Mentoring** — Mentor connections, career path guidance, code review
- 💼 **Job Opportunities** — Internship and job referrals at tech companies

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Structure** | HTML5 (semantic, SEO-optimized) |
| **Styling** | Vanilla CSS (CSS Custom Properties / Design Tokens) |
| **Logic** | Vanilla JavaScript (ES6+) |
| **Fonts** | Inter + JetBrains Mono (Google Fonts) |
| **Animation** | CSS gradient animation + Intersection Observer API |
| **Deployment** | Static files — open `index.html` directly |

> No dependencies, no build tools, no frameworks.

## Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- (Optional) Live Server extension for VS Code

### Run Locally

```bash
# Clone repository
git clone https://github.com/hieutv-dng/nuoi-dev.git
cd nuoi-dev

# Open directly in browser
open index.html

# Or use VS Code Live Server
# Right-click index.html → "Open with Live Server"
```

## Project Structure

```
nuoi-dev/
├── index.html              # Main page (single-page)
├── css/
│   ├── design-tokens.css   # Design system variables
│   ├── reset.css           # CSS reset
│   ├── globals.css         # Global styles, utilities
│   ├── navbar.css          # Navigation bar
│   ├── hero.css            # Hero section
│   ├── about.css           # About section
│   ├── how-it-works.css    # How It Works section
│   ├── impact.css          # Impact counters section
│   ├── dev-stories.css     # Developer stories section
│   ├── dev-register.css    # Dev registration form section
│   ├── cta.css             # Call-to-action section
│   └── footer.css          # Footer section
├── js/
│   ├── main.js             # Main JavaScript (init modules)
│   └── dev-register.js     # Dev registration form logic
├── assets/
│   └── images/             # Favicons, OG images
├── plans/                  # Implementation plans & reports
└── docs/                   # Project documentation
```

## Sections

The website includes 8 sections:

1. **Navbar** — Fixed navigation with mobile hamburger menu
2. **Hero** — Large headline, CSS animated background, CTA buttons, stats
3. **About** — Explains the Nuôi Dev model, highlight cards (glassmorphism)
4. **How It Works** — 3-step participation process with connecting lines (SVG)
5. **Impact** — Counter animation (scroll-triggered, Intersection Observer)
6. **Dev Stories** — Showcase cards of sponsored developers
7. **Dev Registration** — Inline registration form (UI demo, client-side validation, skill tags)
8. **CTA + Footer** — Call to action, social links, copyright

## Design

- ☀️ **Light mode** — White/light gray background, accent indigo (#6366f1) / cyan (#06b6d4)
- 💎 **Glassmorphism** cards with backdrop blur
- ✨ **Micro-animations** — Fade-in-up scroll reveals, counter animations
- 📱 **Fully responsive** — Mobile-first, breakpoints 480px/768px
- ♿ **Accessibility** — Semantic HTML, `prefers-reduced-motion` support

## Documentation

| Document | Description |
|----------|-------------|
| [Project Overview (PDR)](docs/project-overview-pdr.md) | Project overview & decisions |
| [Codebase Summary](docs/codebase-summary.md) | Codebase structure summary |
| [Code Standards](docs/code-standards.md) | Code structure & standards |
| [System Architecture](docs/system-architecture.md) | System architecture |
| [Design Guidelines](docs/design-guidelines.md) | Design guidelines |
| [Project Roadmap](docs/project-roadmap.md) | Development roadmap |

## License

MIT © 2026 Nuôi Dev
