import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  ParseUUIDPipe,
  ParseIntPipe,
  DefaultValuePipe,
  HttpCode,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { DevRegistrationService } from './dev-registration.service';
import { CreateDevRegistrationDto } from './dto/create-dev-registration.dto';
import { UpdateDevRegistrationStatusDto } from './dto/update-dev-registration-status.dto';
import { AuditLogInterceptor } from '../common/logger/audit-log.interceptor';

@Controller('api/dev-registrations')
export class DevRegistrationController {
  constructor(private readonly service: DevRegistrationService) {}

  /** POST /api/dev-registrations — Create new registration */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(AuditLogInterceptor)
  async create(@Body() dto: CreateDevRegistrationDto) {
    const registration = await this.service.create(dto);
    return {
      success: true,
      message: 'Đăng ký thành công! Chúng tôi sẽ liên hệ trong 24h.',
      data: registration,
    };
  }

  /** GET /api/dev-registrations — List all (paginated) */
  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.service.findAll(page, limit);
  }

  /** GET /api/dev-registrations/:id — Get by ID */
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.findOne(id);
  }

  /** PATCH /api/dev-registrations/:id/status — Approve or reject */
  @Patch(':id/status')
  @UseInterceptors(AuditLogInterceptor)
  async updateStatus(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateDevRegistrationStatusDto,
  ) {
    const registration = await this.service.updateStatus(id, dto.action);
    return { success: true, data: registration };
  }
}


