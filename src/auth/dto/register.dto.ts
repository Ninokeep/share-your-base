import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Min,
  MinLength,
  isNotEmpty,
  isString,
} from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  passwordConfirm: string;

  @IsString()
  @IsNotEmpty()
  username: string;
}
