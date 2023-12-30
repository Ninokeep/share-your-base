import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BaseModule } from './base/base.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseEntity } from './base/entity/base.entity';
import { UserEntity } from './user/entity/user.entity';

@Module({
  imports: [
    BaseModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'syd',
      entities: [BaseEntity, UserEntity],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
