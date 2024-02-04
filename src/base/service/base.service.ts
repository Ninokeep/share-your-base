import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBaseDto } from '../dto/post/create-base.dto';
import { BaseEntity } from '../entity/base.entity';
import { FindAllParams } from '../dto/query-params/find-all-params.dto';
@Injectable()
export class BaseService {
  constructor(
    @InjectRepository(BaseEntity)
    private baseRepository: Repository<BaseEntity>,
  ) {}

  async createBase(baseDto: CreateBaseDto): Promise<BaseEntity> {
    try {
      const baseEntity = new BaseEntity();
      Object.assign(baseEntity, baseDto);
      return this.baseRepository.save(baseEntity);
    } catch (e) {
      throw new InternalServerErrorException('Error save data  in database');
    }
  }

  async findAll(filter: FindAllParams): Promise<BaseEntity[]> {
    try {
      return this.baseRepository.find({
        relations: {
          user: true,
        },
        where: filter,
      });
    } catch (e) {
      throw new InternalServerErrorException('Error save data in database');
    }
  }

  async findOne(id: number) {
    try {
      return this.baseRepository.findOne({
        where: {
          id: id,
        },
      });
    } catch (e) {
      throw new InternalServerErrorException('error in database');
    }
  }
}
