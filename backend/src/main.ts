import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  // Replace default NestJS logger with Pino
  app.useLogger(app.get(Logger));

  // Global validation pipe — uses class-validator decorators
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,           // Strip unknown properties
      forbidNonWhitelisted: true, // Throw error on unknown properties
      transform: true,           // Auto-transform payloads to DTO instances
    }),
  );

  // CORS for frontend
  app.enableCors({
    origin: '*', // Allow all origins in dev
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
}

bootstrap();
