import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreateBaseDto } from '../dto/post/create-base.dto';
import { BaseService } from '../service/base.service';
import { BaseEntity } from '../entity/base.entity';
import { UpdateBaseDto } from '../dto/put/put-base.dto';
import { FindAllParams } from '../dto/query-params/find-all-params.dto';
@Controller('bases')
export class BaseController {
  constructor(private readonly baseService: BaseService) {}

  @Post()
  createOneBase(@Body() createBaseDto: CreateBaseDto): Promise<BaseEntity> {
    return this.baseService.createBase(createBaseDto);
  }

  @Get()
  findAll(
    @Query(new ValidationPipe({ transform: true, whitelist: true }))
    params: FindAllParams,
  ): Promise<BaseEntity[]> {
    return this.baseService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<BaseEntity> {
    return this.baseService.findOne(Number(id));
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateBaseDto: UpdateBaseDto,
  ): Promise<BaseEntity> {
    return this.baseService.update(Number(id), updateBaseDto);
  }
}
