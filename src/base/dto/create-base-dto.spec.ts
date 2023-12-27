import { CreateBaseDto } from './create-base.dto';
import { validate, IsString } from 'class-validator';

describe('CreateBaseDto', () => {
  let createBaseDto: CreateBaseDto;

  beforeEach(() => {
    createBaseDto = new CreateBaseDto();
  });

  it('should pass with attack type data', async () => {
    createBaseDto.costStone = 100;
    createBaseDto.costMetal = 100;
    createBaseDto.costWood = 100;
    createBaseDto.costHQ = 100;

    createBaseDto.costStonePerHour = 100;
    createBaseDto.costMetalPerHour = 100;
    createBaseDto.costWoodPerHour = 100;
    createBaseDto.costHQPerHour = 100;

    createBaseDto.type = 'attack';
    createBaseDto.creator = 'toto';
    const errors = await validate(createBaseDto);

    expect(errors.length).toBe(0);
  });
  it('should pass  with hybrid type', async () => {
    createBaseDto.costStone = 100;
    createBaseDto.costMetal = 100;
    createBaseDto.costWood = 100;
    createBaseDto.costHQ = 100;

    createBaseDto.costStonePerHour = 100;
    createBaseDto.costMetalPerHour = 100;
    createBaseDto.costWoodPerHour = 100;
    createBaseDto.costHQPerHour = 100;

    createBaseDto.type = 'hybrid';
    createBaseDto.creator = 'toto';
    const errors = await validate(createBaseDto);

    expect(errors.length).toBe(0);
  });

  it('should pass  with defensive type', async () => {
    createBaseDto.costStone = 100;
    createBaseDto.costMetal = 100;
    createBaseDto.costWood = 100;
    createBaseDto.costHQ = 100;

    createBaseDto.costStonePerHour = 100;
    createBaseDto.costMetalPerHour = 100;
    createBaseDto.costWoodPerHour = 100;
    createBaseDto.costHQPerHour = 100;

    createBaseDto.type = 'defensive';
    createBaseDto.creator = 'toto';
    const errors = await validate(createBaseDto);

    expect(errors.length).toBe(0);
  });

  it('should doesn t pass', async () => {
    createBaseDto.costStone = 100;
    createBaseDto.costMetal = 100;
    createBaseDto.costWood = 100;
    createBaseDto.costHQ = 100;

    createBaseDto.costStonePerHour = 100;
    createBaseDto.costMetalPerHour = 100;
    createBaseDto.costWoodPerHour = 100;
    createBaseDto.costHQPerHour = 100;

    createBaseDto.type = 'invalid type';
    createBaseDto.creator = 'toto';
    const errors = await validate(createBaseDto);
    expect(errors.length).toBe(1);
    expect(errors[0].constraints.isIn).toEqual(
      'type must be one of the following values: attack, hybrid, defensive',
    );
  });

  it('should pass validity data', async () => {
    createBaseDto.costStone = 100;
    createBaseDto.costMetal = 100;
    createBaseDto.costWood = 100;
    createBaseDto.costHQ = 100;

    createBaseDto.costStonePerHour = 100;
    createBaseDto.costMetalPerHour = 100;
    createBaseDto.costWoodPerHour = 100;
    createBaseDto.costHQPerHour = 100;

    createBaseDto.type = 'attack';
    createBaseDto.creator = 'toto';
    const errors = await validate(createBaseDto);

    expect(errors.length).toBe(0);
  });

  it('check validity data for all type with wrong type', async () => {
    createBaseDto.costStone = '100' as any;
    createBaseDto.costMetal = '100' as any;
    createBaseDto.costWood = '100' as any;
    createBaseDto.costHQ = '100' as any;

    createBaseDto.costStonePerHour = '100' as any;
    createBaseDto.costMetalPerHour = '100' as any;
    createBaseDto.costWoodPerHour = '100' as any;
    createBaseDto.costHQPerHour = '100' as any;

    createBaseDto.type = 'attack';
    createBaseDto.creator = 100 as any;
    const errors = await validate(createBaseDto);
    expect(errors.length).toBe(9);

    expect(errors[0].property).toEqual('costWood');
    expect(errors[0].constraints.isNumber).toEqual(
      'costWood must be a number conforming to the specified constraints',
    );

    expect(errors[1].property).toEqual('costStone');
    expect(errors[1].constraints.isNumber).toEqual(
      'costStone must be a number conforming to the specified constraints',
    );

    expect(errors[2].property).toEqual('costMetal');
    expect(errors[2].constraints.isNumber).toEqual(
      'costMetal must be a number conforming to the specified constraints',
    );

    expect(errors[3].property).toEqual('costHQ');
    expect(errors[3].constraints.isNumber).toEqual(
      'costHQ must be a number conforming to the specified constraints',
    );

    expect(errors[4].property).toEqual('costWoodPerHour');
    expect(errors[4].constraints.isNumber).toEqual(
      'costWoodPerHour must be a number conforming to the specified constraints',
    );

    expect(errors[5].property).toEqual('costStonePerHour');
    expect(errors[5].constraints.isNumber).toEqual(
      'costStonePerHour must be a number conforming to the specified constraints',
    );

    expect(errors[6].property).toEqual('costMetalPerHour');
    expect(errors[6].constraints.isNumber).toEqual(
      'costMetalPerHour must be a number conforming to the specified constraints',
    );

    expect(errors[7].property).toEqual('costHQPerHour');
    expect(errors[7].constraints.isNumber).toEqual(
      'costHQPerHour must be a number conforming to the specified constraints',
    );
    expect(errors[8].property).toEqual('creator');
    expect(errors[8].constraints.isString).toEqual('creator must be a string');
  });
});
