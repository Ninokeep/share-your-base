import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';

export function TrimWhiteSpace() {
  return applyDecorators(
    Transform(({ value }) =>
      typeof value === 'string' ? value.trim() : value,
    ),
  );
}
