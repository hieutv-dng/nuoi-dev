import {
  IsString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsArray,
  IsUrl,
  MinLength,
  MaxLength,
  Matches,
  ArrayMinSize,
  ArrayMaxSize,
} from 'class-validator';
import {
  DevGoal,
  DevExperience,
  DevEducation,
} from '../enums/dev-registration.enums';

export class CreateDevRegistrationDto {
  @IsString({ message: 'Tên phải là chuỗi ký tự' })
  @MinLength(2, { message: 'Tên cần ít nhất 2 ký tự' })
  @MaxLength(255, { message: 'Tên không quá 255 ký tự' })
  name: string;

  @IsEmail({}, { message: 'Email không hợp lệ' })
  @MaxLength(255, { message: 'Email không quá 255 ký tự' })
  email: string;

  @IsString({ message: 'GitHub username phải là chuỗi ký tự' })
  @Matches(/^[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/, {
    message: 'GitHub username chỉ chứa chữ, số, gạch ngang',
  })
  @MaxLength(100, { message: 'GitHub username không quá 100 ký tự' })
  github: string;

  @IsOptional()
  @IsUrl({}, { message: 'Portfolio phải là URL hợp lệ (http/https)' })
  @MaxLength(500, { message: 'Portfolio URL không quá 500 ký tự' })
  portfolio?: string;

  @IsArray({ message: 'Kỹ năng phải là mảng' })
  @ArrayMinSize(1, { message: 'Chọn ít nhất 1 kỹ năng' })
  @ArrayMaxSize(5, { message: 'Tối đa 5 kỹ năng' })
  @IsString({ each: true, message: 'Mỗi kỹ năng phải là chuỗi ký tự' })
  skills: string[];

  @IsEnum(DevGoal, { message: 'Mục tiêu không hợp lệ' })
  goal: DevGoal;

  @IsEnum(DevExperience, { message: 'Kinh nghiệm không hợp lệ' })
  experience: DevExperience;

  @IsOptional()
  @IsEnum(DevEducation, { message: 'Học vấn không hợp lệ' })
  education?: DevEducation;

  @IsOptional()
  @IsString({ message: 'Lời nhắn phải là chuỗi ký tự' })
  @MaxLength(500, { message: 'Lời nhắn không quá 500 ký tự' })
  message?: string;
}
