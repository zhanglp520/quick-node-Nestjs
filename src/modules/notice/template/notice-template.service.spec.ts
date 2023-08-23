import { Test, TestingModule } from '@nestjs/testing';
import { NoticeTemplateService } from './notice-template.service';

describe('NoticeTemplateService', () => {
  let service: NoticeTemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NoticeTemplateService],
    }).compile();

    service = module.get<NoticeTemplateService>(NoticeTemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
