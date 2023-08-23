import { Test, TestingModule } from '@nestjs/testing';
import { AlarmConfigController } from './alarm-config.controller';
import { AlarmConfigService } from './alarm-config.service';

describe('AlarmConfigController', () => {
  let controller: AlarmConfigController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlarmConfigController],
      providers: [AlarmConfigService],
    }).compile();

    controller = module.get<AlarmConfigController>(AlarmConfigController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
