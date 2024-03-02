import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { FindAllParamsDto } from '../dto/find-all-params.dto';
import { UserEntity } from '../entity/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

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

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
    return this.userService.findOne(id);
  }
}
