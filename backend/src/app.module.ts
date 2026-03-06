import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from './common/logger/logger.module';
import { DevRegistrationModule } from './dev-registration/dev-registration.module';

@Module({
  imports: [
    // Load .env
    ConfigModule.forRoot({ isGlobal: true }),

    // PostgreSQL via TypeORM
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || 'nuoidev',
      password: process.env.DB_PASSWORD || 'nuoidev_secret',
      database: process.env.DB_DATABASE || 'nuoidev',
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production', // Auto-sync in dev only
    }),

    // Logging
    LoggerModule,

    // Feature modules
    DevRegistrationModule,
  ],
})
export class AppModule {}
