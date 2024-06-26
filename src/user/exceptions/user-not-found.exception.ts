import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor() {
    super("User doesn't exist", HttpStatus.NOT_FOUND);
  }
}
