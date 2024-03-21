import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Min,
  MinLength,
  isNotEmpty,
  isString,
} from 'class-validator';
import { TrimWhiteSpace } from 'src/decorators/trim-white-space.decorator';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @TrimWhiteSpace()
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  passwordConfirm: string;

  @IsString()
  @IsNotEmpty()
  username: string;
}
