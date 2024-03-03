import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

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
  @IsOptional()
  @ApiProperty()
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
