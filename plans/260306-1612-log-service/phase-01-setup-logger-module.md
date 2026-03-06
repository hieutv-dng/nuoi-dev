# Phase 1: Setup & Logger Module

## Context Links

- [Plan Overview](./plan.md)
- [Brainstorm](../reports/brainstormer-260306-1608-log-service.md)

## Overview

**Priority:** High | **Status:** Planned

Install `nestjs-pino` dependencies, create global `LoggerModule`, replace NestJS default logger.

## Related Code Files

| Action | File |
|--------|------|
| **Create** | `src/common/logger/logger.module.ts` |
| **Modify** | `src/app.module.ts` |
| **Modify** | `src/main.ts` |

## Implementation Steps

### 1. Install dependencies

```bash
npm install nestjs-pino pino-http
npm install -D pino-pretty
```

### 2. Create `src/common/logger/logger.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    PinoLoggerModule.forRoot({
      pinoHttp: {
        // Log level from env, default 'info'
        level: process.env.LOG_LEVEL || 'info',

        // Use pino-pretty in development
        transport: process.env.NODE_ENV !== 'production'
          ? { target: 'pino-pretty', options: { colorize: true, singleLine: false } }
          : undefined,

        // Customize serializers — keep request logs clean
        serializers: {
          req(req) {
            return { id: req.id, method: req.method, url: req.url };
          },
          res(res) {
            return { statusCode: res.statusCode };
          },
        },
      },
    }),
  ],
})
export class LoggerModule {}
```

### 3. Modify `src/app.module.ts`

Add `LoggerModule` to imports:

```typescript
import { LoggerModule } from './common/logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({ ... }),
    LoggerModule,        // ← Add here
    DevRegistrationModule,
  ],
})
export class AppModule {}
```

### 4. Modify `src/main.ts`

Replace NestJS default logger with Pino:

```typescript
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  // Replace default NestJS logger with Pino
  app.useLogger(app.get(Logger));

  // ... existing config (ValidationPipe, CORS)
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
}
```

Key change: `bufferLogs: true` → buffers logs until Pino is ready, prevents missing startup logs.

## Todo List

- [ ] Install `nestjs-pino`, `pino-http`, `pino-pretty`
- [ ] Create `src/common/logger/logger.module.ts`
- [ ] Import `LoggerModule` in `app.module.ts`
- [ ] Replace default logger in `main.ts` (`bufferLogs` + `useLogger`)
- [ ] Verify: `npm run start:dev` — logs output in pretty format
- [ ] Verify: any HTTP request shows request/response log automatically

## Success Criteria

- NestJS startup logs appear in pretty format (dev)
- Every HTTP request auto-logged with method, url, statusCode, responseTime
- No compile errors
