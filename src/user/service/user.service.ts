import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { FindAllParamsDto } from '../dto/find-all-params.dto';
import { UpdateBaseDto } from 'src/base/dto/put/put-base.dto';
import { UserNotFoundException } from '../exceptions/user-not-found.exception';
import { UserUpdateDto } from '../dto/update-user.dto';

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

  async update(id: number, updateUserDto: UserUpdateDto) {
    const userFind = await this.userRepository.findOneBy({ id });

    const invalidProps = Object.keys(updateUserDto).filter(
      (item) => !UpdateBaseDto.getPropertyNames().includes(item),
    );

    if (userFind === null) {
      throw new UserNotFoundException();
    }
    if (invalidProps.length > 0) {
      throw new BadRequestException();
    }
    await this.userRepository.update(id, updateUserDto);

    return { ...userFind, ...updateUserDto };
  }
}
