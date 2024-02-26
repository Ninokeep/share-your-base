import { INestApplication } from '@nestjs/common';
import { BaseService } from '../src/base/service/base.service';
import { Test } from '@nestjs/testing';
import { BaseModule } from '../src/base/base.module';
import * as request from 'supertest';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { BaseEntity } from '../src/base/entity/base.entity';
import { UserEntity } from '../src/user/entity/user.entity';
describe('Bases', () => {
  let app: INestApplication;
  let baseService = { findAll: () => [] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        BaseModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [BaseEntity, UserEntity],
          synchronize: true,
        }),
      ],
      providers: [
        {
          provide: getRepositoryToken(BaseEntity),
          useClass: BaseEntity,
        },
        {
          provide: getRepositoryToken(UserEntity),
          useClass: UserEntity,
        },
      ],
    })
      .overrideProvider(BaseService)
      .useValue(baseService)
      .compile();

    app = moduleRef.createNestApplication();

    await app.init();
  });

  it(`/GET bases`, () => {
    return request(app.getHttpServer())
      .get('/api/v1/bases')
      .expect(200)
      .expect({
        data: baseService.findAll(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
