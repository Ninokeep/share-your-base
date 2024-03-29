import { IsNotEmpty, IsString } from 'class-validator';

export class UserCredentialsDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  token: string;
}
