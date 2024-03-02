import { Module } from '@nestjs/common';
import { BaseService } from './service/base.service';
import { BaseController } from './controller/base.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseEntity } from './entity/base.entity';
import { UserEntity } from '../user/entity/user.entity';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [BaseService],
  exports: [BaseService],
  controllers: [BaseController],
  imports: [
    TypeOrmModule.forFeature([BaseEntity, UserEntity]),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('KEY_SECRET_JWT'),
        signOptions: { expiresIn: '4h' },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class BaseModule {}
