import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { UserUpdateDto } from '../dto/update-user.dto';
import { UserNotFoundException } from '../exceptions/user-not-found.exception';
import { BadRequestException } from '@nestjs/common';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
    userService = module.get<UserService>(UserService);
  });

  it('PUT update fail user not found', async () => {
    userRepository.findOneBy = jest.fn().mockResolvedValue(null);

    const id = 1;
    const updateUserDto = {} as UserUpdateDto;
    try {
      await userService.update(id, updateUserDto);
    } catch (err) {
      expect(err).toBeInstanceOf(UserNotFoundException);
    }
  });

  it('PUT update not work  with wrong invalid property object', async () => {
    const user = {
      id: 11,
      email: 'toto@gmail.com',
      username: 'toto',
      password: 'totoletoto',
      draftBase: 1,
      role: 'user',
      bases: [],
    };
    userRepository.findOneBy = jest.fn().mockResolvedValue(user);

    const id = 1;
    const updateUserDto = { invalidProperty: 'invalidValue' } as any;

    await expect(userService.update(id, updateUserDto)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('PUT return the user without changement', async () => {
    const user = {
      id: 11,
      email: 'toto@gmail.com',
      username: 'toto',
      password: 'totoletoto',
      draftBase: 1,
      role: 'user',
      bases: [],
    };
    const id = 1;
    const updateUserDto = {} as UserUpdateDto;
    userRepository.update = jest.fn().mockResolvedValue(user);
    userRepository.findOneBy = jest.fn().mockResolvedValue(user);
    const result = await userService.update(id, updateUserDto);
    expect(result).toEqual(user);
  });

  it('PUT username of user success', async () => {
    const user = {
      id: 11,
      email: 'toto@gmail.com',
      username: 'toto',
      password: 'totoletoto',
      draftBase: 1,
      role: 'user',
      bases: [],
    };
    const id = 1;
    const updateUserDto = { username: 'jean' } as UserUpdateDto;
    userRepository.update = jest.fn().mockResolvedValue(user);
    userRepository.findOneBy = jest.fn().mockResolvedValue(user);
    const result = await userService.update(id, updateUserDto);
    expect(result.username).toEqual('jean');
  });
});
