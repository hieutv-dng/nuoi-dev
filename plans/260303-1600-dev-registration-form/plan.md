---
title: Dev Registration Form
description: Inline dev registration form section — UI only, client-side validation, success message
status: ready
priority: high
effort: medium
branch: feat/dev-register-form
tags: [feature, ui, form, registration]
created: 2026-03-03T16:00:00+07:00
---

# Dev Registration Form — Implementation Plan

## Context

- **Brainstormer:** [brainstormer-260303-1555-dev-registration-form.md](../reports/brainstormer-260303-1555-dev-registration-form.md)
- **Scope:** UI only (no backend), inline section, client-side validation
- **Position:** Sau `#stories`, trước `#cta`

## Phases

| # | Phase | Status | Files |
|---|-------|--------|-------|
| 1 | [HTML Structure](phase-01-html-structure.md) | ✅ | `index.html` |
| 2 | [CSS Styling](phase-02-css-styling.md) | ✅ | `css/dev-register.css` |
| 3 | [JS Form Logic](phase-03-js-form-logic.md) | ⬜ | `js/dev-register.js`, `js/main.js` |

## Architecture

```
index.html       → Thêm section #dev-register + link CSS/JS mới
css/dev-register.css → Form styles (glass-card, responsive grid, tags, validation)
js/dev-register.js   → Form validation + UX (tách riêng, giữ main.js < 200 LOC)
js/main.js           → Thêm 1 dòng gọi initDevRegisterForm() — KHÔNG thêm thêm
```

## Key Decisions

1. **Tách `js/dev-register.js` riêng** — `main.js` hiện 142 dòng, form logic ~100 dòng → vượt 200 LOC nếu gộp
2. **Inline section** — không modal, không trang riêng
3. **Multi-select tags** — clickable pills/chips, toggle active class, **max 5 skills**
4. **Validation on blur + on submit** — inline error dưới mỗi field
5. **Toast popup** — submit thành công hiện toast notification (fixed position), form ẩn + nút reset inline
6. **Không navbar link** — section accessible qua natural scroll
7. **Education optional** — không bắt buộc, giảm friction
8. **Demo only** — form không gửi data đi đâu, chỉ showcase UI/UX

## Dependencies

- Không có external dependencies
- Sử dụng design tokens + glass-card pattern hiện có
