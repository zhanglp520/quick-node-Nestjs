import { Test, TestingModule } from "@nestjs/testing";
import { RuleConfigService } from "./rule-config.service";

describe("RuleConfigService", () => {
  let service: RuleConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RuleConfigService],
    }).compile();

    service = module.get<RuleConfigService>(RuleConfigService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
