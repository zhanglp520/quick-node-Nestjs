import { Test, TestingModule } from '@nestjs/testing';
import { PhysicalModelController } from './physical-model.controller';
import { PhysicalModelService } from './physical-model.service';

describe('PhysicalModelController', () => {
  let controller: PhysicalModelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhysicalModelController],
      providers: [PhysicalModelService],
    }).compile();

    controller = module.get<PhysicalModelController>(PhysicalModelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
