import { Body, Controller, Post } from '@nestjs/common';
import { CreateBaseDto } from '../dto/create-base.dto';
import { BaseService } from '../service/base.service';
import { BaseEntity } from 'typeorm';

@Controller('base')
export class BaseController {
  constructor(private readonly baseService: BaseService) {}

  @Post()
  createOneBase(@Body() CreateBaseDto: CreateBaseDto): Promise<BaseEntity> {
    return this.baseService.createBase(CreateBaseDto);
  }
}
