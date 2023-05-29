import { Test, TestingModule } from '@nestjs/testing';
import { DictionaryTypeService } from './dictionary-type.service';

describe('DictionaryTypeService', () => {
  let service: DictionaryTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DictionaryTypeService],
    }).compile();

    service = module.get<DictionaryTypeService>(DictionaryTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
