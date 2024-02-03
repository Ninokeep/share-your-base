import { Module } from '@nestjs/common';
import { BaseService } from './service/base.service';
import { BaseController } from './controller/base.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseEntity } from './entity/base.entity';

@Module({
  providers: [BaseService],
  exports: [BaseService],
  controllers: [BaseController],
  imports: [TypeOrmModule.forFeature([BaseEntity])],
})
export class BaseModule {}
