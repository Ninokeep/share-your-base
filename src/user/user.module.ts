import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';

@Module({
  providers: [],
  exports: [],
  controllers: [],
  imports: [TypeOrmModule.forFeature([UserEntity])],
})
export class Usermodule {}
