import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { FindAllParamsDto } from '../dto/find-all-params.dto';
import { UserEntity } from '../entity/user.entity';
import { UserUpdateDto } from '../dto/update-user.dto';
import { CheckTokenGuard } from '../../auth/guard/check-token.guard';
import { AuthGuard } from '../../auth/guard/auth.guard';
import { AdminGuard } from 'src/auth/guard/admin.guard';
import { AccountDisabledGuard } from 'src/auth/guard/account-disabled.guard';
import { JwtService } from '@nestjs/jwt';
import { UserCredentials } from 'src/utils/interfaces/user-credentials';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @UseGuards(AuthGuard)
  @UseGuards(AccountDisabledGuard)
  @Get('/token/:token')
  findByToken(@Param('token') token: string): Promise<UserEntity> {
    return this.userService.getUserCrendetialsByToken(token);
  }

  @UseGuards(AuthGuard)
  @UseGuards(AccountDisabledGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
    return this.userService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @UseGuards(AccountDisabledGuard)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    userUpdateDto: UserUpdateDto,
  ): Promise<UserEntity> {
    return this.userService.update(id, userUpdateDto);
  }

  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  @UseGuards(AccountDisabledGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<{ detail: string }> {
    return this.userService.remove(id);
  }

  @Get()
  @ApiOkResponse()
  findAll(
    @Query(
      new ValidationPipe({
        transform: false,
        whitelist: true,
        transformOptions: {
          enableImplicitConversion: false,
        },
      }),
    )
    params?: FindAllParamsDto,
  ) {
    return this.userService.findAll(params);
  }
}
