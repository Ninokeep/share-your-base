import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBaseDto } from '../dto/post/create-base.dto';
import { BaseEntity } from '../entity/base.entity';
import { FindAllParams } from '../dto/query-params/find-all-params.dto';
import { UpdateBaseDto } from '../dto/put/put-base.dto';
import { UserEntity } from '../../user/entity/user.entity';
import { UserNotFoundException } from '../../user/exceptions/user-not-found.exception';

@Injectable()
export class BaseService {
  constructor(
    @InjectRepository(BaseEntity)
    private baseRepository: Repository<BaseEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createBase(baseDto: CreateBaseDto): Promise<BaseEntity> {
    const baseEntity = new BaseEntity();
    Object.assign(baseEntity, baseDto);
    const userFound = await this.userRepository.findOne({
      where: { id: baseDto.user },
    });

    if (userFound) return this.baseRepository.save(baseEntity);

    throw new UserNotFoundException();
  }

  async findAll(filter?: FindAllParams): Promise<BaseEntity[]> {
    return this.baseRepository.find({
      relations: {
        user: true,
      },
      where: filter,
    });
  }

  async findOne(id: number) {
    const baseFound = await this.baseRepository.findOne({
      where: {
        id: id,
      },
    });
    if (baseFound) return baseFound;
    throw new NotFoundException();
  }

  async update(id: number, base: UpdateBaseDto) {
    const baseFind = await this.baseRepository.findOneBy({ id });

    const invalidProps = Object.keys(base).filter(
      (item) => !UpdateBaseDto.getPropertyNames().includes(item),
    );

    if (baseFind === null) {
      throw new NotFoundException();
    }
    if (invalidProps.length > 0) {
      throw new BadRequestException();
    }
    await this.baseRepository.update(id, base);

    return { ...baseFind, ...base };
  }

  async delete(id: number) {
    const baseFound = await this.baseRepository.findBy({ id });
    if (baseFound == null || !baseFound.length) {
      throw new NotFoundException();
    } else if (baseFound.length > 0) {
      await this.baseRepository.delete(id);

      return { detail: 'Item was been well removed' };
    }
  }
}
