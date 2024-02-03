import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateBaseDto } from '../dto/post/create-base.dto';
import { BaseService } from '../service/base.service';
import { BaseEntity } from '../entity/base.entity';
import { UpdateBaseDto } from '../dto/put/put-base.dto';
@Controller('bases')
export class BaseController {
  constructor(private readonly baseService: BaseService) {}

  @Post()
  createOneBase(@Body() createBaseDto: CreateBaseDto): Promise<BaseEntity> {
    return this.baseService.createBase(createBaseDto);
  }

  @Get()
  findAll(): Promise<BaseEntity[]> {
    return this.baseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<BaseEntity> {
    return this.baseService.findOne(Number(id));
  }

  @Put(':id')
  update(@Body() updateBaseDto: UpdateBaseDto) {}
}
