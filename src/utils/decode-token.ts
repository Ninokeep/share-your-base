import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { extractTokenFromHeader } from './extract-token-from-header';
import { JwtService } from '@nestjs/jwt';
import { UserCredentials } from './interfaces/user-credentials';

export function decodeToken(
  ctx: ExecutionContext,
  jwtService: JwtService,
): UserCredentials {
  const request = ctx.switchToHttp().getRequest();
  const token = extractTokenFromHeader(request);

  if (!token) {
    throw new UnauthorizedException();
  }
  return jwtService.decode(token);
}
