import { HttpException, HttpStatus } from '@nestjs/common';

export class NotSamePasswordException extends HttpException {
  constructor() {
    super(
      'The password and confirm password are not the same',
      HttpStatus.CONFLICT,
    );
  }
}
