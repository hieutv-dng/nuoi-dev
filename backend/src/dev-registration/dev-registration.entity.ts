import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import {
  DevGoal,
  DevExperience,
  DevEducation,
  RegistrationStatus,
} from './enums/dev-registration.enums';

@Entity('dev_registrations')
export class DevRegistration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 100 })
  github: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  portfolio: string | null;

  @Column({ type: 'text', array: true })
  skills: string[];

  @Column({ type: 'varchar', length: 50 })
  goal: DevGoal;

  @Column({ type: 'varchar', length: 50 })
  experience: DevExperience;

  @Column({ type: 'varchar', nullable: true })
  education: DevEducation | null;

  @Column({ type: 'varchar', length: 500, nullable: true })
  message: string | null;

  @Column({ type: 'varchar', length: 20, default: RegistrationStatus.PENDING })
  status: RegistrationStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // ── Domain Methods (Rich Domain Model) ──

  /** Approve a pending registration */
  approve(): void {
    this.guardPendingStatus('duyệt');
    this.status = RegistrationStatus.APPROVED;
  }

  /** Reject a pending registration */
  reject(): void {
    this.guardPendingStatus('từ chối');
    this.status = RegistrationStatus.REJECTED;
  }

  /** Guard: only pending registrations can transition */
  private guardPendingStatus(action: string): void {
    if (this.status !== RegistrationStatus.PENDING) {
      throw new BadRequestException(
        `Chỉ có thể ${action} đăng ký đang ở trạng thái chờ duyệt (hiện tại: ${this.status})`,
      );
    }
  }
}
