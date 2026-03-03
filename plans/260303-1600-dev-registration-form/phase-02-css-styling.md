# Phase 02 — CSS Styling

## Context Links

- [Plan](plan.md) | [Phase 01](phase-01-html-structure.md)
- [design-tokens.css](../../css/design-tokens.css) | [globals.css](../../css/globals.css)

## Overview

- **Priority:** High — Phụ thuộc Phase 01 HTML
- **Status:** ✅ Done
- **Mô tả:** Tạo `css/dev-register.css` — styling cho form section với glass-card, responsive grid, tag chips, validation states

## Related Code Files

| Action | File | Chi tiết |
|--------|------|----------|
| **Create** | `css/dev-register.css` | Toàn bộ styles cho registration form |

## Key Design Patterns (từ codebase hiện tại)

- **Section:** `.section` padding + `.container` centered
- **Glass card:** `var(--glass-bg)`, `var(--glass-border)`, `backdrop-filter: blur(12px)`
- **Colors:** `--accent-primary: #6366f1`, `--accent-secondary: #06b6d4`
- **Animation:** `.fade-in-up` class (đã có trong globals.css)

## Implementation Steps

### 1. Section background

```css
.dev-register {
  background: var(--bg-secondary);
}
```

### 2. Form wrapper (glass-card mở rộng)

```css
.register-form-wrap {
  max-width: 800px;
  margin: var(--space-xl) auto 0;
  padding: var(--space-xl);
}
```

### 3. Form layout — Responsive grid

```css
/* Desktop: 2 columns */
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-lg);
}

.form-row-3 {
  grid-template-columns: 1fr 1fr 1fr;
}

.form-group-full {
  grid-column: 1 / -1; /* full width */
}

/* Mobile: 1 column */
@media (max-width: 768px) {
  .form-row, .form-row-3 {
    grid-template-columns: 1fr;
  }
}
```

### 4. Input styling

```css
.form-group label { ... }           /* font-medium, margin-bottom */
.form-group input,
.form-group select,
.form-group textarea { ... }        /* border, padding, rounded, focus:accent-primary */
.form-group input:focus { ... }     /* border-color: accent-primary, box-shadow glow */
```

**Focus state:** `border-color: var(--accent-primary)` + `box-shadow: var(--shadow-glow)`

### 5. Tag chips (skill selection)

```css
.tag-option {
  /* Pill style, no bg by default */
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-full);
  padding: 0.375rem 0.875rem;
  transition: all var(--transition-fast);
  cursor: pointer;
  background: transparent;
}

.tag-option.active {
  background: var(--accent-primary);
  color: #fff;
  border-color: var(--accent-primary);
}

.tag-option:hover:not(.active) {
  border-color: var(--accent-primary);
  background: rgba(99, 102, 241, 0.06);
}
```

### 6. Validation error states

```css
.form-error {
  display: block;
  color: #ef4444;
  font-size: var(--text-xs);
  min-height: 1.2em;
  opacity: 0;
  transition: opacity var(--transition-fast);
}

.form-error.show {
  opacity: 1;
}

.form-group.has-error input,
.form-group.has-error select,
.form-group.has-error textarea {
  border-color: #ef4444;
}
```

### 7. Submit button

```css
.btn-submit {
  width: 100%;
  max-width: 320px;
  margin: var(--space-lg) auto 0;
  display: flex;
  font-size: var(--text-lg);
}
```

### 8. Success message (inline reset area)

```css
.register-success {
  text-align: center;
  padding: var(--space-xl);
  animation: fadeInUp 0.5s ease-out;
}

.success-icon {
  font-size: 3rem;
  margin-bottom: var(--space-md);
}
```

### 8b. Toast popup (fixed position)

```css
.toast-container {
  position: fixed;
  top: var(--space-lg);
  right: var(--space-lg);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.toast {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(12px);
  border-radius: var(--radius-lg);
  padding: var(--space-md) var(--space-lg);
  color: var(--text-primary);
  box-shadow: var(--shadow-lg);
  animation: toastIn 0.3s ease-out, toastOut 0.3s ease-in 2.7s forwards;
  max-width: 360px;
}

.toast-success { border-left: 4px solid #10b981; }

@keyframes toastIn {
  from { opacity: 0; transform: translateX(100%); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes toastOut {
  from { opacity: 1; }
  to { opacity: 0; }
}
```

### 9. Privacy note

```css
.form-privacy {
  text-align: center;
  font-size: var(--text-xs);
  color: var(--text-secondary);
  margin-top: var(--space-md);
}
```

### 10. Textarea counter

```css
.textarea-counter {
  text-align: right;
  font-size: var(--text-xs);
  color: var(--text-secondary);
}
```

### 11. Required/Optional markers + Skill counter

```css
.required { color: #ef4444; }
.optional { color: var(--text-secondary); font-size: var(--text-sm); }
.skill-counter {
  color: var(--text-secondary);
  font-size: var(--text-sm);
  font-weight: normal;
}
.skill-counter.max-reached { color: #f59e0b; }
```

### 11b. Disabled tag state (max reached)

```css
.tag-option.disabled {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}
```

### 12. Responsive + Reduced motion

```css
@media (max-width: 480px) {
  .register-form-wrap { padding: var(--space-lg) var(--space-md); }
  .skill-tags-select { gap: var(--space-xs); }
}

@media (prefers-reduced-motion: reduce) {
  .register-success { animation: none; }
}
```

## Todo List

- [x] Tạo file `css/dev-register.css`
- [x] Section background
- [x] Form wrapper glass-card
- [x] Form grid layout (2-col, 3-col, full-width)
- [x] Input/select/textarea base styles + focus
- [x] Tag chips (skill pills) + active + disabled state
- [x] Error states + validation styling
- [x] Submit button styling
- [x] Success message (inline reset area)
- [x] Toast popup styles (fixed, animation)
- [x] Skill counter + max-reached state
- [x] Disabled tag styling
- [x] Privacy note + textarea counter
- [x] Responsive breakpoints (768px, 480px)
- [x] `prefers-reduced-motion` support
- [x] Verify file < 200 LOC (174 LOC)

## Success Criteria

- Form nhìn nhất quán với design system (glass-card, accent colors, rounded)
- Tag chips clickable, có hover + active + disabled states
- Toast popup hiển thị đúng góc phải trên, tự biến mất sau 3s
- Error messages hiện rõ ràng (đỏ, inline)
- Responsive: 2-col → 1-col trên mobile
- File `dev-register.css` < 200 dòng
