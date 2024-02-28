import { HttpException, HttpStatus } from '@nestjs/common';

export class WrongPasswordException extends HttpException {
  constructor() {
    super('Password is wrong', HttpStatus.UNAUTHORIZED);
  }
}
