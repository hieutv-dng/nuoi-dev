# Brainstorm: LogService cho Backend NestJS

## Problem Statement

Backend NestJS (v11, TypeORM, PostgreSQL) cần logging system cho:
- **Application logs** — info/warn/error từ business logic
- **Request/Response logs** — HTTP access logs (method, url, status, responseTime)
- **Audit logs** — ai làm gì, lúc nào (approve/reject registration, etc.)

Constraints: console-only, JSON structured, ~3 modules, lightweight.

---

## Evaluated Approaches

### A. NestJS Built-in Logger (Custom JSON)

Override `LoggerService` interface, implement JSON formatting manually.

| Pros | Cons |
|------|------|
| Zero dependency | Phải tự implement JSON formatting |
| Native NestJS API | Không có auto request/response logging |
| Familiar `Logger` class | Không có log level config from env |
| | Reinventing the wheel cho structured logs |

**Verdict:** ❌ Quá manual cho JSON structured requirement. Violates KISS.

---

### B. Pino (via `nestjs-pino`) ⭐ RECOMMENDED

`nestjs-pino` wraps `pino` — fastest Node.js JSON logger.

| Pros | Cons |
|------|------|
| JSON native (zero config) | 3 deps (nestjs-pino, pino-http, pino-pretty) |
| Auto request/response logging | Slight learning curve |
| Request context in every log | |
| `pino-pretty` cho dev readable | |
| 5x faster than winston | |
| Industry standard | |
| Drop-in NestJS Logger replacement | |

**Verdict:** ✅ Perfect fit. JSON by default, auto HTTP logging, lightweight.

---

### C. Winston (via `nest-winston`)

Feature-rich, transport-based logger.

| Pros | Cons |
|------|------|
| Many transports | Chậm hơn Pino 5x |
| Well-known ecosystem | Heavier, more config |
| Flexible formatting | Overkill cho console-only |
| | Transport system không cần khi chỉ dùng console |

**Verdict:** ❌ Over-engineered cho console-only use case. Violates YAGNI.

---

## Recommended Solution: `nestjs-pino`

### Architecture

```
src/common/
├── logger/
│   ├── logger.module.ts            # Pino config (global)
│   └── audit-log.interceptor.ts    # Audit trail interceptor
```

### How Each Log Type Works

**1. Application Logs** — NestJS `Logger` class (backed by Pino)
```typescript
// Trong mỗi service
private readonly logger = new Logger(DevRegistrationService.name);

this.logger.log({ email }, 'Registration created');
this.logger.error({ err: error, email }, 'Failed to create registration');
```

**2. Request/Response Logs** — Auto via `nestjs-pino` middleware
```json
{"level":30,"time":1709740000,"req":{"id":1,"method":"POST","url":"/api/dev-registrations"},"res":{"statusCode":201},"responseTime":42,"msg":"request completed"}
```
→ Zero manual code. Works out of the box.

**3. Audit Logs** — Custom `AuditLogInterceptor`
```typescript
@UseInterceptors(AuditLogInterceptor)
@Patch(':id/status')
async updateStatus(...) { ... }
```
→ Logs: action, entity, entityId, IP, timestamp.

### Dependencies

```json
{
  "dependencies": {
    "nestjs-pino": "^4.x",
    "pino-http": "^10.x"
  },
  "devDependencies": {
    "pino-pretty": "^13.x"
  }
}
```

### Dev vs Prod Output

**Dev** (pino-pretty):
```
[16:08:12] INFO (DevRegistrationService): Registration created
    email: "dev@example.com"
    req.method: "POST"
    req.url: "/api/dev-registrations"
```

**Prod** (JSON structured):
```json
{"level":30,"time":1709740092,"pid":1234,"context":"DevRegistrationService","email":"dev@example.com","msg":"Registration created","req":{"id":"abc-123","method":"POST","url":"/api/dev-registrations"}}
```

### Integration Points

| File | Change |
|------|--------|
| `app.module.ts` | Import `LoggerModule` |
| `main.ts` | `app.useLogger(app.get(Logger))` — replace NestJS default |
| `dev-registration.service.ts` | Add `Logger` instances cho business events |
| `dev-registration.controller.ts` | Apply `AuditLogInterceptor` cho mutation endpoints |

---

## Files to Create/Modify

| Action | File |
|--------|------|
| **Create** | `src/common/logger/logger.module.ts` |
| **Create** | `src/common/logger/audit-log.interceptor.ts` |
| **Modify** | `src/app.module.ts` (import LoggerModule) |
| **Modify** | `src/main.ts` (replace default logger) |
| **Modify** | `src/dev-registration/dev-registration.service.ts` (add log calls) |
| **Modify** | `src/dev-registration/dev-registration.controller.ts` (apply audit interceptor) |

---

## Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| `pino-pretty` in production | Install as devDependency only |
| Audit log needs "who" but no auth yet | Log IP address for now, add userId when auth module exists |
| Too verbose request logs | Configure `autoLogging: { ignore }` for health checks |

---

## Success Criteria

- [ ] JSON structured output in console
- [ ] Auto HTTP request/response logging
- [ ] Application-level logging in services (info/warn/error)
- [ ] Audit logging on mutation endpoints (create, updateStatus)
- [ ] Pretty output in dev, JSON in prod
- [ ] Zero impact on existing functionality

## Next Steps

Tạo implementation plan nếu bạn đồng ý approach này.
