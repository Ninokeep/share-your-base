import { HttpException, HttpStatus } from '@nestjs/common';

export class UserIsAlreadyDisabledException extends HttpException {
  constructor() {
    super('This account is already disabled', HttpStatus.FORBIDDEN);
  }
}
