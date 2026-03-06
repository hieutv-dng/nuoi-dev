---
title: LogService — Structured JSON Logging
description: Implement logging system with nestjs-pino for application, request/response, and audit logs
status: planned
priority: high
effort: small
branch: feat/log-service
tags: [logging, pino, nestjs, infrastructure]
created: 2026-03-06T16:12:00+07:00
---

# LogService Implementation Plan

## Context

- [Brainstorm Report](../reports/brainstormer-260306-1608-log-service.md)
- Backend: NestJS v11 + TypeORM + PostgreSQL
- Current modules: `dev-registration` (only)

## Phases

### Phase 1: Setup & Logger Module
**Status:** planned | **Effort:** ~15 min

Install deps, create `LoggerModule` with Pino config, integrate into app.

→ [phase-01-setup-logger-module.md](./phase-01-setup-logger-module.md)

### Phase 2: Audit Log & Service Integration
**Status:** planned | **Effort:** ~15 min

Create `AuditLogInterceptor`, add logging to service & controller.

→ [phase-02-audit-and-integration.md](./phase-02-audit-and-integration.md)

## Dependencies

- `nestjs-pino` ^4.x
- `pino-http` ^10.x
- `pino-pretty` ^13.x (devDependency)

## Success Criteria

- [ ] JSON structured logs in console
- [ ] Auto HTTP request/response logging
- [ ] Application logs in services (info/warn/error)
- [ ] Audit logs on mutation endpoints
- [ ] Pretty output in dev, JSON in prod
- [ ] Backend compiles and runs without errors
