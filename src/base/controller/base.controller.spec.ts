import { Test } from '@nestjs/testing';
import { BaseController } from './base.controller';
import { BaseService } from '../service/base.service';
import { BaseEntity } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateBaseDto } from '../dto/post/create-base.dto';

describe('BaseController', () => {
  let baseController: BaseController;
  let baseService: BaseService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [BaseController],
      providers: [
        BaseService,
        {
          provide: getRepositoryToken(BaseEntity),
          useClass: BaseEntity,
        },
      ],
    }).compile();

    baseService = moduleRef.get<BaseService>(BaseService);
    baseController = moduleRef.get<BaseController>(BaseController);
  });

  it('should run base controller test', () => {});
});
