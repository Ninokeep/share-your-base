import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseEntity, Repository } from 'typeorm';
import { CreateBaseDto } from '../dto/create-base.dto';

@Injectable()
export class BaseService {
  constructor(
    @InjectRepository(BaseEntity)
    private baseRepository: Repository<BaseEntity>,
  ) {}

  createBase(baseDto: CreateBaseDto): Promise<BaseEntity> {
    try {
      const baseEntity = new BaseEntity();
      Object.assign(baseEntity, baseDto);
      return this.baseRepository.save(baseEntity);
    } catch (e) {
      throw new InternalServerErrorException('Error save data  in database');
    }
  }
}
