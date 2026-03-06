import { IsEnum } from 'class-validator';

export enum StatusAction {
  APPROVE = 'approve',
  REJECT = 'reject',
}

export class UpdateDevRegistrationStatusDto {
  @IsEnum(StatusAction, { message: 'Action phải là "approve" hoặc "reject"' })
  action: StatusAction;
}
