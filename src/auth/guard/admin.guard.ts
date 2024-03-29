import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { extractTokenFromHeader } from '../../utils/extract-token-from-header';
import { decodeToken } from 'src/utils/decode-token';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const tokenDecoded = decodeToken(ctx, this.jwtService);
    if (tokenDecoded.role !== 'admin') {
      throw new UnauthorizedException();
    }
    return true;
  }
}
