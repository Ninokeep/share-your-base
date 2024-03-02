import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserUpdateDto {
  @IsString()
  @IsOptional()
  username: string;

  @IsEmail()
  @IsOptional()
  email: string;
}
