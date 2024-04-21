import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateBaseDto } from '../dto/post/create-base.dto';
import { BaseService } from '../service/base.service';
import { BaseEntity } from '../entity/base.entity';
import { UpdateBaseDto } from '../dto/put/put-base.dto';
import { FindAllParams } from '../dto/query-params/find-all-params.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthGuard } from '../../auth/guard/auth.guard';
import { PageDto } from 'src/commons/dtos/page.dto';
import { PageOptionDto } from 'src/commons/dtos/page-option.dto';
import { UserEntity } from 'src/user/entity/user.entity';
@Controller('bases')
export class BaseController {
  constructor(private readonly baseService: BaseService) {}

  @Post()
  createOneBase(@Body() createBaseDto: CreateBaseDto): Promise<BaseEntity> {
    return this.baseService.createBase(createBaseDto);
  }

  @Get()
  @ApiOkResponse()
  findAll(
    @Query() PageOptionDto: PageOptionDto,
    @Query(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        transformOptions: {
          enableImplicitConversion: false,
        },
      }),
    )
    params?: FindAllParams,
  ): Promise<PageDto<BaseEntity>> {
    return this.baseService.findAll(PageOptionDto, params);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id', ParseIntPipe) id: number): Promise<BaseEntity> {
    return this.baseService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBaseDto: UpdateBaseDto,
  ): Promise<BaseEntity> {
    return this.baseService.update(id, updateBaseDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<{ detail: string }> {
    return this.baseService.delete(id);
  }

  @Get('/users/:id')
  findAllBasesByIdUser(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.baseService.findBasesByUserId(id);
  }
}
