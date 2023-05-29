import { Test, TestingModule } from '@nestjs/testing';
import { DeptController } from './dept.controller';
import { DeptService } from './dept.service';

describe('DeptController', () => {
  let controller: DeptController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeptController],
      providers: [DeptService],
    }).compile();

    controller = module.get<DeptController>(DeptController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
