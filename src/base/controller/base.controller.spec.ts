import { Test } from '@nestjs/testing';
import { BaseController } from './base.controller';
import { BaseService } from '../service/base.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BaseEntity } from '../entity/base.entity';
import { UserEntity } from '../../user/entity/user.entity';
import { BaseServiceMock } from '../mocks/base.service.mock';
import { baseMockData } from '../mocks/base.mock';
import { AuthGuard } from '../../auth/guard/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

describe('BaseController', () => {
  let baseController: BaseController;
  let baseService: BaseService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [BaseController],
      providers: [
        {
          provide: BaseService,
          useClass: BaseServiceMock,
        },
        {
          provide: JwtService,
          useClass: JwtService,
        },
        {
          provide: ConfigService,
          useClass: ConfigService,
        },
        { provide: AuthGuard, useClass: AuthGuard },
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

  it('show all bases 200 OK', async () => {
    const responseData = await baseController.findAll();

    expect(responseData).toEqual(baseMockData);
  });

  it('should get an array empty', async () => {
    jest.spyOn(baseService, 'findAll').mockResolvedValue([]);

    const responseData = await baseController.findAll();

    expect(responseData).toEqual([]);
  });
});
