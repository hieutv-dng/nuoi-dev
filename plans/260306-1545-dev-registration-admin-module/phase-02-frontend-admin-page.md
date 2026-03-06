# Phase 2: Frontend — Admin Page + CSS

## Context Links
- [Plan Overview](plan.md)
- [Brainstorm Report](../reports/brainstormer-260306-1542-dev-registration-admin-module.md)

## Overview
- **Priority:** High
- **Status:** ⬜ Pending
- **Description:** Create `admin.html` + CSS with glassmorphism card design

## Requirements
- Reuse existing design tokens (`design-tokens.css`, `reset.css`, `globals.css`)
- Card-based layout (not table)
- Responsive: mobile-first, breakpoints at 480px/768px/1024px
- Components: navbar, stats bar, filter bar, card grid, detail modal, pagination, toast

## Related Code Files

**Create:**
- `admin.html` — Admin page structure
- `css/admin-dev-registrations.css` — All admin module styles

**Reuse:**
- `css/design-tokens.css`
- `css/reset.css`
- `css/globals.css`

## Implementation Steps

### Step 1: Create `admin.html`

Structure:
```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <!-- Meta, fonts, CSS imports -->
</head>
<body>
  <!-- Admin Navbar -->
  <nav class="admin-navbar">...</nav>

  <main class="admin-main">
    <!-- Stats Cards -->
    <section class="admin-stats">
      <div class="stat-card" data-status="all">Total: <span id="stat-total">0</span></div>
      <div class="stat-card" data-status="pending">Pending: <span id="stat-pending">0</span></div>
      <div class="stat-card" data-status="approved">Approved: <span id="stat-approved">0</span></div>
      <div class="stat-card" data-status="rejected">Rejected: <span id="stat-rejected">0</span></div>
    </section>

    <!-- Filter Bar -->
    <section class="admin-filters">
      <div class="filter-pills">...</div>
      <input type="search" id="search-input" placeholder="Tìm theo tên, email...">
    </section>

    <!-- Card Grid -->
    <section class="admin-cards" id="cards-container">
      <!-- Cards rendered by JS -->
    </section>

    <!-- Pagination -->
    <nav class="admin-pagination" id="pagination">...</nav>
  </main>

  <!-- Detail Modal -->
  <div class="modal-overlay" id="detail-modal">...</div>

  <!-- Toast Container -->
  <div class="toast-container" id="toast-container"></div>

  <!-- JS -->
  <script src="js/admin-dev-registrations.js"></script>
</body>
</html>
```

### Step 2: Create `css/admin-dev-registrations.css`

Key sections:
1. **Admin Navbar** — Fixed top, gradient bg, logo + back link
2. **Stats Cards** — 4-column grid, glassmorphism, hover scale
3. **Filter Bar** — Pill buttons + search input
4. **Card Grid** — CSS Grid, responsive columns (1→2→3)
5. **Registration Card** — Glass card, avatar initials, status badge, skill tags, action buttons
6. **Status Badges** — Color-coded (pending=yellow, approved=green, rejected=red)
7. **Detail Modal** — Centered overlay, slide-in animation
8. **Pagination** — Numbered buttons + prev/next
9. **Toast** — Slide-in notification
10. **Responsive** — Media queries 480px/768px/1024px

Card CSS design:
```css
.reg-card {
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  padding: var(--space-lg);
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}
.reg-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}
```

## Todo List
- [ ] Create `admin.html` with full structure
- [ ] Create `css/admin-dev-registrations.css`
- [ ] Verify page loads correctly in browser
- [ ] Check responsive layout at all breakpoints

## Success Criteria
- Page loads without errors
- All sections render with correct layout
- Responsive design works on mobile/tablet/desktop
- Glassmorphism style consistent with `index.html`
