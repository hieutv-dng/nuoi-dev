---
title: "Nuôi Dev - Website Landing Page"
description: "Website bảo trợ developer, lấy cảm hứng từ nuoiem.com, phong cách tech/modern"
status: planning
priority: high
effort: medium
branch: master
tags: [landing-page, nextjs, developer, sponsorship]
created: 2026-02-27
---

# Nuôi Dev — Website Landing Page

## Tổng quan

Website cá nhân kêu gọi bảo trợ/hỗ trợ developer. Lấy cảm hứng mô hình nuoiem.com nhưng phong cách **tech/modern dark mode**.

## Tech Stack

- **Framework:** HTML/CSS/JS thuần (không framework, không build tools)
- **Styling:** Vanilla CSS (CSS Variables)
- **Font:** Inter + JetBrains Mono (Google Fonts)
- **Serve:** Mở `index.html` trực tiếp trong browser
- **Animation:** CSS gradient animation + Intersection Observer
- **Data:** Hardcode (Dev Stories, Impact counters)
- **CTA links:** Placeholder `#` (tính sau)

## Design Direction

- ☀️ Light mode — nền trắng/xám nhạt, accent indigo/cyan
- 💎 Clean glassmorphism cards
- ✨ Micro-animations, code-inspired visuals
- 📱 Fully responsive

## Phases

| # | Phase | Status | File |
|---|-------|--------|------|
| 1 | Project Setup & Design System | ✅ Done | [phase-01](./phase-01-project-setup.md) |
| 2 | Hero + About Sections | ✅ Done | [phase-02](./phase-02-hero-about.md) |
| 3 | How It Works + Impact + Dev Stories | ✅ Done | [phase-03](./phase-03-content-sections.md) |
| 4 | CTA + Footer + Polish | ⬜ Pending | [phase-04](./phase-04-cta-footer-polish.md) |

## Sections (7 sections)

1. **Hero** — Headline lớn, animated background, CTA "Tham gia ngay"
2. **About** — "Nuôi Dev là gì?" giải thích mô hình
3. **How It Works** — 3 bước tham gia (icon + text)
4. **Impact** — Số liệu counter animation
5. **Dev Stories** — Cards showcase dev được hỗ trợ
6. **CTA** — Kêu gọi hành động cuối trang
7. **Footer** — Contact, social links

## Dependencies

- Không có dependencies — chỉ cần browser

## Validation Notes (2026-02-27)

- ✅ Hardcode data cho Dev Stories & Impact counters
- ✅ CTA buttons dùng `href="#"` placeholder
- ✅ HTML/CSS/JS thuần, không framework (fix mâu thuẫn phase-01)
- ✅ Mở index.html trực tiếp, không cần server
- ✅ Hero background: CSS gradient animation (không particles)
- ✅ Footer social: placeholder icons (GitHub, FB, Email, LinkedIn, X), điền link sau
