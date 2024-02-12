import { TestingModule, Test } from '@nestjs/testing';
import { BaseService } from './base.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../user/entity/user.entity';
import { UserNotFoundException } from '../../user/exceptions/user-not-found.exception';
import { CreateBaseDto } from '../dto/post/create-base.dto';
import { BaseEntity } from '../entity/base.entity';
describe('BaseService', () => {
  let baseService: BaseService;
  let baseRepository: Repository<BaseEntity>;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BaseService,
        {
          provide: getRepositoryToken(BaseEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    baseService = module.get<BaseService>(BaseService);
    baseRepository = module.get<Repository<BaseEntity>>(
      getRepositoryToken(BaseEntity),
    );
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  describe('createBase', () => {
    it('should create base entity if user exists', async () => {
      const mockBaseDto: CreateBaseDto = new CreateBaseDto();
      const mockUser = {};

      userRepository.findOne = jest.fn().mockResolvedValue(mockUser);
      baseRepository.save = jest.fn().mockResolvedValue(mockBaseDto);

      await expect(baseService.createBase(mockBaseDto)).resolves.toEqual(
        mockBaseDto,
      );
    });

    it('should throw UserNotFoundException if user does not exist', async () => {
      const mockBaseDto: CreateBaseDto = new CreateBaseDto();
      const mockUser: UserEntity = undefined;
      const baseEntity: BaseEntity = {
        id: 1,
        costWood: 250,
        costStone: 450,
        costMetal: 900,
        costHQ: 20,
        costWoodPerHour: 10,
        costStonePerHour: 150,
        costMetalPerHour: 2,
        costHQPerHour: 888,
        type: 'attack',
        name: 'trap base 2',
        user: mockUser,
        rating: 0,
      };

      userRepository.findOne = jest.fn().mockResolvedValue(mockUser);

      await expect(baseService.createBase(mockBaseDto)).rejects.toThrow(
        UserNotFoundException,
      );
    });

    it('should send a save method because the user exists', async () => {
      const mockBaseDto: CreateBaseDto = new CreateBaseDto();
      const mockUser: UserEntity = new UserEntity();
      const baseEntity: BaseEntity = {
        id: 1,
        costWood: 250,
        costStone: 450,
        costMetal: 900,
        costHQ: 20,
        costWoodPerHour: 10,
        costStonePerHour: 150,
        costMetalPerHour: 2,
        costHQPerHour: 888,
        type: 'attack',
        name: 'trap base 2',
        user: mockUser,
        rating: 0,
      };

      mockBaseDto.costWood = 250;
      mockBaseDto.costStone = 450;
      mockBaseDto.costMetal = 900;
      mockBaseDto.costHQ = 20;
      mockBaseDto.costWoodPerHour = 10;
      mockBaseDto.costStonePerHour = 20;
      mockBaseDto.costMetalPerHour = 2;
      mockBaseDto.type = 'attack';
      mockBaseDto.name = 'trap base 2';
      mockBaseDto.user = 1;

      const objectAssignSpy = jest.spyOn(Object, 'assign');

      const findOneSpy = jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue(mockUser);

      jest.spyOn(baseRepository, 'save').mockResolvedValue(baseEntity);

      const result = await baseService.createBase(mockBaseDto);

      expect(findOneSpy).toHaveBeenCalledWith({
        where: { id: mockBaseDto.user },
      });

      const findOneArgs = findOneSpy.mock.calls[0][0].where;

      expect({ id: mockBaseDto.user }).toStrictEqual(findOneArgs);

      expect(result).toBeDefined();

      expect(objectAssignSpy).toHaveBeenCalledWith(
        expect.any(BaseEntity),
        mockBaseDto,
      );
    });
  });
});
