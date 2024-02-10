import { baseMockData } from './base.mock';

export class BaseServiceMock {
  findAll = jest.fn().mockResolvedValue(baseMockData);
}
