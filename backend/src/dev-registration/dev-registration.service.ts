import {
  Injectable,
  ConflictException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DevRegistration } from './dev-registration.entity';
import { CreateDevRegistrationDto } from './dto/create-dev-registration.dto';
import { StatusAction } from './dto/update-dev-registration-status.dto';

@Injectable()
export class DevRegistrationService {
  private readonly logger = new Logger(DevRegistrationService.name);

  constructor(
    @InjectRepository(DevRegistration)
    private readonly devRegistrationRepo: Repository<DevRegistration>,
  ) {}

  /** Create a new dev registration */
  async create(dto: CreateDevRegistrationDto): Promise<DevRegistration> {
    // Check duplicate email
    const existing = await this.devRegistrationRepo.findOne({
      where: { email: dto.email },
    });
    if (existing) {
      this.logger.warn(
        { email: dto.email },
        'Duplicate email registration attempt',
      );
      throw new ConflictException('Email này đã được đăng ký');
    }

    const entity = this.devRegistrationRepo.create(dto);
    const saved = await this.devRegistrationRepo.save(entity);
    this.logger.log(
      { id: saved.id, email: saved.email },
      'Registration created',
    );
    return saved;
  }

  /** Get all registrations with pagination */
  async findAll(
    page = 1,
    limit = 10,
  ): Promise<{
    data: DevRegistration[];
    total: number;
    page: number;
    limit: number;
  }> {
    const [data, total] = await this.devRegistrationRepo.findAndCount({
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data, total, page, limit };
  }

  /** Get a single registration by ID */
  async findOne(id: string): Promise<DevRegistration> {
    const registration = await this.devRegistrationRepo.findOne({
      where: { id },
    });
    if (!registration) {
      throw new NotFoundException(`Không tìm thấy đăng ký với ID: ${id}`);
    }
    return registration;
  }

  /** Update registration status (approve/reject) — delegates to entity */
  async updateStatus(
    id: string,
    action: StatusAction,
  ): Promise<DevRegistration> {
    const entity = await this.findOne(id);

    if (action === StatusAction.APPROVE) {
      entity.approve();
    } else {
      entity.reject();
    }

    const saved = await this.devRegistrationRepo.save(entity);
    this.logger.log(
      { id, action, status: saved.status },
      'Registration status updated',
    );
    return saved;
  }
}

