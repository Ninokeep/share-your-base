import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { UserAlreadyExistException } from '../exceptions/user-already-exist.exception';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async login(loginDto: LoginDto) {
    this.userRepository.find({
      where: {
        email: loginDto.email,
        password: loginDto.password,
      },
    });
  }

  async register(registerDto: RegisterDto) {
    const user = await this.userRepository.findOneBy({
      email: registerDto.email,
    });

    if (!user && registerDto.password == registerDto.passwordConfirm) {
      const newUser = new UserEntity();
      Object.assign(newUser, registerDto);

      await this.userRepository.save(newUser);

      return { message: 'User created !' };
    }

    throw new UserAlreadyExistException();
  }
}
