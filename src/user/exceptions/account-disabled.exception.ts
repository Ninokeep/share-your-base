import { HttpException, HttpStatus } from '@nestjs/common';

export class AccountDisabledException extends HttpException {
  constructor() {
    super(
      'This account is disabled you cannot make operation with this',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
