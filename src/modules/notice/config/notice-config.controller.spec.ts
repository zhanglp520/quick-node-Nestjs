import { Test, TestingModule } from '@nestjs/testing';
import { NoticeConfigController } from './notice-config.controller';
import { NoticeConfigService } from './notice-config.service';

describe('NoticeConfigController', () => {
  let controller: NoticeConfigController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoticeConfigController],
      providers: [NoticeConfigService],
    }).compile();

    controller = module.get<NoticeConfigController>(NoticeConfigController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
