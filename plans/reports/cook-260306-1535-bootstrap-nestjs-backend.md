# Bootstrap NestJS Backend — Complete

## Summary
Created NestJS + Express + TypeORM + PostgreSQL backend for Nuôi Dev's Dev Registration feature.

## What Was Done

### Phase 1: Project Setup
- ✅ Scaffolded NestJS project in `backend/` (Node 24, TypeScript strict)
- ✅ Docker Compose with `postgres` (port 5432) + `backend` (port 3000) services
- ✅ Dockerfile for production builds
- ✅ `.env` / `.env.example` for config
- ✅ Global `ValidationPipe` with `whitelist`, `forbidNonWhitelisted`, `transform`
- ✅ CORS enabled for frontend

### Phase 2: Dev Registration Module (Three-Layer)
- ✅ **Entity**: `dev_registrations` table — UUID PK, varchar columns for enums, text array for skills
- ✅ **DTOs**: `CreateDevRegistrationDto` with class-validator decorators (Vietnamese messages)
- ✅ **Service**: Create (duplicate email check), FindAll (pagination), FindOne
- ✅ **Controller**: POST, GET list, GET by ID

### Phase 3: Frontend Integration
- ✅ Updated `js/dev-register.js` to call `POST /api/dev-registrations`
- ✅ Handles success/error/offline states

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/dev-registrations` | Create new registration |
| GET | `/api/dev-registrations?page=1&limit=10` | List all (paginated) |
| GET | `/api/dev-registrations/:id` | Get by UUID |

## Validation Decorators Used
`@IsString`, `@IsEmail`, `@IsEnum`, `@IsOptional`, `@IsArray`, `@IsUrl`,
`@MinLength`, `@MaxLength`, `@Matches`, `@ArrayMinSize`, `@ArrayMaxSize`

## How to Run
```bash
cd backend
docker compose up -d postgres   # Start PostgreSQL
npm run start:dev               # Start NestJS dev server
```
