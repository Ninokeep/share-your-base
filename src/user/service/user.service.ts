import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { FindAllParamsDto } from '../dto/find-all-params.dto';
import { UserNotFoundException } from '../exceptions/user-not-found.exception';
import { UserUpdateDto } from '../dto/update-user.dto';
import { UserIsAlreadyDisabledException } from '../exceptions/user-is-already-disabled.exception';

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

    if (userFind === null) {
      throw new UserNotFoundException();
    }

    const invalidProps = Object.keys(updateUserDto).filter(
      (item) => !UserUpdateDto.getPropertyNames().includes(item),
    );

    if (invalidProps.length > 0) {
      throw new BadRequestException();
    }
    await this.userRepository.update(id, updateUserDto);

    return { ...userFind, ...updateUserDto };
  }

  async remove(id: number) {
    const userFind = await this.userRepository.findOneBy({
      id,
    });

    if (userFind === null) {
      throw new UserNotFoundException();
    }

    if (userFind.disabled) {
      throw new UserIsAlreadyDisabledException();
    }
    await this.userRepository.update(userFind.id, { disabled: true });

    return { detail: 'Account disabled' };
  }
}
