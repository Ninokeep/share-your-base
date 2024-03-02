import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  isNumber,
} from 'class-validator';

export class FindAllParamsDto {
  @IsEmail()
  @IsOptional()
  @Type(() => String)
  email?: string;

  @IsString()
  @IsOptional()
  @Type(() => String)
  username?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  draftBase?: number;

  @IsString()
  @IsOptional()
  @Type(() => String)
  role?: string;
}
