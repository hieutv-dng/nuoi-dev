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
