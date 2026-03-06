# Phase 1: Backend — PATCH Endpoint + Entity Methods

## Context Links
- [Plan Overview](plan.md)
- [Brainstorm Report](../reports/brainstormer-260306-1542-dev-registration-admin-module.md)

## Overview
- **Priority:** High (blocks approve/reject in frontend)
- **Status:** ⬜ Pending
- **Description:** Add Rich Domain Model methods to entity + PATCH status endpoint

## Key Insights
- Follow Rich Domain Model rule: entity methods handle status transitions
- Only `pending` → `approved` or `pending` → `rejected` transitions allowed
- Entity validates transition logic internally

## Requirements
- Entity exposes `approve()` and `reject()` methods
- Guard against invalid transitions (e.g., approved → rejected)
- PATCH endpoint accepts `{ action: 'approve' | 'reject' }`
- Return updated entity on success

## Related Code Files

**Modify:**
- `backend/src/dev-registration/dev-registration.entity.ts` — Add `approve()`, `reject()` methods
- `backend/src/dev-registration/dev-registration.service.ts` — Add `updateStatus()` method
- `backend/src/dev-registration/dev-registration.controller.ts` — Add `PATCH :id/status` route

**Create:**
- `backend/src/dev-registration/dto/update-dev-registration-status.dto.ts`

## Implementation Steps

### Step 1: Update Entity — Add domain methods
File: `backend/src/dev-registration/dev-registration.entity.ts`

```typescript
// Add methods to DevRegistration entity:
approve(): void {
  if (this.status !== RegistrationStatus.PENDING) {
    throw new Error('Chỉ có thể duyệt đăng ký đang chờ');
  }
  this.status = RegistrationStatus.APPROVED;
}

reject(): void {
  if (this.status !== RegistrationStatus.PENDING) {
    throw new Error('Chỉ có thể từ chối đăng ký đang chờ');
  }
  this.status = RegistrationStatus.REJECTED;
}
```

### Step 2: Create DTO
File: `backend/src/dev-registration/dto/update-dev-registration-status.dto.ts`

```typescript
import { IsEnum } from 'class-validator';

export enum StatusAction {
  APPROVE = 'approve',
  REJECT = 'reject',
}

export class UpdateDevRegistrationStatusDto {
  @IsEnum(StatusAction, { message: 'Action phải là "approve" hoặc "reject"' })
  action: StatusAction;
}
```

### Step 3: Update Service
File: `backend/src/dev-registration/dev-registration.service.ts`

```typescript
async updateStatus(id: string, action: StatusAction): Promise<DevRegistration> {
  const entity = await this.findOne(id); // reuse existing findOne (throws NotFoundException)
  
  if (action === StatusAction.APPROVE) {
    entity.approve();
  } else {
    entity.reject();
  }
  
  return this.devRegistrationRepo.save(entity);
}
```

### Step 4: Update Controller
File: `backend/src/dev-registration/dev-registration.controller.ts`

```typescript
@Patch(':id/status')
async updateStatus(
  @Param('id', new ParseUUIDPipe()) id: string,
  @Body() dto: UpdateDevRegistrationStatusDto,
) {
  const registration = await this.service.updateStatus(id, dto.action);
  return { success: true, data: registration };
}
```

## Todo List
- [ ] Add `approve()`, `reject()` methods to entity
- [ ] Create `UpdateDevRegistrationStatusDto`
- [ ] Add `updateStatus()` to service
- [ ] Add `PATCH :id/status` to controller
- [ ] Verify backend compiles without errors
- [ ] Test endpoint with curl/Postman

## Success Criteria
- `PATCH /api/dev-registrations/:id/status` with `{ action: "approve" }` works
- `PATCH /api/dev-registrations/:id/status` with `{ action: "reject" }` works
- Invalid transitions return appropriate error
- Invalid UUID returns 400
- Non-existent ID returns 404
