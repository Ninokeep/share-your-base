import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { decodeToken } from 'src/utils/decode-token';
import { AccountDisabledException } from '../../user/exceptions/account-disabled.exception';

@Injectable()
export class AccountDisabledGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const tokenDecoded = decodeToken(context, this.jwtService);
    if (tokenDecoded.disabled) {
      throw new AccountDisabledException();
    }
    return true;
  }
}
