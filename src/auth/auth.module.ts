import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entity/user.entity';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';

@Module({
  providers: [AuthService],
  exports: [AuthService],
  controllers: [AuthController],
  imports: [TypeOrmModule.forFeature([UserEntity])],
})
export class AuthModule {}
