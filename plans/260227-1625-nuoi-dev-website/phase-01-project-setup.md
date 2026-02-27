# Phase 01 — Project Setup & Design System

## Overview
- **Priority:** High
- **Status:** ✅ Done
- **Description:** Khởi tạo HTML/CSS/JS project, thiết lập design system (colors, typography, spacing, components cơ bản)

## Implementation Steps

1. Tạo project structure (HTML/CSS/JS)
2. Tạo CSS design system (variables, reset, utilities)
3. Setup fonts (Inter + JetBrains Mono via Google Fonts)
4. Tạo Navbar
5. Mở index.html trong browser kiểm tra

## Project Structure

```
├── index.html
├── css/
│   ├── design-tokens.css
│   ├── reset.css
│   ├── globals.css
│   ├── navbar.css
│   ├── hero.css
│   ├── about.css
│   ├── how-it-works.css
│   ├── impact.css
│   ├── dev-stories.css
│   ├── cta.css
│   └── footer.css
├── js/
│   └── main.js
└── assets/
    └── images/
```

## Design Tokens

```css
/* Colors — Light Mode Tech/Modern */
--bg-primary: #ffffff;
--bg-secondary: #f8f9fc;
--bg-card: rgba(255, 255, 255, 0.8);
--text-primary: #1a1a2e;
--text-secondary: #64648a;
--accent-primary: #6366f1;    /* Indigo */
--accent-secondary: #06b6d4;  /* Cyan */
--accent-gradient: linear-gradient(135deg, #6366f1, #06b6d4);
--glass-bg: rgba(255, 255, 255, 0.6);
--glass-border: rgba(99, 102, 241, 0.15);

/* Typography */
--font-sans: 'Inter', sans-serif;
--font-mono: 'JetBrains Mono', monospace;

/* Spacing */
--space-xs: 0.25rem;
--space-sm: 0.5rem;
--space-md: 1rem;
--space-lg: 2rem;
--space-xl: 4rem;
--space-2xl: 8rem;

/* Border Radius */
--radius-sm: 0.5rem;
--radius-md: 1rem;
--radius-lg: 1.5rem;
--radius-full: 9999px;
```

## Todo

- [x] Tạo project structure
- [x] Setup design tokens CSS
- [x] Setup global styles + reset
- [x] Configure Google Fonts
- [x] Create Navbar
- [x] Mở index.html trong browser OK
