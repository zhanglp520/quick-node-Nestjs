import { Test, TestingModule } from '@nestjs/testing';
import { AlarmRecordService } from './alarm-record.service';

describe('AlarmRecordService', () => {
  let service: AlarmRecordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlarmRecordService],
    }).compile();

    service = module.get<AlarmRecordService>(AlarmRecordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
