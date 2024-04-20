import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsEmail,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  Matches,
  MinLength,
  NotContains,
  NotEquals,
  ValidateIf,
} from 'class-validator';
import { TrimWhiteSpace } from '../../decorators/trim-white-space.decorator';

export class UserUpdateDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  username?: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty()
  email?: string;

  @IsString()
  @NotEquals(null)
  @ApiProperty()
  @ValidateIf((obj, value) => value !== undefined)
  @TrimWhiteSpace()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  draftBase?: number;

  @ApiProperty()
  @IsOptional()
  @IsIn(['user', 'admin'])
  role: string;

  static getPropertyNames(): string[] {
    return ['username', 'email', 'password', 'draftBase', 'role'];
  }
}
