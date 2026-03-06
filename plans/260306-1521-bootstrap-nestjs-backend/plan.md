---
title: Bootstrap NestJS Backend
description: NestJS + Express + TypeORM + PostgreSQL backend for Dev Registration
status: in-progress
priority: high
effort: medium
branch: main
tags: [backend, nestjs, postgresql, docker]
created: 2026-03-06T15:21:00+07:00
---

# Bootstrap NestJS Backend

## Overview
Create backend API using NestJS/Express/PostgreSQL for Nuôi Dev platform.
Scope: Dev Registration CRUD. Docker Compose for local dev.

## Phases

### Phase 1: Project Setup & Docker ✅
- [x] Scaffold NestJS project in `backend/`
- [x] Docker Compose (postgres + backend)
- [x] TypeORM config with env vars
- [x] Global validation pipe

### Phase 2: Dev Registration Module ✅
- [x] Entity, DTOs, Enums
- [x] Controller (POST, GET list, GET by ID)
- [x] Service + Repository layer
- [x] Input validation (class-validator)
- [x] CORS for frontend

### Phase 3: Frontend Integration ✅
- [x] Update `dev-register.js` to call backend API
- [x] Handle API response/errors

## Tech Stack
| Layer | Tech |
|-------|------|
| Framework | NestJS 11 + Express |
| ORM | TypeORM |
| DB | PostgreSQL 16 (Docker) |
| Validation | class-validator + class-transformer |
| Runtime | Node 24.14.0 |

## Architecture (Three-Layer)

```
Client (Frontend)
    │
    ▼
┌─────────────────────────────┐
│  Controller Layer           │  ← HTTP routing, validation, response format
│  dev-registration.controller│
└────────────┬────────────────┘
             │
             ▼
┌─────────────────────────────┐
│  Service Layer              │  ← Business logic, data transformation
│  dev-registration.service   │
└────────────┬────────────────┘
             │
             ▼
┌─────────────────────────────┐
│  Repository Layer (TypeORM) │  ← DB queries, entity mapping
│  DevRegistration Entity     │
└────────────┬────────────────┘
             │
             ▼
        [PostgreSQL]
```

**Responsibilities:**
- **Controller**: Parse request, validate DTO (class-validator), return response
- **Service**: Business rules, error handling, entity ↔ DTO mapping
- **Repository**: TypeORM built-in repository pattern, DB operations

## Data Model
Fields from frontend form: name, email, github, portfolio, skills[],
goal (enum), experience (enum), education (enum), message
