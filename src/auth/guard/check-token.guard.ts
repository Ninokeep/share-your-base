import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { extractTokenFromHeader } from '../../utils/extract-token-from-header';

@Injectable()
export class CheckTokenGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request = ctx.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }
    const tokenDecoded = this.jwtService.decode(token);
    if (!(request.params.id === tokenDecoded.id)) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
