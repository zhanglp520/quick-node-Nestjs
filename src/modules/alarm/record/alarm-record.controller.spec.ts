import { Test, TestingModule } from "@nestjs/testing";
import { AlarmRecordController } from "./alarm-record.controller";
import { AlarmRecordService } from "./alarm-record.service";

describe("AlarmRecordController", () => {
  let controller: AlarmRecordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlarmRecordController],
      providers: [AlarmRecordService],
    }).compile();

    controller = module.get<AlarmRecordController>(AlarmRecordController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
