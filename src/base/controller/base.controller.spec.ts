import { Test } from '@nestjs/testing';
import { BaseController } from './base.controller';
import { BaseService } from '../service/base.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BaseEntity } from '../entity/base.entity';
import { UserEntity } from '../../user/entity/user.entity';

describe('BaseController', () => {
  let baseController: BaseController;
  let baseService: BaseService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [BaseController],
      providers: [
        {
          provide: BaseService,
          useValue: {
            findAll: jest.fn,
          },
        },
        {
          provide: getRepositoryToken(BaseEntity),
          useClass: BaseEntity,
        },
        {
          provide: getRepositoryToken(UserEntity),
          useClass: UserEntity,
        },
      ],
    }).compile();

    baseService = moduleRef.get<BaseService>(BaseService);
    baseController = moduleRef.get<BaseController>(BaseController);
  });

  it('with wrong queries params', () => {});
});
