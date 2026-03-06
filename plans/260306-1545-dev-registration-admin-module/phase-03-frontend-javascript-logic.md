# Phase 3: Frontend — JavaScript Logic

## Context Links
- [Plan Overview](plan.md)
- [Brainstorm Report](../reports/brainstormer-260306-1542-dev-registration-admin-module.md)

## Overview
- **Priority:** High
- **Status:** ⬜ Pending
- **Description:** JS logic for fetching, rendering, filtering, pagination, approve/reject

## Requirements
- Fetch registrations from `GET /api/dev-registrations?page=&limit=`
- Render card grid from API data
- Client-side search (name, email) + status filter
- Pagination with page numbers
- Detail modal on card click (fetch single via `GET /:id`)
- Approve/Reject via `PATCH /:id/status`
- Toast notifications for success/error

## Related Code Files

**Create:**
- `js/admin-dev-registrations.js`

**Reference:**
- `js/dev-register.js` — Toast pattern reuse, API_BASE constant

## Architecture

```
admin-dev-registrations.js
├── CONFIG (API_BASE, ITEMS_PER_PAGE)
├── STATE (registrations[], currentPage, filters)
├── INIT
│   ├── fetchRegistrations()
│   ├── initFilters()
│   └── initSearch()
├── RENDER
│   ├── renderCards()
│   ├── renderStats()
│   ├── renderPagination()
│   └── renderDetailModal()
├── API
│   ├── fetchAll(page, limit)
│   ├── fetchOne(id)
│   └── updateStatus(id, action)
├── ACTIONS
│   ├── handleApprove(id)
│   ├── handleReject(id)
│   └── handleFilter(status)
└── UTILS
    ├── showToast(msg, type)
    ├── formatDate(date)
    ├── getInitials(name)
    └── mapGoalLabel(goal)
```

## Implementation Steps

### Step 1: Constants + State

```javascript
const API_BASE = 'http://localhost:3000';
const ITEMS_PER_PAGE = 12;

const state = {
  registrations: [],
  filtered: [],
  currentPage: 1,
  totalPages: 1,
  activeFilter: 'all',
  searchQuery: '',
};
```

### Step 2: API Functions

```javascript
async function fetchRegistrations(page = 1, limit = 100) {
  const res = await fetch(`${API_BASE}/api/dev-registrations?page=${page}&limit=${limit}`);
  return res.json();
}

async function fetchRegistration(id) {
  const res = await fetch(`${API_BASE}/api/dev-registrations/${id}`);
  return res.json();
}

async function updateRegistrationStatus(id, action) {
  const res = await fetch(`${API_BASE}/api/dev-registrations/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action }),
  });
  return res.json();
}
```

### Step 3: Render Functions

- `renderCards()` — Generate card HTML from filtered data, insert into grid
- `renderStats()` — Count by status, update stat card numbers
- `renderPagination()` — Calculate pages, render page buttons
- `renderDetailModal(registration)` — Populate + show modal

### Step 4: Filter + Search

- Status filter pills → set `state.activeFilter`, re-filter + re-render
- Search input → debounce 300ms, filter by name/email, re-render
- Client-side filtering (filter from cached `state.registrations`)

### Step 5: Actions

- Approve button → confirm dialog → `PATCH` → update local state → re-render
- Reject button → confirm dialog → `PATCH` → update local state → re-render
- Card click → open detail modal

### Step 6: Label Mappings

```javascript
const GOAL_LABELS = {
  upskill: '📚 Học kỹ năng mới',
  mentor: '🧭 Tìm mentor',
  job: '💼 Tìm việc làm',
  portfolio: '🚀 Xây portfolio',
  community: '🤝 Kết nối cộng đồng',
};

const EXP_LABELS = {
  beginner: '🌱 Mới bắt đầu',
  junior: '📖 Junior',
  mid: '💻 Mid-level',
  senior: '⭐ Senior',
};

const STATUS_LABELS = {
  pending: '⏳ Chờ duyệt',
  approved: '✅ Đã duyệt',
  rejected: '❌ Từ chối',
};
```

## Todo List
- [ ] Create `js/admin-dev-registrations.js`
- [ ] Implement API fetch functions
- [ ] Implement card rendering
- [ ] Implement stats rendering
- [ ] Implement filter/search
- [ ] Implement pagination
- [ ] Implement detail modal
- [ ] Implement approve/reject with confirmation
- [ ] Implement toast notifications
- [ ] Test full flow: list → filter → detail → approve → verify

## Success Criteria
- Cards render from API data
- Search filters by name/email in real-time
- Status pills filter correctly
- Pagination works
- Detail modal shows full info
- Approve/Reject updates status + shows toast
- Error states handled (network error, 404, invalid transition)

## Risk Assessment
- **Client-side filter:** Fetches all data at once — OK for MVP, may need server-side for scale
- **No auth:** Anyone with URL can manage — acceptable per brainstorm decision
