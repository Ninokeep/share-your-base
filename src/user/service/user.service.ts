import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { FindAllParamsDto } from '../dto/find-all-params.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(filter?: FindAllParamsDto): Promise<UserEntity[]> {
    return this.userRepository.find({
      relations: {
        bases: true,
      },
      where: filter,
    });
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    if (user) return user;
    throw new NotFoundException();
  }
}
