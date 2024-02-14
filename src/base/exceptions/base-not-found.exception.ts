import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseNotFoundException extends HttpException {
  constructor() {
    super("Base doesn't exist", HttpStatus.NOT_FOUND);
  }
}
