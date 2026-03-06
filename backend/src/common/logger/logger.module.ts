import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    PinoLoggerModule.forRoot({
      pinoHttp: {
        // Log level from env, default 'info'
        level: process.env.LOG_LEVEL || 'info',

        // Use pino-pretty in development
        transport:
          process.env.NODE_ENV !== 'production'
            ? {
                target: 'pino-pretty',
                options: { colorize: true, singleLine: false },
              }
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
