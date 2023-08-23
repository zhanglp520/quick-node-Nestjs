import { Test, TestingModule } from '@nestjs/testing';
import { NoticeTemplateController } from './noticeTemplate.controller';
import { NoticeTemplateService } from './noticeTemplate.service';

describe('NoticeTemplateController', () => {
  let controller: NoticeTemplateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoticeTemplateController],
      providers: [NoticeTemplateService],
    }).compile();

    controller = module.get<NoticeTemplateController>(NoticeTemplateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
