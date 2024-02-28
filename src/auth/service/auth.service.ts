import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { UserAlreadyExistException } from '../exceptions/user-already-exist.exception';
import { hashPassword } from 'src/utils/hash-password';
import { NotSamePasswordException } from '../exceptions/not-same-password.exception';
import * as bcrypt from 'bcrypt';
import { UserNotFoundException } from 'src/user/exceptions/user-not-found.exception';
import { WrongPasswordException } from '../exceptions/wrong-password.exception';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOneBy({
      email: loginDto.email,
    });

    if (!user) {
      throw new UserNotFoundException();
    }
    const isMatch = await bcrypt.compare(loginDto.password, user.password);
    if (!isMatch) {
      throw new WrongPasswordException();
    }
    return { message: 'user found' };
  }

  async register(registerDto: RegisterDto) {
    const user = await this.userRepository.findOneBy({
      email: registerDto.email,
    });

    if (user) {
      throw new UserAlreadyExistException();
    }

    if (registerDto.password !== registerDto.passwordConfirm) {
      throw new NotSamePasswordException();
    }
    const newUser = new UserEntity();
    registerDto.password = await hashPassword(registerDto.password);
    Object.assign(newUser, registerDto);

    await this.userRepository.save(newUser);

    return { message: 'User created !' };
  }
}
