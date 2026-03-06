# Phase 2: Audit Log & Service Integration

## Context Links

- [Plan Overview](./plan.md)
- [Phase 1](./phase-01-setup-logger-module.md)
- [Brainstorm](../reports/brainstormer-260306-1608-log-service.md)

## Overview

**Priority:** High | **Status:** Planned | **Depends on:** Phase 1

Create `AuditLogInterceptor` for mutation tracking. Add application-level logging to `DevRegistrationService`.

## Related Code Files

| Action | File |
|--------|------|
| **Create** | `src/common/logger/audit-log.interceptor.ts` |
| **Modify** | `src/dev-registration/dev-registration.service.ts` |
| **Modify** | `src/dev-registration/dev-registration.controller.ts` |

## Implementation Steps

### 1. Create `src/common/logger/audit-log.interceptor.ts`

```typescript
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class AuditLogInterceptor implements NestInterceptor {
  private readonly logger = new Logger('AuditLog');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();
    const { method, url, ip, body } = req;
    const handler = context.getHandler().name;
    const controller = context.getClass().name;

    return next.handle().pipe(
      tap((response) => {
        this.logger.log({
          action: handler,
          controller,
          method,
          url,
          ip,
          // Extract entity ID from response if available
          entityId: response?.data?.id || null,
          // Log action-specific data (e.g., status change)
          payload: this.sanitizePayload(body),
        }, `Audit: ${controller}.${handler}`);
      }),
    );
  }

  /** Remove sensitive fields from payload before logging */
  private sanitizePayload(body: any): any {
    if (!body) return null;
    const { password, token, ...safe } = body;
    return safe;
  }
}
```

### 2. Modify `src/dev-registration/dev-registration.service.ts`

Add application-level logging:

```typescript
import { Logger } from '@nestjs/common';

@Injectable()
export class DevRegistrationService {
  private readonly logger = new Logger(DevRegistrationService.name);

  constructor(...) {}

  async create(dto) {
    // Log duplicate check
    const existing = await this.devRegistrationRepo.findOne({ where: { email: dto.email } });
    if (existing) {
      this.logger.warn({ email: dto.email }, 'Duplicate email registration attempt');
      throw new ConflictException('Email này đã được đăng ký');
    }

    const entity = this.devRegistrationRepo.create(dto);
    const saved = await this.devRegistrationRepo.save(entity);
    this.logger.log({ id: saved.id, email: saved.email }, 'Registration created');
    return saved;
  }

  async updateStatus(id, action) {
    const entity = await this.findOne(id);

    if (action === StatusAction.APPROVE) {
      entity.approve();
    } else {
      entity.reject();
    }

    const saved = await this.devRegistrationRepo.save(entity);
    this.logger.log({ id, action, status: saved.status }, 'Registration status updated');
    return saved;
  }
}
```

### 3. Modify `src/dev-registration/dev-registration.controller.ts`

Apply `AuditLogInterceptor` to mutation endpoints:

```typescript
import { UseInterceptors } from '@nestjs/common';
import { AuditLogInterceptor } from '../common/logger/audit-log.interceptor';

@Controller('api/dev-registrations')
export class DevRegistrationController {
  // ... existing code

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(AuditLogInterceptor)      // ← Add
  async create(@Body() dto) { ... }

  @Patch(':id/status')
  @UseInterceptors(AuditLogInterceptor)      // ← Add
  async updateStatus(...) { ... }
}
```

## Todo List

- [ ] Create `src/common/logger/audit-log.interceptor.ts`
- [ ] Add `Logger` to `DevRegistrationService` with log calls
- [ ] Apply `AuditLogInterceptor` to `create` and `updateStatus` endpoints
- [ ] Verify: POST registration → console shows application log + audit log
- [ ] Verify: PATCH status → console shows status update log + audit log
- [ ] Verify: duplicate email → console shows warn log
- [ ] Compile check: `npm run start:dev` — no errors

## Success Criteria

- Business events logged (create, updateStatus, duplicate email warning)
- Audit trail on mutation endpoints (action, IP, entityId, payload)
- Clean log output, no sensitive data leaked
- Backend compiles and all existing endpoints work normally

## Risk Assessment

| Risk | Mitigation |
|------|-----------|
| No auth yet → no userId in audit | Log IP address. Add userId extraction when auth module added |
| Payload may contain sensitive fields | `sanitizePayload()` strips password/token |
