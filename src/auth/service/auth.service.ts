import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../user/entity/user.entity';
import { BaseEntity } from '../../base/entity/base.entity';
import { Repository } from 'typeorm';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { UserAlreadyExistException } from '../exceptions/user-already-exist.exception';
import { hashPassword } from 'src/utils/hash-password';
import { NotSamePasswordException } from '../exceptions/not-same-password.exception';
import * as bcrypt from 'bcrypt';
import { UserNotFoundException } from 'src/user/exceptions/user-not-found.exception';
import { WrongPasswordException } from '../exceptions/wrong-password.exception';
import { JwtService } from '@nestjs/jwt';
import { UserCredentialsDto } from '../dto/user-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
    @InjectRepository(BaseEntity)
    private baseRepository: Repository<BaseEntity>,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.findUserByEmail(
      this.userRepository,
      loginDto.email,
    );

    const isSamePassword = await this.checkSamePassword(
      loginDto.password,
      user.password,
    );

    if (!isSamePassword) {
      throw new WrongPasswordException();
    }

    return {
      access_token: await this.jwtService.signAsync({
        email: user.email,
        id: user.id,
        draftBase: user.draftBase,
        disabled: user.disabled,
        role: user.role,
        username: user.username,
      }),
    };
  }

  async getUserInformations(userCredentialsDto: UserCredentialsDto) {
    return {};
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

  private async findUserByEmail(
    userRepository: Repository<UserEntity>,
    email: string,
  ): Promise<UserEntity> {
    const user = await userRepository.findOneBy({ email, disabled: false });
    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  private async checkSamePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hash);

    if (!isMatch) {
      return false;
    }

    return true;
  }
}
