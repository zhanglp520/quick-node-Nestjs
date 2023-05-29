import { Test, TestingModule } from '@nestjs/testing';
import { DeptService } from './dept.service';

describe('DeptService', () => {
  let service: DeptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeptService],
    }).compile();

    service = module.get<DeptService>(DeptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
