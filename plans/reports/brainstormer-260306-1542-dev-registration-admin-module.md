# Brainstorm: Module Quản Lý Dev Đăng Ký

## Problem Statement

Cần tạo frontend module quản lý danh sách dev đăng ký, kết nối với backend API `api/dev-registrations`. Module cho phép xem danh sách, chi tiết, approve/reject đăng ký.

## Decisions

| # | Question | Decision |
|---|---|---|
| 1 | Approve/Reject | ✅ Có — cần thêm backend PATCH endpoint |
| 2 | UI style | Cards (thẻ) — không dùng table |
| 3 | Auth | ❌ Không cần (MVP) |
| 4 | Location | Root level (`admin.html`) |

## Rules

### Rich Domain Model (Bắt buộc)

- **KHÔNG** set trực tiếp properties của entity từ bên ngoài (service, controller)
- Business logic liên quan đến entity (update status, validate transitions) xử lý **ngay trong entity class**
- Entity expose methods cho các nghiệp vụ: `approve()`, `reject()`, v.v.
- Service chỉ gọi method của entity, không trực tiếp gán `entity.status = 'approved'`

**Ví dụ đúng:**
```typescript
// Entity
class DevRegistration {
  approve() { this.status = RegistrationStatus.APPROVED; }
  reject() { this.status = RegistrationStatus.REJECTED; }
}

// Service
const entity = await this.repo.findOne({ where: { id } });
entity.approve(); // ✅ Entity tự quản lý
await this.repo.save(entity);
```

**Ví dụ sai:**
```typescript
// Service
const entity = await this.repo.findOne({ where: { id } });
entity.status = RegistrationStatus.APPROVED; // ❌ Set trực tiếp từ bên ngoài
await this.repo.save(entity);
```

## Architecture

### Backend API Changes

**Add to `dev-registration.controller.ts`:**

| Method | Endpoint | Purpose |
|---|---|---|
| `PATCH` | `/api/dev-registrations/:id/status` | Update status (approve/reject) |

**Add to `dev-registration.service.ts`:**
- `updateStatus(id, status)` method

**DTO needed:**
- `update-dev-registration-status.dto.ts` — validates `status` field (enum: approved/rejected)

### Frontend Files (New)

```
nuoi-dev/
├── admin.html                          # Admin dashboard page
├── css/admin-dev-registrations.css     # Module styles
└── js/admin-dev-registrations.js       # Logic: fetch, render, filter, pagination
```

### Reused Files (Existing)

- `css/design-tokens.css` — colors, typography, spacing
- `css/reset.css` — CSS reset
- `css/globals.css` — utility classes

### UI Components

1. **Admin Navbar** — Logo + link back to main site
2. **Stats Bar** — 4 counters: Total, Pending, Approved, Rejected
3. **Filter/Search Bar** — Status filter pills + search input
4. **Registration Cards** — Card grid showing dev info + status badge + actions
5. **Detail Modal** — Full registration info on card click
6. **Pagination** — Page navigation
7. **Toast notifications** — Success/error feedback

### Card Layout

```
┌─────────────────────────────────┐
│  [Avatar] Name          [Badge] │
│  email@example.com              │
│  GitHub: username               │
│  ┌─────┐ ┌────┐ ┌──────┐       │
│  │React│ │Node│ │Python│        │
│  └─────┘ └────┘ └──────┘       │
│  Goal: Tìm mentor              │
│  📅 06/03/2026                  │
│  ─────────────────────────────  │
│  [✅ Approve] [❌ Reject] [👁]  │
└─────────────────────────────────┘
```

## Implementation Phases

### Phase 1: Backend — Add PATCH status endpoint (~15 min)
- Create `UpdateDevRegistrationStatusDto`
- Add `updateStatus()` to service
- Add `PATCH :id/status` to controller

### Phase 2: Frontend — Admin page + CSS (~30 min)
- Create `admin.html` with structure
- Create `css/admin-dev-registrations.css` with glassmorphism cards
- Reuse design tokens

### Phase 3: Frontend — JavaScript logic (~30 min)
- Fetch & render cards from GET API
- Search/filter (client-side)
- Pagination
- Detail modal
- Approve/reject actions via PATCH API
- Toast notifications

## Tech Stack

- Vanilla HTML/CSS/JS (consistent with project)
- No dependencies, no build tools
- CSS Custom Properties from design tokens
- Glassmorphism card style

## Risk Assessment

| Risk | Impact | Mitigation |
|---|---|---|
| No auth | Anyone can approve/reject | OK for MVP, add auth later |
| Client-side filter | Slow with large dataset | OK for now, add server-side filter later |
| CORS | Browser blocks API calls | Backend already configured |

## Next Steps

Create implementation plan → Implement.
