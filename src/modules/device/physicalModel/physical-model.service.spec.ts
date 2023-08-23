import { Test, TestingModule } from '@nestjs/testing';
import { PhysicalModelService } from './physical-model.service';

describe('PhysicalModelService', () => {
  let service: PhysicalModelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhysicalModelService],
    }).compile();

    service = module.get<PhysicalModelService>(PhysicalModelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
