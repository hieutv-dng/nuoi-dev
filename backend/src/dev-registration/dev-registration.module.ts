import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevRegistration } from './dev-registration.entity';
import { DevRegistrationService } from './dev-registration.service';
import { DevRegistrationController } from './dev-registration.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DevRegistration])],
  controllers: [DevRegistrationController],
  providers: [DevRegistrationService],
  exports: [DevRegistrationService],
})
export class DevRegistrationModule {}
