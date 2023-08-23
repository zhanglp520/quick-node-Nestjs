import { Test, TestingModule } from "@nestjs/testing";
import { AlarmConfigService } from "./alarm-config.service";

describe("AlarmConfigService", () => {
  let service: AlarmConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlarmConfigService],
    }).compile();

    service = module.get<AlarmConfigService>(AlarmConfigService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
